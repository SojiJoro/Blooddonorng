// components/ui/select.jsx
"use client";
export function Select({ children, ...props }) {
  return <div className="select" {...props}>{children}</div>;
}
export function SelectTrigger({ children, ...props }) {
  return <div className="select-trigger border rounded-md p-2" {...props}>{children}</div>;
}
export function SelectValue({ placeholder, ...props }) {
  return <span className="select-value" {...props}>{placeholder}</span>;
}
export function SelectContent({ children, ...props }) {
  return <div className="select-content border rounded-md p-2 mt-1 bg-white" {...props}>{children}</div>;
}
export function SelectItem({ value, children, ...props }) {
  return (
    <div className="select-item p-2 hover:bg-gray-100 cursor-pointer" data-value={value} {...props}>
      {children}
    </div>
  );
}
