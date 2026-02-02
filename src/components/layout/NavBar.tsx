'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavLink } from '@/components/ui/NavLink';
import { ModeBadge } from '@/components/ui/ModeBadge';

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <Link href="/" tabIndex={0} className="text-lg font-semibold">
            Station Explorer
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-semibold text-ink md:hidden"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? 'Close' : 'Menu'}
            <span aria-hidden="true">{open ? '×' : '☰'}</span>
          </button>
        </div>

        <div className="hidden items-center gap-3 text-sm md:flex">
          <nav className="flex items-center gap-3" aria-label="Main navigation">
            <NavLink href="/stations">Stations</NavLink>
            <NavLink href="/favorites">Favorites</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>
          <ModeBadge />
        </div>

        <div
          id="main-nav"
          className={`overflow-hidden text-sm transition-all duration-200 md:hidden ${
            open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!open}
        >
          <div className="flex flex-col gap-3 pt-1">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              <NavLink href="/stations" onClick={() => setOpen(false)}>
                Stations
              </NavLink>
              <NavLink href="/favorites" onClick={() => setOpen(false)}>
                Favorites
              </NavLink>
              <NavLink href="/about" onClick={() => setOpen(false)}>
                About
              </NavLink>
            </nav>
            <div className="self-start">
              <ModeBadge />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
