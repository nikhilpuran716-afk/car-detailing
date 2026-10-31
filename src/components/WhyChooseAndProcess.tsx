import React, { useState } from 'react';
import { MapPin, Eye, CalendarCheck, Sparkles, Droplets, Zap, Shield, ArrowRight } from 'lucide-react';

interface WhyChooseAndProcessProps {
  onBookNowClick: () => void;
}

export const WhyChooseAndProcess: React.FC<WhyChooseAndProcessProps> = ({ onBookNowClick }) => {
  const [activeRigSpec, setActiveRigSpec] = useState<'water' | 'power' | 'safety'>('water');

  const reasons = [
    {
      index: '01',
      title: 'We Come to Your Location',
      description:
        'Skip the dealership waiting room and local car wash lines. Our mobile detailing van arrives directly at your Miami residence, private driveway, or executive parking garage.',
      icon: MapPin,
    },
    {
      index: '02',
      title: 'Attention to Every Detail',
      description:
        'From inner wheel barrels and door jambs to air vents and perforated leather stitching, we treat every recessed surface with specialized brushes and inspection lights.',
      icon: Eye,
    },
    {
      index: '03',
      title: 'Convenient Appointment Requests',
      description:
        'Request your preferred date, location, and detailing package online in under two minutes, or reach out directly via phone or WhatsApp for tailored scheduling.',
      icon: CalendarCheck,
    },
    {
      index: '04',
      title: 'Personalized Detailing Services',
      description:
        'No two vehicles see the same road conditions. We adjust our decontamination chemistry, pad selection, and interior conditioning to match your exact vehicle materials.',
      icon: Sparkles,
    },
  ];

  const rigSpecs = {
    water: {
      title: '100% Spot-Free Deionized Water Filtration',
      summary:
        'Florida tap water contains high mineral content that leaves chalky water spots on dark paintwork. Our mobile unit carries on-board deionized water tanks so your vehicle dries crystal-clear even in direct Miami sunlight.',
      metrics: 'Zero TDS (Total Dissolved Solids) · Safe for Ceramic & Matte Finishes',
    },
    power: {
      title: 'Self-Contained Power & Quiet Equipment',
      summary:
        'We never need to plug into your home outlets or drag hoses across your landscaping. Our quiet, residential-friendly mobile setup operates independently in driveways and approved condo parking areas.',
      metrics: 'No Customer Hookups Required · Gated Community Friendly',
    },
    safety: {
      title: 'Single-Vehicle Microfiber & Two-Bucket Protocol',
      summary:
        'Automatic tunnel brushes grind dirt from previous cars into your clearcoat. We use fresh, color-coded high-GSM microfiber towels for every single vehicle alongside grit-guarded wash buckets.',
      metrics: 'Scratch-Free Wash Media · pH-Neutral Surface Formulations',
    },
  };

  const steps = [
    {
      stepNumber: 'STEP 01',
      title: 'Choose Your Service',
      description:
        'Explore our Exterior Detailing, Interior Detailing, Full Detail, or Ceramic Coating packages and select the level of care your vehicle needs.',
      actionText: 'Compare 4 Packages Above',
    },
    {
      stepNumber: 'STEP 02',
      title: 'Request Your Appointment',
      description:
        'Submit your vehicle make, preferred date, and Miami service location through our quick online booking inquiry form or by phone.',
      actionText: 'Takes Under 2 Minutes',
    },
    {
      stepNumber: 'STEP 03',
      title: 'Enjoy Your Freshly Detailed Vehicle',
      description:
        'We arrive fully equipped with water and power, perform the complete service on-site, and walk you through the finished results.',
      actionText: 'Driveway or Office Delivery',
    },
  ];

  return (
    <>
      {/* SECTION 6: WHY CHOOSE US */}
      <section
        id="why-us"
        className="py-20 md:py-28 bg-[#08080A] border-b border-white/10 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Narrative & Interactive Mobile Unit Spec Switcher */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-slate-400">
                  <span className="text-[#FF5500] font-semibold">Why Choose Apex</span>
                  <span aria-hidden="true">·</span>
                  <span>The Mobile Studio Advantage</span>
                </div>

                <h2
                  className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Showroom-Caliber Care Without Leaving Your Driveway
                </h2>

                <p className="text-base text-slate-400 leading-relaxed">
                  Traditional car washes prioritize speed over paint preservation. Apex Auto
                  Detailing brings studio-level methodology, safe wash chemistry, and dedicated
                  craftsmanship directly to your location in Miami.
                </p>
              </div>

              {/* Interactive Mobile Unit Engineering Breakdown */}
              <div className="p-6 rounded-xl bg-[#0E1117] border border-white/10 space-y-5">
                <div className="text-xs font-semibold tracking-wider text-slate-300">
                  INSPECT OUR MOBILE UNIT CAPABILITIES:
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveRigSpec('water')}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                      activeRigSpec === 'water'
                        ? 'bg-[#FF5500] text-white border-[#FF5500]'
                        : 'bg-[#090B10] text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <Droplets className="w-3.5 h-3.5 shrink-0" />
                    <span>DI Water</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveRigSpec('power')}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                      activeRigSpec === 'power'
                        ? 'bg-[#FF5500] text-white border-[#FF5500]'
                        : 'bg-[#090B10] text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 shrink-0" />
                    <span>On-Board Power</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveRigSpec('safety')}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                      activeRigSpec === 'safety'
                        ? 'bg-[#FF5500] text-white border-[#FF5500]'
                        : 'bg-[#090B10] text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 shrink-0" />
                    <span>Paint Safety</span>
                  </button>
                </div>

                <div className="pt-1 space-y-2">
                  <h3 className="font-display text-lg font-bold text-white">
                    {rigSpecs[activeRigSpec].title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {rigSpecs[activeRigSpec].summary}
                  </p>
                  <div className="pt-2 text-xs font-mono-tabular text-[#FF5500]">
                    {rigSpecs[activeRigSpec].metrics}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Architectural Benefit Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason) => {
                const IconComponent = reason.icon;
                return (
                  <div
                    key={reason.title}
                    className="p-6 sm:p-7 rounded-xl bg-[#0E1117] border border-white/10 hover:border-white/25 transition-colors duration-200 flex flex-col justify-between space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tabular text-xs font-semibold text-slate-400">
                        {reason.index}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#FF5500]">
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="font-display text-xl font-bold text-white tracking-tight">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section
        id="process"
        className="py-20 md:py-24 bg-[#0B0D12] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-slate-400">
                <span className="text-[#FF5500] font-semibold">How It Works</span>
                <span aria-hidden="true">·</span>
                <span>Simple 3-Step Mobile Process</span>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Effortless From Booking to Final Walk-Around
              </h2>
            </div>

            <button
              type="button"
              onClick={onBookNowClick}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
            >
              <span>Start Step 1 Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Numbered Step Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, idx) => (
              <div
                key={item.stepNumber}
                className="relative p-7 sm:p-8 rounded-xl bg-[#0F1219] border border-white/10 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="font-mono-tabular text-xs font-bold tracking-widest text-[#FF5500]">
                      {item.stepNumber}
                    </span>
                    <span className="font-mono-tabular text-2xl font-bold text-slate-600">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 text-xs font-mono-tabular text-slate-400">
                  {item.actionText}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
