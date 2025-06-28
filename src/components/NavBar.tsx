"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <Image 
            src="/images/logo.jpg" 
            alt="Blood Donor NG" 
            width={40} 
            height={40} 
            className="logo-image"
          />
          <span className="logo-text">Blood Donor NG</span>
        </Link>
        
        <button
          className={`mobile-menu-toggle ${menuOpen ? 'active' : ''}`}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/donate" className={`nav-link ${pathname === '/donate' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Donate
          </Link>
          <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/register" className={`nav-link ${pathname === '/register' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Register
          </Link>
          <Link href="/emergency-request" className={`nav-link ${pathname === '/emergency-request' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Emergency Request
          </Link>
          <Link href="/search" className={`nav-link ${pathname === '/search' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Search Donors
          </Link>
        </div>
        
        <Link href="/donate" className="donate-button">
          Donate Now
        </Link>
      </div>
    </nav>
  );
}