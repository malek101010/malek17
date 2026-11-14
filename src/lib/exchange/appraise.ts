import type { Appraisal, Category, Condition } from "./types";

const BANDS: Record<Category, [number, number]> = {
  Homes: [70000, 320000],
  Vehicles: [8000, 90000],
  Furniture: [400, 8000],
  Watches: [500, 20000],
  Cameras: [200, 6000],
  Music: [150, 5000],
  Kitchen: [200, 8000],
  Art: [300, 25000],
  Fashion: [80, 4000],
  Outdoors: [150, 7000],
  Handmade: [80, 6000] ,
};

const CONDITION_FACTOR: Record<Condition, number> = {
  New: 1.12,
  Excellent: 1,
  Good: 0.86,
  Fair: 0.7,
  Project: 0.48,
};

const IN_PERSON = new Set<Category>([
  "Homes",
  "Vehicles",
  "Furniture",
  "Watches",
  "Art",
  "Outdoors",
]);

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function appraise(input: {
  title: string;
  category: Category;
  condition: Condition;
  description: string;
}): { ozombols: number; appraisal: Appraisal } {
  const [low, high] = BANDS[input.category];
  const key = `${input.title}|${input.category}|${input.condition}|${input.description}`;
  const h = hash(key);
  const t = (h % 1000) / 1000;
  const raw = low + (high - low) * (0.25 + t * 0.6);
  const ozombols = Math.max(
    50,
    Math.round((raw * CONDITION_FACTOR[input.condition]) / 50) * 50,
  );
  const inPerson = IN_PERSON.has(input.category);
  const by = inPerson
    ? input.category === "Vehicles"
      ? "Marcus Pell"
      : "Leila Haddad"
    : "Anouk Berger";
  const variant = h % 3;
  const note = inPerson
    ? variant === 0
      ? `${by} would examine this in person before the house honors the figure. From the description and a ${input.condition.toLowerCase()} condition, this is the working price.`
      : variant === 1
        ? `${by} priced this as a visit. Condition is ${input.condition.toLowerCase()}. The figure stands once the visit is signed; until then it is what the desk will quote.`
        : `${by} set a visit figure. Nothing in the description suggests a hidden fault, and condition is ${input.condition.toLowerCase()}.`
    : variant === 0
      ? `${by} priced this from market comparables. Condition is ${input.condition.toLowerCase()}. The house will honor this figure in 7ozombols.`
      : variant === 1
        ? `${by} matched this against recent sales of the same kind of good. ${input.condition} condition is already in the figure.`
        : `${by} used open-market prices, not a guess. The desk will redeem a sale at this figure.`;

  return {
    ozombols,
    appraisal: {
      by,
      note,
      examined: inPerson ? "in-person" : "market",
      at: new Date().toISOString(),
    },
  };
}
