import { i as __toESM } from "../_runtime.mjs";
import { n as getMedia } from "./media-SCrbXT2-.mjs";
import { d as cn } from "./shell-B_Z_U4m9.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/photo-hLfkum1j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Photo({ src, alt, className }) {
	const [url, setUrl] = (0, import_react.useState)(src.startsWith("idb:") ? null : src);
	(0, import_react.useEffect)(() => {
		if (!src.startsWith("idb:")) {
			setUrl(src);
			return;
		}
		let dead = false;
		let revoke = "";
		getMedia(src.slice(4)).then((blob) => {
			if (dead || !blob) return;
			revoke = URL.createObjectURL(blob);
			setUrl(revoke);
		}).catch(() => {
			if (!dead) setUrl(null);
		});
		return () => {
			dead = true;
			if (revoke) URL.revokeObjectURL(revoke);
		};
	}, [src]);
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("bg-line", className),
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt,
		className
	});
}
function Clip({ videoKey, title }) {
	const [url, setUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let dead = false;
		let revoke = "";
		getMedia(videoKey).then((blob) => {
			if (dead || !blob) return;
			revoke = URL.createObjectURL(blob);
			setUrl(revoke);
		}).catch(() => {
			if (!dead) setUrl(null);
		});
		return () => {
			dead = true;
			if (revoke) URL.revokeObjectURL(revoke);
		};
	}, [videoKey]);
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted",
		children: [
			"A video was attached to ",
			title,
			". It is stored with this stall on this device."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		controls: true,
		playsInline: true,
		preload: "metadata",
		src: url,
		className: "aspect-video w-full rounded-2xl bg-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("track", { kind: "captions" })
	});
}
export { Photo as n, Clip as t };
