import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ListingCard } from "@/components/exchange/listing-card";
import { Shell } from "@/components/exchange/shell";
import { Eyebrow, TextInput } from "@/components/exchange/ui";
import { type Category, type ExchangeMode, type Listing } from "@/lib/exchange/types";
import { CATEGORIES } from "@/lib/app-data/types";
import { useDesk } from "@/lib/exchange/store";

type MarketSearch = {
  category?: Category;
  mode?: ExchangeMode;
  band?: string;
};

const BANDS = [
  { id: "all", label: "Any figure" },
  { id: "under-2", label: "Under 2,000" },
  { id: "2-10", label: "2,000 to 10,000" },
  { id: "10-60", label: "10,000 to 60,000" },
  { id: "over-60", label: "60,000 and over" },
] as const;

const MODES = [
  { id: "all", label: "Any terms" },
  { id: "direct", label: "Direct exchange" },
  { id: "ozombol", label: "7ozombols" },
  { id: "either", label: "Either way only" },
] as const;

export const Route = createFileRoute("/market")({
  validateSearch: (raw: Record<string, unknown>): MarketSearch => {
    const category = CATEGORIES.find((item) => item === raw.category);
    const mode =
      raw.mode === "direct" || raw.mode === "ozombol" || raw.mode === "either"
        ? raw.mode
        : undefined;
    const band = BANDS.some((item) => item.id === raw.band) ? String(raw.band) : undefined;
    return {
      category,
      mode,
      band: band === "all" ? undefined : band,
    };
  },
  head: () => ({ meta: [{ title: "Market · 7ozombol" }] }),
  component: MarketPage,
});

function inBand(value: number, band?: string) {
  if (!band || band === "all") return true;
  if (band === "under-2") return value < 2000;
  if (band === "2-10") return value >= 2000 && value < 10000;
  if (band === "10-60") return value >= 10000 && value < 60000;
  if (band === "over-60") return value >= 60000;
  return true;
}

function matchesMode(listing: Listing, mode?: ExchangeMode | "all") {
  if (!mode || mode === "all") return true;
  if (mode === "either") return listing.mode === "either";
  if (mode === "direct") return listing.mode === "direct" || listing.mode === "either";
  return listing.mode === "ozombol" || listing.mode === "either";
}

function MarketPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/market" });
  const listings = useDesk((state) => state.listings);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "low" | "high">("new");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const next = listings.filter((listing) => {
      if (listing.status !== "open") return false;
      if (search.category && listing.category !== search.category) return false;
      if (!matchesMode(listing, search.mode)) return false;
      if (!inBand(listing.ozombols, search.band)) return false;
      if (!q) return true;
      const hay = `${listing.title} ${listing.city} ${listing.sellerName} ${listing.wants} ${listing.description}`.toLowerCase();
      return hay.includes(q);
    });
    next.sort((a, b) => {
      if (sort === "low") return a.ozombols - b.ozombols;
      if (sort === "high") return b.ozombols - a.ozombols;
      return b.createdAt.localeCompare(a.createdAt);
    });
    return next;
  }, [listings, query, search.band, search.category, search.mode, sort]);

  function setSearch(patch: MarketSearch) {
    void navigate({
      search: {
        category: patch.category,
        mode: patch.mode,
        band: patch.band,
      },
    });
  }

  const grouped =
    !search.category && !search.mode && !search.band && query.trim() === "";

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Eyebrow>General market</Eyebrow>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-4xl sm:text-5xl">Goods on the floor</h1>
          <p className="text-sm text-muted tabular-nums">{filtered.length} open</p>
        </div>
        <p className="mt-3 max-w-2xl text-muted">
          Filed by kind of good, and by the figure in 7ozombols. A reference figure is not a price
          — that stall wants another thing.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <TextInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a good, a city, a person"
            aria-label="Search the market"
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Kind of good">
            <Chip
              pressed={!search.category}
              onClick={() => setSearch({ ...search, category: undefined })}
            >
              All kinds
            </Chip>
            {CATEGORIES.map((category) => (
              <Chip
                key={category}
                pressed={search.category === category}
                onClick={() => setSearch({ ...search, category })}
              >
                {category}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Figure in 7ozombols">
            {BANDS.map((band) => (
              <Chip
                key={band.id}
                pressed={(search.band ?? "all") === band.id}
                onClick={() =>
                  setSearch({ ...search, band: band.id === "all" ? undefined : band.id })
                }
              >
                {band.label}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2" role="group" aria-label="How it can be exchanged">
              {MODES.map((mode) => (
                <Chip
                  key={mode.id}
                  pressed={(search.mode ?? "all") === mode.id}
                  onClick={() =>
                    setSearch({
                      ...search,
                      mode: mode.id === "all" ? undefined : mode.id,
                    })
                  }
                >
                  {mode.label}
                </Chip>
              ))}
            </div>
            <label className="ms-auto flex min-h-11 items-center gap-2 text-sm text-muted">
              Sort
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as "new" | "low" | "high")}
                className="min-h-11 rounded-full border border-line bg-paper px-3 text-ink"
              >
                <option value="new">Newest</option>
                <option value="low">Figure, low to high</option>
                <option value="high">Figure, high to low</option>
              </select>
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-line bg-paper p-8 text-muted">
            Nothing on the floor matches that. Widen the figure, or clear the kind of good.
          </p>
        ) : grouped ? (
          <div className="mt-10 flex flex-col gap-12">
            {CATEGORIES.map((category) => {
              const items = filtered.filter((listing) => listing.category === category);
              if (items.length === 0) return null;
              return (
                <section key={category}>
                  <h2 className="text-3xl">{category}</h2>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>
    </Shell>
  );
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`tap min-h-11 rounded-full px-4 text-sm ${
        pressed ? "bg-ink text-cream" : "border border-line bg-paper text-ink"
      }`}
    >
      {children}
    </button>
  );
}
