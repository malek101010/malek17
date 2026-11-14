import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as statusLabel, c as TextInput, l as buttonClass, n as Eyebrow, o as Shell, p as formatOz, y as useDesk } from "./shell-QKflq9RQ.mjs";
import { t as ListingCard } from "./listing-card-CWT0TJqM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mine-CJ6xAfe1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MinePage() {
	const name = useDesk((state) => state.name);
	const setName = useDesk((state) => state.setName);
	const balance = useDesk((state) => state.balance);
	const listings = useDesk((state) => state.listings);
	const offers = useDesk((state) => state.offers);
	const [draft, setDraft] = (0, import_react.useState)(name);
	(0, import_react.useEffect)(() => {
		setDraft(name);
	}, [name]);
	const yours = listings.filter((listing) => listing.owner === "you");
	const open = yours.filter((listing) => listing.status === "open");
	const closed = yours.filter((listing) => listing.status !== "open");
	const receivedIds = /* @__PURE__ */ new Set();
	for (const offer of offers) {
		if (offer.status !== "accepted" || offer.kind !== "direct") continue;
		if (offer.direction === "out") receivedIds.add(offer.listingId);
		if (offer.direction === "in" && offer.giveListingId) receivedIds.add(offer.giveListingId);
	}
	const received = listings.filter((listing) => receivedIds.has(listing.id));
	const bought = listings.filter((listing) => listing.owner === "member" && listing.status === "settled");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Personal market" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl sm:text-5xl",
				children: "Your stall"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "Everything you place here is also on the general market. For each good, say whether you want another product, 7ozombols, or either. Photos and a full description are required. This stall stays in this browser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rounded-2xl border border-line bg-paper p-5",
					onSubmit: (event) => {
						event.preventDefault();
						setName(draft);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Name on your goods", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: draft,
							onChange: (event) => setDraft(event.target.value),
							className: "mt-2",
							maxLength: 40
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonRow, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/wallet",
					className: "flex flex-col justify-between rounded-2xl border border-line bg-ink p-5 text-cream",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-cream/80",
						children: "Balance you can settle or redeem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-4xl tabular-nums",
						children: formatOz(balance)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "Offered now"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/list",
					className: buttonClass("clay"),
					children: "List a good"
				})]
			}),
			open.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-2xl border border-line bg-paper p-6 text-muted",
				children: "Your stall is empty. Place a good with photographs and say what you will take for it."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: open.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.id))
			}),
			bought.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "Settled into your hands"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: bought.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.id))
				})]
			}) : null,
			received.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "Received in a direct exchange"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: received.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.id))
				})]
			}) : null,
			closed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "Closed on your stall"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line rounded-2xl border border-line bg-paper",
					children: closed.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/listing/$id",
							params: { id: listing.id },
							className: "min-h-11 inline-flex items-center",
							children: listing.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: statusLabel(listing.status)
						})]
					}, listing.id))
				})]
			}) : null
		]
	}) });
}
function ButtonRow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "submit",
		className: buttonClass("ink", "mt-4"),
		children: "Save name"
	});
}
//#endregion
export { MinePage as component };
