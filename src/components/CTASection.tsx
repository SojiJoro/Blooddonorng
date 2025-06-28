"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const ctaVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  },
};

export default function CTASection() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) / 20;
    const moveY = (y - rect.height / 2) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  };

  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-container"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div 
            className="cta-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="cta-card-inner">
              <motion.h3 className="cta-heading" variants={itemVariants}>
                Connecting Blood Donors with Those in Need
              </motion.h3>
              
              <motion.p className="cta-text" variants={itemVariants}>
                BloodConnect is a platform that connects blood donors with recipients in real-time, 
                making the blood donation process faster and more efficient.
              </motion.p>
              
              <motion.div className="cta-buttons" variants={itemVariants}>
  <Link href="/register-donor" className="cta-button-primary">
    Register as a Donor
  </Link>
  <Link href="/register-recipient" className="cta-button-secondary">
    Register as a Recipient
  </Link>
</motion.div>
              
              <div className="cta-decoration cta-decoration-1"></div>
              <div className="cta-decoration cta-decoration-2"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
