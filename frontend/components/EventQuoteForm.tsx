"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const EventQuoteForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    eventDate: '',
    eventType: '',
    vision: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.eventType) {
      newErrors.eventType = 'Please select an event type';
    }
    
    if (!formData.vision.trim()) {
      newErrors.vision = 'Please tell us about your vision';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        eventDate: '',
        eventType: '',
        vision: ''
      });
      
      // Reset success status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="inquiry" className="w-full max-w-2xl rounded-2xl bg-white p-6 md:p-8 shadow-2xl lg:mr-0">
      <h2 className="font-display text-2xl text-neutral-900">Get Event Quote</h2>
      <p className="mt-2 text-sm text-neutral-600">Form ab clear aur visible hai - details share karein, team jaldi contact karegi.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">
              Thank you! Your inquiry has been received. Our team will contact you within 15 minutes.
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">
              Something went wrong. Please try again or contact us directly at +92 304 567 9000.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b] ${
                errors.fullName ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
            )}
          </div>
          <div>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b] ${
                errors.phoneNumber ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b] ${
              errors.email ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b]"
          />
          <div>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b] ${
                errors.eventType ? 'border-red-500' : 'border-neutral-300'
              }`}
            >
              <option value="">Select Event Type</option>
              <option value="nikah">Nikah / Wedding</option>
              <option value="corporate">Corporate Event</option>
              <option value="social">Social Celebration</option>
            </select>
            {errors.eventType && (
              <p className="mt-1 text-xs text-red-600">{errors.eventType}</p>
            )}
          </div>
        </div>

        <div>
          <textarea
            name="vision"
            value={formData.vision}
            onChange={handleInputChange}
            placeholder="Tell us your vision..."
            rows={4}
            className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[#c9a55b] resize-none ${
              errors.vision ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.vision && (
            <p className="mt-1 text-xs text-red-600">{errors.vision}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
};

export default EventQuoteForm;
