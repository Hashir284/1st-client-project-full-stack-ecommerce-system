'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FontAwesomeIcon,
  faClock,
  faBriefcase,
  faCrown,
  faStar,
  faArrowRight,
  faGem,
  faTag,
  faHeart,
  faCartShopping,
  faTruckFast,
  faShieldHalved,
  faRotateLeft,
  faEnvelope
} from '../icons'; // Adjust path if needed
import { useApp } from '../Context/context';
import Footer from './Footer';
import Header from './Header';

const BRAND_FEATURES = [
  { icon: faTruckFast, title: 'Express Worldwide Shipping', desc: 'Complimentary insured shipping on orders over $200' },
  { icon: faShieldHalved, title: '5-Year International Warranty', desc: 'Every timepiece verified with unique serial ID' },
  { icon: faRotateLeft, title: '30-Day Concierge Returns', desc: 'Hassle-free returns with doorstep collection' },
  { icon: faCrown, title: 'Sovereign Club Points', desc: 'Earn reward points on every horological purchase' },
];

const CATEGORIES = [
  { name: 'Swiss Chronographs', icon: faClock, count: '140+ Models', slug: 'watches', bgImg: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80' },
  { name: 'Automatic Skeleton', icon: faCrown, count: '85+ Models', slug: 'skeleton', bgImg: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80' },
  { name: 'Leather Strap Classics', icon: faBriefcase, count: '110+ Models', slug: 'leather-straps', bgImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80' },
  { name: 'Minimalist & Dress', icon: faTag, count: '65+ Models', slug: 'minimalist', bgImg: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80' },
];

const FLASH_DEAL_PRODUCT = {
  id: 'flash-1',
  name: 'Noir Sovereign Chronograph Gold-Plated 42mm',
  category: 'Swiss Chronographs',
  originalPrice: 850,
  salePrice: 599,
  stockLeft: 14,
  totalStock: 50,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
};

const FEATURED_PRODUCTS = [
  { id: 'p1', name: 'Royal Monarch Automatic Chronograph', price: 499, oldPrice: 650, category: 'Chronograph', rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80', tag: 'Best Seller' },
  { id: 'p2', name: 'Grand Heritage Tourbillon Rose Gold', price: 1280, oldPrice: 1540, category: 'Tourbillon', rating: 5.0, reviews: 44, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80', tag: 'Limited' },
  { id: 'p3', name: 'Aero GMT Dual Time Titanium', price: 650, oldPrice: 820, category: 'GMT Series', rating: 4.8, reviews: 62, image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80', tag: 'Trending' },
  { id: 'p4', name: 'Vintage Automatic Skeleton Dial', price: 750, oldPrice: 890, category: 'Skeleton', rating: 5.0, reviews: 85, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', tag: 'Exclusive' },
  { id: 'p5', name: 'Onyx Black Stainless Diver 300m', price: 420, oldPrice: 560, category: 'Divers', rating: 4.9, reviews: 210, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80', tag: 'Popular' },
  { id: 'p6', name: 'Cellini Gold Mesh Ultra-Slim', price: 620, oldPrice: 780, category: 'Dress Watch', rating: 4.7, reviews: 38, image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=80', tag: 'Slim' },
  { id: 'p7', name: 'Heritage Leather Dial Field Watch', price: 385, oldPrice: 450, category: 'Field Series', rating: 4.6, reviews: 31, image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&q=80', tag: 'Classic' },
  { id: 'p8', name: 'Platinum Sapphire Edition Chrono', price: 1410, oldPrice: 1800, category: 'Chronograph', rating: 5.0, reviews: 16, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80', tag: 'Masterpiece' },
];

const LOOKBOOKS = [
  { title: 'The Executive Suite', desc: 'Sleek stainless steel chronographs paired with bespoke tailoring.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80' },
  { title: 'Weekend Gala', desc: 'Rose gold skeleton dials designed for evening high-society events.', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80' },
  { title: 'Deep Sea Explorations', desc: '300m water-resistant mechanical divers built for high performance.', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80' }
];

const REVIEWS = [
  { name: 'Arthur Pendelton', role: 'Watch Collector', text: 'The finishing on the Royal Monarch watch is comparable to Swiss luxury brands 5x the price. Magnificent packaging!', rating: 5 },
  { name: 'Eleanor Vance', role: 'Horology Critic', text: 'Precision movement and flawless sapphire glass. Noir & Gold delivered perfection in 3 days.', rating: 5 },
  { name: 'Harrison Forde', role: 'VIP Collector', text: 'Customer service is unmatched. The automatic rotor sweep is silky smooth. Pure elegance.', rating: 5 },
];

const CRAFTSMANSHIP_STEPS = [
  { title: 'Swiss Movement', desc: 'Precision engineered automatic mechanics with 48-hour power reserve.' },
  { title: 'Sapphire Crystal', desc: 'Scratch-proof dual AR-coated crystal glass for glare-free visibility.' },
  { title: '316L Stainless Steel', desc: 'Corrosion-resistant surgical steel forged at extreme temperatures.' },
  { title: 'Hand-Assembled', desc: 'Inspected and certified individually by master watchmakers.' },
];

export default function Home() {
  const [activeLookbook, setActiveLookbook] = useState(0);
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useApp();

  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isMobileMenuOpen]);

  return (
    <div>
      <Header />
      <div 
        onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)} 
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} 
        className="transition-colors duration-300"
      >
        {/* HERO SECTION */}
        <section 
          className="relative pt-22 py-14 lg:py-22 overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-sm"
                style={{
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  backgroundColor: 'rgba(212, 175, 55, 0.08)'
                }}
              >
                2026 Sovereign Edition <FontAwesomeIcon icon={faGem} />
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] lg:leading-[1.25]">
                Precision Horology In
                <span style={{ color: 'var(--accent-gold)' }}> Noir & Gold</span> Craft.
              </h1>

              <p className="text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Discover Swiss-inspired mechanical chronographs, tourbillons, and hand-stitched leather timepieces forged for watch purists worldwide.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/products"
                  className="px-8 py-4 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-2xl transition-all active:scale-95 flex items-center gap-3 hover:brightness-110"
                  style={{
                    backgroundColor: 'var(--accent-gold)',
                    color: 'var(--black)'
                  }}
                >
                  Explore Watches <FontAwesomeIcon icon={faArrowRight} />
                </Link>

                <Link
                  href="/about"
                  className="px-8 py-4 font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:brightness-125"
                  style={{
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-primary)'
                  }}
                >
                  Our Heritage
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div
                className="w-full max-w-md h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl relative group"
                style={{ border: '1px solid var(--accent-gold)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
                  alt="Luxury Timepiece Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
                  <div>
                    <span 
                      className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded mb-2 inline-block"
                      style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--black)' }}
                    >
                      Horology Series
                    </span>
                    <h3 className="text-xl font-bold text-white">The Royal Chronograph 42mm</h3>
                    <p className="text-xs text-gray-300 mt-1">Caliber 9001 Automatic Movement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND VALUE PROPOSITIONS */}
        <section className="py-12" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BRAND_FEATURES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl flex items-start gap-4 transition-all hover:translate-y-[-2px]"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                >
                  <div className="text-2xl p-3 rounded-xl" style={{ color: 'var(--accent-gold)', backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CRAFTSMANSHIP HIGHLIGHT */}
        <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase font-extrabold tracking-widest" style={{ color: 'var(--accent-gold)' }}>Horological Artistry</span>
              <h2 className="text-3xl font-black mt-2">Built to Last Generations</h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Every timepiece undergoes 200+ hours of micro-engineering and precision testing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CRAFTSMANSHIP_STEPS.map((step, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl border transition-all hover:border-[var(--accent-gold)]"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                >
                  <FontAwesomeIcon icon={faShieldHalved} className="text-xl mb-3" style={{ color: 'var(--accent-gold)' }} />
                  <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FLASH DEAL SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className="rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--accent-gold)' }}
          >
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white" style={{ backgroundColor: 'var(--brand-red)' }}>
                  Flash Horology Deal
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--accent-gold)' }}>
                  Ends in: 08h 42m 19s
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black">{FLASH_DEAL_PRODUCT.name}</h2>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Precision Japanese Quartz Movement, 100m Water Resistance, Sapphire Crystal Glass, and 24K Gold-plated stainless steel bezel.
              </p>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--accent-gold)' }}>
                  ${FLASH_DEAL_PRODUCT.salePrice}
                </span>
                <span className="text-base line-through opacity-50 font-bold" style={{ color: 'var(--text-secondary)' }}>
                  ${FLASH_DEAL_PRODUCT.originalPrice}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Stock Left: {FLASH_DEAL_PRODUCT.stockLeft}</span>
                  <span className="opacity-60">Total: {FLASH_DEAL_PRODUCT.totalStock}</span>
                </div>
                <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(FLASH_DEAL_PRODUCT.stockLeft / FLASH_DEAL_PRODUCT.totalStock) * 100}%`, backgroundColor: 'var(--accent-gold)' }}
                  ></div>
                </div>
              </div>

              <button
                className="px-8 py-4 w-full sm:w-auto font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 hover:brightness-110 shadow-lg"
                style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--black)' }}
              >
                <FontAwesomeIcon icon={faCartShopping} /> Claim Flash Offer Now
              </button>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={FLASH_DEAL_PRODUCT.image}
                alt={FLASH_DEAL_PRODUCT.name}
                className="w-full max-w-md h-80 sm:h-96 object-cover rounded-2xl shadow-xl"
                style={{ border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>
        </section>

        {/* CURATED CATEGORIES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black">Watch Collections</h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Explore timepieces categorized by movement and style
              </p>
            </div>
            <Link href="/categories" className="text-xs font-bold hover:underline flex items-center gap-1.5" style={{ color: 'var(--accent-gold)' }}>
              Browse All <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={idx}
                href={`/categories/${cat.slug}`}
                className="group relative h-72 rounded-3xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.02]"
                style={{ border: '1px solid var(--border-color)' }}
              >
                <img src={cat.bgImg} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-2xl mb-2" style={{ color: 'var(--accent-gold)' }}>
                    <FontAwesomeIcon icon={cat.icon} />
                  </div>
                  <h3 className="font-extrabold text-lg">{cat.name}</h3>
                  <p className="text-xs text-gray-300 mt-1">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED CATALOG GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black">Signature Timepieces</h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Top rated models loved by collectors worldwide
              </p>
            </div>

            <Link href="/products" className="text-xs font-bold hover:underline flex items-center gap-1.5" style={{ color: 'var(--accent-gold)' }}>
              View Full Catalog ({FEATURED_PRODUCTS.length}) <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-2xl"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-black/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.tag && (
                      <span
                        className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-md"
                        style={{ backgroundColor: 'var(--brand-red)' }}
                      >
                        {product.tag}
                      </span>
                    )}
                    <button
                      className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-black/30 text-white hover:text-rose-500 transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <FontAwesomeIcon icon={faHeart} className="text-xs" />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                      <span>{product.category}</span>
                      <span className="font-bold flex items-center gap-1" style={{ color: 'var(--accent-gold)' }}>
                        <FontAwesomeIcon icon={faStar} className="text-[10px]" /> {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-bold text-sm line-clamp-1 transition-colors hover:text-[var(--accent-gold)]">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                </div>

                <div
                  className="px-5 pb-5 pt-3 flex items-center justify-between"
                  style={{ borderTop: '1px solid var(--border-color)' }}
                >
                  <div>
                    <span className="text-base font-black">${product.price}</span>
                    {product.oldPrice && (
                      <span className="text-xs line-through ml-2 opacity-50" style={{ color: 'var(--text-secondary)' }}>
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>

                  <button
                    className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1.5 hover:brightness-110"
                    style={{
                      backgroundColor: 'var(--accent-gold)',
                      color: 'var(--black)'
                    }}
                  >
                    <FontAwesomeIcon icon={faCartShopping} /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LOOKBOOK INTERACTIVE SHOWCASE */}
        <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase font-extrabold tracking-widest" style={{ color: 'var(--accent-gold)' }}>Style Guide</span>
              <h2 className="text-3xl sm:text-4xl font-black mt-2">The Horology Lookbook</h2>
              <p className="text-xs sm:text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                Curated watch styling suggestions for galas, executive boardrooms, and outdoor expeditions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8">
              {LOOKBOOKS.map((lb, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLookbook(index)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    backgroundColor: activeLookbook === index ? 'var(--accent-gold)' : 'var(--bg-primary)',
                    color: activeLookbook === index ? 'var(--black)' : 'var(--text-primary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {lb.title}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl relative">
                <img src={LOOKBOOKS[activeLookbook].image} alt="Lookbook" className="w-full h-full object-cover" />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-2xl font-black">{LOOKBOOKS[activeLookbook].title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {LOOKBOOKS[activeLookbook].desc}
                </p>
                <ul className="space-y-3 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                  <li className="flex items-center gap-2"><FontAwesomeIcon icon={faGem} style={{ color: 'var(--accent-gold)' }} /> Swiss-built mechanical precision</li>
                  <li className="flex items-center gap-2"><FontAwesomeIcon icon={faGem} style={{ color: 'var(--accent-gold)' }} /> Genuine Italian alligator leather straps</li>
                  <li className="flex items-center gap-2"><FontAwesomeIcon icon={faGem} style={{ color: 'var(--accent-gold)' }} /> Deluxe wooden collector presentation box</li>
                </ul>
                <Link
                  href="/products"
                  className="inline-block px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--black)' }}
                >
                  Shop This Edition
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY GALLERY */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FontAwesomeIcon icon={faCrown} className="text-3xl mb-2" style={{ color: 'var(--accent-gold)' }} />
          <h2 className="text-2xl font-black">#NoirAndGoldWrist</h2>
          <p className="text-xs mb-8" style={{ color: 'var(--text-secondary)' }}>Share your timepiece setups to be featured in our global horology gallery.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80" alt="Wrist shot 1" className="rounded-2xl h-48 w-full object-cover hover:scale-105 transition-all duration-300" />
            <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80" alt="Wrist shot 2" className="rounded-2xl h-48 w-full object-cover hover:scale-105 transition-all duration-300" />
            <img src="https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&q=80" alt="Wrist shot 3" className="rounded-2xl h-48 w-full object-cover hover:scale-105 transition-all duration-300" />
            <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80" alt="Wrist shot 4" className="rounded-2xl h-48 w-full object-cover hover:scale-105 transition-all duration-300" />
          </div>
        </section>

        {/* REVIEWS & TESTIMONIALS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black">Collector Feedback</h2>
            <p className="text-xs sm:text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Verified reviews from watch enthusiasts worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl shadow-md flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
              >
                <div className="space-y-4">
                  <div className="flex gap-1" style={{ color: 'var(--accent-gold)' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    "{rev.text}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <h4 className="font-bold text-sm">{rev.name}</h4>
                  <p className="text-[11px]" style={{ color: 'var(--accent-gold)' }}>{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VIP NEWSLETTER BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div
            className="rounded-3xl p-8 sm:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid var(--accent-gold)',
              color: 'var(--text-primary)'
            }}
          >
            <div className="max-w-xl z-10">
              <span 
                className="text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border"
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                  color: 'var(--accent-gold)', 
                  borderColor: 'rgba(212, 175, 55, 0.2)' 
                }}
              >
                Privileged Circle
              </span>
              <h2 className="text-2xl sm:text-4xl font-black mt-3 mb-3">
                Unlock VIP Vault Access
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Subscribe for immediate 15% off your first watch order, priority allocation on limited tourbillon drops, and private vault invitations.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 z-10">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email for invitation..."
                  className="px-5 py-3.5 pl-10 rounded-xl text-xs focus:outline-none min-w-[280px] shadow-inner"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)'
                  }}
                />
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3.5 top-4 text-xs opacity-80" style={{ color: 'var(--accent-gold)' }} />
              </div>
              <button
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg"
                style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--black)' }}
              >
                Request Access
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}