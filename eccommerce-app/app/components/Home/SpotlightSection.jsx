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
    <section className="py-16 md:py-24 bg-[var(--bg-primary)] text-[var(--text-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: IMAGE CONTAINER */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
                }}
              />
            </div>
          </div>

          {/* RIGHT: DETAILS CONTAINER */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
            {/* SUBTITLE */}
            <span 
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {product.subTitle}
            </span>

            {/* MAIN TITLE */}
            <h2 
              className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight"
              style={{ color: 'var(--accent-gold)' }}
            >
              {product.title}
            </h2>

            {/* META SPECS */}
            <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto lg:mx-0 py-2">
              <div className="text-left">
                <span className="block text-xs font-semibold text-[var(--text-secondary)]">Creator</span>
                <span className="block text-sm sm:text-base font-bold italic mt-0.5 text-[var(--text-primary)]">
                  {product.creator}
                </span>
              </div>
              <div className="text-left">
                <span className="block text-xs font-semibold text-[var(--text-secondary)]">Material</span>
                <span className="block text-sm sm:text-base font-bold italic mt-0.5 text-[var(--text-primary)]">
                  {product.material}
                </span>
              </div>
            </div>

            {/* DIVIDER LINE */}
            <div className="w-full max-w-md mx-auto lg:mx-0 h-[1px] bg-[var(--border-color)]" />

            {/* PRICE & CTA BUTTON */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2">
              <span 
                className="text-2xl sm:text-3xl font-extrabold tracking-wide"
                style={{ color: 'var(--accent-gold)' }}
              >
                {product.price}
              </span>

              <Link
                href={product.link}
                className="px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-lg"
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
}