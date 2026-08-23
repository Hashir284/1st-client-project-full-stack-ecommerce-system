
'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon, faArrowRight, faChevronLeft, faChevronRight } from '../../icons'; // Adjust path if needed

const SHOP_EDIT = [
  {
    cal: 'Cal. 01',
    tag: 'GRAB & GO',
    title: 'The Daily Wear',
    desc: 'Scratch-resistant, shock-tested pieces built for a watch that never leaves your wrist.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=700&q=80',
    link: '/categories/daily-wear',
  },
  {
    cal: 'Cal. 02',
    tag: 'GIFTED TOGETHER',
    title: 'Set for Two',
    desc: 'Matching his-and-hers dials, boxed together for anniversaries and proposals alike.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700&q=80',
    link: '/categories/set-for-two',
  },
  {
    cal: 'Cal. 03',
    tag: 'FORMAL TO OFF-DUTY',
    title: 'Desk to Dinner',
    desc: 'One watch that clears a boardroom and a dinner reservation without missing a beat.',
    image: 'https://ronin.pk/cdn/shop/files/r13-luxe.webp?v=1748093533&width=3840',
    link: '/categories/desk-to-dinner',
  },
  {
    cal: 'Cal. 04',
    tag: 'LESS IS MORE',
    title: 'Quiet Luxury',
    desc: 'Slim cases, muted dials — for collectors who let the craftsmanship speak first.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&q=80',
    link: '/categories/quiet-luxury',
  },
  {
    cal: 'Cal. 05',
    tag: 'JUST LANDED',
    title: 'Fresh off the Bench',
    desc: 'The newest calibers to leave our workshop, still in their first week on shelf.',
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=700&q=80',
    link: '/categories/new-arrivals',
  },
  {
    cal: 'Cal. 06',
    tag: 'RUN LIMITED',
    title: 'Vault Exclusives',
    desc: 'Numbered editions held back from the main catalog, released only to the Sovereign Club.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04Sk0qm3qJvjFkkkPr9UVoqCRmxW0NwuT3pS0YBQJVqwKb1109UXMByA&s=10',
    link: '/categories/vault',
  },
];

export default function ShopTheEditCarousel() {
  const trackRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPct(max > 0 ? (el.scrollLeft / max) * 100 : 0);
  };

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section
      className="py-20 overflow-hidden relative"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span
              className="text-xs uppercase font-extrabold tracking-[0.25em] block mb-2"
              style={{ color: 'var(--accent-gold)' }}
            >
              PICKED BY CALIBER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Shop the <span style={{ color: 'var(--accent-gold)' }}>Edit</span>
            </h2>
            <p className="text-xs sm:text-sm mt-3 max-w-md" style={{ color: 'var(--text-secondary)' }}>
              Six movements, six moments — scroll through to find the one built for yours.
            </p>
          </div>

          {/* ARROWS — desktop/tablet only, inline with header */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--accent-gold)',
                color: 'var(--accent-gold)',
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--accent-gold)',
                color: 'var(--accent-gold)',
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          </div>
        </div>

        {/* TRACK WRAPPER — relative parent for mobile overlay arrows */}
        <div className="relative">
          {/* MOBILE OVERLAY ARROWS — vertically centered on the card image (h-72 = 18rem, center ~ 9rem) */}
          <button
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll left"
            className="sm:hidden absolute left-1 top-36 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--accent-gold)',
              color: 'var(--accent-gold)',
              opacity: 0.92,
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
          </button>

          <button
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll right"
            className="sm:hidden absolute right-1 top-36 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--accent-gold)',
              color: 'var(--accent-gold)',
              opacity: 0.92,
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          </button>

          {/* SCROLL TRACK */}
          <div
            ref={trackRef}
            onScroll={updateProgress}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {SHOP_EDIT.map((item, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[78%] sm:w-[48%] lg:w-[calc(25%-1.125rem)] rounded-3xl overflow-hidden group relative flex flex-col"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, var(--overlay-black-90), var(--overlay-black-40), transparent)`,
                    }}
                  ></div>

                  <span
                    className="absolute top-4 left-4 text-[10px] font-black px-2.5 py-1 rounded-lg tracking-widest"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--accent-gold)',
                      border: '1px solid var(--accent-gold)',
                    }}
                  >
                    {item.cal}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between -mt-10 relative z-10">
                  <div>
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-widest block mb-1"
                      style={{ color: 'var(--accent-gold)' }}
                    >
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={item.link}
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110"
                      style={{
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      Shop {item.title} <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIGNATURE PROGRESS LINE */}
        <div className="w-full h-[3px] rounded-full mt-8 overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{
              width: `${Math.max(scrollPct, 8)}%`,
              backgroundColor: 'var(--accent-gold)',
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}