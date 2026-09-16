'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '@/lib/clinic-data';
import Lightbox from './Lightbox';

export default function ClinicGallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Treatment Rooms', 'Equipment', 'Clinic', 'Reception'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-100" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
              Clinic Tour
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight mb-2">
              Our Clinical Environment
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Modern operatory chairs, sterilization stations, and a comfortable patient atmosphere.
            </p>
          </div>

          <div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0b2545] hover:text-[#0d9488] font-semibold text-sm border border-slate-200 transition-colors group"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0b2545] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-slate-200 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-teal-200">
                  {item.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1.5 leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0))}
        />
      )}
    </section>
  );
}
