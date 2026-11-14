import { Link } from "@tanstack/react-router";
import { Video } from "lucide-react";
import { figureLabel, modeLabel } from "@/lib/exchange/format";
import type { Listing } from "@/lib/exchange/types";
import { Oz } from "./ui";
import { Photo } from "./photo";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/listing/$id"
      params={{ id: listing.id }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Photo
          src={listing.images[0] ?? ""}
          alt={listing.title}
          className="card-photo h-full w-full object-cover"
        />
        <span className="absolute start-3 top-3 rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink">
          {listing.category}
        </span>
        {listing.videoKey ? (
          <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink px-2 py-1 text-xs text-cream">
            <Video className="size-3" aria-hidden />
            Video
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-2xl leading-tight text-ink">{listing.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {listing.city} · {listing.sellerName}
          </p>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink">
          {listing.wants || listing.description}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <Oz value={listing.ozombols} className="text-xl" />
            <p className="text-xs text-muted">{figureLabel(listing)}</p>
          </div>
          <p className="text-end text-xs font-medium text-brass-deep">{modeLabel(listing.mode)}</p>
        </div>
      </div>
    </Link>
  );
}
