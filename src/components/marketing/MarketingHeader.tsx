'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV = [
  { name: 'How it works', href: '/how-it-works' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
]

export function MarketingHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fafaf9]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-neutral-950"
        >
          Praecora
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
          >
            Log in
          </Link>
          <Link
            href="/demo"
            className="rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Book a demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-neutral-950"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-black/5 bg-[#fafaf9] md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-black/5"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2 border-t border-black/5 pt-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-black/5"
              >
                Log in
              </Link>
              <Link
                href="/demo"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-md bg-neutral-950 px-3 py-2 text-center text-sm font-medium text-white"
              >
                Book a demo
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
