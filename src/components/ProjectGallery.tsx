'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface Props {
  images: string[];
  alt: string;
  transitionName?: string;
}

export default function ProjectGallery({ images, alt, transitionName }: Props) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: images.length > 1 });
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const onSelect = useCallback(() => embla && setIndex(embla.selectedScrollSnap()), [embla]);
  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
    return () => {
      embla.off('select', onSelect);
    };
  }, [embla, onSelect]);

  const many = images.length > 1;

  return (
    <div className="relative group" style={transitionName ? { viewTransitionName: transitionName } : undefined}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightbox(true)}
              aria-label={`Open ${alt} screenshot ${i + 1} fullscreen`}
              className="relative flex-[0_0_100%] h-64 md:h-96 cursor-zoom-in"
            >
              <Image
                src={src}
                alt={`${alt} screenshot ${i + 1}`}
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-cover object-top"
                priority={i === 0}
              />
            </button>
          ))}
        </div>
      </div>

      <span className="absolute top-3 right-3 p-2 rounded-xl bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <Maximize2 size={15} />
      </span>

      {many && (
        <>
          <button onClick={() => embla?.scrollPrev()} aria-label="Previous screenshot" className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => embla?.scrollNext()} aria-label="Next screenshot" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60">
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => embla?.scrollTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}

      <Lightbox
        open={lightbox}
        close={() => setLightbox(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
        carousel={{ finite: !many }}
        render={many ? undefined : { buttonPrev: () => null, buttonNext: () => null }}
      />
    </div>
  );
}
