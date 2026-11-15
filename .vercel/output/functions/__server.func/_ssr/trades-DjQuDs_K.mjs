import { i as __toESM } from "../_runtime.mjs";
import { b as useDesk, h as formatWhen, m as formatOz, r as Eyebrow, s as Shell, t as Button } from "./shell-B_Z_U4m9.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/trades-DjQuDs_K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TradesPage() {
	const offers = useDesk((state) => state.offers);
	const listings = useDesk((state) => state.listings);
	const respond = useDesk((state) => state.respond);
	const [confirmId, setConfirmId] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)("");
	const pending = offers.filter((offer) => offer.status === "pending");
	const closed = offers.filter((offer) => offer.status !== "pending");
	function act(offer, decision) {
		const result = respond(offer.id, decision);
		setNote(result.ok ? "" : result.reason);
		setConfirmId(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Proposals" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl sm:text-5xl",
				children: "Trades"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Direct exchanges close only when both sides agree. In this preview you can answer people who wrote to you, and record a reply when you have heard back on a proposal you sent."
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-clay",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 text-3xl",
				children: "Open"
			}),
			pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-2xl border border-line bg-paper p-6 text-muted",
				children: "No open proposals. Offer one of your goods against something on the market."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex flex-col gap-4",
				children: pending.map((offer) => {
					const listing = listings.find((item) => item.id === offer.listingId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line bg-paper p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs uppercase tracking-widest text-brass",
								children: [
									offer.direction === "in" ? "To you" : "You sent",
									" · ",
									formatWhen(offer.createdAt)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-2xl",
								children: listing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/listing/$id",
									params: { id: listing.id },
									children: listing.title
								}) : "A good"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									offer.direction === "in" ? offer.fromName : "You",
									" offer",
									" ",
									offer.giveTitle ?? "a good",
									offer.kind === "ozombol" && offer.ozombols ? ` for ${formatOz(offer.ozombols)}` : " in a direct exchange",
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed",
								children: offer.message
							}),
							confirmId === offer.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: "Agreeing closes the goods named here. They leave the floor."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => act(offer, "accepted"),
										children: "Confirm agreement"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: () => setConfirmId(null),
										children: "Back"
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => setConfirmId(offer.id),
									children: offer.direction === "in" ? "Agree" : "They agreed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => act(offer, "declined"),
									children: offer.direction === "in" ? "Refuse" : "They refused"
								})]
							}),
							offer.direction === "out" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-muted",
								children: "The other stall is not at this desk. Record what they decided."
							}) : null
						]
					}, offer.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 text-3xl",
				children: "Closed"
			}),
			closed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Nothing closed yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line rounded-2xl border border-line bg-paper",
				children: closed.map((offer) => {
					const listing = listings.find((item) => item.id === offer.listingId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								offer.status === "accepted" ? "Agreed" : "Refused",
								" · ",
								formatWhen(offer.createdAt)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1",
							children: [
								listing?.title ?? "A good",
								offer.kind === "direct" && offer.giveTitle ? ` · for ${offer.giveTitle}` : "",
								offer.kind === "ozombol" && offer.ozombols ? ` · ${formatOz(offer.ozombols)}` : ""
							]
						})]
					}, offer.id);
				})
			})
		]
	}) });
}
export { TradesPage as component };
