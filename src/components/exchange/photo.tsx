import { useEffect, useState } from "react";
import { getMedia } from "@/lib/exchange/media";
import { cn } from "@/lib/cn";

export function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [url, setUrl] = useState<string | null>(src.startsWith("idb:") ? null : src);

  useEffect(() => {
    if (!src.startsWith("idb:")) {
      setUrl(src);
      return;
    }
    let dead = false;
    let revoke = "";
    void getMedia(src.slice(4))
      .then((blob) => {
        if (dead || !blob) return;
        revoke = URL.createObjectURL(blob);
        setUrl(revoke);
      })
      .catch(() => {
        if (!dead) setUrl(null);
      });
    return () => {
      dead = true;
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [src]);

  if (!url) {
    return <div className={cn("bg-line", className)} aria-hidden />;
  }

  return <img src={url} alt={alt} className={className} />;
}

export function Clip({ videoKey, title }: { videoKey: string; title: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let dead = false;
    let revoke = "";
    void getMedia(videoKey)
      .then((blob) => {
        if (dead || !blob) return;
        revoke = URL.createObjectURL(blob);
        setUrl(revoke);
      })
      .catch(() => {
        if (!dead) setUrl(null);
      });
    return () => {
      dead = true;
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [videoKey]);

  if (!url) {
    return (
      <p className="text-sm text-muted">
        A video was attached to {title}. It is stored with this stall on this device.
      </p>
    );
  }

  return (
    <video
      controls
      playsInline
      preload="metadata"
      src={url}
      className="aspect-video w-full rounded-2xl bg-ink"
    >
      <track kind="captions" />
    </video>
  );
}
