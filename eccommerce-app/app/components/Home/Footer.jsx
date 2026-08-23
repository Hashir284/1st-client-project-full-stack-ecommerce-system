import Link from 'next/link';
import { 
  FontAwesomeIcon, 
  faPhone, 
  faEnvelope, 
  faLocationDot, 
  faShieldHalved, 
  faTruckFast, 
  faRotateLeft 
} from '../../icons';

export default function Footer() {
  return (
    <footer 
      className="pt-16 pb-8 transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        color: 'var(--text-primary)', 
        borderTop: '1px solid var(--border-color)' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP VALUE PROPOSITIONS */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12"
          style={{ borderBottom: '1px solid var(--border-color)' }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-lg"
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                color: 'var(--accent-gold)', 
                border: '1px solid var(--border-color)' 
              }}
            >
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <div>
              <h5 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Express Global Delivery</h5>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Complimentary shipping on orders above $200</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-lg"
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                color: 'var(--accent-gold)', 
                border: '1px solid var(--border-color)' 
              }}
            >
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div>
              <h5 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Encrypted Payments</h5>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>100% verified secure checkouts</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-lg"
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                color: 'var(--accent-gold)', 
                border: '1px solid var(--border-color)' 
              }}
            >
              <FontAwesomeIcon icon={faRotateLeft} />
            </div>
            <div>
              <h5 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>30-Day Royal Return</h5>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Hassle-free replacement policy</p>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
              NOIR<span style={{ color: 'var(--accent-gold)' }}>&</span>GOLD
            </h3>
            <p className="text-xs leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              Crafting timeless luxury essentials in black & gold themes. Exclusively crafted for individuals who appreciate aesthetic excellence.
            </p>
            <div className="space-y-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLocationDot} style={{ color: 'var(--accent-gold)' }} /> 5th Avenue, Luxury District, NY
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} style={{ color: 'var(--accent-gold)' }} /> +1 (800) 456-7890
              </p>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} style={{ color: 'var(--accent-gold)' }} /> vip@noirandgold.com
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-gold)' }}>
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              <li><Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Home</Link></li>
              <li><Link href="/products" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Browse Collection</Link></li>
              <li><Link href="/categories" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>All Categories</Link></li>
              <li><Link href="/about" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Our Legacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-gold)' }}>
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              <li><Link href="/profile" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>My Account</Link></li>
              <li><Link href="/orders" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Track Order</Link></li>
              <li><Link href="/cart" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>View Shopping Bag</Link></li>
              <li><Link href="/contact" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Support & Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-gold)' }}>
              Legal Information
            </h4>
            <ul className="space-y-2.5 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              <li><Link href="/privacy-policy" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Refund Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div 
          className="mt-16 pt-8 text-center text-xs flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
        >
          <p>© {new Date().getFullYear()} NOIR & GOLD. All rights reserved.</p>
          <div className="flex gap-4 font-semibold">
            <Link href="/privacy-policy" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Privacy</Link>
            <Link href="/terms" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}