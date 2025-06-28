"use client"

import { JSX, useState } from "react"
import { useRouter } from "next/navigation"
import Footer from '@/components/Footer'

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function EmergencyRequestPage(): JSX.Element {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    quantity: "1",
    urgencyLevel: "",
    hospitalName: "",
    hospitalAddress: "",
    city: "",
    state: "",
    zipCode: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    patientCondition: "",
    additionalNotes: "",
    consentToShare: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitted(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          patientName: "",
          bloodType: "",
          quantity: "1",
          urgencyLevel: "",
          hospitalName: "",
          hospitalAddress: "",
          city: "",
          state: "",
          zipCode: "",
          contactName: "",
          contactPhone: "",
          contactEmail: "",
          patientCondition: "",
          additionalNotes: "",
          consentToShare: false,
        })
        setSubmitted(false)
        router.push("/dashboard?requestSubmitted=true")
      }, 3000)
    } catch (error) {
      console.error("Error submitting request:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 overflow-hidden bg-gradient-to-br from-red-50 via-white to-green-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-16 h-16 bg-accent rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-secondary rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container relative z-10 py-16">
          {/* Page Header */}
          <div className="text-center mb-12 fade-in">
            <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full shadow-xl mb-6">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
              </svg>
            </div>
            <h1 className="text-5xl font-black text-primary mb-4">
              Emergency Blood 
              <span className="text-accent"> Request</span>
            </h1>
            <p className="text-xl text-light max-w-3xl mx-auto leading-relaxed mb-6">
              Submit an urgent request for blood donation. Our network of donors will be notified immediately.
            </p>
            
            {/* Emergency Alert */}
            <div className="max-w-2xl mx-auto bg-accent rounded-lg p-6 shadow-lg">
              <div className="flex items-center text-white">
                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Emergency Request</h3>
                  <p className="text-red-100">This form is for urgent blood requests. For non-urgent requests, please use the regular request form.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-card relative overflow-hidden slide-up" style={{ animationDelay: '0.2s' }}>
              
              {/* Success State */}
              {submitted && (
                <div className="absolute inset-0 bg-white flex items-center justify-center z-50 scale-in">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 className="text-4xl font-bold text-primary mb-4">Request Submitted!</h3>
                    <p className="text-light text-lg max-w-md mx-auto mb-4">
                      Your emergency request has been sent to our donor network. You&apos;ll be contacted shortly.
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-accent rounded-full text-white text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Emergency Request Active
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Patient Information Section */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-primary flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Patient Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Patient Name
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="Enter patient's full name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Blood Type Needed
                      </label>
                      <select
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleInputChange}
                        required
                        className="form-input appearance-none"
                      >
                        <option value="">Select blood type</option>
                        {bloodTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                        Units Required
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        required
                        className="form-input"
                        placeholder="Number of units"
                      />
                      <p className="text-sm text-light mt-1">Specify how many units of blood are needed</p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Urgency Level
                      </label>
                      <div className="space-y-3 mt-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="urgencyLevel"
                            value="medium"
                            checked={formData.urgencyLevel === 'medium'}
                            onChange={handleInputChange}
                            className="mr-3"
                            required
                          />
                          <span className="text-primary font-medium">Medium - Within 48 hours</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="urgencyLevel"
                            value="high"
                            checked={formData.urgencyLevel === 'high'}
                            onChange={handleInputChange}
                            className="mr-3"
                            required
                          />
                          <span className="text-primary font-medium">High - Within 24 hours</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="urgencyLevel"
                            value="critical"
                            checked={formData.urgencyLevel === 'critical'}
                            onChange={handleInputChange}
                            className="mr-3"
                            required
                          />
                          <span className="text-accent font-bold">Critical - Immediate</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      Patient Condition
                    </label>
                    <textarea
                      name="patientCondition"
                      value={formData.patientCondition}
                      onChange={handleInputChange}
                      required
                      className="form-input min-h-[120px] resize-vertical"
                      placeholder="Please describe the patient's condition and why blood is needed urgently..."
                    />
                    <p className="text-sm text-light mt-1">This information helps donors understand the urgency and importance of their donation</p>
                  </div>
                </div>

                {/* Hospital Information Section */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-primary flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 2h2v4h4v2h-4v4h-2v-4H7v-2h4V5z"/>
                      </svg>
                      Hospital Information
                    </h2>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 2h2v4h4v2h-4v4h-2v-4H7v-2h4V5z"/>
                      </svg>
                      Hospital Name
                    </label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="City General Hospital"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Hospital Address
                    </label>
                    <input
                      type="text"
                      name="hospitalAddress"
                      value={formData.hospitalAddress}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="123 Medical Center Blvd"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="New York"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="NY"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-primary flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Contact Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Contact Person Name
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="Dr. Jane Smith"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="doctor@hospital.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 11.5l-3-1.5 3-1.5v3zm-4 0V9L9 5v2l8 3.5L9 14v2l8-4zM3 13h5v2H3v-2z"/>
                      </svg>
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      className="form-input min-h-[100px] resize-vertical"
                      placeholder="Any additional information that might be helpful for donors..."
                    />
                  </div>
                </div>

                {/* Consent Section */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      name="consentToShare"
                      checked={formData.consentToShare}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-5 w-5 text-accent focus:ring-accent border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary mb-2">Consent to Share Information</h3>
                      <p className="text-light text-sm leading-relaxed">
                        I consent to share this information with potential donors. This information will be shared 
                        with potential donors to help them understand the urgency and importance of their donation. 
                        All personal information will be handled confidentially and in accordance with HIPAA regulations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-accent btn-lg w-full relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Emergency Request...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                          </svg>
                          Submit Emergency Request
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Emergency Contact Information */}
          <div className="mt-16 text-center slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-primary mb-6">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">24/7 Hotline</h4>
                  <p className="text-light mb-2">(555) 123-4567</p>
                  <p className="text-sm text-light">For immediate assistance</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Emergency Email</h4>
                  <p className="text-light mb-2">emergency@bloodbank.org</p>
                  <p className="text-sm text-light">Monitored 24/7</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Response Time</h4>
                  <p className="text-light mb-2">&lt; 15 minutes</p>
                  <p className="text-sm text-light">Average response time</p>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap justify-center gap-6 text-sm text-light">
                  <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    HIPAA Compliant
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                    Secure & Encrypted
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Verified Network
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Immediate Response
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-16 slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">&lt; 15</div>
                <div className="text-sm text-light uppercase tracking-wide">Min Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-light uppercase tracking-wide">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                <div className="text-sm text-light uppercase tracking-wide">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">98%</div>
                <div className="text-sm text-light uppercase tracking-wide">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}