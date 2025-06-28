// src/app/register-donor/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from '@/components/Footer';

// Nigerian states list
const nigerianStates = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe",
  "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
  "Taraba","Yobe","Zamfara"
];

// Blood types
const bloodTypes = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

export default function RegisterDonorPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    bloodType: "",
    address: "",
    state: "",
    lastDonation: "",
    medicalConditions: "",
    emergencyContact: "",
    emergencyPhone: "",
    agreeToTerms: false,
    agreeToNotifications: false
  });
  const [formErrors, setFormErrors] = useState<Record<string,string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const errs = { ...prev };
        delete errs[name];
        return errs;
      });
    }
  };

  const validate = () => {
    const errs: Record<string,string> = {};
    if (!formData.firstName)    errs.firstName    = "First name required";
    if (!formData.lastName)     errs.lastName     = "Last name required";
    if (!formData.email)        errs.email        = "Email required";
    if (!formData.phone)        errs.phone        = "Phone required";
    if (!formData.dob)          errs.dob          = "Date of birth required";
    if (!formData.bloodType)    errs.bloodType    = "Select blood type";
    if (!formData.address)      errs.address      = "Address required";
    if (!formData.state)        errs.state        = "State required";
    if (!formData.emergencyContact) errs.emergencyContact = "Emergency contact required";
    if (!formData.emergencyPhone)   errs.emergencyPhone   = "Emergency phone required";
    if (!formData.agreeToTerms) errs.agreeToTerms = "Accept terms to continue";
    
    // Age validation (must be 18 or older)
    if (formData.dob) {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (age < 18 || (age === 18 && monthDiff < 0)) {
        errs.dob = "Must be 18 years or older to donate";
      }
    }
    
    return errs;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFormErrors(errs);
      return;
    }
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 2000));
      setFormSubmitted(true);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <section className="flex-1 bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center py-16">
          <div className="container">
            <div className="max-w-md mx-auto">
              <div className="glass-card scale-in">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-4">
                    Welcome to Our Family!
                  </h2>
                  <p className="text-light mb-6 leading-relaxed">
                    Thank you for registering as a blood donor. Your generosity can save lives.
                    We&apos;ll contact you when your blood type is needed.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">What&apos;s Next?</h4>
                      <ul className="text-sm text-green-700 space-y-1 text-left">
                        <li>• Check your email for verification</li>
                        <li>• Complete your health assessment</li>
                        <li>• Get notified for donation opportunities</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/" className="btn btn-primary btn-md flex-1">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        Go Home
                      </Link>
                      <Link href="/donor-dashboard" className="btn btn-outline btn-md flex-1">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        Dashboard
                      </Link>
                    </div>
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

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 bg-gradient-to-br from-green-50 via-white to-red-50 py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card slide-up">
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full shadow-xl mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-primary mb-2">Become a Blood Donor</h1>
                  <p className="text-light">Join thousands of heroes saving lives across Nigeria</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center mb-8">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <Link
                      href="/login"
                      className="px-6 py-2 text-light hover:text-primary transition-colors"
                    >
                      Sign In
                    </Link>
                    <div className="px-6 py-2 bg-white rounded-md shadow-sm text-primary font-semibold">
                      Register
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-semibold text-primary flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Personal Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div className="form-group">
                        <label className="form-label">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                          First Name
                        </label>
                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          type="text"
                          placeholder="Enter your first name"
                          className={`form-input ${formErrors.firstName ? 'border-red-500 bg-red-50' : ''}`}
                        />
                        {formErrors.firstName && (
                          <p className="form-error">{formErrors.firstName}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          type="text"
                          placeholder="Enter your last name"
                          className={`form-input ${formErrors.lastName ? 'border-red-500 bg-red-50' : ''}`}
                        />
                        {formErrors.lastName && (
                          <p className="form-error">{formErrors.lastName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="form-group">
                        <label className="form-label">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                          Email Address
                        </label>
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          placeholder="Enter your email"
                          className={`form-input ${formErrors.email ? 'border-red-500 bg-red-50' : ''}`}
                        />
                        {formErrors.email && (
                          <p className="form-error">{formErrors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <label className="form-label">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                          </svg>
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel"
                          placeholder="e.g., +234 801 234 5678"
                          className={`form-input ${formErrors.phone ? 'border-red-500 bg-red-50' : ''}`}
                        />
                        {formErrors.phone && (
                          <p className="form-error">{formErrors.phone}</p>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div className="form-group">
                        <label className="form-label">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                          </svg>
                          Date of Birth
                        </label>
                        <input
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          type="date"
                          className={`form-input ${formErrors.dob ? 'border-red-500 bg-red-50' : ''}`}
                        />
                        {formErrors.dob && (
                          <p className="form-error">{formErrors.dob}</p>
                        )}
                        <p className="text-sm text-light mt-1">Must be 18 years or older</p>
                      </div>

                      {/* Blood Type */}
                      <div className="form-group">
                        <label className="form-label">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          Blood Type
                        </label>
                        <select
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleChange}
                          className={`form-input appearance-none ${formErrors.bloodType ? 'border-red-500 bg-red-50' : ''}`}
                        >
                          <option value="">Select your blood type</option>
                          {bloodTypes.map(bt => (
                            <option key={bt} value={bt}>{bt}</option>
                          ))}
                        </select>
                        {formErrors.bloodType && (
                          <p className="form-error">{formErrors.bloodType}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-semibold text-primary flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Location Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Address */}
                      <div className="form-group md:col-span-2">
                        <label className="form-label">Home Address</label>
                        <input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          type="text"
                          placeholder="Enter your full address"
                          className={`form-input ${formErrors.address ? 'border-red-500 bg-red-50' : ''}`}
                        />
                        {formErrors.address && (
                          <p className="form-error">{formErrors.address}</p>
                        )}
                      </div>

                      {/* State */}
                      <div className="form-group">
                        <label className="form-label">State</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`form-input appearance-none ${formErrors.state ? 'border-red-500 bg-red-50' : ''}`}
                        >
                          <option value="">Select your state</option>
                          {nigerianStates.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {formErrors.state && (
                          <p className="form-error">{formErrors.state}</p>
                        )}
                      </div>

                      {/* Last Donation Date */}
                      <div className="form-group">
                        <label className="form-label">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                          </svg>
                          Last Donation Date (Optional)
                        </label>
                        <input
                          name="lastDonation"
                          value={formData.lastDonation}
                          onChange={handleChange}
                          type="date"
                          className="form-input"
                        />
                        <p className="text-sm text-light mt-1">If you&apos;ve donated before, help us track your eligibility</p>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact Information */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-semibold text-primary flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                        </svg>
                        Emergency Contact
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Emergency Contact Name */}
                      <div className="form-group">
                        <label className="form-label">Emergency Contact Name</label>
                        <input
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleChange}
                          type="text"
                          placeholder="Name of emergency contact"
                          className={`form-input ${formErrors.emergencyContact ? 'border-red-500 bg-red-50' : ''}`}
                        />
                        {formErrors.emergencyContact && (
                          <p className="form-error">{formErrors.emergencyContact}</p>
                        )}
                      </div>

                      {/* Emergency Contact Phone */}
                      <div className="form-group">
                        <label className="form-label">Emergency Contact Phone</label>
                        <input
                          name="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={handleChange}
                          type="tel"
                          placeholder="Emergency contact phone"
                          className={`form-input ${formErrors.emergencyPhone ? 'border-red-500 bg-red-50' : ''}`}
                        />
                        {formErrors.emergencyPhone && (
                          <p className="form-error">{formErrors.emergencyPhone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-semibold text-primary flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Medical Information
                      </h3>
                    </div>

                    {/* Medical Conditions */}
                    <div className="form-group">
                      <label className="form-label">Medical Conditions (Optional)</label>
                      <textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleChange}
                        placeholder="List any medical conditions, medications, or allergies that might affect donation..."
                        rows={4}
                        className="form-input min-h-[120px] resize-vertical"
                      />
                      <p className="text-sm text-light mt-1">
                        This information helps ensure safe donation for both you and recipients
                      </p>
                    </div>
                  </div>

                  {/* Consent and Terms */}
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-lg font-semibold text-primary">Consent & Agreement</h3>
                    </div>

                    {/* Terms Agreement */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="flex items-start">
                        <input
                          name="agreeToTerms"
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="mt-1 h-5 w-5 text-accent focus:ring-accent border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <span className="text-primary font-medium">
                            I agree to the Terms of Service and Privacy Policy
                          </span>
                          <p className="text-sm text-light mt-1">
                            By checking this box, I agree to the{" "}
                            <Link href="/terms" className="text-accent hover:text-accent-hover underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-accent hover:text-accent-hover underline">
                              Privacy Policy
                            </Link>
                            . I understand that my information will be used to facilitate blood donation.
                          </p>
                        </div>
                      </label>
                      {formErrors.agreeToTerms && (
                        <p className="form-error mt-2">{formErrors.agreeToTerms}</p>
                      )}
                    </div>

                    {/* Notifications Agreement */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <label className="flex items-start">
                        <input
                          name="agreeToNotifications"
                          type="checkbox"
                          checked={formData.agreeToNotifications}
                          onChange={handleChange}
                          className="mt-1 h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <span className="text-primary font-medium">
                            I want to receive donation notifications
                          </span>
                          <p className="text-sm text-light mt-1">
                            Receive SMS and email notifications when your blood type is urgently needed in your area.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
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
                          Processing Registration...
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
                  </div>

                  {/* Already have account link */}
                  <div className="text-center">
                    <p className="text-light">
                      Already have an account?{" "}
                      <Link href="/login" className="text-accent hover:text-accent-hover font-semibold transition-colors">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Information Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary mb-2">Safe & Secure</h4>
                <p className="text-sm text-light">Your personal information is protected with bank-level security</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary mb-2">Make an Impact</h4>
                <p className="text-sm text-light">One donation can save up to 3 lives. Be a hero in your community</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary mb-2">24/7 Support</h4>
                <p className="text-sm text-light">Our medical team is available round the clock for assistance</p>
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-12 text-center slide-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold text-primary mb-8">Join Our Growing Community</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">15,000+</div>
                  <div className="text-sm text-light uppercase tracking-wide">Active Donors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
                  <div className="text-sm text-light uppercase tracking-wide">Lives Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">200+</div>
                  <div className="text-sm text-light uppercase tracking-wide">Partner Hospitals</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">36</div>
                  <div className="text-sm text-light uppercase tracking-wide">States Covered</div>
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