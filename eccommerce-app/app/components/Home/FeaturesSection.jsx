'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  FontAwesomeIcon,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faStar,
  faCartShopping,
} from '../../icons'; // Adjust path if needed

const FILTERS = [
  { key: 'women', label: 'Women' },
  { key: 'men', label: 'Men' },
  { key: 'couple', label: 'Couple' },
  { key: 'new', label: 'New Arrival' },
];

const SHOWCASE_PRODUCTS = [
  // WOMEN — 10 items
  { id: 'w1', category: 'women', name: 'Petal Rose Gold Mesh Slim', price: 460, rating: 5, image: 'https://images.unsplash.com/photo-1657159810148-f6a1f3d74f7e?w=600&q=80' },
  { id: 'w2', category: 'women', name: 'Halo Mother-of-Pearl Dress', price: 520, rating: 5, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },
  { id: 'w3', category: 'women', name: 'Blossom Two-Tone Bangle Watch', price: 395, rating: 4, image: 'https://images.unsplash.com/photo-1640943704396-f83f07a476bf?w=600&q=80' },
  { id: 'w4', category: 'women', name: 'Ivory Pearl Dial Bracelet Watch', price: 445, rating: 5, image: 'https://images.unsplash.com/photo-1657159810148-f6a1f3d74f7e?w=600&q=80' },
  { id: 'w5', category: 'women', name: 'Willow Slim Gold Chain Watch', price: 410, rating: 4, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },
  { id: 'w6', category: 'women', name: 'Cascade Diamond-Cut Bezel Watch', price: 590, rating: 5, image: 'https://images.unsplash.com/photo-1640943704396-f83f07a476bf?w=600&q=80' },
  { id: 'w7', category: 'women', name: 'Serene Rose Quartz Dial Watch', price: 375, rating: 4, image: 'https://images.unsplash.com/photo-1657159810148-f6a1f3d74f7e?w=600&q=80' },
  { id: 'w8', category: 'women', name: 'Blush Enamel Petite Watch', price: 355, rating: 4, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },
  { id: 'w9', category: 'women', name: 'Aria Sunburst Dial Mesh Watch', price: 505, rating: 5, image: 'https://images.unsplash.com/photo-1640943704396-f83f07a476bf?w=600&q=80' },
  { id: 'w10', category: 'women', name: 'Lumen Champagne Gold Watch', price: 480, rating: 5, image: 'https://images.unsplash.com/photo-1657159810148-f6a1f3d74f7e?w=600&q=80' },

  // MEN — 14 items
  { id: 'm1', category: 'men', name: 'Foundry Titanium Dive 300m', price: 690, rating: 5, image: 'https://images.unsplash.com/photo-1689214105015-c0efaf1184d3?w=600&q=80' },
  { id: 'm2', category: 'men', name: 'Ledger Leather Strap Classic', price: 410, rating: 4, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },
  { id: 'm3', category: 'men', name: 'Ironclad Field Watch 40mm', price: 380, rating: 4, image: 'https://images.unsplash.com/photo-1640943704396-f83f07a476bf?w=600&q=80' },
  { id: 'm4', category: 'men', name: 'Sentinel Chronograph Steel', price: 610, rating: 5, image: 'https://images.unsplash.com/photo-1689214105015-c0efaf1184d3?w=600&q=80' },
  { id: 'm5', category: 'men', name: 'Anvil Rugged Utility Watch', price: 340, rating: 4, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },
  { id: 'm6', category: 'men', name: 'Marshal Black IP Bracelet Watch', price: 495, rating: 4, image: 'https://images.unsplash.com/photo-1640943704396-f83f07a476bf?w=600&q=80' },
  { id: 'm7', category: 'men', name: 'Cordage Brown Leather Aviator', price: 425, rating: 5, image: 'https://images.unsplash.com/photo-1689214105015-c0efaf1184d3?w=600&q=80' },
  { id: 'm8', category: 'men', name: 'Bastion GMT Dual Time', price: 720, rating: 5, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },
  { id: 'm9', category: 'men', name: 'Redwood Vintage Field Watch', price: 365, rating: 4, image: 'https://images.unsplash.com/photo-1640943704396-f83f07a476bf?w=600&q=80' },
  { id: 'm10', category: 'men', name: 'Voyager Titanium Sport Watch', price: 655, rating: 5, image: 'https://images.unsplash.com/photo-1689214105015-c0efaf1184d3?w=600&q=80' },
  { id: 'm11', category: 'men', name: 'Garrison Matte Black Diver', price: 470, rating: 4, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },
  { id: 'm12', category: 'men', name: 'Empire Rose Gold Steel Watch', price: 585, rating: 5, image: 'https://images.unsplash.com/photo-1640943704396-f83f07a476bf?w=600&q=80' },
  { id: 'm13', category: 'men', name: 'Northgate Canvas Strap Watch', price: 320, rating: 4, image: 'https://images.unsplash.com/photo-1689214105015-c0efaf1184d3?w=600&q=80' },
  { id: 'm14', category: 'men', name: 'Praetor Sapphire Crystal Watch', price: 745, rating: 5, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },

  // COUPLE — 4 items
  { id: 'cp1', category: 'couple', name: 'Meridian Matching Steel Duo', price: 880, rating: 5, image: 'https://images.unsplash.com/photo-1657159810148-f6a1f3d74f7e?w=600&q=80' },
  { id: 'cp2', category: 'couple', name: 'Aurora His & Hers Gift Set', price: 950, rating: 5, image: 'https://images.unsplash.com/photo-1689214105015-c0efaf1184d3?w=600&q=80' },
  { id: 'cp3', category: 'couple', name: 'Twin Flame Rose & Steel Set', price: 830, rating: 4, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },
  { id: 'cp4', category: 'couple', name: 'Union Leather Duo Box Set', price: 760, rating: 5, image: 'https://images.unsplash.com/photo-1640943704396-f83f07a476bf?w=600&q=80' },

  // NEW ARRIVAL — 3 items
  { id: 'n1', category: 'new', name: 'Drift Ceramic Bezel Diver', price: 610, rating: 4, image: 'https://images.unsplash.com/photo-1689214105015-c0efaf1184d3?w=600&q=80' },
  { id: 'n2', category: 'new', name: 'Obsidian Square Dial Automatic', price: 540, rating: 5, image: 'https://images.unsplash.com/photo-1758071348980-d1eed770f34f?w=600&q=80' },
  { id: 'n3', category: 'new', name: 'Frostline Silver Mesh Watch', price: 495, rating: 4, image: 'https://images.unsplash.com/photo-1640943704396-f83f07a476bf?w=600&q=80' },
];

export default function WomenMenCoupleNewArrivalSection() {
  const [activeFilter, setActiveFilter] = useState('women');
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const trackRef = useRef(null);

  const filtered = SHOWCASE_PRODUCTS.filter((p) => p.category === activeFilter);

  // Check karo ke content actually overflow ho raha hai ya nahi
  const checkOverflow = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // Chota buffer (2px) taake sub-pixel rounding false-positive na de
    setCanScroll(el.scrollWidth > el.clientWidth + 2);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
    setActiveIndex(0);
    // Filter change ke baad DOM update hone do, phir overflow check karo
    const id = requestAnimationFrame(checkOverflow);
    return () => cancelAnimationFrame(id);
  }, [activeFilter, checkOverflow]);

  useEffect(() => {
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [checkOverflow]);

  const updateActiveDot = () => {
  const el = trackRef.current;
  if (!el || !el.children.length) return;
  const maxScrollLeft = el.scrollWidth - el.clientWidth;
  // Agar scroll possible hi nahi (sab cards fit ho rahe hain)
  if (maxScrollLeft <= 0) {
    setActiveIndex(0);
    return;
  }
  // Scroll position ko proportion se map karo (0 to length-1)
  const scrollRatio = el.scrollLeft / maxScrollLeft;
  const idx = Math.round(scrollRatio * (filtered.length - 1));
  setActiveIndex(Math.min(Math.max(idx, 0), filtered.length - 1));
};

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el || !el.children.length) return;
    const cardWidth = el.children[0].offsetWidth + 24;
    el.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' });
  };

  const goToIndex = (idx) => {
    const el = trackRef.current;
    if (!el || !el.children[idx]) return;
    el.scrollTo({ left: el.children[idx].offsetLeft - 24, behavior: 'smooth' });
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-[0.25em] block mb-2" style={{ color: 'var(--accent-gold)' }}>
            SHOP BY WHO IT'S FOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Find Their <span style={{ color: 'var(--accent-gold)' }}>Perfect Fit</span>
          </h2>
        </div>

        {/* FILTER TABS */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2 mb-10 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300"
              style={{
                backgroundColor: activeFilter === f.key ? 'var(--accent-gold)' : 'transparent',
                color: activeFilter === f.key ? 'var(--black)' : 'var(--text-secondary)',
                border: activeFilter === f.key ? 'none' : '1px solid var(--border-color)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* CAROUSEL */}
        <div className="relative">
          {/* Arrows sirf tab dikhenge jab content overflow ho raha ho (canScroll === true) */}
          {canScroll && (
            <>
              <button
                onClick={() => scrollByAmount(-1)}
                aria-label="Scroll left"
                className="absolute left-1 sm:-left-5 top-24 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', opacity: 0.95 }}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
              </button>

              <button
                onClick={() => scrollByAmount(1)}
                aria-label="Scroll right"
                className="absolute right-1 sm:-right-5 top-24 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', opacity: 0.95 }}
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
              </button>
            </>
          )}

          {filtered.length === 0 ? (
            <p className="text-center text-sm py-10" style={{ color: 'var(--text-secondary)' }}>
              No pieces in this collection yet.
            </p>
          ) : (
            <div
              ref={trackRef}
              onScroll={updateActiveDot}
              className={`flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide ${!canScroll ? 'justify-center sm:justify-start' : ''}`}
              style={{ scrollbarWidth: 'none' }}
            >
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="snap-start shrink-0 w-[46%] sm:w-[32%] lg:w-[calc(25%-1.125rem)] rounded-2xl overflow-hidden flex flex-col"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                >
                  <div className="relative h-48 w-full overflow-hidden bg-white/5">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <button
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md"
                      style={{ backgroundColor: 'var(--overlay-black-40)', color: 'var(--text-primary)' }}
                      aria-label="Add to wishlist"
                    >
                      <FontAwesomeIcon icon={faHeart} className="text-[11px]" />
                    </button>
                  </div>

                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm line-clamp-1 mb-1.5">{product.name}</h3>
                      <div className="flex gap-0.5 mb-1.5" style={{ color: 'var(--accent-gold)' }}>
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="text-[9px]"
                            style={{ opacity: i < product.rating ? 1 : 0.25 }}
                          />
                        ))}
                      </div>
                      <p className="text-sm sm:text-base font-black" style={{ color: 'var(--accent-gold)' }}>
                        Rs. {product.price.toLocaleString()}
                      </p>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="mt-3 w-full py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all hover:brightness-110"
                      style={{ border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)' }}
                    >
                      <FontAwesomeIcon icon={faCartShopping} className="text-[10px]" /> View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAGINATION DOTS — sirf tab jab scroll possible ho */}
        {canScroll && filtered.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {filtered.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                aria-label={`Go to item ${idx + 1}`}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === idx ? '1.75rem' : '0.625rem',
                  backgroundColor: activeIndex === idx ? 'var(--accent-gold)' : 'var(--border-color)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}