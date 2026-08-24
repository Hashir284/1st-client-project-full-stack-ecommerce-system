'use client'

import { faArrowRight, faGem } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const HeroSection = () => {
  return (
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
  )
}

export default HeroSection
