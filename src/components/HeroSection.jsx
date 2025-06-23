'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-card">
          {/* Left text */}
          <div className="hero-content">
            <h1 className="hero-title">
              Give Blood,<br/>
              <span className="hero-title-accent">SAVE LIFE</span>
            </h1>
            <p className="hero-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirot, utricien ulsum.
            </p>
            <Link href="/donate" className="hero-button">
              GET STARTED
            </Link>
          </div>

          {/* Right illustration */}
          <div className="hero-image-container">
            <Image
              src="/images/hero-illustration.jpg"
              alt="Donate blood illustration"
              width={600}
              height={400}
              className="hero-image"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}