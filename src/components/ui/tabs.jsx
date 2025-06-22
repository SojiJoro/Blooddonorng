// components/ui/tabs.jsx
"use client";
import { useState } from "react";
export function Tabs({ children, value, onValueChange, className = "" }) {
  return (
    <div className={`tabs ${className}`}>
      {children}
    </div>
  );
}
export function TabsList({ children, className = "" }) {
  return <div className={`tabs-list flex ${className}`}>{children}</div>;
}
export function TabsTrigger({ value, children, className = "", onClick }) {
  return (
    <button
      className={`tabs-trigger p-2 border rounded-md ${className}`}
      onClick={() => onClick && onClick(value)}
    >
      {children}
    </button>
  );
}
export function TabsContent({ children, className = "" }) {
  return <div className={`tabs-content ${className}`}>{children}</div>;
}
