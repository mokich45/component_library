import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HeroHeaderConfig } from '../types';
import { cn } from '../../../shared/utils';

const defaultNavItems = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

interface HeroHeaderProps {
  config?: HeroHeaderConfig;
  className?: string;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ config, className }) => {
  const [open, setOpen] = useState(false);
  const logo = config?.logo || 'DDT Studio';
  const navItems = config?.navItems?.length ? config.navItems : defaultNavItems;
  const ctaLabel = config?.ctaLabel || 'Get started';
  const ctaHref = config?.ctaHref || '#contact';

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6', className)}>
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/35 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-lg">
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="text-base font-semibold tracking-wide text-slate-900 sm:text-lg">
            {logo}
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item, index) => (
              <a key={index} href={item.href} className="text-sm text-slate-700 transition-colors hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={ctaHref}
            className="hidden rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 md:inline-flex"
          >
            {ctaLabel}
          </a>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-800 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 md:hidden">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              {ctaLabel}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};
