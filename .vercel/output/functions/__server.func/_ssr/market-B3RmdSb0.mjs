import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as CATEGORIES, o as BANDS, r as Route$4 } from "./router-D6UJOlep.mjs";
import { c as TextInput, n as Eyebrow, o as Shell, y as useDesk } from "./shell-QKflq9RQ.mjs";
import { t as ListingCard } from "./listing-card-CWT0TJqM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-B3RmdSb0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MODES = [
	{
		id: "all",
		label: "Any terms"
	},
	{
		id: "direct",
		label: "Direct exchange"
	},
	{
		id: "ozombol",
		label: "7ozombols"
	},
	{
		id: "either",
		label: "Either way only"
	}
];
function inBand(value, band) {
	if (!band || band === "all") return true;
	if (band === "under-2") return value < 2e3;
	if (band === "2-10") return value >= 2e3 && value < 1e4;
	if (band === "10-60") return value >= 1e4 && value < 6e4;
	if (band === "over-60") return value >= 6e4;
	return true;
}
function matchesMode(listing, mode) {
	if (!mode || mode === "all") return true;
	if (mode === "either") return listing.mode === "either";
	if (mode === "direct") return listing.mode === "direct" || listing.mode === "either";
	return listing.mode === "ozombol" || listing.mode === "either";
}
function MarketPage() {
	const search = Route$4.useSearch();
	const navigate = useNavigate({ from: "/market" });
	const listings = useDesk((state) => state.listings);
	const [query, setQuery] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("new");
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const next = listings.filter((listing) => {
			if (listing.status !== "open") return false;
			if (search.category && listing.category !== search.category) return false;
			if (!matchesMode(listing, search.mode)) return false;
			if (!inBand(listing.ozombols, search.band)) return false;
			if (!q) return true;
			return `${listing.title} ${listing.city} ${listing.sellerName} ${listing.wants} ${listing.description}`.toLowerCase().includes(q);
		});
		next.sort((a, b) => {
			if (sort === "low") return a.ozombols - b.ozombols;
			if (sort === "high") return b.ozombols - a.ozombols;
			return b.createdAt.localeCompare(a.createdAt);
		});
		return next;
	}, [
		listings,
		query,
		search.band,
		search.category,
		search.mode,
		sort
	]);
	function setSearch(patch) {
		navigate({ search: {
			category: patch.category,
			mode: patch.mode,
			band: patch.band
		} });
	}
	const grouped = !search.category && !search.mode && !search.band && query.trim() === "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "General market" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl sm:text-5xl",
					children: "Goods on the floor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted tabular-nums",
					children: [filtered.length, " open"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "Filed by kind of good, and by the figure in 7ozombols. A reference figure is not a price — that stall wants another thing."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search a good, a city, a person",
						"aria-label": "Search the market"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						role: "group",
						"aria-label": "Kind of good",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							pressed: !search.category,
							onClick: () => setSearch({
								...search,
								category: void 0
							}),
							children: "All kinds"
						}), CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							pressed: search.category === category,
							onClick: () => setSearch({
								...search,
								category
							}),
							children: category
						}, category))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						role: "group",
						"aria-label": "Figure in 7ozombols",
						children: BANDS.map((band) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							pressed: (search.band ?? "all") === band.id,
							onClick: () => setSearch({
								...search,
								band: band.id === "all" ? void 0 : band.id
							}),
							children: band.label
						}, band.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							role: "group",
							"aria-label": "How it can be exchanged",
							children: MODES.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								pressed: (search.mode ?? "all") === mode.id,
								onClick: () => setSearch({
									...search,
									mode: mode.id === "all" ? void 0 : mode.id
								}),
								children: mode.label
							}, mode.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ms-auto flex min-h-11 items-center gap-2 text-sm text-muted",
							children: ["Sort", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sort,
								onChange: (event) => setSort(event.target.value),
								className: "min-h-11 rounded-full border border-line bg-paper px-3 text-ink",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "new",
										children: "Newest"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "low",
										children: "Figure, low to high"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "high",
										children: "Figure, high to low"
									})
								]
							})]
						})]
					})
				]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-12 rounded-2xl border border-line bg-paper p-8 text-muted",
				children: "Nothing on the floor matches that. Widen the figure, or clear the kind of good."
			}) : grouped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 flex flex-col gap-12",
				children: CATEGORIES.map((category) => {
					const items = filtered.filter((listing) => listing.category === category);
					if (items.length === 0) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: items.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.id))
					})] }, category);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.id))
			})
		]
	}) });
}
function Chip({ pressed, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: `tap min-h-11 rounded-full px-4 text-sm ${pressed ? "bg-ink text-cream" : "border border-line bg-paper text-ink"}`,
		children
	});
}
//#endregion
export { MarketPage as component };
