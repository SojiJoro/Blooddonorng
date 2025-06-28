// components/Footer.jsx
"use client";
import Link from "next/link";

export default function Footer({ className = "" }) {
  return (
    <footer className={`bg-gray-900 text-white py-12 ${className}`.trim()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🩸</span>
              </div>
              <h3 className="text-xl font-bold">BloodLife Nigeria</h3>
            </div>
            <p className="text-gray-400">
              Connecting donors with those in need across Nigeria. Together, we save lives.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Donate Blood</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Find Blood</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Emergency</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Volunteer</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <p className="text-gray-400 mb-2">Emergency Hotline:</p>
            <p className="text-red-400 font-bold">+234 700 BLOOD-NOW</p>
            <p className="text-gray-400 mt-2">Email: info@bloodlifenigeria.org</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} BloodLife Nigeria. All rights reserved. Saving lives together.
          </p>
        </div>
      </div>
    </footer>
  );
}
