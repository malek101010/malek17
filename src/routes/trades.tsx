import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/exchange/shell";
import { Button, Eyebrow } from "@/components/exchange/ui";
import { formatOz, formatWhen } from "@/lib/exchange/format";
import { useDesk } from "@/lib/exchange/store";
import type { Offer } from "@/lib/exchange/types";

export const Route = createFileRoute("/trades")({
  head: () => ({ meta: [{ title: "Trades · 7ozombol" }] }),
  component: TradesPage,
});

function TradesPage() {
  const offers = useDesk((state) => state.offers);
  const listings = useDesk((state) => state.listings);
  const respond = useDesk((state) => state.respond);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const pending = offers.filter((offer) => offer.status === "pending");
  const closed = offers.filter((offer) => offer.status !== "pending");

  function act(offer: Offer, decision: "accepted" | "declined") {
    const result = respond(offer.id, decision);
    setNote(result.ok ? "" : result.reason);
    setConfirmId(null);
  }

  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Eyebrow>Proposals</Eyebrow>
        <h1 className="mt-2 text-4xl sm:text-5xl">Trades</h1>
        <p className="mt-3 text-muted">
          Direct exchanges close only when both sides agree. In this preview you can answer people
          who wrote to you, and record a reply when you have heard back on a proposal you sent.
        </p>
        {note ? <p className="mt-4 text-sm text-clay">{note}</p> : null}

        <h2 className="mt-10 text-3xl">Open</h2>
        {pending.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-line bg-paper p-6 text-muted">
            No open proposals. Offer one of your goods against something on the market.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-4">
            {pending.map((offer) => {
              const listing = listings.find((item) => item.id === offer.listingId);
              return (
                <li key={offer.id} className="rounded-2xl border border-line bg-paper p-5">
                  <p className="text-xs uppercase tracking-widest text-brass">
                    {offer.direction === "in" ? "To you" : "You sent"} · {formatWhen(offer.createdAt)}
                  </p>
                  <h3 className="mt-2 text-2xl">
                    {listing ? (
                      <Link to="/listing/$id" params={{ id: listing.id }}>
                        {listing.title}
                      </Link>
                    ) : (
                      "A good"
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {offer.direction === "in" ? offer.fromName : "You"} offer{" "}
                    {offer.giveTitle ?? "a good"}
                    {offer.kind === "ozombol" && offer.ozombols
                      ? ` for ${formatOz(offer.ozombols)}`
                      : " in a direct exchange"}
                    .
                  </p>
                  <p className="mt-3 leading-relaxed">{offer.message}</p>
                  {confirmId === offer.id ? (
                    <div className="mt-4">
                      <p className="text-sm">
                        Agreeing closes the goods named here. They leave the floor.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button onClick={() => act(offer, "accepted")}>Confirm agreement</Button>
                        <Button variant="ghost" onClick={() => setConfirmId(null)}>
                          Back
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button onClick={() => setConfirmId(offer.id)}>
                        {offer.direction === "in" ? "Agree" : "They agreed"}
                      </Button>
                      <Button variant="ghost" onClick={() => act(offer, "declined")}>
                        {offer.direction === "in" ? "Refuse" : "They refused"}
                      </Button>
                    </div>
                  )}
                  {offer.direction === "out" ? (
                    <p className="mt-3 text-xs text-muted">
                      The other stall is not at this desk. Record what they decided.
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}

        <h2 className="mt-12 text-3xl">Closed</h2>
        {closed.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Nothing closed yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-paper">
            {closed.map((offer) => {
              const listing = listings.find((item) => item.id === offer.listingId);
              return (
                <li key={offer.id} className="px-4 py-4">
                  <p className="text-sm text-muted">
                    {offer.status === "accepted" ? "Agreed" : "Refused"} · {formatWhen(offer.createdAt)}
                  </p>
                  <p className="mt-1">
                    {listing?.title ?? "A good"}
                    {offer.kind === "direct" && offer.giveTitle ? ` · for ${offer.giveTitle}` : ""}
                    {offer.kind === "ozombol" && offer.ozombols ? ` · ${formatOz(offer.ozombols)}` : ""}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </Shell>
  );
}
