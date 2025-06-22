// components/LatestUpdatesSection.tsx
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.1,
      duration: 0.6
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

// Sample updates data
const updates = [
  {
    id: 1,
    source: "@BloodDonorNG",
    content: "Our mobile donation center will be at Lagos Central Mall this weekend. Come join us! #DonateBloodSaveLives",
    date: "2 hours ago"
  },
  {
    id: 2,
    source: "@BloodDonorNG",
    content: "Thank you to all donors who participated in yesterday's blood drive. We collected 50 units! #DonateBloodSaveLives",
    date: "1 day ago"
  },
  {
    id: 3,
    source: "@BloodDonorNG",
    content: "Blood type O negative is urgently needed at General Hospital. Please donate if you can. #DonateBloodSaveLives",
    date: "2 days ago"
  }
];

export default function LatestUpdatesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % updates.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="updates-section">
      <div className="container">
        <motion.div
          className="updates-container"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h4 className="updates-heading" variants={itemVariants}>
            Latest Updates
          </motion.h4>
          
          <motion.div className="updates-card-container" variants={itemVariants}>
            <div className="updates-card">
              <div className="updates-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="updates-content">
                <p className="updates-text">
                  <span className="updates-source">{updates[activeIndex].source}</span> – {updates[activeIndex].content}
                </p>
                <span className="updates-date">{updates[activeIndex].date}</span>
              </div>
            </div>
            
            <div className="updates-navigation">
              {updates.map((_, index) => (
                <button 
                  key={index} 
                  className={`updates-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View update ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.a 
            href="https://twitter.com/BloodDonorNG" 
            target="_blank" 
            rel="noopener noreferrer"
            className="updates-link"
            variants={itemVariants}
          >
            Follow us for more updates
            <svg className="updates-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}