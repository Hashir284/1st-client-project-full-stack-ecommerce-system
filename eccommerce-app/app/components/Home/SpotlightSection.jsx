'use client';

import Link from 'next/link';

export default function SpotlightSection() {
  const product = {
    subTitle: 'PREMIUM MEN’S TRUEWORTH WATCH.',
    title: 'TRUEWORTH FAMOUS MODEL',
    creator: 'TrueWorth',
    material: 'Metal',
    price: 'Rs: 2,299',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&q=80',
    link: '/products/trueworth-famous-model',
  };

  return (
    <section className="py-12 md:py-20 bg-[var(--bg-primary)] text-[var(--text-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: IMAGE CONTAINER (Mobile Height Optimized) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none h-[320px] sm:h-[380px] lg:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl group shrink-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.45) 100%)'
                }}
              />
            </div>
          </div>

          {/* RIGHT: DETAILS CONTAINER */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6 text-center lg:text-left">
            {/* SUBTITLE */}
            <span 
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {product.subTitle}
            </span>

            {/* MAIN TITLE */}
            <h2 
              className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight"
              style={{ color: 'var(--accent-gold)' }}
            >
              {product.title}
            </h2>

            {/* META SPECS */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-[280px] sm:max-w-sm mx-auto lg:mx-0 py-1 sm:py-2">
              <div className="text-left">
                <span className="block text-[11px] sm:text-xs font-semibold text-[var(--text-secondary)]">Creator</span>
                <span className="block text-xs sm:text-base font-bold italic mt-0.5 text-[var(--text-primary)]">
                  {product.creator}
                </span>
              </div>
              <div className="text-left">
                <span className="block text-[11px] sm:text-xs font-semibold text-[var(--text-secondary)]">Material</span>
                <span className="block text-xs sm:text-base font-bold italic mt-0.5 text-[var(--text-primary)]">
                  {product.material}
                </span>
              </div>
            </div>

            {/* DIVIDER LINE */}
            <div className="w-full max-w-xs sm:max-w-md mx-auto lg:mx-0 h-[1px] bg-[var(--border-color)]" />

            {/* PRICE & CTA BUTTON */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1 sm:pt-2">
              <span 
                className="text-xl sm:text-3xl font-extrabold tracking-wide"
                style={{ color: 'var(--accent-gold)' }}
              >
                {product.price}
              </span>

              <Link
                href={product.link}
                className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 shadow-lg whitespace-nowrap"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--accent-gold)';
                }}
              >
                SHOP NOW
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} Back in plugs, gro business or enterprise walk, a new vale drunk. In fact, it's a subsequent extras bilga.