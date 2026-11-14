import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { formatOz } from "@/lib/exchange/format";
import { useDesk } from "@/lib/exchange/store";
import { buttonClass } from "./ui";

const LINKS = [
  { to: "/market", label: "Market" },
  { to: "/mine", label: "My stall" },
  { to: "/trades", label: "Trades" },
  { to: "/wallet", label: "7ozombols" },
] as const;

function useHydrateDesk() {
  useEffect(() => {
    void useDesk.persist.rehydrate();
  }, []);
}

function isActive(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Shell({ children }: { children: ReactNode }) {
  useHydrateDesk();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const balance = useDesk((state) => state.balance);
  const pending = useDesk(
    (state) => state.offers.filter((offer) => offer.status === "pending").length,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="font-display text-2xl leading-none text-ink">
            <span className="text-brass">7</span>ozombol
          </Link>
          <nav className="ms-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm ${
                  isActive(pathname, link.to) ? "bg-paper text-ink" : "text-muted"
                }`}
              >
                {link.label}
                {link.to === "/trades" && pending > 0 ? (
                  <span className="ms-2 inline-flex min-w-5 items-center justify-center rounded-full bg-clay px-1.5 text-xs text-cream tabular-nums">
                    {pending}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <Link
              to="/wallet"
              className="hidden min-h-11 items-center rounded-full border border-line px-3 text-sm tabular-nums text-ink sm:inline-flex"
            >
              {formatOz(balance)}
            </Link>
            <Link to="/list" className={buttonClass("clay", "hidden sm:inline-flex")}>
              List a good
            </Link>
            <button
              type="button"
              className="tap inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-line px-4 py-3 lg:hidden" aria-label="Mobile">
            <div className="mx-auto flex max-w-6xl flex-col">
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex min-h-11 items-center justify-between text-base"
                >
                  {link.label}
                  {link.to === "/trades" && pending > 0 ? (
                    <span className="text-sm text-clay">{pending} open</span>
                  ) : null}
                </Link>
              ))}
              <Link to="/wallet" className="flex min-h-11 items-center text-base sm:hidden">
                Balance {formatOz(balance)}
              </Link>
              <Link to="/list" className={buttonClass("clay", "mt-2")}>
                List a good
              </Link>
            </div>
          </nav>
        ) : null}
      </header>
      {children}
      <footer className="mt-16 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl">
              <span className="text-brass">7</span>ozombol
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              A house for direct exchange, and for a private unit that only the company
              turns back into money.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link to="/market" className="min-h-11 inline-flex items-center">
              Market
            </Link>
            <Link to="/mine" className="min-h-11 inline-flex items-center">
              My stall
            </Link>
            <Link to="/wallet" className="min-h-11 inline-flex items-center">
              Desk
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
