// components/Icon.js
export default function Icon({ children, className = '' }) {
  return (
    <svg
      className={`w-2 h-2 inline align-text-bottom ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}
