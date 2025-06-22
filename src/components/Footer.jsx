// components/Footer.jsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="footer bg-gray-900 py-8">
      <div className="footer-container max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="footer-brand text-white text-lg font-bold">Blood Donor NG</div>
        <nav className="footer-nav">
          <ul className="flex gap-4">
            <li>
              <Link href="/" className="footer-link text-gray-400 hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/how-it-works" className="footer-link text-gray-400 hover:text-white">How It Works</Link>
            </li>
            <li>
              <Link href="/donate" className="footer-link text-gray-400 hover:text-white">Donate</Link>
            </li>
            <li>
              <Link href="/about" className="footer-link text-gray-400 hover:text-white">About</Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link text-gray-400 hover:text-white">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-social mt-4 sm:mt-0">
          <a href="https://facebook.com" className="footer-social-icon text-gray-400 hover:text-white mx-2">FB</a>
          <a href="https://twitter.com" className="footer-social-icon text-gray-400 hover:text-white mx-2">TW</a>
          <a href="https://instagram.com" className="footer-social-icon text-gray-400 hover:text-white mx-2">IG</a>
        </div>
      </div>
      <div className="footer-bottom mt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Blood Donor NG. All rights reserved.
      </div>
    </footer>
  );
}
