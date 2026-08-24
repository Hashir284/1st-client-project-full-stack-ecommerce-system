'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon, faArrowRight, faChevronLeft, faChevronRight } from '../../icons';

const SHOP_EDIT = [
  {
    type: 'watch',
    gender: 'men',
    cal: 'Cal. 01',
    tag: 'GRAB & GO',
    title: 'The Daily Wear',
    desc: 'Scratch-resistant, shock-tested pieces built for a watch that never leaves your wrist.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=700&q=80',
    link: '/categories/daily-wear',
  },
  {
    type: 'wallet',
    gender: 'men',
    cal: 'Cal. 02',
    tag: 'MINIMALIST CARRY',
    title: 'Slim Bifold Wallet',
    desc: 'Handcrafted genuine leather with RFID-blocking protection for essential cards and cash.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&q=80',
    link: '/categories/wallets',
  },
  {
    type: 'watch',
    gender: 'women',
    cal: 'Cal. 03',
    tag: 'GIFTED TOGETHER',
    title: 'Set for Two',
    desc: 'Matching his-and-hers dials, boxed together for anniversaries and proposals alike.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700&q=80',
    link: '/categories/set-for-two',
  },
  {
    type: 'wallet',
    gender: 'women',
    cal: 'Cal. 04',
    tag: 'EXECUTIVE CLASS',
    title: 'Classic Cardholder',
    desc: 'Ultra-thin profile featuring top-grain leather designed for effortless pocket access.',
    image: 'https://images.unsplash.com/photo-1606503825008-909a6331a333?w=700&q=80',
    link: '/categories/wallets',
  },
  {
    type: 'watch',
    gender: 'men',
    cal: 'Cal. 05',
    tag: 'FORMAL TO OFF-DUTY',
    title: 'Desk to Dinner',
    desc: 'One watch that clears a boardroom and a dinner reservation without missing a beat.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&q=80',
    link: '/categories/desk-to-dinner',
  },
  {
    type: 'wallet',
    gender: 'women',
    cal: 'Cal. 06',
    tag: 'TACTICAL GEAR',
    title: 'Armor Zip Wallet',
    desc: 'Heavy-duty zip-around wallet crafted with reinforced stitching and military-grade durability.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
    link: '/categories/wallets',
  },
  {
    type: 'watch',
    gender: 'women',
    cal: 'Cal. 07',
    tag: 'RUN LIMITED',
    title: 'Vault Exclusives',
    desc: 'Numbered editions held back from the main catalog, released only to the Sovereign Club.',
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=700&q=80',
    link: '/categories/vault',
  },
];

export default function ShopTheEditCarousel() {
  const trackRef = useRef(null);
  const [genderFilter, setGenderFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [scrollPct, setScrollPct] = useState(0);

  const filteredItems = SHOP_EDIT.filter((item) => {
    const matchesGender = genderFilter === 'all' || item.gender === genderFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesGender && matchesType;
  });

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

  const handleGenderChange = (val) => {
    setGenderFilter(val);
    resetScroll();
  };

  const handleTypeChange = (val) => {
    setTypeFilter(val);
    resetScroll();
  };

  const resetScroll = () => {
    setScrollPct(0);
    if (trackRef.current) {
      trackRef.current.scrollLeft = 0;
    }
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
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
              Movements & accessories — scroll through to find the one built for yours.
            </p>
          </div>

          {/* ARROWS — desktop/tablet only */}
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

        {/* DOUBLE FILTER SECTION */}
        <div className="flex flex-col gap-4 mb-8">
          {/* GENDER ROW */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-black uppercase tracking-wider min-w-[70px]" style={{ color: 'var(--accent-gold)' }}>
              Gender:
            </span>
            {[
              { label: 'All Gender', value: 'all' },
              { label: 'Men', value: 'men' },
              { label: 'Women', value: 'women' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => handleGenderChange(f.value)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0"
                style={{
                  backgroundColor: genderFilter === f.value ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                  color: genderFilter === f.value ? '#000' : 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* CATEGORY ROW */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-black uppercase tracking-wider min-w-[70px]" style={{ color: 'var(--accent-gold)' }}>
              Type:
            </span>
            {[
              { label: 'All Items', value: 'all' },
              { label: 'Watches', value: 'watch' },
              { label: 'Wallets', value: 'wallet' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => handleTypeChange(f.value)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0"
                style={{
                  backgroundColor: typeFilter === f.value ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                  color: typeFilter === f.value ? '#000' : 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* TRACK WRAPPER */}
        <div className="relative">
          {/* MOBILE OVERLAY ARROWS */}
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
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
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
                      className="absolute top-4 left-4 text-[10px] font-black px-2.5 py-1 rounded-lg tracking-widest uppercase"
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
              ))
            ) : (
              <div className="w-full py-12 text-center text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                No items match the selected combination.
              </div>
            )}
          </div>
        </div>

        {/* PROGRESS BAR */}
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