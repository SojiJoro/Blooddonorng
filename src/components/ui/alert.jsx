// components/ui/alert.jsx
"use client";
export function Alert({ children, variant = "default", className = "" }) {
  return (
    <div className={`alert ${variant === "destructive" ? "bg-red-50 border-red-200" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children }) {
  return <h3 className="alert-title font-bold">{children}</h3>;
}

export function AlertDescription({ children }) {
  return <p className="alert-description text-sm">{children}</p>;
}
