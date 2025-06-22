// components/FeaturesSection.tsx
"use client";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.1
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
};

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="container">
        <motion.div
          className="text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 className="features-title" variants={itemVariants}>
            Why Choose Us?
          </motion.h2>
          <motion.p className="features-subtitle" variants={itemVariants}>
            Experience fast, verified matching, robust security, and a supportive community dedicated to saving lives.
          </motion.p>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={itemVariants}>
            <GlassCard extraClasses="text-center">
              <h3 className="feature-heading">Fast & Verified</h3>
              <p className="feature-text">
                Immediate and verified matching connects donors quickly with those in need.
              </p>
            </GlassCard>

            <GlassCard extraClasses="text-center">
              <h3 className="feature-heading">Secure & Private</h3>
              <p className="feature-text">
                Robust data encryption and discreet communication ensure your privacy.
              </p>
            </GlassCard>

            <GlassCard extraClasses="text-center">
              <h3 className="feature-heading">Community Impact</h3>
              <p className="feature-text">
                Join a growing network that transforms healthcare by saving lives every day.
              </p>
            </GlassCard>
          </motion.div>
          
          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            variants={itemVariants}
          >
            <div className="stat-card">
              <div className="stat-number">1,500+</div>
              <div className="stat-label">Active Donors</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">750+</div>
              <div className="stat-label">Lives Saved</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Quick Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}