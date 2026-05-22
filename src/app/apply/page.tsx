'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  GraduationCap, 
  Globe, 
  CreditCard,
  AlertCircle
} from 'lucide-react';
import styles from './apply.module.css';

const courses = [
  { value: 'UG-MBBS', label: 'Undergraduate - MBBS' },
  { value: 'PG-MD/MS', label: 'Postgraduate - MD / MS' },
  { value: 'UG-BDS', label: 'Undergraduate - BDS' }
];

const countries = ['Georgia', 'Uzbekistan', 'India', 'Russia', 'Egypt', 'Vietnam'];

const universitiesByCountry: Record<string, string[]> = {
  Georgia: [
    'Tbilisi State Medical University',
    'Batumi Shota Rustaveli State University',
    'New Vision University',
    'Caucasus International University',
    'David Tvildiani Medical University'
  ],
  Uzbekistan: [
    'Tashkent Medical Academy',
    'Samarkand State Medical University',
    'Bukhara State Medical Institute',
    'Andijan State Medical Institute',
    'Fergana State University'
  ],
  India: [
    'Kasturba Medical College, Manipal',
    'Christian Medical College, Vellore',
    'St. John\'s Medical College, Bengaluru',
    'Hamdard Institute of Medical Sciences, New Delhi',
    'D.Y. Patil Medical College, Pune'
  ],
  Russia: [
    'Kazan State Medical University',
    'Sechenov First Moscow State Medical University',
    'Kursk State Medical University',
    'Bashkir State Medical University',
    'Volgograd State Medical University'
  ],
  Egypt: [
    'Cairo University Faculty of Medicine',
    'Ain Shams University Faculty of Medicine',
    'Alexandria University Faculty of Medicine',
    'Mansoura University Faculty of Medicine'
  ],
  Vietnam: [
    'Hanoi Medical University',
    'Ho Chi Minh City University of Medicine and Pharmacy',
    'Hue University of Medicine and Pharmacy',
    'Can Tho University of Medicine and Pharmacy'
  ]
};

type FormData = {
  fullName: string;
  dob: string;
  email: string;
  phone: string;
  gender: string;
  guardianName: string;
  neetScore: string;
  neetYear: string;
  pcbPercent: string;
  course: string;
  country: string;
  university: string;
  passportStatus: string;
  city: string;
  pincode: string;
  consent: boolean;
};

const initialFormData: FormData = {
  fullName: '',
  dob: '',
  email: '',
  phone: '',
  gender: '',
  guardianName: '',
  neetScore: '',
  neetYear: new Date().getFullYear().toString(),
  pcbPercent: '',
  course: 'UG-MBBS',
  country: '',
  university: '',
  passportStatus: '',
  city: '',
  pincode: '',
  consent: false
};

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Clear university if country changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, university: '' }));
  }, [formData.country]);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.dob) newErrors.dob = 'Date of Birth is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email Address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Mobile Number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s\-+]/g, '').slice(-10))) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number';
      }
      if (!formData.gender) newErrors.gender = 'Gender selection is required';
      if (!formData.guardianName.trim()) newErrors.guardianName = "Guardian's Name is required";
    }

    if (currentStep === 2) {
      const neetScoreNum = parseInt(formData.neetScore, 10);
      if (!formData.neetScore) {
        newErrors.neetScore = 'NEET Score is required';
      } else if (isNaN(neetScoreNum) || neetScoreNum < 0 || neetScoreNum > 720) {
        newErrors.neetScore = 'NEET Score must be between 0 and 720';
      }
      if (!formData.neetYear) newErrors.neetYear = 'NEET Year is required';
      
      const pcbNum = parseFloat(formData.pcbPercent);
      if (!formData.pcbPercent) {
        newErrors.pcbPercent = '12th P.C.B % is required';
      } else if (isNaN(pcbNum) || pcbNum < 0 || pcbNum > 100) {
        newErrors.pcbPercent = 'P.C.B Percentage must be between 0 and 100';
      }
    }

    if (currentStep === 3) {
      if (!formData.course) newErrors.course = 'Please select a course';
      if (!formData.country) newErrors.country = 'Please select a preferred country';
      if (!formData.university) newErrors.university = 'Please select a preferred university';
      if (!formData.passportStatus) newErrors.passportStatus = 'Please select your passport status';
    }

    if (currentStep === 4) {
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Pincode must be exactly 6 digits';
      }
      if (!formData.consent) newErrors.consent = 'You must agree to the terms to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      setIsSubmitting(true);
      // Simulate Payment Gateway Redirection/Checkout
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    }
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <div className={styles.curtainWrap}>
        <Header />
        <main className={styles.main}>
          <div className={styles.bgGlow} aria-hidden />
          <div className="container">
            <div className={styles.layout}>
              
              {/* Left Column: Context & Pricing details */}
              <div className={styles.introCol}>
                <div className={styles.badge}>Admissions Cycle 2026</div>
                <h1 className={styles.title}>
                  Start Your Medical <em>Career</em> Abroad
                </h1>
                <p className={styles.desc}>
                  Secure your direct clinical placements, verified NMC-listed institutions, and hassle-free visa processing with National Videsh Vidya Foundation.
                </p>

                <div className={styles.pricingCard}>
                  <div className={styles.pricingHeader}>
                    <span className={styles.pricingLabel}>Registration & Advisory Fee</span>
                    <div className={styles.priceContainer}>
                      <span className={styles.currencySymbol}>₹</span>
                      <span className={styles.priceAmount}>30,000</span>
                      <span className={styles.pricePeriod}>INR</span>
                    </div>
                  </div>
                  <ul className={styles.pricingFeatures}>
                    <li>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>Direct Admissions counseling & review</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>NMC & WHO Eligibility Verification</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>End-to-End Documentation vetting</span>
                    </li>
                  </ul>
                  <div className={styles.secureBadge}>
                    <CreditCard size={14} />
                    <span>Secure Payment via Encrypted Gateway</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Multi-step Form Wizard */}
              <div className={styles.formCol}>
                {isSuccess ? (
                  <div className={styles.successScreen}>
                    <div className={styles.successIconWrap}>
                      <CheckCircle2 size={56} className={styles.successIcon} />
                    </div>
                    <h2>Application Registered!</h2>
                    <p className={styles.successText}>
                      Thank you, <strong>{formData.fullName}</strong>. Your initial registration fee payment of <strong>₹30,000 INR</strong> was simulated successfully. 
                    </p>
                    <div className={styles.summaryBox}>
                      <h4>Application Summary</h4>
                      <p><strong>Course:</strong> {formData.course}</p>
                      <p><strong>Preferred University:</strong> {formData.university} ({formData.country})</p>
                      <p><strong>NEET Score:</strong> {formData.neetScore} ({formData.neetYear})</p>
                    </div>
                    <p className={styles.successNextSteps}>
                      A senior admissions counsellor will contact you on <strong>{formData.phone}</strong> and email details to <strong>{formData.email}</strong> within 4 working hours.
                    </p>
                    <button 
                      onClick={() => {
                        setFormData(initialFormData);
                        setStep(1);
                        setIsSuccess(false);
                      }} 
                      className={styles.resetButton}
                    >
                      Fill Another Application
                    </button>
                  </div>
                ) : (
                  <div className={styles.card}>
                    {/* Step indicators */}
                    <div className={styles.stepsIndicator}>
                      {[
                        { num: 1, label: 'Identity', Icon: User },
                        { num: 2, label: 'Academic', Icon: GraduationCap },
                        { num: 3, label: 'Program', Icon: Globe },
                        { num: 4, label: 'Payment', Icon: CreditCard }
                      ].map(s => (
                        <div 
                          key={s.num} 
                          className={`${styles.stepIndicatorItem} ${step >= s.num ? styles.activeIndicator : ''} ${step === s.num ? styles.currentIndicator : ''}`}
                        >
                          <div className={styles.indicatorIconWrap}>
                            <s.Icon size={16} />
                          </div>
                          <span className={styles.indicatorLabel}>{s.label}</span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                      {/* Step 1: Basic Identity & Contact */}
                      {step === 1 && (
                        <div className={styles.stepContent}>
                          <h3 className={styles.stepTitle}>Basic Identity & Contact</h3>
                          <p className={styles.stepSubtitle}>Provide the student's core details below.</p>

                          <div className={styles.inputGroup}>
                            <label htmlFor="fullName">Full Name</label>
                            <input
                              type="text"
                              id="fullName"
                              placeholder="Enter your full legal name"
                              value={formData.fullName}
                              onChange={e => updateField('fullName', e.target.value)}
                              className={errors.fullName ? styles.inputError : ''}
                            />
                            {errors.fullName && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.fullName}</span>}
                          </div>

                          <div className={styles.grid2}>
                            <div className={styles.inputGroup}>
                              <label htmlFor="dob">Date of Birth</label>
                              <input
                                type="date"
                                id="dob"
                                value={formData.dob}
                                onChange={e => updateField('dob', e.target.value)}
                                className={errors.dob ? styles.inputError : ''}
                              />
                              {errors.dob && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.dob}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                              <label htmlFor="gender">Gender</label>
                              <select
                                id="gender"
                                value={formData.gender}
                                onChange={e => updateField('gender', e.target.value)}
                                className={errors.gender ? styles.inputError : ''}
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                              {errors.gender && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.gender}</span>}
                            </div>
                          </div>

                          <div className={styles.grid2}>
                            <div className={styles.inputGroup}>
                              <label htmlFor="email">Email Address</label>
                              <input
                                type="email"
                                id="email"
                                placeholder="name@domain.com"
                                value={formData.email}
                                onChange={e => updateField('email', e.target.value)}
                                className={errors.email ? styles.inputError : ''}
                              />
                              {errors.email && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.email}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                              <label htmlFor="phone">Mobile Number</label>
                              <input
                                type="tel"
                                id="phone"
                                placeholder="10-digit mobile number"
                                value={formData.phone}
                                onChange={e => updateField('phone', e.target.value)}
                                className={errors.phone ? styles.inputError : ''}
                              />
                              {errors.phone && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.phone}</span>}
                            </div>
                          </div>

                          <div className={styles.inputGroup}>
                            <label htmlFor="guardianName">Guardian's Name</label>
                            <input
                              type="text"
                              id="guardianName"
                              placeholder="Father / Mother / Guardian full name"
                              value={formData.guardianName}
                              onChange={e => updateField('guardianName', e.target.value)}
                              className={errors.guardianName ? styles.inputError : ''}
                            />
                            {errors.guardianName && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.guardianName}</span>}
                          </div>
                        </div>
                      )}

                      {/* Step 2: Academic Eligibility */}
                      {step === 2 && (
                        <div className={styles.stepContent}>
                          <h3 className={styles.stepTitle}>Academic Eligibility</h3>
                          <p className={styles.stepSubtitle}>Provide core qualifying metrics for medical program eligibility.</p>

                          <div className={styles.grid2}>
                            <div className={styles.inputGroup}>
                              <label htmlFor="neetScore">NEET Score (out of 720)</label>
                              <input
                                type="number"
                                id="neetScore"
                                placeholder="Enter score"
                                value={formData.neetScore}
                                onChange={e => updateField('neetScore', e.target.value)}
                                className={errors.neetScore ? styles.inputError : ''}
                              />
                              {errors.neetScore && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.neetScore}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                              <label htmlFor="neetYear">NEET Year</label>
                              <select
                                id="neetYear"
                                value={formData.neetYear}
                                onChange={e => updateField('neetYear', e.target.value)}
                                className={errors.neetYear ? styles.inputError : ''}
                              >
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                              </select>
                              {errors.neetYear && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.neetYear}</span>}
                            </div>
                          </div>

                          <div className={styles.inputGroup}>
                            <label htmlFor="pcbPercent">12th P.C.B % (Physics, Chemistry, Biology Aggregate)</label>
                            <input
                              type="number"
                              id="pcbPercent"
                              placeholder="e.g. 78.5"
                              step="0.01"
                              value={formData.pcbPercent}
                              onChange={e => updateField('pcbPercent', e.target.value)}
                              className={errors.pcbPercent ? styles.inputError : ''}
                            />
                            {errors.pcbPercent && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.pcbPercent}</span>}
                          </div>
                        </div>
                      )}

                      {/* Step 3: Program Preferences & Travel Readiness */}
                      {step === 3 && (
                        <div className={styles.stepContent}>
                          <h3 className={styles.stepTitle}>Program Preferences</h3>
                          <p className={styles.stepSubtitle}>Select your course, destination, and preferred university.</p>

                          <div className={styles.inputGroup}>
                            <label htmlFor="course">Course Selection</label>
                            <select
                              id="course"
                              value={formData.course}
                              onChange={e => updateField('course', e.target.value)}
                              className={errors.course ? styles.inputError : ''}
                            >
                              {courses.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                            {errors.course && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.course}</span>}
                          </div>

                          <div className={styles.grid2}>
                            <div className={styles.inputGroup}>
                              <label htmlFor="country">Preferred Country</label>
                              <select
                                id="country"
                                value={formData.country}
                                onChange={e => updateField('country', e.target.value)}
                                className={errors.country ? styles.inputError : ''}
                              >
                                <option value="">Select Country</option>
                                {countries.map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                              {errors.country && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.country}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                              <label htmlFor="university">Preferred University</label>
                              <select
                                id="university"
                                value={formData.university}
                                onChange={e => updateField('university', e.target.value)}
                                className={errors.university ? styles.inputError : ''}
                                disabled={!formData.country}
                              >
                                <option value="">
                                  {!formData.country ? 'Select a Country First' : 'Select University'}
                                </option>
                                {formData.country && universitiesByCountry[formData.country]?.map(uni => (
                                  <option key={uni} value={uni}>{uni}</option>
                                ))}
                              </select>
                              {errors.university && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.university}</span>}
                            </div>
                          </div>

                          <div className={styles.inputGroup}>
                            <label>Do you have a valid Passport?</label>
                            <div className={styles.toggleButtons}>
                              <button
                                type="button"
                                className={`${styles.toggleBtn} ${formData.passportStatus === 'Yes' ? styles.toggleBtnActive : ''}`}
                                onClick={() => updateField('passportStatus', 'Yes')}
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                className={`${styles.toggleBtn} ${formData.passportStatus === 'No' ? styles.toggleBtnActive : ''}`}
                                onClick={() => updateField('passportStatus', 'No')}
                              >
                                No
                              </button>
                            </div>
                            {errors.passportStatus && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.passportStatus}</span>}
                          </div>
                        </div>
                      )}

                      {/* Step 4: Billing & Consent */}
                      {step === 4 && (
                        <div className={styles.stepContent}>
                          <h3 className={styles.stepTitle}>Billing & Consent</h3>
                          <p className={styles.stepSubtitle}>Complete billing details and confirm institution policy consent.</p>

                          <div className={styles.grid2}>
                            <div className={styles.inputGroup}>
                              <label htmlFor="city">City</label>
                              <input
                                type="text"
                                id="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={e => updateField('city', e.target.value)}
                                className={errors.city ? styles.inputError : ''}
                              />
                              {errors.city && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.city}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                              <label htmlFor="pincode">Pincode</label>
                              <input
                                type="text"
                                id="pincode"
                                placeholder="6-digit pincode"
                                value={formData.pincode}
                                onChange={e => updateField('pincode', e.target.value)}
                                className={errors.pincode ? styles.inputError : ''}
                              />
                              {errors.pincode && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.pincode}</span>}
                            </div>
                          </div>

                          <div className={styles.consentGroup}>
                            <label className={styles.checkboxContainer}>
                              <input
                                type="checkbox"
                                checked={formData.consent}
                                onChange={e => updateField('consent', e.target.checked)}
                                className={errors.consent ? styles.inputError : ''}
                              />
                              <span className={styles.checkmark} />
                              <span className={styles.consentText}>
                                I agree to the terms, conditions, and institution policies of NVVF.
                              </span>
                            </label>
                            {errors.consent && <span className={styles.errorMsg}><AlertCircle size={12} /> {errors.consent}</span>}
                          </div>

                          <div className={styles.paymentSummary}>
                            <div className={styles.summaryRow}>
                              <span>Registration Fee</span>
                              <span>₹30,000.00</span>
                            </div>
                            <div className={styles.summaryRow}>
                              <span>Taxes & Charges</span>
                              <span>Inclusive</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.summaryRowTotal}`}>
                              <span>Total Amount</span>
                              <span>₹30,000.00</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Navigation Controls */}
                      <div className={styles.navControls}>
                        {step > 1 && (
                          <button
                            type="button"
                            onClick={handleBack}
                            className={styles.backBtn}
                          >
                            <ArrowLeft size={16} />
                            <span>Back</span>
                          </button>
                        )}

                        {step < 4 ? (
                          <button
                            type="button"
                            onClick={handleNext}
                            className={styles.nextBtn}
                          >
                            <span>Next Step</span>
                            <ArrowRight size={16} />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.submitBtn}
                          >
                            {isSubmitting ? (
                              <span>Redirecting to Gateway...</span>
                            ) : (
                              <>
                                <span>Pay ₹30,000 INR & Apply</span>
                                <CreditCard size={16} />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
      <Footer curtain={true} />
    </>
  );
}
