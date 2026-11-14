import type { ExchangeMode, Listing, ListingStatus } from "./types";
import { OZ_PER_DOLLAR } from "./types";

export function formatOz(value: number) {
  return `${new Intl.NumberFormat("en-US").format(value)} 7oz`;
}

export function deskMoney(oz: number) {
  const dollars = oz / OZ_PER_DOLLAR;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: dollars < 100 ? 2 : 0,
  }).format(dollars);
}

export function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function modeLabel(mode: ExchangeMode) {
  if (mode === "direct") return "Direct exchange";
  if (mode === "ozombol") return "7ozombols";
  return "Either way";
}

export function statusLabel(status: ListingStatus) {
  if (status === "open") return "On the floor";
  if (status === "exchanged") return "Exchanged";
  if (status === "settled") return "Settled in 7oz";
  return "Withdrawn";
}

export function figureLabel(listing: Listing) {
  if (listing.priceKind === "reference") return "Examiner’s figure";
  if (listing.appraisal?.examined === "in-person") return "Priced in person";
  if (listing.appraisal) return "Priced from the market";
  return "Stall’s figure";
}

export function priceKindFor(mode: ExchangeMode): Listing["priceKind"] {
  return mode === "direct" ? "reference" : "asking";
}
