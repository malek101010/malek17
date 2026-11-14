import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { OPENING_BALANCE, OPENING_LEDGER, seedListings, seedOffers } from "./catalog";
import type { LedgerEntry, Listing, Offer, Payout } from "./types";

export type Result = { ok: true } | { ok: false; reason: string };

type DirectInput = {
  listingId: string;
  message: string;
  giveListingId?: string;
  giveTitle?: string;
};

type DeskState = {
  name: string;
  balance: number;
  listings: Listing[];
  offers: Offer[];
  ledger: LedgerEntry[];
  payouts: Payout[];
  setName: (name: string) => void;
  addListing: (listing: Listing) => void;
  withdraw: (id: string) => void;
  proposeDirect: (input: DirectInput) => Result;
  buyWithOz: (listingId: string) => Result;
  respond: (offerId: string, decision: "accepted" | "declined") => Result;
  requestPayout: (amount: number, note: string) => Result;
};

const memoryStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}

export const useDesk = create<DeskState>()(
  persist(
    (set, get) => ({
      name: "Alex Marin",
      balance: OPENING_BALANCE,
      listings: seedListings(),
      offers: seedOffers(),
      ledger: OPENING_LEDGER.map((entry) => ({ ...entry })),
      payouts: [],
      setName: (name) => {
        const trimmed = name.trim().slice(0, 40);
        if (!trimmed) return;
        set((state) => ({
          name: trimmed,
          listings: state.listings.map((listing) =>
            listing.owner === "you" ? { ...listing, sellerName: trimmed } : listing,
          ),
        }));
      },
      addListing: (listing) =>
        set((state) => ({ listings: [listing, ...state.listings] })),
      withdraw: (id) =>
        set((state) => ({
          listings: state.listings.map((listing) =>
            listing.id === id && listing.owner === "you" && listing.status === "open"
              ? { ...listing, status: "withdrawn" }
              : listing,
          ),
          offers: state.offers.map((offer) =>
            offer.status === "pending" &&
            (offer.listingId === id || offer.giveListingId === id)
              ? { ...offer, status: "declined" }
              : offer,
          ),
        })),
      proposeDirect: (input) => {
        const listing = get().listings.find((item) => item.id === input.listingId);
        if (!listing || listing.status !== "open") {
          return { ok: false, reason: "This good is no longer on the floor." };
        }
        if (listing.owner === "you") {
          return { ok: false, reason: "You cannot exchange with your own stall." };
        }
        if (listing.mode === "ozombol") {
          return { ok: false, reason: "This stall is taking 7ozombols only." };
        }
        const offer: Offer = {
          id: uid("offer"),
          listingId: input.listingId,
          fromName: get().name,
          direction: "out",
          kind: "direct",
          message: input.message.trim(),
          giveListingId: input.giveListingId,
          giveTitle: input.giveTitle,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ offers: [offer, ...state.offers] }));
        return { ok: true };
      },
      buyWithOz: (listingId) => {
        const state = get();
        const listing = state.listings.find((item) => item.id === listingId);
        if (!listing || listing.status !== "open") {
          return { ok: false, reason: "This good is no longer on the floor." };
        }
        if (listing.owner === "you") {
          return { ok: false, reason: "This is already on your stall." };
        }
        if (listing.mode === "direct" || listing.priceKind !== "asking") {
          return { ok: false, reason: "This stall wants another good, not 7ozombols." };
        }
        if (state.balance < listing.ozombols) {
          return { ok: false, reason: "Your 7ozombol balance does not cover this figure." };
        }
        const at = new Date().toISOString();
        const offer: Offer = {
          id: uid("offer"),
          listingId,
          fromName: state.name,
          direction: "out",
          kind: "ozombol",
          message: "Settled in 7ozombols at the figure on the stall.",
          ozombols: listing.ozombols,
          status: "accepted",
          createdAt: at,
        };
        const entry: LedgerEntry = {
          id: uid("led"),
          label: `Settled · ${listing.title}`,
          amount: -listing.ozombols,
          at,
        };
        set((prev) => ({
          balance: prev.balance - listing.ozombols,
          ledger: [entry, ...prev.ledger],
          offers: [
            offer,
            ...prev.offers.map((item) =>
              item.listingId === listingId && item.status === "pending"
                ? { ...item, status: "declined" as const }
                : item,
            ),
          ],
          listings: prev.listings.map((item) =>
            item.id === listingId ? { ...item, status: "settled" as const } : item,
          ),
        }));
        return { ok: true };
      },
      respond: (offerId, decision) => {
        const offer = get().offers.find((item) => item.id === offerId);
        if (!offer || offer.status !== "pending") {
          return { ok: false, reason: "This proposal is already closed." };
        }
        if (decision === "declined") {
          set((state) => ({
            offers: state.offers.map((item) =>
              item.id === offerId ? { ...item, status: "declined" } : item,
            ),
          }));
          return { ok: true };
        }
        const closeIds = [offer.listingId, offer.giveListingId].filter(
          (id): id is string => Boolean(id),
        );
        set((state) => ({
          offers: state.offers.map((item) => {
            if (item.id === offerId) return { ...item, status: "accepted" as const };
            if (
              item.status === "pending" &&
              (closeIds.includes(item.listingId) ||
                (item.giveListingId ? closeIds.includes(item.giveListingId) : false))
            ) {
              return { ...item, status: "declined" as const };
            }
            return item;
          }),
          listings: state.listings.map((listing) =>
            closeIds.includes(listing.id) && listing.status === "open"
              ? { ...listing, status: "exchanged" as const }
              : listing,
          ),
        }));
        return { ok: true };
      },
      requestPayout: (amount, note) => {
        const state = get();
        const rounded = Math.round(amount);
        if (!Number.isFinite(rounded) || rounded < 100) {
          return { ok: false, reason: "The desk redeems from 100 7ozombols." };
        }
        if (rounded > state.balance) {
          return { ok: false, reason: "That is more than your balance." };
        }
        const trimmed = note.trim();
        if (trimmed.length < 3) {
          return { ok: false, reason: "Say where the company should send the money." };
        }
        const at = new Date().toISOString();
        const payout: Payout = {
          id: uid("pay"),
          amount: rounded,
          note: trimmed,
          status: "with the treasury",
          at,
        };
        const entry: LedgerEntry = {
          id: uid("led"),
          label: "Redemption requested",
          amount: -rounded,
          at,
        };
        set({
          balance: state.balance - rounded,
          payouts: [payout, ...state.payouts],
          ledger: [entry, ...state.ledger],
        });
        return { ok: true };
      },
    }),
    {
      name: "ozombol-desk-v1",
      skipHydration: true,
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : localStorage,
      ),
      partialize: (state) => ({
        name: state.name,
        balance: state.balance,
        listings: state.listings,
        offers: state.offers,
        ledger: state.ledger,
        payouts: state.payouts,
      }),
    },
  ),
);
