// components/Footer.jsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer({ className = "" }) {
  return (
    <footer className={`footer bg-gradient-to-r from-red-700 to-green-700 text-white py-8 ${className}`.trim()}>
      <div className="footer-container max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="footer-brand text-lg font-bold">Blood Donor NG</div>
        <nav className="footer-nav">
          <ul className="flex gap-4">
            <li>
              <Link href="/" className="footer-link hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/how-it-works" className="footer-link hover:underline">How It Works</Link>
            </li>
            <li>
              <Link href="/donate" className="footer-link hover:underline">Donate</Link>
            </li>
            <li>
              <Link href="/about" className="footer-link hover:underline">About</Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link hover:underline">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-social mt-4 sm:mt-0 flex gap-4">
          <a href="https://facebook.com" className="footer-social-icon hover:text-red-200">FB</a>
          <a href="https://twitter.com" className="footer-social-icon hover:text-red-200">TW</a>
          <a href="https://instagram.com" className="footer-social-icon hover:text-red-200">IG</a>
        </div>
      </div>
      <div className="footer-bottom mt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Blood Donor NG. All rights reserved.
      </div>
    </footer>
  );
}
