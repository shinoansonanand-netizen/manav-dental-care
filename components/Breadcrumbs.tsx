'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-0">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#0b2545] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#0b2545] transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="font-semibold text-slate-800" aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
