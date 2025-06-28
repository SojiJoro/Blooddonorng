// src/app/register-recipient/page.tsx
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

// Urgency levels
const urgencyLevels = [
  { value: "low", label: "Low - Within 7 days", color: "text-green-600" },
  { value: "medium", label: "Medium - Within 3 days", color: "text-yellow-600" },
  { value: "high", label: "High - Within 24 hours", color: "text-orange-600" },
  { value: "critical", label: "Critical - Immediate", color: "text-red-600" }
];

export default function RegisterRecipientPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    contactName: "",
    relationship: "",
    email: "",
    phone: "",
    bloodType: "",
    unitsNeeded: "1",
    hospital: "",
    hospitalAddress: "",
    doctorName: "",
    medicalLicense: "",
    state: "",
    urgency: "",
    patientCondition: "",
    reason: "",
    additionalNotes: "",
    agreeToTerms: false,
    agreeToShare: false
  });

  const [formErrors, setFormErrors] = useState<Record<string,string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
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
    
    if (!formData.patientName) errs.patientName = "Patient name is required";
    if (!formData.contactName) errs.contactName = "Contact name is required";
    if (!formData.relationship) errs.relationship = "Relationship is required";
    if (!formData.email) errs.email = "Email is required";
    if (!formData.phone) errs.phone = "Phone number is required";
    if (!formData.bloodType) errs.bloodType = "Blood type is required";
    if (!formData.unitsNeeded || parseInt(formData.unitsNeeded) < 1) {
      errs.unitsNeeded = "Valid number of units required";
    }
    if (!formData.hospital) errs.hospital = "Hospital name is required";
    if (!formData.hospitalAddress) errs.hospitalAddress = "Hospital address is required";
    if (!formData.doctorName) errs.doctorName = "Doctor name is required";
    if (!formData.medicalLicense) errs.medicalLicense = "Medical license is required";
    if (!formData.state) errs.state = "State is required";
    if (!formData.urgency) errs.urgency = "Urgency level is required";
    if (!formData.patientCondition) errs.patientCondition = "Patient condition is required";
    if (!formData.reason) errs.reason = "Reason for blood need is required";
    if (!formData.agreeToTerms) errs.agreeToTerms = "You must agree to the terms";
    if (!formData.agreeToShare) errs.agreeToShare = "You must consent to share information";
    
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
            <div className="max-w-lg mx-auto">
              <div className="glass-card scale-in">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-4">
                    Request Submitted Successfully!
                  </h2>
                  <p className="text-light mb-6 leading-relaxed">
                    Your blood request has been registered. Our team will verify the information 
                    and connect you with compatible donors in your area as soon as possible.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">What Happens Next?</h4>
                      <ul className="text-sm text-red-700 space-y-1 text-left">
                        <li>• Medical team will verify your request within 2 hours</li>
                        <li>• Compatible donors will be notified immediately</li>
                        <li>• You&apos;ll receive updates via SMS and email</li>
                        <li>• Emergency hotline: <strong>(234) 800-BLOOD</strong></li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/" className="btn btn-primary btn-md flex-1">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        Go Home
                      </Link>
                      <Link href="/recipient-dashboard" className="btn btn-outline btn-md flex-1">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        Track Request
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
          <div className="max-w-4xl mx-auto">
            <div className="glass-card slide-up">
              <div className="bg-accent p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl mb-4">
                  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Request Blood Donation</h1>
                <p className="text-red-100">Submit a request for blood donation for yourself or someone in need</p>
              </div>

              <div className="p-8">
                {/* Emergency Notice */}
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>
                    <div>
                      <h3 className="font-semibold text-red-800 mb-1">Emergency Notice</h3>
                      <p className="text-sm text-red-700">
                        For life-threatening emergencies, call <strong>199</strong> or go to the nearest emergency room immediately. 
                        This form is for planned blood requests and may take several hours to process.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Patient Information */}
                  <div className="space-y-6">
                    <div className="section-header">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      <h3 className="text-lg font-semibold text-primary">Patient Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Patient Name */}
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
                          onChange={handleChange}
                          className={`form-input ${formErrors.patientName ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="Full name of the patient"
                        />
                        {formErrors.patientName && (
                          <p className="form-error">{formErrors.patientName}</p>
                        )}
                      </div>

                      {/* Contact Name */}
                      <div className="form-group">
                        <label className="form-label">Contact Person Name</label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          className={`form-input ${formErrors.contactName ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="Your name (if different from patient)"
                        />
                        {formErrors.contactName && (
                          <p className="form-error">{formErrors.contactName}</p>
                        )}
                      </div>

                      {/* Relationship */}
                      <div className="form-group">
                        <label className="form-label">Relationship to Patient</label>
                        <input
                          type="text"
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleChange}
                          className={`form-input ${formErrors.relationship ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="e.g., Self, Spouse, Parent, Child, Friend"
                        />
                        {formErrors.relationship && (
                          <p className="form-error">{formErrors.relationship}</p>
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
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-input ${formErrors.email ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="Contact email address"
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
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`form-input ${formErrors.phone ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="+234 800 123 4567"
                        />
                        {formErrors.phone && (
                          <p className="form-error">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Blood Request Details */}
                  <div className="space-y-6">
                    <div className="section-header">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <h3 className="text-lg font-semibold text-primary">Blood Request Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Blood Type */}
                      <div className="form-group">
                        <label className="form-label">Blood Type Needed</label>
                        <select
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleChange}
                          className={`form-input appearance-none ${formErrors.bloodType ? 'border-red-500 bg-red-50' : ''}`}
                        >
                          <option value="">Select blood type</option>
                          {bloodTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {formErrors.bloodType && (
                          <p className="form-error">{formErrors.bloodType}</p>
                        )}
                      </div>

                      {/* Units Needed */}
                      <div className="form-group">
                        <label className="form-label">Units Needed</label>
                        <input
                          type="number"
                          name="unitsNeeded"
                          value={formData.unitsNeeded}
                          onChange={handleChange}
                          min="1"
                          max="10"
                          className={`form-input ${formErrors.unitsNeeded ? 'border-red-500 bg-red-50' : ''}`}
                        />
                        {formErrors.unitsNeeded && (
                          <p className="form-error">{formErrors.unitsNeeded}</p>
                        )}
                                                <p className="text-sm text-light mt-1">Number of blood units required</p>
                      </div>

                      {/* Urgency Level */}
                      <div className="form-group">
                        <label className="form-label">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                          </svg>
                          Urgency Level
                        </label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleChange}
                          className={`form-input appearance-none ${formErrors.urgency ? 'border-red-500 bg-red-50' : ''}`}
                        >
                          <option value="">Select urgency level</option>
                          {urgencyLevels.map(level => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                        {formErrors.urgency && (
                          <p className="form-error">{formErrors.urgency}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hospital Information */}
                  <div className="space-y-6">
                    <div className="section-header">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 2h2v4h4v2h-4v4h-2v-4H7v-2h4V5z"/>
                      </svg>
                      <h3 className="text-lg font-semibold text-primary">Hospital Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Hospital Name */}
                      <div className="form-group">
                        <label className="form-label">Hospital Name</label>
                        <input
                          type="text"
                          name="hospital"
                          value={formData.hospital}
                          onChange={handleChange}
                          className={`form-input ${formErrors.hospital ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="Name of the hospital"
                        />
                        {formErrors.hospital && (
                          <p className="form-error">{formErrors.hospital}</p>
                        )}
                      </div>

                      {/* Doctor Name */}
                      <div className="form-group">
                        <label className="form-label">Attending Doctor</label>
                        <input
                          type="text"
                          name="doctorName"
                          value={formData.doctorName}
                          onChange={handleChange}
                          className={`form-input ${formErrors.doctorName ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="Dr. Name"
                        />
                        {formErrors.doctorName && (
                          <p className="form-error">{formErrors.doctorName}</p>
                        )}
                      </div>

                      {/* Hospital Address */}
                      <div className="form-group">
                        <label className="form-label">Hospital Address</label>
                        <input
                          type="text"
                          name="hospitalAddress"
                          value={formData.hospitalAddress}
                          onChange={handleChange}
                          className={`form-input ${formErrors.hospitalAddress ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="Full hospital address"
                        />
                        {formErrors.hospitalAddress && (
                          <p className="form-error">{formErrors.hospitalAddress}</p>
                        )}
                      </div>

                      {/* Medical License */}
                      <div className="form-group">
                        <label className="form-label">Medical License/ID</label>
                        <input
                          type="text"
                          name="medicalLicense"
                          value={formData.medicalLicense}
                          onChange={handleChange}
                          className={`form-input ${formErrors.medicalLicense ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="Doctor's license number"
                        />
                        {formErrors.medicalLicense && (
                          <p className="form-error">{formErrors.medicalLicense}</p>
                        )}
                      </div>

                      {/* State */}
                      <div className="form-group md:col-span-2">
                        <label className="form-label">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          State
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`form-input appearance-none ${formErrors.state ? 'border-red-500 bg-red-50' : ''}`}
                        >
                          <option value="">Select state</option>
                          {nigerianStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        {formErrors.state && (
                          <p className="form-error">{formErrors.state}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Medical Details */}
                  <div className="space-y-6">
                    <div className="section-header">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <h3 className="text-lg font-semibold text-primary">Medical Details</h3>
                    </div>

                    <div className="space-y-6">
                      {/* Patient Condition */}
                      <div className="form-group">
                        <label className="form-label">Patient Condition</label>
                        <textarea
                          name="patientCondition"
                          value={formData.patientCondition}
                          onChange={handleChange}
                          className={`form-input min-h-[120px] resize-vertical ${formErrors.patientCondition ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="Describe the patient's current condition, diagnosis, and medical situation..."
                        />
                        {formErrors.patientCondition && (
                          <p className="form-error">{formErrors.patientCondition}</p>
                        )}
                      </div>

                      {/* Reason for Blood Need */}
                      <div className="form-group">
                        <label className="form-label">Reason for Blood Need</label>
                        <textarea
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          className={`form-input min-h-[100px] resize-vertical ${formErrors.reason ? 'border-red-500 bg-red-50' : ''}`}
                          placeholder="Explain why blood transfusion is needed (surgery, treatment, emergency, etc.)..."
                        />
                        {formErrors.reason && (
                          <p className="form-error">{formErrors.reason}</p>
                        )}
                      </div>

                      {/* Additional Notes */}
                      <div className="form-group">
                        <label className="form-label">Additional Notes (Optional)</label>
                        <textarea
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleChange}
                          className="form-input min-h-[80px] resize-vertical"
                          placeholder="Any additional information that might be helpful for donors..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Consent and Terms */}
                  <div className="space-y-6">
                    <div className="section-header">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                      <h3 className="text-lg font-semibold text-primary">Consent & Verification</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Information Sharing Consent */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <label className="flex items-start">
                          <input
                            name="agreeToShare"
                            type="checkbox"
                            checked={formData.agreeToShare}
                            onChange={handleChange}
                            className="mt-1 h-5 w-5 text-accent focus:ring-accent border-gray-300 rounded"
                          />
                          <div className="ml-3">
                            <span className="text-primary font-medium">
                              I consent to share this information with potential donors
                            </span>
                            <p className="text-sm text-light mt-1">
                              This information will be shared with verified donors to help them understand 
                              the urgency and importance of their donation. Patient privacy will be maintained 
                              according to medical standards.
                            </p>
                          </div>
                        </label>
                        {formErrors.agreeToShare && (
                          <p className="form-error mt-2">{formErrors.agreeToShare}</p>
                        )}
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
                              I certify that all information provided is accurate and I understand that 
                              false information may delay or prevent blood assistance. I agree to the{" "}
                              <Link href="/terms" className="text-accent hover:text-accent-hover underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-accent hover:text-accent-hover underline">
                                Privacy Policy
                              </Link>.
                            </p>
                          </div>
                        </label>
                        {formErrors.agreeToTerms && (
                          <p className="form-error mt-2">{formErrors.agreeToTerms}</p>
                        )}
                      </div>
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
                          Processing Blood Request...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                          </svg>
                          Submit Blood Request
                        </>
                      )}
                    </button>
                  </div>

                  {/* Help Text */}
                  <div className="text-center text-sm text-light">
                    <p>
                      Need help? Contact our support team at{" "}
                      <a href="tel:+2348001234567" className="text-accent hover:text-accent-hover font-semibold">
                        (234) 800-BLOOD
                      </a>{" "}
                      or{" "}
                      <a href="mailto:help@bloodbank.org" className="text-accent hover:text-accent-hover font-semibold">
                        help@bloodbank.org
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Emergency Information */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary mb-2">Quick Response</h4>
                <p className="text-sm text-light">Average response time of 2-4 hours for urgent requests</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary mb-2">Verified Network</h4>
                <p className="text-sm text-light">All donors are medically screened and verified</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary mb-2">24/7 Support</h4>
                <p className="text-sm text-light">Round-the-clock assistance for emergency cases</p>
              </div>
            </div>

            {/* Request Statistics */}
            <div className="mt-12 text-center slide-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold text-primary mb-8">Our Track Record</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">2,500+</div>
                  <div className="text-sm text-light uppercase tracking-wide">Successful Requests</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-sm text-light uppercase tracking-wide">Match Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">4 hrs</div>
                  <div className="text-sm text-light uppercase tracking-wide">Average Response</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">100%</div>
                  <div className="text-sm text-light uppercase tracking-wide">Medical Verification</div>
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