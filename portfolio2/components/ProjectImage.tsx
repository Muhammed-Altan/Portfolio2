"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ProjectImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export default function ProjectImage({
  src,
  fallbackSrc = "/project-preview-unavailable.svg",
  onError,
  ...props
}: ProjectImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
