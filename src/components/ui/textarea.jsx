// components/ui/textarea.jsx
"use client";
export function Textarea({ className = "", ...props }) {
  return <textarea className={`textarea border rounded-md p-2 ${className}`} {...props}></textarea>;
}
