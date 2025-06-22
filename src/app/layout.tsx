// src/app/layout.tsx
import './globals.css'
import NavBar from '../components/NavBar'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Global navbar */}
        <NavBar />

        {/* Push content below the fixed navbar */}
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
