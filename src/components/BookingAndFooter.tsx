import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RotateCcw,
  Instagram,
  Mail,
  MapPin,
  X,
} from 'lucide-react';
import { DEMO_CONTACT, SERVICES_DATA, MIAMI_SERVICE_AREAS } from '../data/siteData';

export interface BookingFormValues {
  fullName: string;
  phone: string;
  email: string;
  vehicleMakeModel: string;
  vehicleType: string;
  desiredService: string;
  preferredDate: string;
  serviceLocation: string;
  additionalDetails: string;
}

interface BookingAndFooterProps {
  preselectedService: string;
  preselectedVehicleType: string;
  preselectedLocation: string;
  onSelectServiceNav: (serviceTitle: string) => void;
}

export const BookingAndFooter: React.FC<BookingAndFooterProps> = ({
  preselectedService,
  preselectedVehicleType,
  preselectedLocation,
  onSelectServiceNav,
}) => {
  const [formValues, setFormValues] = useState<BookingFormValues>({
    fullName: '',
    phone: '',
    email: '',
    vehicleMakeModel: '',
    vehicleType: 'Coupe / Sedan',
    desiredService: 'Full Interior & Exterior Detail',
    preferredDate: '',
    serviceLocation: '',
    additionalDetails: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormValues, string>>>({});
  const [formErrorBanner, setFormErrorBanner] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<(BookingFormValues & { refId: string }) | null>(
    null
  );
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Sync preselected values from Services or Service Area buttons
  useEffect(() => {
    if (preselectedService) {
      setFormValues((prev) => ({ ...prev, desiredService: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedVehicleType) {
      setFormValues((prev) => ({ ...prev, vehicleType: preselectedVehicleType }));
    }
  }, [preselectedVehicleType]);

  useEffect(() => {
    if (preselectedLocation) {
      setFormValues((prev) => ({ ...prev, serviceLocation: preselectedLocation }));
    }
  }, [preselectedLocation]);

  const validateForm = (): boolean => {
    const nextErrors: Partial<Record<keyof BookingFormValues, string>> = {};

    if (!formValues.fullName.trim() || formValues.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const digitsOnly = formValues.phone.replace(/\D/g, '');
    if (!digitsOnly || digitsOnly.length < 10) {
      nextErrors.phone = 'Please enter a valid 10-digit US phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim() || !emailRegex.test(formValues.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formValues.vehicleMakeModel.trim()) {
      nextErrors.vehicleMakeModel = 'Please enter your vehicle year, make, and model.';
    }

    if (!formValues.vehicleType.trim()) {
      nextErrors.vehicleType = 'Please select your vehicle type.';
    }

    if (!formValues.desiredService.trim()) {
      nextErrors.desiredService = 'Please select your desired detailing service.';
    }

    if (!formValues.preferredDate.trim()) {
      nextErrors.preferredDate = 'Please select a preferred appointment date.';
    }

    if (!formValues.serviceLocation.trim()) {
      nextErrors.serviceLocation = 'Please enter your Miami neighborhood or driveway location.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormErrorBanner('Please review the highlighted fields below to complete your inquiry.');
      return false;
    }

    setFormErrorBanner(null);
    return true;
  };

  const handleInputChange = (
    field: keyof BookingFormValues,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleFillSampleData = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const isoDate = tomorrow.toISOString().split('T')[0];

    setFormValues({
      fullName: 'Jordan Vance (Demo Inquiry)',
      phone: '(305) 555-0148',
      email: 'jordan.vance@demo-client.example',
      vehicleMakeModel: '2025 Porsche 911 Carrera GTS (Jet Black Metallic)',
      vehicleType: 'Coupe / Sedan',
      desiredService: 'Full Interior & Exterior Detail',
      preferredDate: isoDate,
      serviceLocation: 'Coral Gables — Private Driveway',
      additionalDetails:
        'Vehicle has ceramic brake calipers and matte carbon interior trim. Covered driveway available.',
    });
    setErrors({});
    setFormErrorBanner(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const refId = `APEX-MIA-${randomCode}`;

    // Submit to Netlify Forms when hosted on Netlify (gracefully ignored in local preview)
    try {
      const encoded = new URLSearchParams({
        'form-name': 'apex-booking-request',
        ...formValues,
      }).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
      }).catch(() => {
        // Ignore network errors in local preview environments
      });
    } catch {
      // Ignore encoding errors
    }

    setSubmittedData({
      ...formValues,
      refId,
    });
  };

  const handleCopySummary = () => {
    if (!submittedData) return;
    const text = [
      `APEX AUTO DETAILING — APPOINTMENT REQUEST SUMMARY`,
      `Booking Reference: ${submittedData.refId}`,
      `Client: ${submittedData.fullName}`,
      `Phone: ${submittedData.phone} | Email: ${submittedData.email}`,
      `Vehicle: ${submittedData.vehicleMakeModel} (${submittedData.vehicleType})`,
      `Service Package: ${submittedData.desiredService}`,
      `Preferred Date: ${submittedData.preferredDate}`,
      `Miami Location: ${submittedData.serviceLocation}`,
      `Notes: ${submittedData.additionalDetails || 'None'}`,
    ].join('\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2500);
      });
    }
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* SECTION 10: HIGH-CONVERTING BOOKING SECTION */}
      <section
        id="booking"
        className="py-20 md:py-28 bg-[#08080A] border-b border-white/10 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Booking Value Proposition & Direct Contact Alternatives (5 Columns) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-slate-400">
                  <span className="text-[#FF5500] font-semibold">Online Booking Request</span>
                  <span aria-hidden="true">·</span>
                  <span>Mobile Driveway Dispatch</span>
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Request Your Mobile Detailing Appointment
                </h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  Complete the booking request form with your vehicle details and preferred Miami
                  location. Our detailing concierge will review your request and confirm your
                  arrival window promptly.
                </p>
              </div>

              {/* What Happens Next Checklist */}
              <div className="p-6 rounded-xl bg-[#0E1117] border border-white/10 space-y-4">
                <h3 className="font-display text-lg font-bold text-white">
                  What to Expect on Appointment Day
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="font-mono-tabular text-xs font-bold text-[#FF5500] mt-0.5">
                      01.
                    </span>
                    <span>
                      We arrive with our own deionized water supply and power—only access to your
                      parked vehicle is needed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono-tabular text-xs font-bold text-[#FF5500] mt-0.5">
                      02.
                    </span>
                    <span>
                      Pre-inspection walk-around to review paint condition, wheel finish, and any
                      specific interior focus areas.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono-tabular text-xs font-bold text-[#FF5500] mt-0.5">
                      03.
                    </span>
                    <span>
                      No upfront payment required to request an appointment slot.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Instant Call / WhatsApp Conversion Box */}
              <div className="p-6 rounded-xl bg-[#0E1117] border border-white/10 space-y-4">
                <div className="text-xs font-semibold tracking-wider text-slate-300">
                  PREFER DIRECT SCHEDULING BY PHONE OR WHATSAPP?
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={DEMO_CONTACT.phoneHref}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs sm:text-sm font-semibold text-white transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#FF5500]" />
                    <span>Call {DEMO_CONTACT.phoneDisplay}</span>
                  </a>
                  <a
                    href={DEMO_CONTACT.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs sm:text-sm font-semibold text-white transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FF5500]" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Booking Form or Demo Confirmation State (7 Columns) */}
            <div className="lg:col-span-7 bg-[#0E1117] border border-white/15 rounded-xl p-6 sm:p-8 lg:p-10">
              {submittedData ? (
                /* SUBMISSION CONFIRMATION VIEW */
                <div className="space-y-6" role="status" aria-live="polite">
                  <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-xs font-mono-tabular text-[#FF5500]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>APPOINTMENT REQUEST RECEIVED · REF #{submittedData.refId}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                        Your Detailing Request Has Been Received
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Thank you for choosing{' '}
                        <strong className="text-white">Apex Auto Detailing</strong>. Our Miami
                        mobile dispatch coordinator will contact you shortly at{' '}
                        <span className="text-white font-medium">{submittedData.phone}</span> to
                        confirm your exact arrival window.
                      </p>
                    </div>
                  </div>

                  {/* Structured Summary Grid */}
                  <div className="p-5 rounded-lg bg-[#090B10] border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-slate-400 block text-xs">Client Name</span>
                      <span className="font-semibold text-white">{submittedData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">Contact Details</span>
                      <span className="font-semibold text-white">
                        {submittedData.phone} · {submittedData.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">Vehicle</span>
                      <span className="font-semibold text-white">
                        {submittedData.vehicleMakeModel} ({submittedData.vehicleType})
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">Selected Package</span>
                      <span className="font-semibold text-[#FF5500]">
                        {submittedData.desiredService}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">Preferred Date</span>
                      <span className="font-mono-tabular font-semibold text-white">
                        {submittedData.preferredDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">Service Location</span>
                      <span className="font-semibold text-white">
                        {submittedData.serviceLocation}
                      </span>
                    </div>
                    {submittedData.additionalDetails && (
                      <div className="sm:col-span-2 pt-2 border-t border-white/10">
                        <span className="text-slate-400 block text-xs">Additional Notes</span>
                        <span className="text-slate-200">{submittedData.additionalDetails}</span>
                      </div>
                    )}
                  </div>

                  {/* Confirmation Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-4 h-4 text-[#FF5500]" />
                          <span>Summary Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#FF5500]" />
                          <span>Copy Booking Summary</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] rounded-md transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Book Another Vehicle</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* BOOKING INQUIRY FORM */
                <form
                  name="apex-booking-request"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="apex-booking-request" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        Appointment Request Details
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        All fields marked with <span className="text-[#FF5500]">*</span> are
                        required to reserve your mobile dispatch window.
                      </p>
                    </div>
                    <span className="text-xs font-mono-tabular text-slate-400">
                      Miami-Dade Mobile Concierge
                    </span>
                  </div>

                  {formErrorBanner && (
                    <div
                      role="alert"
                      className="p-4 rounded-lg bg-red-950/50 border border-red-500/40 flex items-start gap-3 text-xs sm:text-sm text-red-200"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{formErrorBanner}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* 1. Full Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-full-name"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Full Name <span className="text-[#FF5500]">*</span>
                      </label>
                      <input
                        id="booking-full-name"
                        type="text"
                        value={formValues.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="e.g., Alex Rivera"
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#08090D] border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500] transition-colors ${
                          errors.fullName ? 'border-red-500' : 'border-white/15'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-400">{errors.fullName}</p>
                      )}
                    </div>

                    {/* 2. Phone Number */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Phone Number <span className="text-[#FF5500]">*</span>
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        value={formValues.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(305) 555-0199"
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#08090D] border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500] transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-white/15'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-400">{errors.phone}</p>
                      )}
                    </div>

                    {/* 3. Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-email"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Email Address <span className="text-[#FF5500]">*</span>
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        value={formValues.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="name@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#08090D] border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500] transition-colors ${
                          errors.email ? 'border-red-500' : 'border-white/15'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>

                    {/* 4. Vehicle Make and Model */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-make-model"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Vehicle Make and Model <span className="text-[#FF5500]">*</span>
                      </label>
                      <input
                        id="booking-make-model"
                        type="text"
                        value={formValues.vehicleMakeModel}
                        onChange={(e) => handleInputChange('vehicleMakeModel', e.target.value)}
                        placeholder="e.g., 2024 Porsche 911 / BMW X5"
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#08090D] border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500] transition-colors ${
                          errors.vehicleMakeModel ? 'border-red-500' : 'border-white/15'
                        }`}
                      />
                      {errors.vehicleMakeModel && (
                        <p className="text-xs text-red-400">{errors.vehicleMakeModel}</p>
                      )}
                    </div>

                    {/* 5. Vehicle Type */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-vehicle-type"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Vehicle Type <span className="text-[#FF5500]">*</span>
                      </label>
                      <select
                        id="booking-vehicle-type"
                        value={formValues.vehicleType}
                        onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#08090D] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF5500] transition-colors"
                      >
                        <option value="Coupe / Sedan">Coupe / Sedan</option>
                        <option value="SUV / Crossover">SUV / Crossover</option>
                        <option value="Exotic / Full-Size SUV">Exotic / Full-Size SUV</option>
                        <option value="Pickup Truck / Van">Pickup Truck / Executive Van</option>
                      </select>
                    </div>

                    {/* 6. Desired Service */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-desired-service"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Desired Service <span className="text-[#FF5500]">*</span>
                      </label>
                      <select
                        id="booking-desired-service"
                        value={formValues.desiredService}
                        onChange={(e) => handleInputChange('desiredService', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-md bg-[#08090D] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF5500] transition-colors"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 7. Preferred Appointment Date */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-preferred-date"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Preferred Appointment Date <span className="text-[#FF5500]">*</span>
                      </label>
                      <input
                        id="booking-preferred-date"
                        type="date"
                        value={formValues.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#08090D] border text-sm text-white focus:outline-none focus:border-[#FF5500] transition-colors ${
                          errors.preferredDate ? 'border-red-500' : 'border-white/15'
                        }`}
                      />
                      {errors.preferredDate && (
                        <p className="text-xs text-red-400">{errors.preferredDate}</p>
                      )}
                    </div>

                    {/* 8. Service Location */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-service-location"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        Service Location (Miami Area) <span className="text-[#FF5500]">*</span>
                      </label>
                      <input
                        id="booking-service-location"
                        type="text"
                        list="miami-locations-list"
                        value={formValues.serviceLocation}
                        onChange={(e) => handleInputChange('serviceLocation', e.target.value)}
                        placeholder="e.g., Brickell, Coral Gables, Miami Beach"
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#08090D] border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500] transition-colors ${
                          errors.serviceLocation ? 'border-red-500' : 'border-white/15'
                        }`}
                      />
                      <datalist id="miami-locations-list">
                        {MIAMI_SERVICE_AREAS.map((area) => (
                          <option key={area.id} value={area.name} />
                        ))}
                      </datalist>
                      {errors.serviceLocation && (
                        <p className="text-xs text-red-400">{errors.serviceLocation}</p>
                      )}
                    </div>
                  </div>

                  {/* 9. Additional Details */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-additional-details"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      Additional Details (Optional)
                    </label>
                    <textarea
                      id="booking-additional-details"
                      rows={3}
                      value={formValues.additionalDetails}
                      onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                      placeholder="Share paint condition notes, pet hair/spill concerns, or garage clearance instructions..."
                      className="w-full px-3.5 py-2.5 rounded-md bg-[#08090D] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5500] transition-colors"
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-md bg-[#FF5500] hover:bg-[#E04800] active:scale-[0.99] text-sm font-semibold tracking-wider text-white transition-all duration-150 cursor-pointer shadow-lg shadow-[#FF5500]/20"
                    >
                      REQUEST MY APPOINTMENT
                    </button>
                    <p className="text-[11px] text-slate-400 text-center">
                      No upfront payment required. You will receive appointment confirmation via
                      phone and email.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FINAL CTA */}
      <section
        aria-label="Final Call to Action"
        className="py-20 md:py-24 bg-gradient-to-b from-[#0D1017] to-[#08080A] border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wider text-slate-400">
            <span className="text-[#FF5500] font-semibold">Apex Auto Detailing</span>
            <span aria-hidden="true">·</span>
            <span>Miami Mobile Service</span>
          </div>

          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            READY TO GIVE YOUR VEHICLE THE CARE IT DESERVES?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Premium detailing. Exceptional convenience. Your vehicle, transformed.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToBooking}
              className="px-8 py-4 text-sm font-semibold tracking-wider text-white bg-[#FF5500] hover:bg-[#E04800] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-[#FF5500]/20"
            >
              BOOK YOUR DETAIL
            </button>

            <a
              href={DEMO_CONTACT.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wider text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/20 rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-[#FF5500]" />
              <span>CALL US TODAY</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 12: PREMIUM FOOTER */}
      <footer className="bg-[#050608] text-slate-400 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand Column (4 Columns) */}
            <div className="lg:col-span-4 space-y-4">
              <a
                href="#home"
                className="font-display text-xl font-bold tracking-wider text-white inline-block"
              >
                APEX AUTO DETAILING
              </a>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Luxury mobile car detailing in Miami, Florida. Bringing self-contained spot-free
                water, paint-safe decontamination, and interior restoration directly to your
                driveway.
              </p>
              <div className="text-xs font-mono-tabular text-slate-500">
                Fully Self-Contained Mobile Studio · Spot-Free DI Water &amp; Power
              </div>
            </div>

            {/* Navigation Links (2 Columns) */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-display text-sm font-semibold text-white tracking-wider">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#home" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#work" className="hover:text-white transition-colors">
                    Our Work
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#booking" className="text-[#FF5500] hover:underline font-medium">
                    Book Now
                  </a>
                </li>
              </ul>
            </div>

            {/* Service Links (3 Columns) */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-display text-sm font-semibold text-white tracking-wider">
                Detailing Services
              </h3>
              <ul className="space-y-2.5 text-sm">
                {SERVICES_DATA.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => onSelectServiceNav(service.title)}
                      className="text-left hover:text-white transition-colors cursor-pointer"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Service Area Details (3 Columns) */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-display text-sm font-semibold text-white tracking-wider">
                Contact &amp; Service Area
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                  <span>Miami, Florida &amp; Surrounding Areas (Mobile Dispatch)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                  <a href={DEMO_CONTACT.phoneHref} className="hover:text-white transition-colors">
                    {DEMO_CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${DEMO_CONTACT.emailDisplay}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {DEMO_CONTACT.emailDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Instagram className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                  <a href="#work" className="hover:text-white transition-colors">
                    {DEMO_CONTACT.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal / Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} Apex Auto Detailing. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-slate-300 transition-colors underline underline-offset-4 cursor-pointer"
              >
                Privacy Policy &amp; Terms
              </button>
              <span aria-hidden="true">·</span>
              <span>Miami, Florida · Mobile Concierge</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy & Service Terms Modal */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setPrivacyModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#11131A] border border-white/15 rounded-xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 id="privacy-modal-title" className="font-display text-lg font-bold text-white">
                Privacy Policy &amp; Service Terms
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                aria-label="Close privacy policy modal"
                className="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Client Privacy:</strong> Apex Auto Detailing
                collects your contact details, vehicle information, and service address solely for
                the purpose of scheduling and performing your mobile detailing appointment in the
                Greater Miami area.
              </p>
              <p>
                <strong className="text-white">Appointment Preparation:</strong> Please ensure
                personal valuables are removed from cabin compartments prior to service and that
                our mobile unit has safe parking clearance adjacent to your vehicle.
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] rounded-md cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
