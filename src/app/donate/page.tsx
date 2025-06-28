import React, { useState, ChangeEvent, FormEvent } from 'react'

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
            <h3 className="step-title">Personal Information</h3>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="18"
                  min="18"
                  max="65"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg) *</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="50"
                  min="50"
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="step step-medical">
            <h3 className="step-title">Medical Information</h3>
            <div className="form-group">
              <label htmlFor="bloodType">Blood Type *</label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select your blood type</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">State *</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select your state</option>
                {nigerianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lastDonation">Last Donation Date</label>
              <input
                type="date"
                id="lastDonation"
                name="lastDonation"
                value={formData.lastDonation}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="healthConditions">Health Conditions</label>
              <textarea
                id="healthConditions"
                name="healthConditions"
                value={formData.healthConditions}
                onChange={handleChange}
                placeholder="Any medical conditions or medications (optional)"
                className="form-textarea"
                rows={3}
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="step step-contact">
            <h3 className="step-title">Contact Information</h3>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 801 234 5678"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="form-input"
                required
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (submitted) {
    return (
      <div className="donation-page">
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>Thank you for registering to donate blood. We'll contact you soon with donation details.</p>
            <div className="success-details">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Blood Type:</strong> {formData.bloodType}</p>
              <p><strong>Location:</strong> {formData.location}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="donation-page">
      <style jsx>{`
        .donation-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .hero-section {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: white;
          text-align: center;
          padding: 4rem 2rem;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto 3rem;
          padding: 0 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          transform: translateY(0);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #e53e3e;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #666;
          font-weight: 600;
        }

        .form-section {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }

        .progress-container {
          margin-bottom: 2rem;
        }

        .progress-bar {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          height: 8px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-fill {
          background: linear-gradient(90deg, #48bb78, #38a169);
          height: 100%;
          border-radius: 50px;
          transition: width 0.3s ease;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .progress-step {
          opacity: 0.6;
        }

        .progress-step.active {
          opacity: 1;
        }

        .form-card {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .step-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 2rem;
          text-align: center;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        label {
          display: block;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .error-message {
          background: #fed7d7;
          color: #c53030;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-weight: 600;
          text-align: center;
        }

        .form-navigation {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 2rem;
        }

        .button {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
        }

        .button.primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .button.primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .button.primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .button.secondary {
          background: #f7fafc;
          color: #2d3748;
          border: 2px solid #e2e8f0;
        }

        .button.secondary:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
        }

        .footer-section {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          text-align: center;
          padding: 2rem;
        }

        .success-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
        }

        .success-card {
          background: white;
          border-radius: 20px;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          max-width: 500px;
          width: 100%;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #48bb78, #38a169);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          font-size: 2rem;
          color: white;
          font-weight: bold;
        }

        .success-card h2 {
          color: #2d3748;
          margin-bottom: 1rem;
          font-size: 2rem;
        }

        .success-card p {
          color: #666;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .success-details {
          background: #f7fafc;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: left;
        }

        .success-details p {
          margin-bottom: 0.5rem;
          color: #2d3748;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .stats-section {
            grid-template-columns: 1fr;
          }
          
          .form-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <header className="hero-section">
        <h1 className="hero-title">Save Lives Through Blood Donation</h1>
        <p className="hero-subtitle">
          Every donation can save up to three lives. Join our community of heroes and make a difference today.
        </p>
      </header>

      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Lives Saved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5,000+</div>
          <div className="stat-label">Active Donors</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">Donation Centers</div>
        </div>
      </section>

      <main className="form-section">
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <div className="progress-steps">
            <span className={currentStep >= 1 ? "progress-step active" : "progress-step"}>
              Personal Info
            </span>
            <span className={currentStep >= 2 ? "progress-step active" : "progress-step"}>
              Medical Info
            </span>
            <span className={currentStep >= 3 ? "progress-step active" : "progress-step"}>
              Contact Info
            </span>
          </div>
        </div>

        <div className="form-card">
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
              <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>)} disabled={isSubmitting} className="button primary">
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="footer-section">
        <p>&copy; 2025 Blood Donation Center. Saving lives together.</p>
      </footer>
    </div>
  )
}