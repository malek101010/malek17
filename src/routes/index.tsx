import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftRight, Scale } from "lucide-react";
import { ListingCard } from "@/components/exchange/listing-card";
import { Shell } from "@/components/exchange/shell";
import { buttonClass, Eyebrow } from "@/components/exchange/ui";
import { CATEGORIES } from "@/lib/app-data/types";
import { useDesk } from "@/lib/exchange/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "7ozombol — the exchange house" }],
  }),
  component: Home,
});

const FEATURED = ["house", "coupe", "watch"];

function Home() {
  const listings = useDesk((state) => state.listings);
  const open = listings.filter((listing) => listing.status === "open");
  const featured = FEATURED.map((id) => open.find((listing) => listing.id === id)).filter(
    (listing) => listing !== undefined,
  );

  return (
    <Shell>
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
          <div>
            <Eyebrow>The exchange house</Eyebrow>
            <h1 className="mt-3 text-4xl leading-tight text-ink sm:text-6xl">
              Bring what you have. Leave with what you both agreed OO.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Offer a house, a car, a camera — whatever is actually yours. Someone offers
              something else. If you both agree, that is the trade. Or place the good with the
              house and take 7ozombols, a unit with no public price. Only the company turns it
              back into money.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/market" className={buttonClass("clay")}>
                Browse the market
              </Link>
              <Link to="/list" className={buttonClass("ghost")}>
                Open your stall
              </Link>
            </div>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line">
            <img
              src="/catalog/hero.jpg"
              alt="A flat lay of a camera, headphones, keys, and a small plant on a wooden table"
              className="aspect-4/3 w-full object-cover"
            />
            <figcaption className="bg-paper px-4 py-3 text-sm text-muted">
              Goods on the table. Money stays at the desk, if it is needed at all.
            </figcaption>
          </figure>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 md:grid-cols-2">
          <article className="rounded-2xl border border-line bg-paper p-6">
            <ArrowLeftRight className="size-6 text-brass" aria-hidden />
            <h2 className="mt-4 text-3xl">Direct exchange</h2>
            <p className="mt-3 leading-relaxed text-muted">
              The main floor. You name what you will take — another house, a car, a bicycle,
              anything both sides will sign. 7ozombols do not have to move. A top-up is allowed
              only if you both want the examiner’s figures to meet.
            </p>
            <Link
              to="/market"
              search={{ mode: "direct" }}
              className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-clay"
            >
              Goods open to a swap
            </Link>
          </article>
          <article className="rounded-2xl border border-line bg-ink p-6 text-cream">
            <Scale className="size-6 text-brass" aria-hidden />
            <h2 className="mt-4 text-3xl text-cream">Through the house, in 7ozombols</h2>
            <p className="mt-3 leading-relaxed text-cream/80">
              An examiner sees the good in person, or prices it from the market, and writes a
              figure in 7ozombols. The unit has no street value. When you want money, the company
              redeems it at the posted desk rate — ten 7ozombols to one dollar.
            </p>
            <Link
              to="/market"
              search={{ mode: "ozombol" }}
              className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-brass"
            >
              Goods priced in 7ozombols
            </Link>
          </article>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>On the floor</Eyebrow>
              <h2 className="mt-2 text-4xl">A few open stalls</h2>
            </div>
            <Link to="/market" className="hidden min-h-11 items-center text-sm font-medium sm:inline-flex">
              Whole market
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <Eyebrow>By kind of good</Eyebrow>
          <h2 className="mt-2 text-4xl">The general market</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Every open good is filed by what it is, and by the examiner’s figure in 7ozombols —
            whether that figure is a price you can settle, or only a reference for a direct trade.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const count = open.filter((listing) => listing.category === category).length;
              return (
                <Link
                  key={category}
                  to="/market"
                  search={{ category }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper px-4 text-sm"
                >
                  {category}
                  <span className="tabular-nums text-muted">{count}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 lg:grid-cols-2">
          <div>
            <Eyebrow>How a figure is made</Eyebrow>
            <h2 className="mt-2 text-4xl">Examiners, not a public ticker</h2>
            <ol className="mt-6 flex flex-col gap-4">
              <li className="rounded-2xl border border-line bg-paper p-4">
                <p className="text-sm text-brass">01</p>
                <p className="mt-1 leading-relaxed">
                  You place the good with photographs and a description a stranger could trust.
                  Video is welcome, never required.
                </p>
              </li>
              <li className="rounded-2xl border border-line bg-paper p-4">
                <p className="text-sm text-brass">02</p>
                <p className="mt-1 leading-relaxed">
                  A house examiner visits — homes, vehicles, furniture, anything that lies in a
                  room — or prices it from the open market.
                </p>
              </li>
              <li className="rounded-2xl border border-line bg-paper p-4">
                <p className="text-sm text-brass">03</p>
                <p className="mt-1 leading-relaxed">
                  The figure is in 7ozombols. You may still refuse them and wait for a direct
                  trade. If you accept them, the company is the only place they become money.
                </p>
              </li>
            </ol>
          </div>
          <div className="rounded-2xl bg-paper p-6 border border-line">
            <Eyebrow>Witnessed</Eyebrow>
            <h2 className="mt-2 text-3xl">Exchanges the house has already closed</h2>
            <ul className="mt-6 flex flex-col gap-5">
              <li>
                <p className="font-medium">A flat for a workshop van</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  The van’s figure was short by 9,400 7ozombols. That side added the difference
                  from their balance. Keys moved the same afternoon.
                </p>
              </li>
              <li>
                <p className="font-medium">Two workbenches, no unit at all</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Neighbors swapped benches. The examiners wrote figures only so both could see
                  the trade was even. Nothing was redeemed.
                </p>
              </li>
              <li>
                <p className="font-medium">A gold chain, then the desk</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Settled at 6,200 7ozombols. The seller asked the treasury to redeem the balance
                  three days later.
                </p>
              </li>
            </ul>
            <Link to="/wallet" className={buttonClass("ink", "mt-8")}>
              See the desk rate
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
