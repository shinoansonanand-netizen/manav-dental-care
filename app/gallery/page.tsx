'use client';

import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Lightbox from '@/components/Lightbox';
import { GALLERY_ITEMS } from '@/lib/clinic-data';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Treatment Rooms', 'Equipment', 'Clinic', 'Reception'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumbs items={[{ name: 'Gallery' }]} />
        </div>
      </div>

      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
              Visual Tour
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b2545] tracking-tight mb-4">
              Manav Dental Care Clinic Gallery
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore our clinical operatory rooms, sterilized instrumentation stations, and patient lounge in Padur, OMR.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0b2545] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer bg-slate-200 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-5 h-5" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-xs text-teal-200">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0))}
        />
      )}
    </div>
  );
}
