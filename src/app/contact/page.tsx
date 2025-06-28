"use client"
import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react'
import Footer from '@/components/Footer'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  preferredCenter: string
}

interface DonationCenter {
  id: number
  name: string
  address: string
  city: string
  state: string
  phone: string
  email: string
  hours: string
  services: string[]
  coordinates: { lat: number; lng: number }
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredCenter: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const donationCenters: DonationCenter[] = [
    {
      id: 1,
      name: "Lagos Blood Bank Central",
      address: "15 Marina Street, Lagos Island",
      city: "Lagos",
      state: "Lagos",
      phone: "+234 701 234 5678",
      email: "lagos@blooddonation.ng",
      hours: "Mon-Sat: 8:00 AM - 6:00 PM",
      services: ["Blood Donation", "Blood Testing", "Emergency Supply"],
      coordinates: { lat: 6.4541, lng: 3.3947 }
    },
    {
      id: 2,
      name: "Abuja National Blood Service",
      address: "Plot 456 Central Business District",
      city: "Abuja",
      state: "FCT",
      phone: "+234 702 345 6789",
      email: "abuja@blooddonation.ng",
      hours: "Mon-Fri: 7:30 AM - 5:30 PM, Sat: 9:00 AM - 3:00 PM",
      services: ["Blood Donation", "Mobile Collection", "Corporate Programs"],
      coordinates: { lat: 9.0579, lng: 7.4951 }
    },
    {
      id: 3,
      name: "Kano Regional Blood Center",
      address: "12 Bompai Road, Nassarawa GRA",
      city: "Kano",
      state: "Kano",
      phone: "+234 703 456 7890",
      email: "kano@blooddonation.ng",
      hours: "Mon-Sat: 8:00 AM - 5:00 PM",
      services: ["Blood Donation", "Storage Facility", "Research"],
      coordinates: { lat: 12.0022, lng: 8.5919 }
    },
    {
      id: 4,
      name: "Port Harcourt Blood Bank",
      address: "45 Aba Road, Mile 3",
      city: "Port Harcourt",
      state: "Rivers",
      phone: "+234 704 567 8901",
      email: "portharcourt@blooddonation.ng",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM",
      services: ["Blood Donation", "Platelet Collection", "Community Outreach"],
      coordinates: { lat: 4.8156, lng: 7.0498 }
    },
    {
      id: 5,
      name: "Ibadan University Blood Bank",
      address: "University College Hospital, Mokola",
      city: "Ibadan",
      state: "Oyo",
      phone: "+234 705 678 9012",
      email: "ibadan@blooddonation.ng",
      hours: "24/7 Emergency Service",
      services: ["Blood Donation", "Emergency Supply", "Medical Training"],
      coordinates: { lat: 7.3775, lng: 3.9470 }
    },
    {
      id: 6,
      name: "Enugu Regional Center",
      address: "3 Independence Layout",
      city: "Enugu",
      state: "Enugu",
      phone: "+234 706 789 0123",
      email: "enugu@blooddonation.ng",
      hours: "Mon-Sat: 8:00 AM - 5:30 PM",
      services: ["Blood Donation", "Mobile Units", "Health Screening"],
      coordinates: { lat: 6.5244, lng: 7.5086 }
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Please enter your name')
      return false
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number')
      return false
    }
    if (!formData.subject.trim()) {
      setError('Please select a subject')
      return false
    }
    if (!formData.message.trim()) {
      setError('Please enter your message')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitted(true)
      setTimeout(() => {
        setFormData({
          name: '', email: '', phone: '', subject: '', message: '', preferredCenter: ''
        })
        setSubmitted(false)
      }, 5000)
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for contacting us. We&apos;ll get back to you within 24 hours.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-600 mb-1"><strong>Name:</strong> {formData.name}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Subject:</strong> {formData.subject}</p>
            <p className="text-sm text-gray-600"><strong>Email:</strong> {formData.email}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🩸</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BloodLife Nigeria</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Donate</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">About</a>
              <a href="#" className="text-red-600 font-semibold">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Reach out to us for blood donation inquiries, emergency requests, or to learn more about our services across Nigeria.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="+234 801 234 5678"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="blood-donation">Blood Donation Inquiry</option>
                    <option value="emergency-request">Emergency Blood Request</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="corporate-partnership">Corporate Partnership</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Center
                  </label>
                  <select
                    name="preferredCenter"
                    value={formData.preferredCenter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a center</option>
                    {donationCenters.map(center => (
                      <option key={center.id} value={center.name}>
                        {center.name} - {center.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Emergency Contact */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-red-800 mb-4">🚨 Emergency Blood Request</h3>
              <p className="text-red-700 mb-4">For urgent blood requirements, contact our 24/7 emergency hotline:</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span className="text-lg font-bold text-red-800">+234 700 BLOOD-NOW</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span className="text-lg font-bold text-red-800">+234 700 256 6366</span>
                </div>
              </div>
            </div>

            {/* General Contact */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@bloodlifenigeria.org</p>
                    <p className="text-gray-600">support@bloodlifenigeria.org</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+234 701 234 5678</p>
                    <p className="text-gray-600">+234 802 345 6789</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Headquarters</h4>
                    <p className="text-gray-600">15 Marina Street<br />Lagos Island, Lagos State<br />Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Office Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 3:00 PM<br />Sunday: Emergency only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Centers */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Donation Centers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit any of our strategically located blood donation centers across Nigeria for safe and convenient blood donation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationCenters.map((center) => (
              <div key={center.id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{center.name}</h3>
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <p className="text-gray-600 flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span>{center.address}, {center.city}, {center.state}</span>
                  </p>
                  
                  <p className="text-gray-600 flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{center.phone}</span>
                  </p>
                  
                  <p className="text-gray-600 flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{center.email}</span>
                  </p>
                  
                  <p className="text-gray-600 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{center.hours}</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {center.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full border border-red-200"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Save Lives?</h2>
          <p className="text-xl mb-8 opacity-90">
            Every donation can save up to three lives. Book your appointment today and become a hero in someone&apos;s story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="text-lg px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book Appointment
            </button>
            <button className="text-lg px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}