'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FontAwesomeIcon, 
  faMagnifyingGlass, 
  faHeart, 
  faCartShopping, 
  faUser,
  faSun,
  faMoon,
  faChevronDown,
  faBars,
  faXmark,
  faGem,
  faArrowRight
} from '../icons';

export default function Header({ cartCount = 3, wishlistCount = 5 }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

useEffect(() => {
  setIsDarkMode(
    document.documentElement.classList.contains('dark')
  )
}, [])

const toggleTheme = () => {
  const newTheme = isDarkMode ? 'light' : 'dark'

  document.documentElement.classList.toggle(
    'dark',
    newTheme === 'dark'
  )

  localStorage.setItem('theme', newTheme)
  setIsDarkMode(newTheme === 'dark')
}

  const categories = [
    { name: 'Timepieces', href: '/categories/watches', desc: 'Precision Swiss Movement' },
    { name: 'Leather Goods', href: '/categories/leather', desc: 'Handcrafted Italian Leather' },
    { name: 'Apparel', href: '/categories/apparel', desc: 'Bespoke Tailored Wear' },
    { name: 'Fine Jewelry', href: '/categories/jewelry', desc: '18K Solid Gold & Platinum' },
  ];

  return (
    // FIX 1: added `relative` so the mobile drawer (absolute) always docks
    // directly under the header, regardless of header height at any breakpoint.
    <div className="sticky top-0 z-50 px-3 md:px-4 lg:px-8 xl:px-10 2xl:px-14 py-3 transition-all duration-300 relative">
      
      {/* FLOATING HEADER CONTAINER */}
      <header 
        className="mx-auto rounded-3xl backdrop-blur-2xl transition-all duration-300 shadow-md"
        style={{ 
          backgroundColor: 'rgba(20, 20, 20, 0.75)', 
          border: '1px solid rgba(212, 175, 55, 0.25)',
          color: '#ffffff'
        }}
      >
        {/* FIX 2: reduced/scaled horizontal padding + gap so nothing gets
            squeezed or clipped on very small phones (320-375px) */}
        <div className="px-3 sm:px-5 md:px-8 h-16 sm:h-20 flex items-center gap-2 sm:gap-4">
          
          {/* LEFT GROUP: hamburger + logo, pinned together on the left.
              This is its own flex group (not spread via justify-between on
              the whole row), so the logo never drifts toward the center
              when the desktop nav is hidden below lg. */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-lg text-amber-400 hover:bg-white/10 active:scale-95 transition-all shrink-0"
              aria-label="Toggle Navigation"
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
            </button>

            {/* LOGO */}
            <Link 
              href="/" 
              className="text-base sm:text-xl md:text-2xl font-black tracking-normal sm:tracking-widest shrink-0 flex items-center gap-1 sm:gap-2 min-w-0 whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faGem} className="text-amber-400 text-xs sm:text-base md:text-xl shrink-0" />
              <span>NOIR<span className="text-amber-400">&</span>GOLD</span>
            </Link>
          </div>

          {/* DESKTOP NAV LINKS */}
          {/* FIX: flex-1 + justify-center centers the nav only within the
              remaining space at lg+ (when it's actually rendered), instead
              of relying on justify-between across the full row — that's
              what was pulling the logo toward the middle on mobile. */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-5 xl:gap-9 text-xs font-bold uppercase tracking-widest text-neutral-300">
            <Link href="/" className="hover:text-amber-400 transition-colors whitespace-nowrap">
              Home
            </Link>
            <Link href="/products" className="hover:text-amber-400 transition-colors whitespace-nowrap">
              Catalog
            </Link>

            {/* CATEGORIES HOVER MENU */}
            <div 
              className="relative" 
              onMouseEnter={() => setIsCategoryOpen(true)} 
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-2 py-6 hover:text-amber-400 transition-colors whitespace-nowrap">
                Collections <FontAwesomeIcon icon={faChevronDown} className="text-[9px]" />
              </button>
              
              {isCategoryOpen && (
                <div 
                  className="absolute top-full -left-6 w-72 max-w-[90vw] p-3 rounded-2xl shadow-2xl backdrop-blur-3xl border border-amber-500/20 animate-in fade-in slide-in-from-top-2 duration-200"
                  style={{ backgroundColor: 'rgba(15, 15, 15, 0.95)' }}
                >
                  {categories.map((cat, i) => (
                    <Link
                      key={i}
                      href={cat.href}
                      className="block p-3 rounded-xl hover:bg-amber-400/10 transition-all group"
                    >
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        {cat.name}
                        <FontAwesomeIcon icon={faArrowRight} className="text-[10px] text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5 normal-case">
                        {cat.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-amber-400 transition-colors whitespace-nowrap">
              Maison
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors whitespace-nowrap">
              Concierge
            </Link>
          </nav>

          {/* RIGHT ACTION ICONS */}
          {/* FIX 5: tighter gap on the smallest screens so 4 icons + hamburger
              + logo never overflow the header width */}
          <div className="flex items-center gap-0.5 sm:gap-2 shrink-0 ml-auto">
            
            {/* Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 sm:p-2.5 rounded-xl text-xs sm:text-sm text-neutral-300 hover:text-amber-400 hover:bg-white/5 transition-all"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-1.5 sm:p-2.5 rounded-xl text-xs sm:text-sm text-amber-400 hover:bg-white/5 transition-all"
              aria-label="Toggle Theme"
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
            
            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className="relative p-1.5 sm:p-2.5 rounded-xl text-xs sm:text-sm text-neutral-300 hover:text-amber-400 hover:bg-white/5 transition-all"
            >
              <FontAwesomeIcon icon={faHeart} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-black text-[9px] flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative p-1.5 sm:p-2.5 rounded-xl text-xs sm:text-sm text-neutral-300 hover:text-amber-400 hover:bg-white/5 transition-all"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-black font-black text-[9px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login CTA */}
            {/* "Login" shows from lg (compact, always fits alongside the nav).
                Full "VIP Access" replaces it from xl+ where there's more room. */}
            <Link 
              href="/login" 
              className="hidden lg:flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 xl:px-5 py-2.5 rounded-xl bg-amber-400 text-black hover:bg-amber-300 active:scale-95 transition-all shadow-lg ml-1 xl:ml-2 whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="">Sign in</span>
            </Link>

          </div>

        </div>

        {/* SEARCH BAR OVERLAY */}
        {isSearchOpen && (
          <div className="p-3 sm:p-4 border-t border-amber-500/20 bg-black/60 rounded-b-3xl animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-amber-400 text-sm shrink-0" />
              <input 
                type="text" 
                placeholder="Search luxury timepieces, leather goods..." 
                className="w-full min-w-0 bg-transparent text-sm font-medium text-white focus:outline-none placeholder:text-neutral-500"
                autoFocus
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-white/10 text-neutral-300 shrink-0"
              >
                ESC
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE DRAWER MENU */}
      {/* FIX 1 (continued): now `absolute inset-x-0 top-full mt-2` instead of
          `fixed inset-x-3 top-24` — sits perfectly under the header at every
          screen size instead of relying on a guessed pixel offset */}
      {isMobileMenuOpen && (
        <div 
          className="absolute inset-x-0 top-full mt-2 z-40 lg:hidden p-4 sm:p-6 rounded-3xl shadow-2xl backdrop-blur-3xl border border-amber-500/20 animate-in slide-in-from-top-4 duration-300"
          style={{ backgroundColor: 'rgba(15, 15, 15, 0.95)', color: '#ffffff' }}
        >
          <div className="space-y-6">
            <nav className="grid grid-cols-2 gap-3">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center bg-white/5 border border-white/10 hover:border-amber-400/50"
              >
                Home
              </Link>
              <Link 
                href="/products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center bg-white/5 border border-white/10 hover:border-amber-400/50"
              >
                Catalog
              </Link>
            </nav>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-400">
                Collections
              </span>
              {/* FIX 6: 2 columns on wider mobile/tablet (sm+), single column
                  on the smallest phones so text doesn't get cramped */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {categories.map((cat, i) => (
                  <Link
                    key={i}
                    href={cat.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{cat.name}</h4>
                      <p className="text-[10px] text-neutral-400 mt-0.5 truncate">{cat.desc}</p>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs text-amber-400 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest py-3.5 rounded-xl bg-amber-400 text-black"
              >
                <FontAwesomeIcon icon={faUser} /> VIP Member Login
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}