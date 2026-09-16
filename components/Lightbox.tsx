'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/lib/clinic-data';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const current = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onPrev, onNext]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:ring-2 focus:ring-white"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all focus:ring-2 focus:ring-white"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all focus:ring-2 focus:ring-white"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.imageUrl}
          alt={current.altText}
          className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />
        <div className="mt-4 text-center text-white">
          <h3 className="text-base sm:text-lg font-bold">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Category: {current.category} • {currentIndex + 1} of {items.length}
          </p>
        </div>
      </div>
    </div>
  );
}
