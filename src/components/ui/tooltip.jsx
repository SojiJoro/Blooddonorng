// components/ui/tooltip.jsx
"use client";
export function TooltipProvider({ children }) {
  return <div className="tooltip-provider">{children}</div>;
}
export function Tooltip({ children }) {
  return <div className="tooltip relative">{children}</div>;
}
export function TooltipTrigger({ children, ...props }) {
  return <span className="tooltip-trigger" {...props}>{children}</span>;
}
export function TooltipContent({ children, ...props }) {
  return (
    <div className="tooltip-content absolute bg-black text-white p-2 rounded-md text-xs z-10" {...props}>
      {children}
    </div>
  );
}
