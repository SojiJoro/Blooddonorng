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
    <div className="flex flex-col min-h-screen justify-between">
      <main className="container max-w-xl mx-auto py-12 space-y-6">
        <h1 className="text-3xl font-bold text-center text-red-600">Become a Donor</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Blood Type</label>
            <input
              type="text"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
