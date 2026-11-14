import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Shell } from "@/components/exchange/shell";
import { Button, Eyebrow, Field, SelectInput, TextArea, TextInput } from "@/components/exchange/ui";
import { appraise } from "@/lib/exchange/appraise";
import { formatOz, priceKindFor } from "@/lib/exchange/format";
import { compressImage, putMedia } from "@/lib/exchange/media";
import { uid, useDesk } from "@/lib/exchange/store";
import {
  CONDITIONS,
  type Category,
  type Condition,
  type ExchangeMode,
  type Listing,
} from "@/lib/exchange/types";
import { CATEGORIES } from "@/lib/app-data/types";

export const Route = createFileRoute("/list")({
  head: () => ({ meta: [{ title: "List a good · 7ozombol" }] }),
  component: ListPage,
});

type DraftPhoto = { id: string; file: File; url: string };

const MODES: { id: ExchangeMode; title: string; body: string }[] = [
  {
    id: "direct",
    title: "Another product",
    body: "You want a direct exchange. The examiner’s figure is only a reference.",
  },
  {
    id: "ozombol",
    title: "7ozombols",
    body: "You want the house unit, which the company can later redeem for money.",
  },
  {
    id: "either",
    title: "Either",
    body: "You will take a good you agree to, or the figure in 7ozombols.",
  },
];

function ListPage() {
  const navigate = useNavigate();
  const name = useDesk((state) => state.name);
  const addListing = useDesk((state) => state.addListing);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Furniture");
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState<Condition>("Good");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState<ExchangeMode>("either");
  const [wants, setWants] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState<DraftPhoto[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [appraisal, setAppraisal] = useState<Listing["appraisal"]>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => {
    return () => {
      for (const photo of photosRef.current) URL.revokeObjectURL(photo.url);
    };
  }, []);

  function addPhotos(list: FileList | null) {
    if (!list) return;
    const next = [...photos];
    for (const file of list) {
      if (next.length >= 6) break;
      if (!file.type.startsWith("image/")) continue;
      next.push({ id: uid("img"), file, url: URL.createObjectURL(file) });
    }
    setPhotos(next);
  }

  function onVideo(file: File | null) {
    if (!file) {
      setVideo(null);
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, video: "Keep the video under 12 MB." }));
      return;
    }
    setErrors((prev) => ({ ...prev, video: "" }));
    setVideo(file);
  }

  function askExaminer() {
    const nextErrors: Record<string, string> = {};
    if (title.trim().length < 3) nextErrors.title = "Name the good first.";
    if (description.trim().length < 40) {
      nextErrors.description = "The examiner needs a real description — at least a few sentences.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const result = appraise({
      title: title.trim(),
      category,
      condition,
      description: description.trim(),
    });
    setPrice(String(result.ozombols));
    setAppraisal(result.appraisal);
  }

  async function submit() {
    const nextErrors: Record<string, string> = {};
    if (title.trim().length < 3) nextErrors.title = "Give the good a name.";
    if (city.trim().length < 2) nextErrors.city = "Say where it is.";
    if (description.trim().length < 40) {
      nextErrors.description = "Write a detailed description: age, flaws, size, and what is included.";
    }
    if (photos.length < 1) nextErrors.photos = "Add at least one photograph.";
    if (mode !== "ozombol" && wants.trim().length < 8) {
      nextErrors.wants = "Say what you would take in a direct exchange.";
    }
    const figure = Number(price);
    if (mode !== "direct" && (!Number.isFinite(figure) || figure < 50)) {
      nextErrors.price = "Name a figure in 7ozombols, or ask an examiner.";
    }
    if (mode === "direct" && price.trim() !== "" && (!Number.isFinite(figure) || figure < 50)) {
      nextErrors.price = "The reference figure should be at least 50, or leave it for an examiner.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFormError("A few things are still missing.");
      return;
    }

    setBusy(true);
    setFormError("");
    try {
      const id = uid("good");
      const images: string[] = [];
      for (const photo of photos) {
        const blob = await compressImage(photo.file);
        const key = `${id}-${photo.id}`;
        await putMedia(key, blob);
        images.push(`idb:${key}`);
      }
      let videoKey: string | undefined;
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
          description: description.trim(),
        });
        oz = result.ozombols;
        note = result.appraisal;
      }
      const listing: Listing = {
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
        createdAt: new Date().toISOString(),
      };
      addListing(listing);
      void navigate({ to: "/listing/$id", params: { id } });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not place this good.");
      setBusy(false);
    }
  }

  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Eyebrow>Your stall</Eyebrow>
        <h1 className="mt-2 text-4xl sm:text-5xl">List a good</h1>
        <p className="mt-3 text-muted">
          Photographs and a detailed description are required. Video is optional. It will show on
          your stall and on the general market, under {name}.
        </p>

        <form
          className="mt-8 flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <Field
            label="Photographs"
            hint="At least one. Up to six. These are what people judge first."
            error={errors.photos}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(event) => addPhotos(event.target.files)}
              className="block w-full text-sm"
            />
            {photos.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative">
                    <img
                      src={photo.url}
                      alt=""
                      className="size-24 rounded-xl object-cover border border-line"
                    />
                    <button
                      type="button"
                      className="absolute end-1 top-1 rounded-full bg-ink px-2 text-xs text-cream"
                      onClick={() => {
                        URL.revokeObjectURL(photo.url);
                        setPhotos((prev) => prev.filter((item) => item.id !== photo.id));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </Field>

          <Field label="Video" hint="Optional. One clip, under 12 MB." error={errors.video}>
            <input
              type="file"
              accept="video/*"
              onChange={(event) => onVideo(event.target.files?.[0] ?? null)}
              className="block w-full text-sm"
            />
            {video ? <p className="mt-2 text-sm text-muted">{video.name}</p> : null}
          </Field>

          <Field label="Name of the good" error={errors.title}>
            <TextInput value={title} onChange={(event) => setTitle(event.target.value)} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Kind">
              <SelectInput
                value={category}
                onChange={(event) => setCategory(event.target.value as Category)}
              >
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Condition">
              <SelectInput
                value={condition}
                onChange={(event) => setCondition(event.target.value as Condition)}
              >
                {CONDITIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>

          <Field label="City" error={errors.city}>
            <TextInput value={city} onChange={(event) => setCity(event.target.value)} />
          </Field>

          <Field
            label="Detailed description"
            hint="Age, flaws, size, what is included, and how it must be collected. At least a few sentences."
            error={errors.description}
          >
            <TextArea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <p className="mt-1 text-xs tabular-nums text-muted">{description.trim().length} characters</p>
          </Field>

          <fieldset>
            <legend className="text-sm font-medium">How do you want to exchange it?</legend>
            <div className="mt-3 grid gap-3">
              {MODES.map((item) => (
                <label
                  key={item.id}
                  className={`block cursor-pointer rounded-2xl border p-4 ${
                    mode === item.id ? "border-ink bg-paper" : "border-line"
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    className="me-2"
                    checked={mode === item.id}
                    onChange={() => setMode(item.id)}
                  />
                  <span className="font-medium">{item.title}</span>
                  <span className="mt-1 block text-sm text-muted">{item.body}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {mode !== "ozombol" ? (
            <Field
              label="What would you take?"
              hint="Be specific. “A house with a garden”, “a serviced bicycle”, “open to a serious offer”."
              error={errors.wants}
            >
              <TextArea value={wants} onChange={(event) => setWants(event.target.value)} className="min-h-24" />
            </Field>
          ) : null}

          <Field
            label={mode === "direct" ? "Reference figure in 7ozombols" : "Figure in 7ozombols"}
            hint={
              mode === "direct"
                ? "Optional. If you leave it blank, an examiner’s reference is written for the market."
                : "What you will accept, or ask an examiner to set it from the description."
            }
            error={errors.price}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <TextInput
                inputMode="numeric"
                value={price}
                onChange={(event) => setPrice(event.target.value.replace(/[^\d]/g, ""))}
                placeholder="0"
              />
              <Button type="button" variant="ink" onClick={askExaminer}>
                Ask an examiner
              </Button>
            </div>
            {appraisal ? (
              <blockquote className="mt-3 border-s-2 border-brass ps-4 text-sm leading-relaxed">
                <p>{appraisal.note}</p>
                <footer className="mt-2 text-muted">
                  {appraisal.by} · {formatOz(Number(price) || 0)} ·{" "}
                  {appraisal.examined === "in-person" ? "visit figure" : "market figure"}
                </footer>
              </blockquote>
            ) : null}
          </Field>

          {formError ? <p className="text-sm text-clay">{formError}</p> : null}

          <Button type="submit" disabled={busy}>
            {busy ? "Placing it…" : "Place it on the floor"}
          </Button>
        </form>
      </main>
    </Shell>
  );
}
