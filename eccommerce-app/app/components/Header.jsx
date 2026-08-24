'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FontAwesomeIcon, 
  faMagnifyingGlass, 
  faHeart, 
  faCartShopping, 
  faUser, 
  faXmark,
  faGem,
  faHouse,
  faStore,
  faCircleInfo,
  faPhone
} from '../icons';
import { useApp } from '../Context/context';

export default function Header({ cartCount = 3, wishlistCount = 5 }) {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Close search bar on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mobileNavLinks = [
    { name: 'Home', href: '/', icon: faHouse },
    { name: 'Shop', href: '/products', icon: faStore },
    { name: 'About', href: '/about', icon: faCircleInfo },
    { name: 'Contact', href: '/contact', icon: faPhone },
    { name: 'Wishlist', href: '/wishlist', icon: faHeart, count: wishlistCount },
    { name: 'Cart', href: '/cart', icon: faCartShopping, count: cartCount },
    { name: 'Login / Register', href: '/login', icon: faUser },
  ];

  const desktopNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* MOBILE TOP BAR WITH LOGO AND MENU BUTTON */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 px-4 py-3 bg-[var(--bg-secondary)]/90 backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between shadow-md">
        {/* Menu Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-10 h-10 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl flex flex-col justify-center items-center gap-[4px] active:scale-95 transition-transform"
          aria-label="Open Navigation"
        >
          <span className="w-4 h-[2px] bg-[var(--accent-gold)] rounded-full"></span>
          <span className="w-4 h-[2px] bg-[var(--accent-gold)] rounded-full"></span>
          <span className="w-4 h-[2px] bg-[var(--accent-gold)] rounded-full"></span>
        </button>

        {/* Mobile Header Logo */}
        <Link href="/" className="text-xl font-black tracking-widest flex items-center gap-2">
          <FontAwesomeIcon icon={faGem} className="text-[var(--accent-gold)] w-5 h-5 shrink-0" />
          <span>NOIR<span className="text-[var(--accent-gold)]">&</span>GOLD</span>
        </Link>

        {/* Cart Quick Icon for Mobile Header */}
        <Link href="/cart" className="relative p-2 rounded-xl text-[var(--text-secondary)]">
          <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4 text-[var(--accent-gold)]" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[var(--brand-red)] text-[var(--text-on-dark)] font-black text-[9px] flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* DESKTOP HEADER */}
      <div className="hidden lg:block sticky top-0 z-30 px-8 py-3">
        <header className="mx-auto rounded-3xl backdrop-blur-2xl transition-all duration-300 shadow-md bg-[var(--bg-secondary)]/85 border border-[var(--border-color)] text-[var(--text-primary)] relative overflow-hidden">
          <div className="px-8 h-20 flex items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-black tracking-widest flex items-center gap-2 truncate">
              <FontAwesomeIcon icon={faGem} className="text-[var(--accent-gold)] w-5 h-5 shrink-0" />
              <span>NOIR<span className="text-[var(--accent-gold)]">&</span>GOLD</span>
            </Link>

            <nav className="flex items-center gap-16 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              {desktopNavLinks.map((link, index) => (
                <Link key={index} href={link.href} className="hover:text-[var(--accent-gold)] transition-colors whitespace-nowrap">
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              {/* SEARCH TRIGGER BUTTON */}
              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className={`p-2 rounded-xl transition-all ${
                  isSearchOpen 
                    ? 'text-[var(--accent-gold)] bg-white/10' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:bg-white/5'
                }`}
                aria-label="Toggle Search Bar"
              >
                <FontAwesomeIcon icon={isSearchOpen ? faXmark : faMagnifyingGlass} className="w-4 h-4" />
              </button>

              <Link href="/wishlist" className="relative p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:bg-white/5 transition-all">
                <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--brand-red)] text-[var(--text-on-dark)] font-black text-[9px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="relative p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:bg-white/5 transition-all">
                <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--brand-red)] text-[var(--text-on-dark)] font-black text-[9px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link href="/login" className="flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl bg-[var(--accent-gold)] text-[var(--black)] hover:bg-[var(--accent-gold-hover)] transition-all shadow-lg ml-2 whitespace-nowrap">
                <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5" />
                <span>Sign in</span>
              </Link>
            </div>
          </div>

          {/* DROPDOWN SEARCH BAR WITH ESC BUTTON */}
          <div
            className={`transition-all duration-300 ease-in-out border-t border-[var(--border-color)] bg-[var(--bg-accent)] ${
              isSearchOpen ? 'max-h-20 opacity-100 py-3 px-8' : 'max-h-0 opacity-0 py-0 px-8 overflow-hidden'
            }`}
          >
            <div className="relative max-w-2xl mx-auto flex items-center">
              <input
                type="text"
                placeholder="Search watches, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={isSearchOpen}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl pl-11 pr-16 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] placeholder:text-[var(--text-secondary)] shadow-inner"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 text-[var(--text-secondary)] w-3.5 h-3.5 pointer-events-none"
              />
              
              {/* ESC BUTTON INSIDE SEARCH BAR */}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2.5 px-2 py-0.5 rounded-md bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-all active:scale-95"
                title="Close (Esc)"
              >
                ESC
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* MOBILE SIDEBAR DRAWER */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <aside 
          className={`relative w-[75%] max-w-[290px] min-h-full bg-[var(--bg-accent)] text-[var(--text-primary)] pt-8 pb-6 px-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 -right-14 w-10 h-10 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-xl active:scale-90 transition-transform"
            aria-label="Close Drawer"
          >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-[var(--accent-gold)]" />
          </button>

          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center pt-2 pb-2">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-black tracking-wider flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faGem} className="text-[var(--accent-gold)] w-6 h-6" />
                <span>NOIR<span className="text-[var(--accent-gold)]">&</span>GOLD</span>
              </Link>
            </div>

            <div className="relative my-2">
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl pl-10 pr-3 py-2 text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] placeholder:text-[var(--text-secondary)]"
              />
              <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] w-3.5 h-3.5" 
              />
            </div>

            <nav className="flex flex-col">
              {mobileNavLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 border-b border-[var(--border-color)] text-[15px] font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon 
                      icon={link.icon} 
                      className="text-[var(--accent-gold)] w-4 h-4 shrink-0 transition-transform group-hover:scale-110" 
                    />
                    <span>{link.name}</span>
                  </div>

                  {link.count !== undefined && link.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[var(--brand-red)] text-[var(--text-on-dark)]">
                      {link.count}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] text-center">
            © NOIR & GOLD
          </div>
        </aside>
      </div>
    </>
  );
}