// app/components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/donate">Donate</Link></li>
        </ul>
      </nav>
      <div>
        <h2>BloodDonorNG</h2>
        <p>Saving lives across Nigeria.</p>
      </div>
    </header>
  )
}
