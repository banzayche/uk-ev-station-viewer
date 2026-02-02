import Link from 'next/link';
import { NavLink } from '@/components/ui/NavLink';
import { ModeBadge } from '@/components/ui/ModeBadge';

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          tabIndex={0}
          className="text-lg font-semibold"
        >
          Station Explorer
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <nav className="flex items-center gap-4" aria-label="Main navigation">
            <NavLink href="/stations">Stations</NavLink>
            <NavLink href="/favorites">Favorites</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>
          <ModeBadge />
        </div>
      </div>
    </header>
  );
}
