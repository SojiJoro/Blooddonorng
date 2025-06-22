"use client"
import { useState } from "react"

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
    <div style={{ padding: "1rem" }}>
      <h1>Search for Donors</h1>
      <form onSubmit={handleSearch}>
        <label>
          Blood Group<br/>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
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
        </label>
        <br/><br/>
        <label>
          Location<br/>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <br/><br/>
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        {results.map((donor) => (
          <div key={donor.id} style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Name:</strong> {donor.name}<br/>
              <strong>Blood Group:</strong> {donor.bloodGroup}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
