import { i as __toESM } from "../_runtime.mjs";
import { b as useDesk, c as TextArea, f as deskMoney, h as formatWhen, i as Field, l as TextInput, m as formatOz, r as Eyebrow, s as Shell, t as Button } from "./shell-B_Z_U4m9.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/wallet-rBFopLxX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WalletPage() {
	const balance = useDesk((state) => state.balance);
	const ledger = useDesk((state) => state.ledger);
	const payouts = useDesk((state) => state.payouts);
	const requestPayout = useDesk((state) => state.requestPayout);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)("");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The company desk" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl sm:text-5xl",
				children: "7ozombols"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 leading-relaxed text-muted",
				children: "A 7ozombol is not cash and it does not trade anywhere else. Examiners set what a good is worth in this unit — in person, or from the market. The company is the only place that redeems a balance for money."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-2xl bg-ink p-6 text-cream",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-cream/75",
						children: "Your balance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-5xl tabular-nums",
						children: formatOz(balance)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-cream/75",
						children: [
							"Desk value about ",
							deskMoney(balance),
							". Rate: ",
							10,
							" 7ozombols = $1, paid only by this house."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-paper p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-brass",
							children: "In person"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: "Homes, vehicles, furniture, watches, art. An examiner looks at the thing."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-paper p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-brass",
							children: "From the market"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: "Cameras, clothes, kitchen machines. Priced against what the same good sells for."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-paper p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-brass",
							children: "Redemption"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: "You ask the treasury. The unit has no value until the company settles it."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "Redeem for money"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Record a redemption. This preview does not move real money."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-4",
						onSubmit: (event) => {
							event.preventDefault();
							submit();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Amount in 7ozombols",
								hint: "Minimum 100.",
								error,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									inputMode: "numeric",
									value: amount,
									onChange: (event) => setAmount(event.target.value.replace(/[^\d]/g, ""))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Where the company should send it",
								hint: "A bank line, or a note to the desk.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
									value: note,
									onChange: (event) => setNote(event.target.value),
									className: "min-h-24"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: "Request redemption"
							}),
							done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: done
							}) : null
						]
					})
				]
			}),
			payouts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "With the treasury"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line rounded-2xl border border-line bg-paper",
					children: payouts.map((payout) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tabular-nums",
							children: formatOz(payout.amount)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								payout.note,
								" · ",
								formatWhen(payout.at),
								" · ",
								payout.status
							]
						})]
					}, payout.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "Ledger"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line rounded-2xl border border-line bg-paper",
					children: ledger.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: entry.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: formatWhen(entry.at)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `tabular-nums ${entry.amount < 0 ? "text-clay" : "text-ink"}`,
							children: [entry.amount > 0 ? "+" : "", formatOz(entry.amount)]
						})]
					}, entry.id))
				})]
			})
		]
	}) });
}
export { WalletPage as component };
