// components/ui/button.jsx
"use client";
export function Button({ children, variant = "default", size = "md", asChild, className = "", ...props }) {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp
      className={`button ${variant === "outline" ? "border bg-transparent" : "bg-blue-500 text-white"} ${size === "sm" ? "px-3 py-1 text-sm" : "px-4 py-2"} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
