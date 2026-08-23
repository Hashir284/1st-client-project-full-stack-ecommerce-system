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
      <div className="sticky top-0 z-30 px-3 md:px-4 lg:px-8 py-3 relative">
        <header 
          className="mx-auto rounded-3xl backdrop-blur-2xl transition-all duration-300 shadow-md"
          style={{ 
            backgroundColor: 'rgba(20, 20, 20, 0.75)', 
            border: '1px solid rgba(212, 175, 55, 0.25)',
            color: '#ffffff'
          }}
        >
          <div className="px-3 sm:px-5 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
            
            {/* LEFT: Toggle & Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-lg text-amber-400 hover:bg-white/10 active:scale-95 transition-all shrink-0"
                aria-label="Toggle Navigation"
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
              </button>

              <Link 
                href="/" 
                className="text-base sm:text-xl md:text-2xl font-black tracking-normal sm:tracking-widest shrink-0 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faGem} className="text-amber-400 text-xs sm:text-base md:text-xl shrink-0" />
                <span>NOIR<span className="text-amber-400">&</span>GOLD</span>
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
                className="p-2 rounded-xl text-xs sm:text-sm text-neutral-300 hover:text-amber-400 hover:bg-white/5 transition-all"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              {/* Wishlist Icon - Sirf Desktop Par Dikhega Jab Bottom Nav Hide Ho (hidden lg:flex) */}
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

              {/* Cart Icon - Sirf Desktop Par Dikhega Jab Bottom Nav Hide Ho (hidden lg:flex) */}
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
            <div className="p-3 sm:p-4 border-t border-amber-500/20 bg-black/80 rounded-b-3xl">
              <div className="max-w-2xl mx-auto flex items-center gap-3">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-amber-400 text-sm shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-neutral-500"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-white/10 text-neutral-300"
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
          className="fixed inset-0 z-50 lg:hidden bg-black/95 flex flex-col justify-between p-6 animate-in slide-in-from-top duration-300 overflow-y-auto"
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-black tracking-widest flex items-center gap-2 text-white"
              >
                <FontAwesomeIcon icon={faGem} className="text-amber-400" />
                <span>NOIR<span className="text-amber-400">&</span>GOLD</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-amber-400 p-2 text-xl"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-5">
              {mobileNavLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-white text-base font-bold hover:text-amber-400 transition-colors py-1"
                >
                  <FontAwesomeIcon icon={link.icon} className="text-amber-400 text-lg w-5 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* FIXED BOTTOM NAVIGATION BAR (Sirf Mobile & Tablet Par Show Hoga: lg:hidden) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-amber-500/20 py-2.5 px-4">
        <div className="flex items-center justify-around text-neutral-400">
          <Link href="/products" className="flex flex-col items-center gap-1 hover:text-amber-400 transition-colors">
            <FontAwesomeIcon icon={faStore} className="text-base" />
            <span className="text-[10px] font-bold tracking-wider">Shop</span>
          </Link>

          <Link href="/wishlist" className="relative flex flex-col items-center gap-1 hover:text-amber-400 transition-colors">
            <FontAwesomeIcon icon={faHeart} className="text-base" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-rose-600 text-white font-black text-[8px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="text-[10px] font-bold tracking-wider">Wishlist</span>
          </Link>

          <Link href="/cart" className="relative flex flex-col items-center gap-1 hover:text-amber-400 transition-colors">
            <FontAwesomeIcon icon={faCartShopping} className="text-base" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-amber-400 text-black font-black text-[8px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-[10px] font-bold tracking-wider">Cart</span>
          </Link>

          <Link href="/login" className="flex flex-col items-center gap-1 hover:text-amber-400 transition-colors">
            <FontAwesomeIcon icon={faUser} className="text-base" />
            <span className="text-[10px] font-bold tracking-wider">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
}