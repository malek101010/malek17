import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
// node_modules/.nitro/vite/services/ssr/assets/shell-B_Z_U4m9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONDITIONS = [
	"New",
	"Excellent",
	"Good",
	"Fair",
	"Project"
];
function formatOz(value) {
	return `${new Intl.NumberFormat("en-US").format(value)} 7oz`;
}
function deskMoney(oz) {
	const dollars = oz / 10;
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: dollars < 100 ? 2 : 0
	}).format(dollars);
}
function formatWhen(iso) {
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	}).format(new Date(iso));
}
function modeLabel(mode) {
	if (mode === "direct") return "Direct exchange";
	if (mode === "ozombol") return "7ozombols";
	return "Either way";
}
function statusLabel(status) {
	if (status === "open") return "On the floor";
	if (status === "exchanged") return "Exchanged";
	if (status === "settled") return "Settled in 7oz";
	return "Withdrawn";
}
function figureLabel(listing) {
	if (listing.priceKind === "reference") return "Examiner’s figure";
	if (listing.appraisal?.examined === "in-person") return "Priced in person";
	if (listing.appraisal) return "Priced from the market";
	return "Stall’s figure";
}
function priceKindFor(mode) {
	return mode === "direct" ? "reference" : "asking";
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var variants = {
	clay: "bg-clay text-cream hover:bg-clay-deep",
	ink: "bg-ink text-cream hover:bg-ink/90",
	ghost: "border border-line bg-transparent text-ink hover:bg-paper",
	brass: "bg-brass text-cream hover:bg-brass-deep"
};
function buttonClass(variant = "clay", extra) {
	return cn("tap inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50", variants[variant], extra);
}
var Button = (0, import_react.forwardRef)(function Button({ variant = "clay", className, type = "button", ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type,
		className: buttonClass(variant, className),
		...props
	});
});
function Field({ label, hint, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-ink",
				children: label
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm text-muted",
				children: hint
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 block text-sm text-clay",
				children: error
			}) : null
		]
	});
}
function TextInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: cn("min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-base text-ink", props.className)
	});
}
function TextArea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: cn("min-h-36 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base leading-relaxed text-ink", props.className)
	});
}
function SelectInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: cn("min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-base text-ink", props.className)
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-medium uppercase tracking-widest text-brass",
		children
	});
}
function Oz({ value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("font-display tabular-nums text-ink", className),
		children: [new Intl.NumberFormat("en-US").format(value), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ms-1 font-sans text-xs font-medium tracking-widest",
			children: "7oz"
		})]
	});
}
var seen = (by, note, examined, at) => ({
	by,
	note,
	examined,
	at
});
var SEED_LISTINGS = [
	{
		id: "house",
		owner: "member",
		sellerName: "Inez Calder",
		title: "White house with a long pool",
		category: "Homes",
		city: "Palma",
		condition: "Excellent",
		description: "A single-storey white house with a long pool and a covered terrace. Four bedrooms, a new roof in 2024, and the furniture in the photograph is not included. Papers are clean. I will exchange it for another home I can live in, or for a vehicle if the examiner’s gap is closed in 7ozombols.",
		images: ["/catalog/townhouse.jpg"],
		mode: "either",
		ozombols: 186e3,
		priceKind: "asking",
		wants: "Another home, or a vehicle plus 7ozombols to close the gap.",
		appraisal: seen("Leila Haddad", "I walked the house. The pool equipment works, the roof is the 2024 one, and the figure is for the building only.", "in-person", "2026-11-02T10:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-02T10:00:00.000Z"
	},
	{
		id: "coupe",
		owner: "member",
		sellerName: "Tomas Reeve",
		title: "Red sports coupe, garaged",
		category: "Vehicles",
		city: "Lyon",
		condition: "Excellent",
		description: "A red sports coupe, garaged, with a full service history for the six years it has been with me. Two small stone chips on the nose, otherwise straight. I am not taking the house unit for it. I want a city flat, or a boat I can keep in the water.",
		images: ["/catalog/coupe.jpg"],
		mode: "direct",
		ozombols: 52e3,
		priceKind: "reference",
		wants: "A city flat, or a boat I can keep.",
		appraisal: seen("Marcus Pell", "Seen in the garage. Service book matches the odometer. The chips are cosmetic. This figure is a reference for a direct exchange, not an offer to buy it in 7ozombols.", "in-person", "2026-11-04T09:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-04T09:00:00.000Z"
	},
	{
		id: "flat",
		owner: "member",
		sellerName: "Noah Pell",
		title: "Bright one-bedroom, third floor",
		category: "Homes",
		city: "Malmö",
		condition: "Good",
		description: "A bright one-bedroom: oak floor, a grey sofa that can stay, trees against the glass. Quiet building, third floor, no lift. The kitchen is simple and the bathroom was retiled two years ago. I want a house with some outdoor space, even a smaller one. I am not taking 7ozombols for this.",
		images: ["/catalog/apartment.jpg"],
		mode: "direct",
		ozombols: 96e3,
		priceKind: "reference",
		wants: "A house with outdoor space. Not 7ozombols.",
		appraisal: seen("Leila Haddad", "Visited on a weekday morning. Light is as photographed. No lift, and that is already in the figure. Reference only — Noah will not settle in 7ozombols.", "in-person", "2026-11-03T11:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-03T11:00:00.000Z"
	},
	{
		id: "kitchen",
		owner: "member",
		sellerName: "Helen Voss",
		title: "Stone kitchen, ready to collect",
		category: "Kitchen",
		city: "Antwerp",
		condition: "Excellent",
		description: "The kitchen in the photograph: stone counters, a white run of cabinets, and the oak floor stays with the flat. It comes out of a renovation, so you collect it and refit it. Included: cabinets, counters, and the island. Appliances are not included. I am open to a direct trade or to 7ozombols.",
		images: ["/catalog/kitchen.jpg"],
		mode: "either",
		ozombols: 4800,
		priceKind: "asking",
		wants: "Studio lights, a quiet week away, or 7ozombols.",
		appraisal: seen("Anouk Berger", "Priced from comparable fitted kitchens of this size, excluding appliances. Collection is on you, and that is already reflected.", "market", "2026-10-28T15:00:00.000Z"),
		status: "open",
		createdAt: "2026-10-28T15:00:00.000Z"
	},
	{
		id: "watch",
		owner: "member",
		sellerName: "Jonah Adeyemi",
		title: "Steel chronograph, cream dial",
		category: "Watches",
		city: "London",
		condition: "Excellent",
		description: "Steel chronograph, cream dial, bought in 2019 and worn weekly. Serviced last spring. The box is gone; the papers are here. Light desk marks on the bracelet, crystal is clear. I only want 7ozombols.",
		images: ["/catalog/watch.jpg"],
		mode: "ozombol",
		ozombols: 6400,
		priceKind: "asking",
		wants: "7ozombols only.",
		appraisal: seen("Leila Haddad", "Seen on the desk. The movement was running true, the service card matches, and the bracelet marks are honest wear.", "in-person", "2026-11-08T16:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-08T16:00:00.000Z"
	},
	{
		id: "guitar",
		owner: "member",
		sellerName: "Priya Nand",
		title: "Spruce acoustic, with a hard case",
		category: "Music",
		city: "Accra",
		condition: "Good",
		description: "Spruce top, played at home, no cracks, neck is true. A small belt of finish wear beside the soundhole. Action is comfortable. It comes with a hard case and a strap. I would take a camera, or the house unit.",
		images: ["/catalog/guitar.jpg"],
		mode: "either",
		ozombols: 1800,
		priceKind: "asking",
		wants: "A camera, or 7ozombols.",
		appraisal: seen("Anouk Berger", "Market comparables for a solid-spruce guitar in played but sound condition, case included.", "market", "2026-11-01T12:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-01T12:00:00.000Z"
	},
	{
		id: "espresso",
		owner: "member",
		sellerName: "Elias Frost",
		title: "Two-group café espresso machine",
		category: "Kitchen",
		city: "Turin",
		condition: "Good",
		description: "A two-group café machine from a counter that closed in September. It pulls properly. A technician’s note from October is included. It is heavy and collection is from Turin. I want 7ozombols, not another object.",
		images: ["/catalog/espresso.jpg"],
		mode: "ozombol",
		ozombols: 3400,
		priceKind: "asking",
		wants: "7ozombols only. Collection from Turin.",
		appraisal: seen("Anouk Berger", "Priced from used commercial machines of this class with a recent service note. Collection cost is the buyer’s.", "market", "2026-10-22T08:00:00.000Z"),
		status: "open",
		createdAt: "2026-10-22T08:00:00.000Z"
	},
	{
		id: "painting",
		owner: "member",
		sellerName: "Camille Ortega",
		title: "Large blue abstract, unsigned",
		category: "Art",
		city: "Oaxaca",
		condition: "Excellent",
		description: "A large blue abstract on canvas, no signature, from a studio that was clearing a wall. About 100 by 80 centimetres. It is unframed in the photograph and will ship in a simple frame. No damage to the paint. I will exchange it for another work I want to live with, or for 7ozombols.",
		images: ["/catalog/painting.jpg"],
		mode: "either",
		ozombols: 5200,
		priceKind: "asking",
		wants: "Another work to live with, or 7ozombols.",
		appraisal: seen("Leila Haddad", "Seen in the studio. Paint is stable, no signature, so the figure is for the object and not a name.", "in-person", "2026-11-06T18:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-06T18:00:00.000Z"
	},
	{
		id: "bicycle",
		owner: "member",
		sellerName: "Mara Ellison",
		title: "Silver city bicycle",
		category: "Outdoors",
		city: "Copenhagen",
		condition: "Excellent",
		description: "Silver city bicycle, steel frame, leather saddle, lights, and a rear rack. New brake pads in October, tires have another season in them. I ride it daily and it is straight. I would like a camera in return, or 7ozombols if the right camera does not appear.",
		images: ["/catalog/bicycle.jpg"],
		mode: "either",
		ozombols: 1100,
		priceKind: "asking",
		wants: "A camera, or 7ozombols.",
		appraisal: seen("Anouk Berger", "Compared with serviced city bikes of this kind. The October brake work is in the figure.", "market", "2026-11-09T07:30:00.000Z"),
		status: "open",
		createdAt: "2026-11-09T07:30:00.000Z"
	},
	{
		id: "bag",
		owner: "member",
		sellerName: "Adele Brun",
		title: "Tan leather travel bag",
		category: "Fashion",
		city: "Paris",
		condition: "Good",
		description: "Tan leather travel bag, used on four trips, no tears, hardware all present. The strap has darkened with handling. It closes cleanly and the lining is intact. I want 7ozombols.",
		images: ["/catalog/bag.jpg"],
		mode: "ozombol",
		ozombols: 860,
		priceKind: "asking",
		wants: "7ozombols.",
		appraisal: seen("Anouk Berger", "Market price for a full-grain travel bag with honest wear and no structural fault.", "market", "2026-11-05T13:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-05T13:00:00.000Z"
	},
	{
		id: "kayak",
		owner: "member",
		sellerName: "Soren Hale",
		title: "Red sea kayak with paddle",
		category: "Outdoors",
		city: "Bergen",
		condition: "Good",
		description: "A red sea kayak with a paddle and a spray skirt. One tidy repair on the hull, sound otherwise. It lives on a rack and can be collected. I want a direct exchange — tools, a travel bag and a guitar, or one serious offer of similar use. Not the house unit.",
		images: ["/catalog/canoe.jpg"],
		mode: "direct",
		ozombols: 2400,
		priceKind: "reference",
		wants: "Tools, a travel bag and a guitar, or one serious direct offer.",
		appraisal: seen("Marcus Pell", "Looked at the hull repair. It is tidy and dry. Figure is a reference so a direct trade can be judged. Soren will not take 7ozombols.", "in-person", "2026-10-30T14:00:00.000Z"),
		status: "open",
		createdAt: "2026-10-30T14:00:00.000Z"
	},
	{
		id: "handmade",
		owner: "member",
		sellerName: "Yassin Sherif",
		title: "Four handmade clay mugs",
		category: "Handmade",
		city: "6-october",
		condition: "New",
		description: "A set of four clay mugs, thrown and glazed by hand. No two are the same: the rims dip slightly and the glaze runs darker toward the foot. They are food-safe, hold about 300 ml, and have never been used. The set travels in one crate. I will exchange them for another handmade piece, or for 7ozombols.",
		images: ["/catalog/handmade.jpg"],
		mode: "either",
		ozombols: 640,
		priceKind: "asking",
		wants: "Another handmade piece, or 7ozombols.",
		appraisal: seen("Leila Haddad", "Seen on the bench. The glaze is even enough to use, and the figure is for the set of four, not one mug.", "in-person", "2026-11-12T11:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-12T11:00:00.000Z"
	},
	{
		id: "you-camera",
		owner: "you",
		sellerName: "Alex Marin",
		title: "Black DSLR with a short lens",
		category: "Cameras",
		city: "Marseille",
		condition: "Excellent",
		description: "Black DSLR with the short lens in the photograph and a spare battery. Shutter count is under 20,000. A scuff on the grip, glass is clean, and the body has never been opened. I will trade it for a city bicycle in good order, or for 7ozombols.",
		images: ["/catalog/camera.jpg"],
		mode: "either",
		ozombols: 1450,
		priceKind: "asking",
		wants: "A serviced city bicycle, or 7ozombols.",
		appraisal: seen("Anouk Berger", "Comparables for this body and a short prime, low shutter count, light cosmetic wear.", "market", "2026-11-10T09:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-10T09:00:00.000Z"
	},
	{
		id: "you-sofa",
		owner: "you",
		sellerName: "Alex Marin",
		title: "Mustard velvet sofa, three seats",
		category: "Furniture",
		city: "Marseille",
		condition: "Good",
		description: "Mustard velvet sofa, three seats, tufted back, solid timber frame. No tears. The seat cushions have taken a sitting shape and the color is even. It has to be collected from a second-floor flat with a turning stair. I want a workbench or decent garden tools. I am not taking 7ozombols.",
		images: ["/catalog/sofa.jpg"],
		mode: "direct",
		ozombols: 2200,
		priceKind: "reference",
		wants: "A workbench or garden tools.",
		appraisal: seen("Leila Haddad", "Seen in the flat. Frame is solid, velvet is intact, stairs will make collection awkward. Reference figure only.", "in-person", "2026-11-07T17:00:00.000Z"),
		status: "open",
		createdAt: "2026-11-07T17:00:00.000Z"
	}
];
var SEED_OFFERS = [{
	id: "offer-mara",
	listingId: "you-camera",
	fromName: "Mara Ellison",
	direction: "in",
	kind: "direct",
	message: "I would rather have the camera than 7ozombols. The bicycle was serviced in October — new brake pads, straight wheels — and I can bring it to Marseille.",
	giveListingId: "bicycle",
	giveTitle: "Silver city bicycle",
	status: "pending",
	createdAt: "2026-11-11T08:40:00.000Z"
}];
var OPENING_BALANCE = 9800;
var OPENING_LEDGER = [{
	id: "led-open",
	label: "Opening balance",
	amount: OPENING_BALANCE,
	at: "2026-11-01T08:00:00.000Z"
}];
function seedListings() {
	return SEED_LISTINGS.map((listing) => ({
		...listing,
		images: [...listing.images],
		appraisal: listing.appraisal ? { ...listing.appraisal } : void 0
	}));
}
function seedOffers() {
	return SEED_OFFERS.map((offer) => ({ ...offer }));
}
var memoryStorage = {
	getItem: () => null,
	setItem: () => void 0,
	removeItem: () => void 0
};
function uid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}
var useDesk = create()(persist((set, get) => ({
	name: "Alex Marin",
	balance: OPENING_BALANCE,
	listings: seedListings(),
	offers: seedOffers(),
	ledger: OPENING_LEDGER.map((entry) => ({ ...entry })),
	payouts: [],
	setName: (name) => {
		const trimmed = name.trim().slice(0, 40);
		if (!trimmed) return;
		set((state) => ({
			name: trimmed,
			listings: state.listings.map((listing) => listing.owner === "you" ? {
				...listing,
				sellerName: trimmed
			} : listing)
		}));
	},
	addListing: (listing) => set((state) => ({ listings: [listing, ...state.listings] })),
	withdraw: (id) => set((state) => ({
		listings: state.listings.map((listing) => listing.id === id && listing.owner === "you" && listing.status === "open" ? {
			...listing,
			status: "withdrawn"
		} : listing),
		offers: state.offers.map((offer) => offer.status === "pending" && (offer.listingId === id || offer.giveListingId === id) ? {
			...offer,
			status: "declined"
		} : offer)
	})),
	proposeDirect: (input) => {
		const listing = get().listings.find((item) => item.id === input.listingId);
		if (!listing || listing.status !== "open") return {
			ok: false,
			reason: "This good is no longer on the floor."
		};
		if (listing.owner === "you") return {
			ok: false,
			reason: "You cannot exchange with your own stall."
		};
		if (listing.mode === "ozombol") return {
			ok: false,
			reason: "This stall is taking 7ozombols only."
		};
		const offer = {
			id: uid("offer"),
			listingId: input.listingId,
			fromName: get().name,
			direction: "out",
			kind: "direct",
			message: input.message.trim(),
			giveListingId: input.giveListingId,
			giveTitle: input.giveTitle,
			status: "pending",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set((state) => ({ offers: [offer, ...state.offers] }));
		return { ok: true };
	},
	buyWithOz: (listingId) => {
		const state = get();
		const listing = state.listings.find((item) => item.id === listingId);
		if (!listing || listing.status !== "open") return {
			ok: false,
			reason: "This good is no longer on the floor."
		};
		if (listing.owner === "you") return {
			ok: false,
			reason: "This is already on your stall."
		};
		if (listing.mode === "direct" || listing.priceKind !== "asking") return {
			ok: false,
			reason: "This stall wants another good, not 7ozombols."
		};
		if (state.balance < listing.ozombols) return {
			ok: false,
			reason: "Your 7ozombol balance does not cover this figure."
		};
		const at = (/* @__PURE__ */ new Date()).toISOString();
		const offer = {
			id: uid("offer"),
			listingId,
			fromName: state.name,
			direction: "out",
			kind: "ozombol",
			message: "Settled in 7ozombols at the figure on the stall.",
			ozombols: listing.ozombols,
			status: "accepted",
			createdAt: at
		};
		const entry = {
			id: uid("led"),
			label: `Settled · ${listing.title}`,
			amount: -listing.ozombols,
			at
		};
		set((prev) => ({
			balance: prev.balance - listing.ozombols,
			ledger: [entry, ...prev.ledger],
			offers: [offer, ...prev.offers.map((item) => item.listingId === listingId && item.status === "pending" ? {
				...item,
				status: "declined"
			} : item)],
			listings: prev.listings.map((item) => item.id === listingId ? {
				...item,
				status: "settled"
			} : item)
		}));
		return { ok: true };
	},
	respond: (offerId, decision) => {
		const offer = get().offers.find((item) => item.id === offerId);
		if (!offer || offer.status !== "pending") return {
			ok: false,
			reason: "This proposal is already closed."
		};
		if (decision === "declined") {
			set((state) => ({ offers: state.offers.map((item) => item.id === offerId ? {
				...item,
				status: "declined"
			} : item) }));
			return { ok: true };
		}
		const closeIds = [offer.listingId, offer.giveListingId].filter((id) => Boolean(id));
		set((state) => ({
			offers: state.offers.map((item) => {
				if (item.id === offerId) return {
					...item,
					status: "accepted"
				};
				if (item.status === "pending" && (closeIds.includes(item.listingId) || (item.giveListingId ? closeIds.includes(item.giveListingId) : false))) return {
					...item,
					status: "declined"
				};
				return item;
			}),
			listings: state.listings.map((listing) => closeIds.includes(listing.id) && listing.status === "open" ? {
				...listing,
				status: "exchanged"
			} : listing)
		}));
		return { ok: true };
	},
	requestPayout: (amount, note) => {
		const state = get();
		const rounded = Math.round(amount);
		if (!Number.isFinite(rounded) || rounded < 100) return {
			ok: false,
			reason: "The desk redeems from 100 7ozombols."
		};
		if (rounded > state.balance) return {
			ok: false,
			reason: "That is more than your balance."
		};
		const trimmed = note.trim();
		if (trimmed.length < 3) return {
			ok: false,
			reason: "Say where the company should send the money."
		};
		const at = (/* @__PURE__ */ new Date()).toISOString();
		const payout = {
			id: uid("pay"),
			amount: rounded,
			note: trimmed,
			status: "with the treasury",
			at
		};
		const entry = {
			id: uid("led"),
			label: "Redemption requested",
			amount: -rounded,
			at
		};
		set({
			balance: state.balance - rounded,
			payouts: [payout, ...state.payouts],
			ledger: [entry, ...state.ledger]
		});
		return { ok: true };
	}
}), {
	name: "ozombol-desk-v1",
	skipHydration: true,
	storage: createJSONStorage(() => typeof window === "undefined" ? memoryStorage : localStorage),
	partialize: (state) => ({
		name: state.name,
		balance: state.balance,
		listings: state.listings,
		offers: state.offers,
		ledger: state.ledger,
		payouts: state.payouts
	})
}));
var LINKS = [
	{
		to: "/market",
		label: "Market"
	},
	{
		to: "/mine",
		label: "My stall"
	},
	{
		to: "/trades",
		label: "Trades"
	},
	{
		to: "/wallet",
		label: "7ozombols"
	}
];
function useHydrateDesk() {
	(0, import_react.useEffect)(() => {
		useDesk.persist.rehydrate();
	}, []);
}
function isActive(pathname, to) {
	return pathname === to || pathname.startsWith(`${to}/`);
}
function Shell({ children }) {
	useHydrateDesk();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const balance = useDesk((state) => state.balance);
	const pending = useDesk((state) => state.offers.filter((offer) => offer.status === "pending").length);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-cream text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "font-display text-2xl leading-none text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brass",
								children: "7"
							}), "ozombol"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ms-6 hidden items-center gap-1 lg:flex",
							"aria-label": "Primary",
							children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: link.to,
								className: `inline-flex min-h-11 items-center rounded-full px-3 text-sm ${isActive(pathname, link.to) ? "bg-paper text-ink" : "text-muted"}`,
								children: [link.label, link.to === "/trades" && pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ms-2 inline-flex min-w-5 items-center justify-center rounded-full bg-clay px-1.5 text-xs text-cream tabular-nums",
									children: pending
								}) : null]
							}, link.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ms-auto flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/wallet",
									className: "hidden min-h-11 items-center rounded-full border border-line px-3 text-sm tabular-nums text-ink sm:inline-flex",
									children: formatOz(balance)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/list",
									className: buttonClass("clay", "hidden sm:inline-flex"),
									children: "List a good"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "tap inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden",
									"aria-expanded": open,
									"aria-label": open ? "Close menu" : "Open menu",
									onClick: () => setOpen((value) => !value),
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "border-t border-line px-4 py-3 lg:hidden",
					"aria-label": "Mobile",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl flex-col",
						children: [
							LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: link.to,
								className: "flex min-h-11 items-center justify-between text-base",
								children: [link.label, link.to === "/trades" && pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-clay",
									children: [pending, " open"]
								}) : null]
							}, link.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/wallet",
								className: "flex min-h-11 items-center text-base sm:hidden",
								children: ["Balance ", formatOz(balance)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/list",
								className: buttonClass("clay", "mt-2"),
								children: "List a good"
							})
						]
					})
				}) : null]
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-16 border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brass",
							children: "7"
						}), "ozombol"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-md text-sm leading-relaxed text-muted",
						children: "A house for direct exchange, and for a private unit that only the company turns back into money."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-x-4 gap-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/market",
								className: "min-h-11 inline-flex items-center",
								children: "Market"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/mine",
								className: "min-h-11 inline-flex items-center",
								children: "My stall"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/wallet",
								className: "min-h-11 inline-flex items-center",
								children: "Desk"
							})
						]
					})]
				})
			})
		]
	});
}
export { priceKindFor as _, Oz as a, useDesk as b, TextArea as c, cn as d, deskMoney as f, modeLabel as g, formatWhen as h, Field as i, TextInput as l, formatOz as m, CONDITIONS as n, SelectInput as o, figureLabel as p, Eyebrow as r, Shell as s, Button as t, buttonClass as u, statusLabel as v, uid as y };
