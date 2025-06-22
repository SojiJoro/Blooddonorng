// src/app/register-donor/page.tsx
"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Droplet,
  MapPin,
  Heart,
  AlertCircle,
  Check
} from "lucide-react";
import Link from "next/link";

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
    agreeToTerms: false
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
    if (!formData.agreeToTerms) errs.agreeToTerms = "Accept terms to continue";
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
    await new Promise(r => setTimeout(r, 1500));
    setFormSubmitted(true);
    setIsSubmitting(false);
  };

  if (formSubmitted) {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow dark:bg-gray-900">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Registration Successful
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for registering as a donor. We’ll contact you when your blood type is needed.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/"
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Home
                </Link>
                <Link
                  href="/donor-dashboard"
                  className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleSubmit} className="w-full max-w-md">

          {/* Logo */}
          <div className="flex justify-center mx-auto">
            <img
              src="/logo.svg"
              alt="Blood Donor NG"
              className="w-auto h-7 sm:h-8"
            />
          </div>

          {/* Sign In / Register Tabs */}
          <div className="flex items-center justify-center mt-6">
            <Link
              href="/login"
              className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
            >
              sign in
            </Link>
            <span
              className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
            >
              register
            </span>
          </div>

          {/* First Name */}
          <div className="relative flex items-center mt-8">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <User className="w-6 h-6" />
            </span>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              className={`block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                          focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600
                          ${formErrors.firstName ? 'border-red-500 bg-red-50' : ''}`}
            />
            {formErrors.firstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formErrors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <User className="w-6 h-6" />
            </span>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              className={`block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                          focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600
                          ${formErrors.lastName ? 'border-red-500 bg-red-50' : ''}`}
            />
            {formErrors.lastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formErrors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <Mail className="w-6 h-6" />
            </span>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              className={`block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                          focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600
                          ${formErrors.email ? 'border-red-500 bg-red-50' : ''}`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <Phone className="w-6 h-6" />
            </span>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone Number"
              className={`block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                          focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600
                          ${formErrors.phone ? 'border-red-500 bg-red-50' : ''}`}
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formErrors.phone}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <Calendar className="w-6 h-6" />
            </span>
            <input
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              type="date"
              className={`block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                          focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600
                          ${formErrors.dob ? 'border-red-500 bg-red-50' : ''}`}
            />
            {formErrors.dob && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formErrors.dob}
              </p>
            )}
          </div>

          {/* Blood Type */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <Droplet className="w-6 h-6" />
            </span>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className={`block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                          focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600
                          ${formErrors.bloodType ? 'border-red-500 bg-red-50' : ''}`}
            >
              <option value="">Select Blood Type</option>
              {bloodTypes.map(bt => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
            {formErrors.bloodType && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formErrors.bloodType}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <MapPin className="w-6 h-6" />
            </span>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              placeholder="Address"
              className={`block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                          focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600
                          ${formErrors.address ? 'border-red-500 bg-red-50' : ''}`}
            />
            {formErrors.address && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formErrors.address}
              </p>
            )}
          </div>

          {/* State */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <MapPin className="w-6 h-6" />
            </span>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                          focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                          dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600
                          ${formErrors.state ? 'border-red-500 bg-red-50' : ''}`}
            >
              <option value="">Select State</option>
              {nigerianStates.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {formErrors.state && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formErrors.state}
              </p>
            )}
          </div>

          {/* Last Donation Date */}
          <div className="relative flex items-center mt-4">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <Calendar className="w-6 h-6" />
            </span>
            <input
              name="lastDonation"
              value={formData.lastDonation}
              onChange={handleChange}
              type="date"
              placeholder="Last Donation (optional)"
              className="block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                         focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                         dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Medical Conditions */}
          <div className="relative flex items-start mt-4">
            <span className="absolute left-0 pl-3 text-gray-300 dark:text-gray-500">
              <Heart className="w-6 h-6 mt-2" />
            </span>
            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              placeholder="Medical Conditions (optional)"
              rows={3}
              className="block w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-200 rounded-lg
                         focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40
                         dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Terms & Submit */}
          <div className="mt-6">
            <label className="flex items-center">
              <input
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms
                </Link>{" "}
                &{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {formErrors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {formErrors.agreeToTerms}
              </p>
            )}
          </div>

          {/* Register Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400
                         focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isSubmitting ? "Processing…" : "Register"}
            </button>
          </div>

          {/* Already have an account */}
          <p className="mt-6 text-center text-gray-500 dark:text-gray-300 text-sm">
            <Link href="/login" className="hover:underline">
              Already have an account?
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
