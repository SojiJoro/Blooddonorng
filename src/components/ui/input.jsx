// components/ui/input.jsx
"use client";
export function Input({ className = "", ...props }) {
  return <input className={`input border rounded-md p-2 ${className}`} {...props} />;
}
