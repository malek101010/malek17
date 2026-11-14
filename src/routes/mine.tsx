import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ListingCard } from "@/components/exchange/listing-card";
import { Shell } from "@/components/exchange/shell";
import { buttonClass, Eyebrow, TextInput } from "@/components/exchange/ui";
import { formatOz, statusLabel } from "@/lib/exchange/format";
import { useDesk } from "@/lib/exchange/store";

export const Route = createFileRoute("/mine")({
  head: () => ({ meta: [{ title: "My stall · 7ozombol" }] }),
  component: MinePage,
});

function MinePage() {
  const name = useDesk((state) => state.name);
  const setName = useDesk((state) => state.setName);
  const balance = useDesk((state) => state.balance);
  const listings = useDesk((state) => state.listings);
  const offers = useDesk((state) => state.offers);
  const [draft, setDraft] = useState(name);

  useEffect(() => {
    setDraft(name);
  }, [name]);

  const yours = listings.filter((listing) => listing.owner === "you");
  const open = yours.filter((listing) => listing.status === "open");
  const closed = yours.filter((listing) => listing.status !== "open");
  const receivedIds = new Set<string>();
  for (const offer of offers) {
    if (offer.status !== "accepted" || offer.kind !== "direct") continue;
    if (offer.direction === "out") receivedIds.add(offer.listingId);
    if (offer.direction === "in" && offer.giveListingId) receivedIds.add(offer.giveListingId);
  }
  const received = listings.filter((listing) => receivedIds.has(listing.id));
  const bought = listings.filter(
    (listing) => listing.owner === "member" && listing.status === "settled",
  );

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Eyebrow>Personal market</Eyebrow>
        <h1 className="mt-2 text-4xl sm:text-5xl">Your stall</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Everything you place here is also on the general market. For each good, say whether you
          want another product, 7ozombols, or either. Photos and a full description are required.
          This stall stays in this browser.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <form
            className="rounded-2xl border border-line bg-paper p-5"
            onSubmit={(event) => {
              event.preventDefault();
              setName(draft);
            }}
          >
            <label className="block text-sm font-medium">
              Name on your goods
              <TextInput
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="mt-2"
                maxLength={40}
              />
            </label>
            <ButtonRow />
          </form>
          <Link
            to="/wallet"
            className="flex flex-col justify-between rounded-2xl border border-line bg-ink p-5 text-cream"
          >
            <p className="text-sm text-cream/80">Balance you can settle or redeem</p>
            <p className="mt-6 font-display text-4xl tabular-nums">{formatOz(balance)}</p>
          </Link>
        </div>

        <div className="mt-10 flex items-end justify-between gap-3">
          <h2 className="text-3xl">Offered now</h2>
          <Link to="/list" className={buttonClass("clay")}>
            List a good
          </Link>
        </div>
        {open.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-line bg-paper p-6 text-muted">
            Your stall is empty. Place a good with photographs and say what you will take for it.
          </p>
        ) : (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {open.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {bought.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-3xl">Settled into your hands</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {bought.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        ) : null}

        {received.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-3xl">Received in a direct exchange</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {received.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        ) : null}

        {closed.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-3xl">Closed on your stall</h2>
            <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-paper">
              {closed.map((listing) => (
                <li key={listing.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <Link to="/listing/$id" params={{ id: listing.id }} className="min-h-11 inline-flex items-center">
                    {listing.title}
                  </Link>
                  <span className="text-sm text-muted">{statusLabel(listing.status)}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </Shell>
  );
}

function ButtonRow() {
  return (
    <button type="submit" className={buttonClass("ink", "mt-4")}>
      Save name
    </button>
  );
}
