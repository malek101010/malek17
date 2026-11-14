import * as Dialog from "@radix-ui/react-dialog";
import { useMemo, useState } from "react";
import { formatOz } from "@/lib/exchange/format";
import { useDesk } from "@/lib/exchange/store";
import type { Listing } from "@/lib/exchange/types";
import { Button, TextArea } from "./ui";

export function SwapDialog({
  listing,
  open,
  onOpenChange,
}: {
  listing: Listing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const name = useDesk((state) => state.name);
  const listings = useDesk((state) => state.listings);
  const yours = useMemo(
    () => listings.filter((item) => item.owner === "you" && item.status === "open"),
    [listings],
  );
  const propose = useDesk((state) => state.proposeDirect);
  const [giveId, setGiveId] = useState("");
  const [describe, setDescribe] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function close(next: boolean) {
    if (!next) {
      setError("");
    }
    onOpenChange(next);
  }

  function submit() {
    const chosen = yours.find((item) => item.id === giveId);
    const described = describe.trim();
    if (!chosen && described.length < 8) {
      setError("Choose a good from your stall, or describe what you are offering.");
      return;
    }
    if (message.trim().length < 8) {
      setError("Write a short note so the other person knows the terms.");
      return;
    }
    const result = propose({
      listingId: listing.id,
      message: message.trim(),
      giveListingId: chosen?.id,
      giveTitle: chosen?.title ?? described,
    });
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    setGiveId("");
    setDescribe("");
    setMessage("");
    setError("");
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50" />
        <Dialog.Content className="dialog-panel fixed inset-x-4 top-8 z-50 mx-auto flex w-auto max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-line bg-paper p-6">
          <Dialog.Title className="text-3xl text-ink">Propose a direct exchange</Dialog.Title>
          <Dialog.Description className="text-sm leading-relaxed text-muted">
            You are offering something for {listing.sellerName}’s {listing.title}. No 7ozombols
            move unless you both add them later. Signed in this preview as {name}.
          </Dialog.Description>
          {yours.length > 0 ? (
            <fieldset>
              <legend className="text-sm font-medium">From your stall</legend>
              <div className="mt-2 flex flex-col gap-2">
                <label className="flex min-h-11 items-center gap-3 rounded-xl border border-line px-3">
                  <input
                    type="radio"
                    name="give"
                    checked={giveId === ""}
                    onChange={() => setGiveId("")}
                  />
                  <span className="text-sm">Something I have not listed</span>
                </label>
                {yours.map((item) => (
                  <label
                    key={item.id}
                    className="flex min-h-11 items-center gap-3 rounded-xl border border-line px-3"
                  >
                    <input
                      type="radio"
                      name="give"
                      checked={giveId === item.id}
                      onChange={() => setGiveId(item.id)}
                    />
                    <span className="text-sm">{item.title}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}
          {giveId === "" ? (
            <label className="block text-sm font-medium">
              What you offer
              <TextArea
                value={describe}
                onChange={(event) => setDescribe(event.target.value)}
                placeholder="A house in the next town, a car, a set of tools…"
                className="mt-2"
              />
            </label>
          ) : null}
          <label className="block text-sm font-medium">
            Note to {listing.sellerName}
            <TextArea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Say what is included, and whether you can travel."
              className="mt-2"
            />
          </label>
          {error ? <p className="text-sm text-clay">{error}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button onClick={submit}>Send the proposal</Button>
            <Dialog.Close asChild>
              <Button variant="ghost">Cancel</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function BuyDialog({
  listing,
  open,
  onOpenChange,
}: {
  listing: Listing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const balance = useDesk((state) => state.balance);
  const buy = useDesk((state) => state.buyWithOz);
  const [error, setError] = useState("");
  const short = balance < listing.ozombols;

  function confirm() {
    const result = buy(listing.id);
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    setError("");
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50" />
        <Dialog.Content className="dialog-panel fixed inset-x-4 top-8 z-50 mx-auto flex max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-line bg-paper p-6">
          <Dialog.Title className="text-3xl">Settle in 7ozombols</Dialog.Title>
          <Dialog.Description className="text-sm leading-relaxed text-muted">
            This moves {formatOz(listing.ozombols)} from your balance for {listing.title}. Your
            balance is {formatOz(balance)}. 7ozombols are not cash — only the company redeems them.
          </Dialog.Description>
          {short ? (
            <p className="text-sm text-clay">
              You are short by {formatOz(listing.ozombols - balance)}.
            </p>
          ) : null}
          {error ? <p className="text-sm text-clay">{error}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button onClick={confirm} disabled={short}>
              Confirm settlement
            </Button>
            <Dialog.Close asChild>
              <Button variant="ghost">Back</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
