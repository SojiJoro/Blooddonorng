"use client"
import { useState } from "react"
import Footer from '@/components/Footer'

export default function SearchPage() {
  const [bloodGroup, setBloodGroup] = useState("")
  const [location, setLocation] = useState("")
  const [results, setResults] = useState([])

  async function handleSearch(e) {
    e.preventDefault()
    const res = await fetch(
      `/api/search?bloodGroup=${bloodGroup}&location=${location}`
    )
    if (res.ok) {
      const data = await res.json()
      setResults(data.results)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="container mx-auto flex-1 py-16 space-y-8">
        <h1 className="text-3xl font-bold text-primary text-center">Search for Donors</h1>
        <form onSubmit={handleSearch} className="space-y-6 max-w-md mx-auto">
          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
              className="form-input"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="form-input"
              placeholder="Enter city or state"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-md w-full">Search</button>
        </form>

        <div className="space-y-4">
          {results.map((donor) => (
            <div key={donor.id} className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-dark">
                <strong>Name:</strong> {donor.name}
                <br />
                <strong>Blood Group:</strong> {donor.bloodGroup}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
