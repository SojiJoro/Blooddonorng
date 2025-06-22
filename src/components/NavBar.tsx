"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  
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
        
        <div className="navbar-links">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
          <Link href="/donate" className={`nav-link ${pathname === '/donate' ? 'active' : ''}`}>
            Donate
          </Link>
          <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
          <Link href="/register" className={`nav-link ${pathname === '/register' ? 'active' : ''}`}>
          Register
          </Link>
          <Link href="/emergency-request" className={`nav-link ${pathname === '/emergency-request' ? 'active' : ''}`}>
            Emergency Request
          </Link>
          <Link href="/search" className={`nav-link ${pathname === '/search' ? 'active' : ''}`}>
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