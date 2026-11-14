import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Video } from "../_libs/lucide-react.mjs";
import { f as figureLabel, h as modeLabel, i as Oz } from "./shell-QKflq9RQ.mjs";
import { n as Photo } from "./photo-BHU_K5ZP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing-card-CWT0TJqM.js
var import_jsx_runtime = require_jsx_runtime();
function ListingCard({ listing }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/listing/$id",
		params: { id: listing.id },
		className: "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-4/3 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {
					src: listing.images[0] ?? "",
					alt: listing.title,
					className: "card-photo h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute start-3 top-3 rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink",
					children: listing.category
				}),
				listing.videoKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink px-2 py-1 text-xs text-cream",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
						className: "size-3",
						"aria-hidden": true
					}), "Video"]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-2xl leading-tight text-ink",
					children: listing.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						listing.city,
						" · ",
						listing.sellerName
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-sm leading-relaxed text-ink",
					children: listing.wants || listing.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-end justify-between gap-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Oz, {
						value: listing.ozombols,
						className: "text-xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: figureLabel(listing)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-end text-xs font-medium text-brass-deep",
						children: modeLabel(listing.mode)
					})]
				})
			]
		})]
	});
}
//#endregion
export { ListingCard as t };
