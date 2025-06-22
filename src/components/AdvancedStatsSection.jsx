// components/AdvancedStatsSection.jsx
"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { label: "Active Donors", value: 1500, suffix: "+" },
  { label: "Lives Saved", value: 750, suffix: "+" },
  { label: "Quick Support", value: 24, suffix: "/7" },
];

export default function AdvancedStatsSection() {
  return (
    <section className="advanced-stats-section py-20">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card p-6 rounded-xl shadow-lg flex flex-col justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <motion.span
              className="stat-value text-5xl font-extrabold text-red-500"
              whileHover={{ scale: 1.05 }}
            >
              <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
            </motion.span>
            <p className="stat-label mt-4 text-xl text-gray-300">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
