// app/register/page.jsx
"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Footer from '@/components/Footer';

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function RegisterPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("donor");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form data states
  const [donorForm, setDonorForm] = useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    medicalConditions: "",
    lastDonationDate: "",
    emergencyContact: "",
    emergencyPhone: ""
  });

  const [recipientForm, setRecipientForm] = useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    hospitalName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    urgencyLevel: "",
    unitsNeeded: "",
    patientDescription: "",
    doctorName: "",
    medicalId: ""
  });

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "donor" || type === "recipient") {
      setActiveTab(type);
    }
  }, [searchParams]);

  const handleDonorInputChange = (e) => {
    const { name, value } = e.target;
    setDonorForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRecipientInputChange = (e) => {
    const { name, value } = e.target;
    setRecipientForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push("/dashboard?registered=donor");
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecipientSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push("/dashboard?registered=recipient");
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 bg-gradient-to-br from-green-50 via-white to-red-50">
        <div className="container py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Hero Content */}
              <div className="order-2 lg:order-1 fade-in">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-full shadow-xl mb-6">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <h1 className="text-5xl font-black text-primary mb-6">
                    Join Our 
                    <span className="text-accent"> Life-Saving</span> Community
                  </h1>
                  <p className="text-xl text-light mb-8 leading-relaxed">
                    Whether you're looking to donate blood or need blood for a patient, 
                    we're here to connect you with our trusted network.
                  </p>
                  
                  {/* Benefits */}
                  <div className="space-y-4">
                    <div className="flex items-center text-left">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Secure & Verified</h4>
                        <p className="text-light">All donors and recipients are verified</p>
                      </div>
                    </div>
                    <div className="flex items-center text-left">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">24/7 Support</h4>
                        <p className="text-light">Round-the-clock emergency assistance</p>
                      </div>
                    </div>
                    <div className="flex items-center text-left">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Instant Matching</h4>
                        <p className="text-light">Quick donor-recipient matching system</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Registration Form */}
              <div className="order-1 lg:order-2 slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="glass-card relative overflow-hidden">
                  
                  {/* Success State */}
                  {submitted && (
                    <div className="absolute inset-0 bg-white flex items-center justify-center z-50 scale-in">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <h3 className="text-4xl font-bold text-primary mb-4">Welcome Aboard!</h3>
                        <p className="text-light text-lg max-w-md mx-auto mb-4">
                          Your registration has been successful. Redirecting to your dashboard...
                        </p>
                        <div className="inline-flex items-center px-4 py-2 bg-accent rounded-full text-white text-sm">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Registration Complete
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-primary mb-2">Create Your Account</h2>
                      <p className="text-light">Join thousands of life-savers in our community</p>
                    </div>

                    {/* Account Type Selection */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-primary mb-4">Select Account Type</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setActiveTab("donor")}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            activeTab === "donor"
                              ? "border-accent bg-red-50 text-accent"
                              : "border-gray-200 hover:border-accent"
                          }`}
                        >
                          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          <div className="font-semibold">Blood Donor</div>
                          <div className="text-sm opacity-75">Give blood, save lives</div>
                        </button>
                        <button
                          onClick={() => setActiveTab("recipient")}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            activeTab === "recipient"
                              ? "border-accent bg-red-50 text-accent"
                              : "border-gray-200 hover:border-accent"
                          }`}
                        >
                          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 2h2v4h4v2h-4v4h-2v-4H7v-2h4V5z"/>
                          </svg>
                          <div className="font-semibold">Blood Recipient</div>
                          <div className="text-sm opacity-75">Request blood for patients</div>
                        </button>
                      </div>
                    </div>

                    {/* Donor Registration Form */}
                    {activeTab === "donor" && (
                      <form onSubmit={handleDonorSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-group">
                            <label className="form-label">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              </svg>
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={donorForm.name}
                              onChange={handleDonorInputChange}
                              className="form-input"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                              </svg>
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={donorForm.email}
                              onChange={handleDonorInputChange}
                              className="form-input"
                              placeholder="Enter your email"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                               <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                              </svg>
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={donorForm.phone}
                              onChange={handleDonorInputChange}
                              className="form-input"
                              placeholder="Enter your phone number"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                              Blood Type
                            </label>
                            <select
                              name="bloodType"
                              value={donorForm.bloodType}
                              onChange={handleDonorInputChange}
                              className="form-input appearance-none"
                              required
                            >
                              <option value="">Select your blood type</option>
                              {bloodTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                              </svg>
                              Address
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={donorForm.address}
                              onChange={handleDonorInputChange}
                              className="form-input"
                              placeholder="Enter your address"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">City</label>
                            <input
                              type="text"
                              name="city"
                              value={donorForm.city}
                              onChange={handleDonorInputChange}
                              className="form-input"
                              placeholder="Enter your city"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">State</label>
                            <input
                              type="text"
                              name="state"
                              value={donorForm.state}
                              onChange={handleDonorInputChange}
                              className="form-input"
                              placeholder="Enter your state"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Zip Code</label>
                            <input
                              type="text"
                              name="zipCode"
                              value={donorForm.zipCode}
                              onChange={handleDonorInputChange}
                              className="form-input"
                              placeholder="Enter zip code"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Emergency Contact</label>
                            <input
                              type="text"
                              name="emergencyContact"
                              value={donorForm.emergencyContact}
                              onChange={handleDonorInputChange}
                              className="form-input"
                              placeholder="Emergency contact name"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Emergency Phone</label>
                            <input
                              type="tel"
                              name="emergencyPhone"
                              value={donorForm.emergencyPhone}
                              onChange={handleDonorInputChange}
                              className="form-input"
                              placeholder="Emergency contact phone"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Medical Conditions (Optional)</label>
                          <textarea
                            name="medicalConditions"
                            value={donorForm.medicalConditions}
                            onChange={handleDonorInputChange}
                            className="form-input min-h-[100px] resize-vertical"
                            placeholder="List any medical conditions, medications, or allergies..."
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Last Donation Date (Optional)</label>
                          <input
                            type="date"
                            name="lastDonationDate"
                            value={donorForm.lastDonationDate}
                            onChange={handleDonorInputChange}
                            className="form-input"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-accent btn-lg w-full"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Creating Donor Account...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                              Register as Blood Donor
                            </>
                          )}
                        </button>
                      </form>
                    )}

                    {/* Recipient Registration Form */}
                    {activeTab === "recipient" && (
                      <form onSubmit={handleRecipientSubmit} className="space-y-6">
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
                              name="name"
                              value={recipientForm.name}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Enter contact person name"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                              </svg>
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={recipientForm.email}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Enter email address"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                              </svg>
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={recipientForm.phone}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Enter phone number"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                              Required Blood Type
                            </label>
                            <select
                              name="bloodType"
                              value={recipientForm.bloodType}
                              onChange={handleRecipientInputChange}
                              className="form-input appearance-none"
                              required
                            >
                              <option value="">Select blood type needed</option>
                              {bloodTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
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
                              value={recipientForm.hospitalName}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Enter hospital name"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Hospital Address</label>
                            <input
                              type="text"
                              name="address"
                              value={recipientForm.address}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Enter hospital address"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">City</label>
                            <input
                              type="text"
                              name="city"
                              value={recipientForm.city}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Enter city"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">State</label>
                            <input
                              type="text"
                              name="state"
                              value={recipientForm.state}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Enter state"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Zip Code</label>
                            <input
                              type="text"
                              name="zipCode"
                              value={recipientForm.zipCode}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Enter zip code"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Doctor Name</label>
                            <input
                              type="text"
                              name="doctorName"
                              value={recipientForm.doctorName}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Attending physician"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Medical ID/License</label>
                            <input
                              type="text"
                              name="medicalId"
                              value={recipientForm.medicalId}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Medical license number"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Units Needed</label>
                            <input
                              type="number"
                              name="unitsNeeded"
                              value={recipientForm.unitsNeeded}
                              onChange={handleRecipientInputChange}
                              className="form-input"
                              placeholder="Number of units"
                              min="1"
                              max="10"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                            </svg>
                            Urgency Level
                          </label>
                          <select
                            name="urgencyLevel"
                            value={recipientForm.urgencyLevel}
                            onChange={handleRecipientInputChange}
                            className="form-input appearance-none"
                            required
                          >
                            <option value="">Select urgency level</option>
                            <option value="low">Low - Within 7 days</option>
                            <option value="medium">Medium - Within 3 days</option>
                            <option value="high">High - Within 24 hours</option>
                            <option value="critical">Critical - Immediate</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Patient Description</label>
                          <textarea
                            name="patientDescription"
                            value={recipientForm.patientDescription}
                            onChange={handleRecipientInputChange}
                            className="form-input min-h-[120px] resize-vertical"
                            placeholder="Provide details about the patient's condition and why blood is needed..."
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-accent btn-lg w-full"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Creating Recipient Account...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 2h2v4h4v2h-4v4h-2v-4H7v-2h4V5z"/>
                              </svg>
                              Register as Blood Recipient
                            </>
                          )}
                        </button>
                      </form>
                    )}

                    {/* Login Link */}
                    <div className="mt-8 text-center">
                      <p className="text-light">
                        Already have an account?{' '}
                        <Link href="/login" className="text-accent hover:text-accent-hover font-semibold transition-colors">
                          Sign in here
                        </Link>
                      </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex flex-wrap justify-center gap-4 text-sm text-light">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-16 slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-primary mb-4">Join Our Growing Community</h3>
              <p className="text-light text-lg">Thousands of people trust us to save lives every day</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">10,000+</div>
                <div className="text-sm text-light uppercase tracking-wide">Registered Donors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-light uppercase tracking-wide">Partner Hospitals</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">50,000+</div>
                <div className="text-sm text-light uppercase tracking-wide">Lives Saved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm text-light uppercase tracking-wide">Emergency Support</div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-16 slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-primary mb-4">What Our Community Says</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                    SM
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Sarah M.</h4>
                    <p className="text-sm text-light">Regular Donor</p>
                  </div>
                </div>
                <p className="text-light italic">
                  "This platform made it so easy to donate blood and track my impact. 
                  Knowing I've helped save lives gives me incredible satisfaction."
                </p>
                <div className="flex text-accent mt-4">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold mr-4">
                    DJ
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Dr. James K.</h4>
                    <p className="text-sm text-light">Emergency Physician</p>
                  </div>
                </div>
                <p className="text-light italic">
                  "The emergency blood request feature has been a lifesaver. 
                  Quick response times and reliable donors make all the difference."
                </p>
                <div className="flex text-accent mt-4">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold mr-4">
                    MR
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Maria R.</h4>
                    <p className="text-sm text-light">Patient Family</p>
                  </div>
                </div>
                <p className="text-light italic">
                  "When my father needed blood urgently, this platform connected us 
                  with donors within hours. Forever grateful to this community."
                </p>
                <div className="flex text-accent mt-4">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-primary font-semibold">Loading registration...</p>
        </div>
      </div>
    }>
      <RegisterPageInner />
    </Suspense>
  );
}