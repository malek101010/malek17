import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "clay" | "ink" | "ghost" | "brass";

const variants: Record<Variant, string> = {
  clay: "bg-clay text-cream hover:bg-clay-deep",
  ink: "bg-ink text-cream hover:bg-ink/90",
  ghost: "border border-line bg-transparent text-ink hover:bg-paper",
  brass: "bg-brass text-cream hover:bg-brass-deep",
};

export function buttonClass(variant: Variant = "clay", extra?: string) {
  return cn(
    "tap inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    extra,
  );
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function Button({ variant = "clay", className, type = "button", ...props }, ref) {
  return <button ref={ref} type={type} className={buttonClass(variant, className)} {...props} />;
});

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {hint ? <span className="mt-1 block text-sm text-muted">{hint}</span> : null}
      <div className="mt-2">{children}</div>
      {error ? <span className="mt-2 block text-sm text-clay">{error}</span> : null}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-base text-ink",
        props.className,
      )}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-36 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base leading-relaxed text-ink",
        props.className,
      )}
    />
  );
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-base text-ink",
        props.className,
      )}
    />
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-brass">{children}</p>
  );
}

export function Oz({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span className={cn("font-display tabular-nums text-ink", className)}>
      {new Intl.NumberFormat("en-US").format(value)}
      <span className="ms-1 font-sans text-xs font-medium tracking-widest">7oz</span>
    </span>
  );
}
