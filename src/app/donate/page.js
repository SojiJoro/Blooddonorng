// components/Icon.js
export default function Icon({ children, className = '' }) {
  return (
    <svg
      className={`w-2 h-2 inline align-text-bottom ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// app/donate/page.js
'use client';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Footer from '@/components/Footer';

export default function Donate() {
  const [formData, setFormData] = useState({
    name: '',
    bloodType: '',
    location: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.bloodType) {
      setError('Please select your blood type');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Please enter your location');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({ name: '', bloodType: '', location: '', phone: '', email: '' });
          setSubmitted(false);
        }, 4000);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative flex-1 overflow-hidden bg-gradient-to-br from-red-50 via-white to-green-50">
        <div className="container relative z-10 py-16">
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full shadow-xl mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 ..." />
              </svg>
            </div>
            <h1 className="text-6xl font-black text-primary mb-6">
              Become a <span className="text-accent">Life Saver</span>
            </h1>
            <p className="text-xl text-light max-w-2xl mx-auto leading-relaxed">
              Join our community of heroes. Your donation can save up to three lives. Every drop counts, every donor matters.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="glass-card relative overflow-hidden slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-accent p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover opacity-90"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-2">Donor Registration</h2>
                  <p className="text-red-100 opacity-90">Fill in your details to join our life-saving mission</p>
                </div>
              </div>

              {submitted && (
                <div className="absolute inset-0 bg-white flex items-center justify-center z-50 scale-in">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-4xl font-bold text-primary mb-4">Thank You!</h3>
                    <p className="text-light text-lg max-w-md">
                      Your registration has been received. You&apos;re now part of our life-saving community!
                    </p>
                    <div className="mt-6">
                      <div className="inline-flex items-center px-4 py-2 bg-primary rounded-full text-white text-sm">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 ..." />
                        </svg>
                        Registration Complete
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center" role="alert">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 ..." />
                    </svg>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        <Icon className="mr-1" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter your full name"
                        aria-required="true"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bloodType" className="form-label">
                        <Icon className="mr-1">
                          <path d="M12 21.35l-1.45-1.32..." />
                        </Icon>
                        Blood Type
                      </label>
                      <select
                        id="bloodType"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        required
                        className="form-input appearance-none"
                        aria-required="true"
                      >
                        <option value="">Select your blood type</option>
                        {bloodTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="location" className="form-label">
                        <Icon className="mr-1">
                          <path d="M12 2C8.13 2 ..." />
                        </Icon>
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter your city or area"
                        aria-required="true"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        <Icon className="mr-1">
                          <path d="M6.62 10.79c1.44..." />
                        </Icon>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Enter your phone number"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <Icon className="mr-1">
                        <path d="M20 4H4c-1.1 0..." />
                      </Icon>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter your email address"
                      aria-required="true"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-accent btn-lg w-full relative overflow-hidden group"
                      aria-busy={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>...
                          </>
                        ) : (
                          <>...
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>

                {/* ... rest of the page unchanged ... */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
