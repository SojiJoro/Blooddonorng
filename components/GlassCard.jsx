// components/GlassCard.jsx
export function GlassCard({ children, extraClasses = "" }) {
    return (
      <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-xl ${extraClasses}`}>
        {children}
      </div>
    );
  }
  