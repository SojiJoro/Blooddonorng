// components/StatsSection.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

// Animation variants
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
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    } 
  }
};

// Counter animation
const Counter = ({ end, duration = 2, label }: { end: number | string; duration?: number; label: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useRef(false);
  const countUpRef = useRef<NodeJS.Timeout | null>(null);

  const startCounter = useCallback(() => {
    // Handle string values like "24/7"
    if (typeof end === 'string') {
      setCount(1);
      return;
    }
    
    const step = Math.ceil(end / (duration * 20));
    let current = 0;
    
    countUpRef.current = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        if (countUpRef.current) clearInterval(countUpRef.current);
      } else {
        setCount(current);
      }
    }, 50);
  }, [end, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          startCounter();
        }
      },
      { threshold: 0.5 }
    );

    const currentNode = nodeRef.current;
    if (currentNode) {
      observer.observe(currentNode);
    }

    return () => {
      if (currentNode) {
        observer.unobserve(currentNode);
      }
      if (countUpRef.current) {
        clearInterval(countUpRef.current);
      }
    };
  }, [startCounter]);
  
  return (
    <div className="stat-content">
      <span ref={nodeRef} className="stat-number">
        {typeof end === 'string' ? end : count.toLocaleString()}
      </span>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container">
        <motion.div
          className="stats-container"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="stats-grid" variants={itemVariants}>
            <div className="stat-card">
              <Counter end={1500} label="Active Donors" />
            </div>
            
            <div className="stat-card">
              <Counter end={750} label="Lives Saved" />
            </div>
            
            <div className="stat-card">
              <Counter end="24/7" label="Quick Support" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}