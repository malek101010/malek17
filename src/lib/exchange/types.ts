import { CATEGORIES } from "../app-data/types";

export type Category = (typeof CATEGORIES)[number];

export const CONDITIONS = ["New", "Excellent", "Good", "Fair", "Project"] as const;

export type Condition = (typeof CONDITIONS)[number];

export type ExchangeMode = "direct" | "ozombol" | "either";

export type ListingStatus = "open" | "withdrawn" | "exchanged" | "settled";

export type Appraisal = {
  by: string;
  note: string;
  examined: "in-person" | "market";
  at: string;
};

export type Listing = {
  id: string;
  owner: "you" | "member";
  sellerName: string;
  title: string;
  category: Category;
  city: string;
  condition: Condition;
  description: string;
  images: string[];
  videoKey?: string;
  mode: ExchangeMode;
  ozombols: number;
  priceKind: "asking" | "reference";
  appraisal?: Appraisal;
  wants: string;
  status: ListingStatus;
  createdAt: string;
};

export type Offer = {
  id: string;
  listingId: string;
  fromName: string;
  direction: "in" | "out";
  kind: "direct" | "7ozombol";
  message: string;
  giveListingId?: string;
  giveTitle?: string;
  ozombols?: number;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
};

export type LedgerEntry = {
  id: string;
  label: string;
  amount: number;
  at: string;
};

export type Payout = {
  id: string;
  amount: number;
  note: string;
  status: "with the treasury";
  at: string;
};

export const OZ_PER_DOLLAR = 10;
