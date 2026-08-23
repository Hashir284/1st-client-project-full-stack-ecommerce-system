'use client';

import Link from 'next/link';
import { FontAwesomeIcon, faClock, faArrowRight } from './icons'; // Adjust path if needed

export default function NotFound() {
  return (
    <div 
      className="min-h-[80vh] flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div 
        className="max-w-xl w-full text-center p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
        style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          border: '1px solid var(--border-color)' 
        }}
      >
        {/* Glowing Gold Accent Top Bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5" 
          style={{ backgroundColor: 'var(--accent-gold)' }} 
        />

        {/* Badge */}
        <span 
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          style={{ 
            backgroundColor: 'rgba(212, 175, 55, 0.1)', 
            color: 'var(--accent-gold)',
            border: '1px solid var(--accent-gold)' 
          }}
        >
          <FontAwesomeIcon icon={faClock} /> Phase 2 In Progress
        </span>

        {/* Big Code Header */}
        <h1 
          className="text-6xl sm:text-7xl font-black tracking-tight mb-2"
          style={{ color: 'var(--accent-gold)' }}
        >
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold mb-3">
          Page Under Craftsmanship
        </h2>

        {/* Client Message */}
        <p 
          className="text-xs sm:text-sm leading-relaxed mb-8 max-w-md mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          This section is currently being designed and assembled for the full store release. Please explore the main showcase on our Home Page.
        </p>

        {/* Primary Action Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all active:scale-95 shadow-xl hover:brightness-110"
          style={{ 
            backgroundColor: 'var(--accent-gold)', 
            color: 'var(--black)' 
          }}
        >
          Return To Home Showcase <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
}