import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as CONDITIONS, i as CATEGORIES } from "./router-D6UJOlep.mjs";
import { a as SelectInput, c as TextInput, g as priceKindFor, n as Eyebrow, o as Shell, p as formatOz, r as Field, s as TextArea, t as Button, v as uid, y as useDesk } from "./shell-QKflq9RQ.mjs";
import { r as putMedia, t as compressImage } from "./media-DPSB67f5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/list-Cb_aDBFX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BANDS = {
	Homes: [7e4, 32e4],
	Vehicles: [8e3, 9e4],
	Furniture: [400, 8e3],
	Watches: [500, 2e4],
	Cameras: [200, 6e3],
	Music: [150, 5e3],
	Kitchen: [200, 8e3],
	Art: [300, 25e3],
	Fashion: [80, 4e3],
	Outdoors: [150, 7e3]
};
var CONDITION_FACTOR = {
	New: 1.12,
	Excellent: 1,
	Good: .86,
	Fair: .7,
	Project: .48
};
var IN_PERSON = /* @__PURE__ */ new Set([
	"Homes",
	"Vehicles",
	"Furniture",
	"Watches",
	"Art",
	"Outdoors"
]);
function hash(input) {
	let h = 2166136261;
	for (let i = 0; i < input.length; i++) {
		h ^= input.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function appraise(input) {
	const [low, high] = BANDS[input.category];
	const h = hash(`${input.title}|${input.category}|${input.condition}|${input.description}`);
	const t = h % 1e3 / 1e3;
	const raw = low + (high - low) * (.25 + t * .6);
	const ozombols = Math.max(50, Math.round(raw * CONDITION_FACTOR[input.condition] / 50) * 50);
	const inPerson = IN_PERSON.has(input.category);
	const by = inPerson ? input.category === "Vehicles" ? "Marcus Pell" : "Leila Haddad" : "Anouk Berger";
	const variant = h % 3;
	return {
		ozombols,
		appraisal: {
			by,
			note: inPerson ? variant === 0 ? `${by} would examine this in person before the house honors the figure. From the description and a ${input.condition.toLowerCase()} condition, this is the working price.` : variant === 1 ? `${by} priced this as a visit. Condition is ${input.condition.toLowerCase()}. The figure stands once the visit is signed; until then it is what the desk will quote.` : `${by} set a visit figure. Nothing in the description suggests a hidden fault, and condition is ${input.condition.toLowerCase()}.` : variant === 0 ? `${by} priced this from market comparables. Condition is ${input.condition.toLowerCase()}. The house will honor this figure in 7ozombols.` : variant === 1 ? `${by} matched this against recent sales of the same kind of good. ${input.condition} condition is already in the figure.` : `${by} used open-market prices, not a guess. The desk will redeem a sale at this figure.`,
			examined: inPerson ? "in-person" : "market",
			at: (/* @__PURE__ */ new Date()).toISOString()
		}
	};
}
var MODES = [
	{
		id: "direct",
		title: "Another product",
		body: "You want a direct exchange. The examiner’s figure is only a reference."
	},
	{
		id: "ozombol",
		title: "7ozombols",
		body: "You want the house unit, which the company can later redeem for money."
	},
	{
		id: "either",
		title: "Either",
		body: "You will take a good you agree to, or the figure in 7ozombols."
	}
];
function ListPage() {
	const navigate = useNavigate();
	const name = useDesk((state) => state.name);
	const addListing = useDesk((state) => state.addListing);
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Furniture");
	const [city, setCity] = (0, import_react.useState)("");
	const [condition, setCondition] = (0, import_react.useState)("Good");
	const [description, setDescription] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("either");
	const [wants, setWants] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [photos, setPhotos] = (0, import_react.useState)([]);
	const [video, setVideo] = (0, import_react.useState)(null);
	const [appraisal, setAppraisal] = (0, import_react.useState)();
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formError, setFormError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const photosRef = (0, import_react.useRef)(photos);
	photosRef.current = photos;
	(0, import_react.useEffect)(() => {
		return () => {
			for (const photo of photosRef.current) URL.revokeObjectURL(photo.url);
		};
	}, []);
	function addPhotos(list) {
		if (!list) return;
		const next = [...photos];
		for (const file of list) {
			if (next.length >= 6) break;
			if (!file.type.startsWith("image/")) continue;
			next.push({
				id: uid("img"),
				file,
				url: URL.createObjectURL(file)
			});
		}
		setPhotos(next);
	}
	function onVideo(file) {
		if (!file) {
			setVideo(null);
			return;
		}
		if (file.size > 12582912) {
			setErrors((prev) => ({
				...prev,
				video: "Keep the video under 12 MB."
			}));
			return;
		}
		setErrors((prev) => ({
			...prev,
			video: ""
		}));
		setVideo(file);
	}
	function askExaminer() {
		const nextErrors = {};
		if (title.trim().length < 3) nextErrors.title = "Name the good first.";
		if (description.trim().length < 40) nextErrors.description = "The examiner needs a real description — at least a few sentences.";
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		const result = appraise({
			title: title.trim(),
			category,
			condition,
			description: description.trim()
		});
		setPrice(String(result.ozombols));
		setAppraisal(result.appraisal);
	}
	async function submit() {
		const nextErrors = {};
		if (title.trim().length < 3) nextErrors.title = "Give the good a name.";
		if (city.trim().length < 2) nextErrors.city = "Say where it is.";
		if (description.trim().length < 40) nextErrors.description = "Write a detailed description: age, flaws, size, and what is included.";
		if (photos.length < 1) nextErrors.photos = "Add at least one photograph.";
		if (mode !== "ozombol" && wants.trim().length < 8) nextErrors.wants = "Say what you would take in a direct exchange.";
		const figure = Number(price);
		if (mode !== "direct" && (!Number.isFinite(figure) || figure < 50)) nextErrors.price = "Name a figure in 7ozombols, or ask an examiner.";
		if (mode === "direct" && price.trim() !== "" && (!Number.isFinite(figure) || figure < 50)) nextErrors.price = "The reference figure should be at least 50, or leave it for an examiner.";
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) {
			setFormError("A few things are still missing.");
			return;
		}
		setBusy(true);
		setFormError("");
		try {
			const id = uid("good");
			const images = [];
			for (const photo of photos) {
				const blob = await compressImage(photo.file);
				const key = `${id}-${photo.id}`;
				await putMedia(key, blob);
				images.push(`idb:${key}`);
			}
			let videoKey;
			if (video) {
				videoKey = `${id}-video`;
				await putMedia(videoKey, video);
			}
			let oz = Math.round(figure);
			let note = appraisal;
			if (mode === "direct" && !price.trim()) {
				const result = appraise({
					title: title.trim(),
					category,
					condition,
					description: description.trim()
				});
				oz = result.ozombols;
				note = result.appraisal;
			}
			const listing = {
				id,
				owner: "you",
				sellerName: name,
				title: title.trim(),
				category,
				city: city.trim(),
				condition,
				description: description.trim(),
				images,
				videoKey,
				mode,
				ozombols: oz,
				priceKind: priceKindFor(mode),
				appraisal: note,
				wants: mode === "ozombol" ? wants.trim() || "7ozombols." : wants.trim(),
				status: "open",
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			addListing(listing);
			navigate({
				to: "/listing/$id",
				params: { id }
			});
		} catch (error) {
			setFormError(error instanceof Error ? error.message : "Could not place this good.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Your stall" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl sm:text-5xl",
				children: "List a good"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-muted",
				children: [
					"Photographs and a detailed description are required. Video is optional. It will show on your stall and on the general market, under ",
					name,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 flex flex-col gap-6",
				onSubmit: (event) => {
					event.preventDefault();
					submit();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Photographs",
						hint: "At least one. Up to six. These are what people judge first.",
						error: errors.photos,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/jpeg,image/png,image/webp",
							multiple: true,
							onChange: (event) => addPhotos(event.target.files),
							className: "block w-full text-sm"
						}), photos.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: photos.map((photo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo.url,
									alt: "",
									className: "size-24 rounded-xl object-cover border border-line"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "absolute end-1 top-1 rounded-full bg-ink px-2 text-xs text-cream",
									onClick: () => {
										URL.revokeObjectURL(photo.url);
										setPhotos((prev) => prev.filter((item) => item.id !== photo.id));
									},
									children: "Remove"
								})]
							}, photo.id))
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Video",
						hint: "Optional. One clip, under 12 MB.",
						error: errors.video,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "video/*",
							onChange: (event) => onVideo(event.target.files?.[0] ?? null),
							className: "block w-full text-sm"
						}), video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: video.name
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name of the good",
						error: errors.title,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: title,
							onChange: (event) => setTitle(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kind",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
								value: category,
								onChange: (event) => setCategory(event.target.value),
								children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item,
									children: item
								}, item))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Condition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
								value: condition,
								onChange: (event) => setCondition(event.target.value),
								children: CONDITIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item,
									children: item
								}, item))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "City",
						error: errors.city,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: city,
							onChange: (event) => setCity(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Detailed description",
						hint: "Age, flaws, size, what is included, and how it must be collected. At least a few sentences.",
						error: errors.description,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: description,
							onChange: (event) => setDescription(event.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs tabular-nums text-muted",
							children: [description.trim().length, " characters"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm font-medium",
						children: "How do you want to exchange it?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-3",
						children: MODES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `block cursor-pointer rounded-2xl border p-4 ${mode === item.id ? "border-ink bg-paper" : "border-line"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "mode",
									className: "me-2",
									checked: mode === item.id,
									onChange: () => setMode(item.id)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm text-muted",
									children: item.body
								})
							]
						}, item.id))
					})] }),
					mode !== "ozombol" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "What would you take?",
						hint: "Be specific. “A house with a garden”, “a serviced bicycle”, “open to a serious offer”.",
						error: errors.wants,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: wants,
							onChange: (event) => setWants(event.target.value),
							className: "min-h-24"
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: mode === "direct" ? "Reference figure in 7ozombols" : "Figure in 7ozombols",
						hint: mode === "direct" ? "Optional. If you leave it blank, an examiner’s reference is written for the market." : "What you will accept, or ask an examiner to set it from the description.",
						error: errors.price,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								inputMode: "numeric",
								value: price,
								onChange: (event) => setPrice(event.target.value.replace(/[^\d]/g, "")),
								placeholder: "0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ink",
								onClick: askExaminer,
								children: "Ask an examiner"
							})]
						}), appraisal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-3 border-s-2 border-brass ps-4 text-sm leading-relaxed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: appraisal.note }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
								className: "mt-2 text-muted",
								children: [
									appraisal.by,
									" · ",
									formatOz(Number(price) || 0),
									" ·",
									" ",
									appraisal.examined === "in-person" ? "visit figure" : "market figure"
								]
							})]
						}) : null]
					}),
					formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-clay",
						children: formError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Placing it…" : "Place it on the floor"
					})
				]
			})
		]
	}) });
}
//#endregion
export { ListPage as component };
