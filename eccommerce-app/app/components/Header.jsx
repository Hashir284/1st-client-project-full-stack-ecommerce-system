'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FontAwesomeIcon, 
  faMagnifyingGlass, 
  faHeart, 
  faCartShopping, 
  faUser,
  faBars,
  faXmark,
  faGem,
  faHouse,
  faStore,
  faCircleInfo,
  faPhone
} from '../icons';

export default function Header({ cartCount = 3, wishlistCount = 5 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mobile Drawer Links
  const mobileNavLinks = [
    { name: 'Home', href: '/', icon: faHouse },
    { name: 'Shop', href: '/products', icon: faStore },
    { name: 'About', href: '/about', icon: faCircleInfo },
    { name: 'Contact', href: '/contact', icon: faPhone },
    { name: 'Wishlist', href: '/wishlist', icon: faHeart },
    { name: 'Login/Register', href: '/login', icon: faUser },
  ];

  // Desktop Header Links
  const desktopNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* TOP FLOATING HEADER */}
      <div className="sticky top-0 z-30 px-2 sm:px-4 lg:px-8 py-2 sm:py-3">
        <header 
          className="mx-auto rounded-2xl sm:rounded-3xl backdrop-blur-2xl transition-all duration-300 shadow-md"
          style={{ 
            backgroundColor: 'rgba(20, 20, 20, 0.85)', 
            border: '1px solid rgba(212, 175, 55, 0.25)',
            color: '#ffffff'
          }}
        >
          <div className="px-3 sm:px-5 md:px-8 h-14 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
            
            {/* LEFT: Toggle & Logo */}
            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 shrink">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-xl text-[18px] sm:text-lg text-amber-400 hover:bg-white/10 active:scale-95 transition-all shrink-0"
                aria-label="Toggle Navigation"
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
              </button>

              <Link 
                href="/" 
                className="text-[16px] sm:text-xl md:text-2xl font-black tracking-tight sm:tracking-widest flex items-center gap-1.5 sm:gap-2 truncate"
              >
                <FontAwesomeIcon icon={faGem} className="text-amber-400 text-[14px] sm:text-base md:text-xl shrink-0" />
                <span className="truncate">NOIR<span className="text-amber-400">&</span>GOLD</span>
              </Link>
            </div>

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-300">
              {desktopNavLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href} 
                  className="hover:text-amber-400 transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* RIGHT: Search Bar, Wishlist, Cart & Login */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Search Toggle */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-[16px] sm:text-sm text-neutral-300 hover:text-amber-400 hover:bg-white/5 transition-all"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              {/* Wishlist Icon (Desktop Only) */}
              <Link 
                href="/wishlist" 
                className="hidden lg:flex relative p-2 rounded-xl text-xs sm:text-sm text-neutral-300 hover:text-amber-400 hover:bg-white/5 transition-all"
                aria-label="Wishlist"
              >
                <FontAwesomeIcon icon={faHeart} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-black text-[9px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon (Desktop Only) */}
              <Link 
                href="/cart" 
                className="hidden lg:flex relative p-2 rounded-xl text-xs sm:text-sm text-neutral-300 hover:text-amber-400 hover:bg-white/5 transition-all"
                aria-label="Cart"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-black font-black text-[9px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Sign In CTA */}
              <Link 
                href="/login" 
                className="hidden lg:flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl bg-amber-400 text-black hover:bg-amber-300 transition-all shadow-lg ml-2 whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Sign in</span>
              </Link>
            </div>

          </div>

          {/* SEARCH OVERLAY */}
          {isSearchOpen && (
            <div className="p-2.5 sm:p-4 border-t border-amber-500/20 bg-black/90 rounded-b-2xl sm:rounded-b-3xl">
              <div className="max-w-2xl mx-auto flex items-center gap-2.5 sm:gap-3">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-amber-400 text-[16px] sm:text-sm shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-transparent text-[14px] sm:text-sm text-white focus:outline-none placeholder:text-neutral-500"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-[11px] font-extrabold px-2 py-0.5 sm:py-1 rounded bg-white/10 text-neutral-300 shrink-0"
                >
                  ESC
                </button>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* MOBILE FULL-SCREEN DRAWER MENU */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden bg-neutral-950/98 flex flex-col justify-between p-5 animate-in slide-in-from-top duration-200 overflow-y-auto"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[18px] font-black tracking-wider flex items-center gap-2 text-white"
              >
                <FontAwesomeIcon icon={faGem} className="text-amber-400 text-[16px]" />
                <span>NOIR<span className="text-amber-400">&</span>GOLD</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-amber-400 p-2 text-[20px]"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <nav className="mt-5 flex flex-col gap-4">
              {mobileNavLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 text-white text-[16px] font-bold hover:text-amber-400 transition-colors py-1"
                >
                  <FontAwesomeIcon icon={link.icon} className="text-amber-400 text-[18px] w-5 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* FIXED BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-amber-500/20 py-2 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around text-neutral-400 max-w-md mx-auto">
          <Link href="/products" className="flex flex-col items-center gap-0.5 hover:text-amber-400 transition-colors p-1">
            <FontAwesomeIcon icon={faStore} className="text-[18px] sm:text-base" />
            <span className="text-[11px] sm:text-[10px] font-bold tracking-tight">Shop</span>
          </Link>

          <Link href="/wishlist" className="relative flex flex-col items-center gap-0.5 hover:text-amber-400 transition-colors p-1">
            <FontAwesomeIcon icon={faHeart} className="text-[18px] sm:text-base" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3 w-4 h-4 rounded-full bg-rose-600 text-white font-black text-[9px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="text-[11px] sm:text-[10px] font-bold tracking-tight">Wishlist</span>
          </Link>

          <Link href="/cart" className="relative flex flex-col items-center gap-0.5 hover:text-amber-400 transition-colors p-1">
            <FontAwesomeIcon icon={faCartShopping} className="text-[18px] sm:text-base" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3 w-4 h-4 rounded-full bg-amber-400 text-black font-black text-[9px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-[11px] sm:text-[10px] font-bold tracking-tight">Cart</span>
          </Link>

          <Link href="/login" className="flex flex-col items-center gap-0.5 hover:text-amber-400 transition-colors p-1">
            <FontAwesomeIcon icon={faUser} className="text-[18px] sm:text-base" />
            <span className="text-[11px] sm:text-[10px] font-bold tracking-tight">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
}