'use client'

import React from 'react'

interface IconProps {
  children: React.ReactNode
  className?: string
}

export default function Icon({ children, className = '' }: IconProps) {
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
