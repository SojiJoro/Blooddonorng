// components/GlassCard.jsx
"use client";

export function GlassCard({ children, extraClasses = "" }) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-xl 
        border border-white/20 
        rounded-xl shadow-xl 
        p-6 text-gray-100 
        ${extraClasses}`}
    >
      {children}
    </div>
  );
}
