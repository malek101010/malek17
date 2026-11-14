import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Scale, o as ArrowLeftRight } from "../_libs/lucide-react.mjs";
import { i as CATEGORIES } from "./router-D6UJOlep.mjs";
import { l as buttonClass, n as Eyebrow, o as Shell, y as useDesk } from "./shell-QKflq9RQ.mjs";
import { t as ListingCard } from "./listing-card-CWT0TJqM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-6VBHBqc7.js
var import_jsx_runtime = require_jsx_runtime();
var FEATURED = [
	"house",
	"coupe",
	"watch"
];
function Home() {
	const open = useDesk((state) => state.listings).filter((listing) => listing.status === "open");
	const featured = FEATURED.map((id) => open.find((listing) => listing.id === id)).filter((listing) => listing !== void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The exchange house" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-4xl leading-tight text-ink sm:text-6xl",
					children: "Bring what you have. Leave with what you both agreed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-lg leading-relaxed text-muted",
					children: "Offer a house, a car, a camera — whatever is actually yours. Someone offers something else. If you both agree, that is the trade. Or place the good with the house and take 7ozombols, a unit with no public price. Only the company turns it back into money."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/market",
						className: buttonClass("clay"),
						children: "Browse the market"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/list",
						className: buttonClass("ghost"),
						children: "Open your stall"
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "overflow-hidden rounded-2xl border border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/catalog/hero.jpg",
					alt: "A flat lay of a camera, headphones, keys, and a small plant on a wooden table",
					className: "aspect-4/3 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "bg-paper px-4 py-3 text-sm text-muted",
					children: "Goods on the table. Money stays at the desk, if it is needed at all."
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-4 pb-16 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl border border-line bg-paper p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, {
						className: "size-6 text-brass",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl",
						children: "Direct exchange"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed text-muted",
						children: "The main floor. You name what you will take — another house, a car, a bicycle, anything both sides will sign. 7ozombols do not have to move. A top-up is allowed only if you both want the examiner’s figures to meet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/market",
						search: { mode: "direct" },
						className: "mt-5 inline-flex min-h-11 items-center text-sm font-medium text-clay",
						children: "Goods open to a swap"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl border border-line bg-ink p-6 text-cream",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, {
						className: "size-6 text-brass",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl text-cream",
						children: "Through the house, in 7ozombols"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed text-cream/80",
						children: "An examiner sees the good in person, or prices it from the market, and writes a figure in 7ozombols. The unit has no street value. When you want money, the company redeems it at the posted desk rate — ten 7ozombols to one dollar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/market",
						search: { mode: "ozombol" },
						className: "mt-5 inline-flex min-h-11 items-center text-sm font-medium text-brass",
						children: "Goods priced in 7ozombols"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "On the floor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-4xl",
					children: "A few open stalls"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/market",
					className: "hidden min-h-11 items-center text-sm font-medium sm:inline-flex",
					children: "Whole market"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: featured.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, { listing }, listing.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "By kind of good" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-4xl",
					children: "The general market"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted",
					children: "Every open good is filed by what it is, and by the examiner’s figure in 7ozombols — whether that figure is a price you can settle, or only a reference for a direct trade."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: CATEGORIES.map((category) => {
						const count = open.filter((listing) => listing.category === category).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/market",
							search: { category },
							className: "inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper px-4 text-sm",
							children: [category, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: count
							})]
						}, category);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 pb-16 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "How a figure is made" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-4xl",
					children: "Examiners, not a public ticker"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-6 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-line bg-paper p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-brass",
								children: "01"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed",
								children: "You place the good with photographs and a description a stranger could trust. Video is welcome, never required."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-line bg-paper p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-brass",
								children: "02"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed",
								children: "A house examiner visits — homes, vehicles, furniture, anything that lies in a room — or prices it from the open market."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-line bg-paper p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-brass",
								children: "03"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed",
								children: "The figure is in 7ozombols. You may still refuse them and wait for a direct trade. If you accept them, the company is the only place they become money."
							})]
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-paper p-6 border border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Witnessed" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl",
						children: "Exchanges the house has already closed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-6 flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "A flat for a workshop van"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: "The van’s figure was short by 9,400 7ozombols. That side added the difference from their balance. Keys moved the same afternoon."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Two workbenches, no unit at all"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: "Neighbors swapped benches. The examiners wrote figures only so both could see the trade was even. Nothing was redeemed."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "A gold chain, then the desk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: "Settled at 6,200 7ozombols. The seller asked the treasury to redeem the balance three days later."
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/wallet",
						className: buttonClass("ink", "mt-8"),
						children: "See the desk rate"
					})
				]
			})]
		})
	] }) });
}
//#endregion
export { Home as component };
