"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react'
import '../globals.css'

interface FormData {
  name: string
  bloodType: string
  location: string
  phone: string
  email: string
  age: string
  weight: string
  lastDonation: string
  healthConditions: string
}

export default function EnhancedDonate(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bloodType: '',
    location: '',
    phone: '',
    email: '',
    age: '',
    weight: '',
    lastDonation: '',
    healthConditions: ''
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<number>(1)

  const bloodTypes: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const nigerianStates: string[] = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ]

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          setError('Please enter your name')
          return false
        }
        if (!formData.age || Number(formData.age) < 18 || Number(formData.age) > 65) {
          setError('Age must be between 18 and 65')
          return false
        }
        if (!formData.weight || Number(formData.weight) < 50) {
          setError('Weight must be at least 50kg for donation')
          return false
        }
        break
      case 2:
        if (!formData.bloodType) {
          setError('Please select your blood type')
          return false
        }
        if (!formData.location.trim()) {
          setError('Please select your state')
          return false
        }
        break
      case 3:
        if (!formData.phone.trim()) {
          setError('Please enter your phone number')
          return false
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
          setError('Please enter a valid email address')
          return false
        }
        break
      default:
        break
    }
    return true
  }

  const nextStep = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
      setError('')
    }
  }

  const prevStep = (): void => {
    setCurrentStep(prev => prev - 1)
    setError('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!validateStep(3)) return

    setIsSubmitting(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitted(true)
      setTimeout(() => {
        setFormData({
          name: '', bloodType: '', location: '', phone: '', email: '', age: '', weight: '', lastDonation: '', healthConditions: ''
        })
        setSubmitted(false)
        setCurrentStep(1)
      }, 4000)
    } catch {
      setError('There was an error submitting your registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = (): JSX.Element | null => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step step-personal">
            {/* Personal Information Step */}
            {/* ... */}
          </div>
        )
      case 2:
        return (
          <div className="step step-medical">
            {/* Medical Information Step */}
            {/* ... */}
          </div>
        )
      case 3:
        return (
          <div className="step step-contact">
            {/* Contact Information Step */}
            {/* ... */}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="donation-page">
      <header className="hero-section">
        {/* Hero content */}
      </header>

      <section className="stats-section">
        {/* Statistics cards */}
      </section>

      <main className="form-section">
        <div className="progress-container">
          {/* Progress bar */}
        </div>

        <form onSubmit={handleSubmit} className="form-card">
          {error && <div className="error-message">{error}</div>}
          {renderStep()}

          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="button secondary">
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="button primary">
                Next
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="button primary">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </main>

      <footer className="footer-section">
        {/* Footer content */}
      </footer>
    </div>
  )
}
