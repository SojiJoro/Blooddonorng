// app/donate/page.js
'use client';
import { useState } from 'react';
import Footer from '@/components/Footer'; // Ensure Footer is correctly imported

export default function Donate() {
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, bloodType, location };
    const res = await fetch('/api/donors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert('Thank you for registering as a donor. Your information has been received.');
    } else {
      alert('There was an error. Please try again.');
    }
  };

  return (
    <div>
      <main>
        <h1>Donate</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Blood Type:
            <input
              type="text"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
