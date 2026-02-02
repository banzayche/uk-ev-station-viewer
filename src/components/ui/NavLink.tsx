'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: Route;
  children: React.ReactNode;
  onClick?: () => void;
};

export function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      tabIndex={0}
      className={cn(
        'rounded-full px-3 py-1 text-sm font-medium transition',
        isActive ? 'bg-accent text-black' : 'text-ink/80 hover:bg-white/80'
      )}
    >
      {children}
    </Link>
  );
}
