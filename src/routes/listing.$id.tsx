import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BuyDialog, SwapDialog } from "@/components/exchange/dialogs";
import { Clip, Photo } from "@/components/exchange/photo";
import { Shell } from "@/components/exchange/shell";
import { Button, Eyebrow, Oz } from "@/components/exchange/ui";
import { deskMoney, figureLabel, formatOz, formatWhen, modeLabel, statusLabel } from "@/lib/exchange/format";
import { useDesk } from "@/lib/exchange/store";

export const Route = createFileRoute("/listing/$id")({
  head: () => ({ meta: [{ title: "Good · 7ozombol" }] }),
  component: ListingPage,
});

function ListingPage() {
  const { id } = Route.useParams();
  const listing = useDesk((state) => state.listings.find((item) => item.id === id));
  const balance = useDesk((state) => state.balance);
  const withdraw = useDesk((state) => state.withdraw);
  const [shot, setShot] = useState(0);
  const [swapOpen, setSwapOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);

  useEffect(() => {
    setShot(0);
    setConfirmWithdraw(false);
  }, [id]);

  if (!listing) {
    return (
      <Shell>
        <main className="mx-auto max-w-3xl px-4 py-20">
          <h1 className="text-4xl">This good has left the floor.</h1>
          <Link to="/market" className="mt-6 inline-flex min-h-11 items-center text-clay">
            Back to the market
          </Link>
        </main>
      </Shell>
    );
  }

  const photo = listing.images[Math.min(shot, listing.images.length - 1)] ?? "";
  const yours = listing.owner === "you";
  const open = listing.status === "open";
  const canSwap = open && !yours && listing.mode !== "ozombol";
  const canBuy = open && !yours && listing.mode !== "direct" && listing.priceKind === "asking";

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link to="/market" className="inline-flex min-h-11 items-center text-sm text-muted">
          Market
        </Link>
        <div className="mt-2 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-line bg-paper">
              <Photo src={photo} alt={listing.title} className="aspect-4/3 w-full object-cover" />
            </div>
            {listing.images.length > 1 ? (
              <div className="mt-3 flex gap-2">
                {listing.images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Photo ${index + 1}`}
                    onClick={() => setShot(index)}
                    className={`overflow-hidden rounded-xl border ${
                      index === shot ? "border-ink" : "border-line"
                    }`}
                  >
                    <Photo src={src} alt="" className="size-20 object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
            {listing.videoKey ? (
              <div className="mt-4">
                <Clip videoKey={listing.videoKey} title={listing.title} />
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-5">
            <Eyebrow>
              {listing.category} · {listing.city}
            </Eyebrow>
            <h1 className="mt-2 text-4xl">{listing.title}</h1>
            <p className="mt-2 text-sm text-muted">
              {listing.sellerName}
              {yours ? " · your stall" : ""} · {listing.condition} · listed{" "}
              {formatWhen(listing.createdAt)}
            </p>
            <div className="mt-6">
              <Oz value={listing.ozombols} className="text-4xl" />
              <p className="mt-1 text-sm text-muted">
                {figureLabel(listing)} · about {deskMoney(listing.ozombols)} if redeemed
              </p>
            </div>
            <p className="mt-4 text-sm font-medium text-brass-deep">{modeLabel(listing.mode)}</p>
            <p className="mt-4 leading-relaxed">{listing.wants}</p>

            {!open ? (
              <p className="mt-6 rounded-2xl border border-line bg-paper px-4 py-3 text-sm">
                {statusLabel(listing.status)}. It is no longer offered.
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-2">
              {canSwap ? (
                <Button onClick={() => setSwapOpen(true)}>Propose a direct exchange</Button>
              ) : null}
              {canBuy ? (
                <Button variant="ink" onClick={() => setBuyOpen(true)}>
                  Settle for {formatOz(listing.ozombols)}
                </Button>
              ) : null}
              {canBuy && balance < listing.ozombols ? (
                <p className="text-sm text-muted">
                  Your balance is {formatOz(balance)} — short of this figure.
                </p>
              ) : null}
              {yours && open ? (
                confirmWithdraw ? (
                  <div className="rounded-2xl border border-line bg-paper p-4">
                    <p className="text-sm">
                      Take this off the floor? Open proposals on it will be refused.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="clay"
                        onClick={() => {
                          withdraw(listing.id);
                          setConfirmWithdraw(false);
                        }}
                      >
                        Withdraw
                      </Button>
                      <Button variant="ghost" onClick={() => setConfirmWithdraw(false)}>
                        Keep it
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="ghost" onClick={() => setConfirmWithdraw(true)}>
                    Withdraw from the floor
                  </Button>
                )
              ) : null}
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl">Description</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink">{listing.description}</p>
          </div>
          {listing.appraisal ? (
            <blockquote className="border-s-2 border-brass ps-4 lg:col-span-5">
              <Eyebrow>
                {listing.appraisal.examined === "in-person" ? "Seen in person" : "From the market"}
              </Eyebrow>
              <p className="mt-3 leading-relaxed">{listing.appraisal.note}</p>
              <footer className="mt-3 text-sm text-muted">
                {listing.appraisal.by} · {formatWhen(listing.appraisal.at)}
              </footer>
            </blockquote>
          ) : null}
        </section>
      </main>
      {canSwap ? (
        <SwapDialog listing={listing} open={swapOpen} onOpenChange={setSwapOpen} />
      ) : null}
      {canBuy ? <BuyDialog listing={listing} open={buyOpen} onOpenChange={setBuyOpen} /> : null}
    </Shell>
  );
}
