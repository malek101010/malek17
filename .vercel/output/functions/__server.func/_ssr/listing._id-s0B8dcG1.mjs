import { i as __toESM } from "../_runtime.mjs";
import { a as Oz, b as useDesk, c as TextArea, f as deskMoney, g as modeLabel, h as formatWhen, m as formatOz, p as figureLabel, r as Eyebrow, s as Shell, t as Button, v as statusLabel } from "./shell-B_Z_U4m9.mjs";
import { n as Photo, t as Clip } from "./photo-hLfkum1j.mjs";
import { n as Route } from "./router-DMTZ25Iw.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/listing._id-s0B8dcG1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SwapDialog({ listing, open, onOpenChange }) {
	const name = useDesk((state) => state.name);
	const listings = useDesk((state) => state.listings);
	const yours = (0, import_react.useMemo)(() => listings.filter((item) => item.owner === "you" && item.status === "open"), [listings]);
	const propose = useDesk((state) => state.proposeDirect);
	const [giveId, setGiveId] = (0, import_react.useState)("");
	const [describe, setDescribe] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	function close(next) {
		if (!next) setError("");
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
			giveTitle: chosen?.title ?? described
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "dialog-panel fixed inset-x-4 top-8 z-50 mx-auto flex w-auto max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-line bg-paper p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-3xl text-ink",
					children: "Propose a direct exchange"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "text-sm leading-relaxed text-muted",
					children: [
						"You are offering something for ",
						listing.sellerName,
						"’s ",
						listing.title,
						". No 7ozombols move unless you both add them later. Signed in this preview as ",
						name,
						"."
					]
				}),
				yours.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm font-medium",
					children: "From your stall"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-3 rounded-xl border border-line px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "give",
							checked: giveId === "",
							onChange: () => setGiveId("")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Something I have not listed"
						})]
					}), yours.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-3 rounded-xl border border-line px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "give",
							checked: giveId === item.id,
							onChange: () => setGiveId(item.id)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: item.title
						})]
					}, item.id))]
				})] }) : null,
				giveId === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["What you offer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						value: describe,
						onChange: (event) => setDescribe(event.target.value),
						placeholder: "A house in the next town, a car, a set of tools…",
						className: "mt-2"
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: [
						"Note to ",
						listing.sellerName,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: message,
							onChange: (event) => setMessage(event.target.value),
							placeholder: "Say what is included, and whether you can travel.",
							className: "mt-2"
						})
					]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-clay",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: submit,
						children: "Send the proposal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							children: "Cancel"
						})
					})]
				})
			]
		})] })
	});
}
function BuyDialog({ listing, open, onOpenChange }) {
	const balance = useDesk((state) => state.balance);
	const buy = useDesk((state) => state.buyWithOz);
	const [error, setError] = (0, import_react.useState)("");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "dialog-panel fixed inset-x-4 top-8 z-50 mx-auto flex max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-line bg-paper p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-3xl",
					children: "Settle in 7ozombols"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "text-sm leading-relaxed text-muted",
					children: [
						"This moves ",
						formatOz(listing.ozombols),
						" from your balance for ",
						listing.title,
						". Your balance is ",
						formatOz(balance),
						". 7ozombols are not cash — only the company redeems them."
					]
				}),
				short ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-clay",
					children: [
						"You are short by ",
						formatOz(listing.ozombols - balance),
						"."
					]
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-clay",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: confirm,
						disabled: short,
						children: "Confirm settlement"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							children: "Back"
						})
					})]
				})
			]
		})] })
	});
}
function ListingPage() {
	const { id } = Route.useParams();
	const listing = useDesk((state) => state.listings.find((item) => item.id === id));
	const balance = useDesk((state) => state.balance);
	const withdraw = useDesk((state) => state.withdraw);
	const [shot, setShot] = (0, import_react.useState)(0);
	const [swapOpen, setSwapOpen] = (0, import_react.useState)(false);
	const [buyOpen, setBuyOpen] = (0, import_react.useState)(false);
	const [confirmWithdraw, setConfirmWithdraw] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setShot(0);
		setConfirmWithdraw(false);
	}, [id]);
	if (!listing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl",
			children: "This good has left the floor."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/market",
			className: "mt-6 inline-flex min-h-11 items-center text-clay",
			children: "Back to the market"
		})]
	}) });
	const photo = listing.images[Math.min(shot, listing.images.length - 1)] ?? "";
	const yours = listing.owner === "you";
	const open = listing.status === "open";
	const canSwap = open && !yours && listing.mode !== "ozombol";
	const canBuy = open && !yours && listing.mode !== "direct" && listing.priceKind === "asking";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/market",
					className: "inline-flex min-h-11 items-center text-sm text-muted",
					children: "Market"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid gap-8 lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-2xl border border-line bg-paper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {
									src: photo,
									alt: listing.title,
									className: "aspect-4/3 w-full object-cover"
								})
							}),
							listing.images.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex gap-2",
								children: listing.images.map((src, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Photo ${index + 1}`,
									onClick: () => setShot(index),
									className: `overflow-hidden rounded-xl border ${index === shot ? "border-ink" : "border-line"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {
										src,
										alt: "",
										className: "size-20 object-cover"
									})
								}, src))
							}) : null,
							listing.videoKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clip, {
									videoKey: listing.videoKey,
									title: listing.title
								})
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: [
								listing.category,
								" · ",
								listing.city
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-4xl",
								children: listing.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									listing.sellerName,
									yours ? " · your stall" : "",
									" · ",
									listing.condition,
									" · listed",
									" ",
									formatWhen(listing.createdAt)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Oz, {
									value: listing.ozombols,
									className: "text-4xl"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										figureLabel(listing),
										" · about ",
										deskMoney(listing.ozombols),
										" if redeemed"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-medium text-brass-deep",
								children: modeLabel(listing.mode)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed",
								children: listing.wants
							}),
							!open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 rounded-2xl border border-line bg-paper px-4 py-3 text-sm",
								children: [statusLabel(listing.status), ". It is no longer offered."]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-col gap-2",
								children: [
									canSwap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => setSwapOpen(true),
										children: "Propose a direct exchange"
									}) : null,
									canBuy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ink",
										onClick: () => setBuyOpen(true),
										children: ["Settle for ", formatOz(listing.ozombols)]
									}) : null,
									canBuy && balance < listing.ozombols ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted",
										children: [
											"Your balance is ",
											formatOz(balance),
											" — short of this figure."
										]
									}) : null,
									yours && open ? confirmWithdraw ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-line bg-paper p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm",
											children: "Take this off the floor? Open proposals on it will be refused."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "clay",
												onClick: () => {
													withdraw(listing.id);
													setConfirmWithdraw(false);
												},
												children: "Withdraw"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												onClick: () => setConfirmWithdraw(false),
												children: "Keep it"
											})]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: () => setConfirmWithdraw(true),
										children: "Withdraw from the floor"
									}) : null
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10 grid gap-8 lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl leading-relaxed text-ink",
							children: listing.description
						})]
					}), listing.appraisal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "border-s-2 border-brass ps-4 lg:col-span-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: listing.appraisal.examined === "in-person" ? "Seen in person" : "From the market" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed",
								children: listing.appraisal.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
								className: "mt-3 text-sm text-muted",
								children: [
									listing.appraisal.by,
									" · ",
									formatWhen(listing.appraisal.at)
								]
							})
						]
					}) : null]
				})
			]
		}),
		canSwap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwapDialog, {
			listing,
			open: swapOpen,
			onOpenChange: setSwapOpen
		}) : null,
		canBuy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyDialog, {
			listing,
			open: buyOpen,
			onOpenChange: setBuyOpen
		}) : null
	] });
}
export { ListingPage as component };
