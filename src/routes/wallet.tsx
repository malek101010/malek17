import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/exchange/shell";
import { Button, Eyebrow, Field, TextArea, TextInput } from "@/components/exchange/ui";
import { deskMoney, formatOz, formatWhen } from "@/lib/exchange/format";
import { useDesk } from "@/lib/exchange/store";
import { OZ_PER_DOLLAR } from "@/lib/exchange/types";

export const Route = createFileRoute("/wallet")({
  head: () => ({ meta: [{ title: "7ozombols · desk" }] }),
  component: WalletPage,
});

function WalletPage() {
  const balance = useDesk((state) => state.balance);
  const ledger = useDesk((state) => state.ledger);
  const payouts = useDesk((state) => state.payouts);
  const requestPayout = useDesk((state) => state.requestPayout);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function submit() {
    const result = requestPayout(Number(amount), note);
    if (!result.ok) {
      setDone("");
      setError(result.reason);
      return;
    }
    setError("");
    setDone("The treasury has the request. In this preview nothing is sent to a bank.");
    setAmount("");
    setNote("");
  }

  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Eyebrow>The company desk</Eyebrow>
        <h1 className="mt-2 text-4xl sm:text-5xl">7ozombols</h1>
        <p className="mt-3 leading-relaxed text-muted">
          A 7ozombol is not cash and it does not trade anywhere else. Examiners set what a good is
          worth in this unit — in person, or from the market. The company is the only place that
          redeems a balance for money.
        </p>

        <section className="mt-8 rounded-2xl bg-ink p-6 text-cream">
          <p className="text-sm text-cream/75">Your balance</p>
          <p className="mt-3 font-display text-5xl tabular-nums">{formatOz(balance)}</p>
          <p className="mt-3 text-sm text-cream/75">
            Desk value about {deskMoney(balance)}. Rate: {OZ_PER_DOLLAR} 7ozombols = $1, paid only
            by this house.
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-line bg-paper p-4">
            <p className="text-sm text-brass">In person</p>
            <p className="mt-2 text-sm leading-relaxed">
              Homes, vehicles, furniture, watches, art. An examiner looks at the thing.
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-paper p-4">
            <p className="text-sm text-brass">From the market</p>
            <p className="mt-2 text-sm leading-relaxed">
              Cameras, clothes, kitchen machines. Priced against what the same good sells for.
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-paper p-4">
            <p className="text-sm text-brass">Redemption</p>
            <p className="mt-2 text-sm leading-relaxed">
              You ask the treasury. The unit has no value until the company settles it.
            </p>
          </article>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl">Redeem for money</h2>
          <p className="mt-2 text-sm text-muted">
            Record a redemption. This preview does not move real money.
          </p>
          <form
            className="mt-4 flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <Field label="Amount in 7ozombols" hint="Minimum 100." error={error}>
              <TextInput
                inputMode="numeric"
                value={amount}
                onChange={(event) => setAmount(event.target.value.replace(/[^\d]/g, ""))}
              />
            </Field>
            <Field label="Where the company should send it" hint="A bank line, or a note to the desk.">
              <TextArea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="min-h-24"
              />
            </Field>
            <Button type="submit">Request redemption</Button>
            {done ? <p className="text-sm text-muted">{done}</p> : null}
          </form>
        </section>

        {payouts.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-3xl">With the treasury</h2>
            <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-paper">
              {payouts.map((payout) => (
                <li key={payout.id} className="px-4 py-4">
                  <p className="tabular-nums">{formatOz(payout.amount)}</p>
                  <p className="text-sm text-muted">
                    {payout.note} · {formatWhen(payout.at)} · {payout.status}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="text-3xl">Ledger</h2>
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-paper">
            {ledger.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p>{entry.label}</p>
                  <p className="text-xs text-muted">{formatWhen(entry.at)}</p>
                </div>
                <p className={`tabular-nums ${entry.amount < 0 ? "text-clay" : "text-ink"}`}>
                  {entry.amount > 0 ? "+" : ""}
                  {formatOz(entry.amount)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Shell>
  );
}
