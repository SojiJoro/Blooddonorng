// components/ui/form.jsx
"use client";
export function Form({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
export function FormField({ control, name, render }) {
  return render({ field: { /* your field props here */ } });
}
export function FormItem({ children, ...props }) {
  return <div className="form-item" {...props}>{children}</div>;
}
export function FormLabel({ children, ...props }) {
  return <label className="form-label font-semibold" {...props}>{children}</label>;
}
export function FormControl({ children, ...props }) {
  return <div className="form-control" {...props}>{children}</div>;
}
export function FormMessage({ children, ...props }) {
  return <p className="form-message text-xs text-red-500" {...props}>{children}</p>;
}
export function FormDescription({ children, ...props }) {
  return <p className="form-description text-sm text-gray-600" {...props}>{children}</p>;
}
