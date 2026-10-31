import React from 'react';
import {
  Phone,
  MessageCircle,
  Instagram,
  ChevronDown,
  Truck,
  Sparkles,
  ShieldCheck,
  Sliders,
} from 'lucide-react';
import { DEMO_CONTACT, HERO_SUPERCAR_IMAGE } from '../data/siteData';

interface HeroAndTrustProps {
  heroImageSrc?: string;
  onBookClick: () => void;
  onExploreServicesClick: () => void;
}

export const HeroAndTrust: React.FC<HeroAndTrustProps> = ({
  heroImageSrc = HERO_SUPERCAR_IMAGE,
  onBookClick,
  onExploreServicesClick,
}) => {
  const trustBenefits = [
    {
      title: 'Mobile Convenience',
      description:
        'Fully self-contained mobile unit equipped with spot-free water and quiet power delivered directly to your home or office.',
      icon: Truck,
    },
    {
      title: 'Professional Attention to Detail',
      description:
        'Multi-stage inspection lighting, safe two-bucket wash discipline, and precision care for paintwork, wheels, and cabin materials.',
      icon: Sparkles,
    },
    {
      title: 'Premium Products',
      description:
        'pH-neutral snow foams, non-acidic wheel decontaminants, breathable leather conditioners, and durable SiO2 ceramic protection.',
      icon: ShieldCheck,
    },
    {
      title: 'Customized Detailing Packages',
      description:
        'Tailored interior, exterior, and surface protection packages adapted to your vehicle type and driving routine.',
      icon: Sliders,
    },
  ];

  return (
    <>
      {/* SECTION 2: HIGH-IMPACT HERO SECTION */}
      <section
        id="home"
        className="relative min-h-[calc(100vh-4rem)] md:min-h-[820px] flex flex-col justify-between overflow-hidden bg-[#060709] border-b border-white/10"
      >
        {/* Background Real Studio Supercar Photograph with Resilient Fallback */}
        <div className="absolute inset-0 z-0 bg-[#060709]">
          <img
            src={heroImageSrc}
            alt="Professionally detailed obsidian black luxury sports car with hydrophobic water beading under studio lighting"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[68%_center] lg:object-right transition-transform duration-700"
          />
          {/* Measured Contrast Scrims that preserve the car's studio lighting on the right */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#060709] via-[#060709]/80 lg:via-[#060709]/45 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-[#060709]/40"
            aria-hidden="true"
          />
        </div>

        {/* Main Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-24 md:pb-20 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium tracking-wide text-slate-300">
              <span className="text-[#FF5500] font-semibold">Miami, Florida</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span>Luxury Mobile Auto Detailing</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-slate-400">Driveway &amp; Office Service</span>
            </div>

            {/* Hero Headline */}
            <h1
              className="font-display font-extrabold text-white tracking-tight leading-[1.08]"
              style={{
                fontSize: 'clamp(2.35rem, 4.5vw, 4rem)',
                textWrap: 'balance',
              }}
            >
              YOUR CAR DESERVES MORE THAN JUST A WASH.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl font-normal">
              Premium mobile auto detailing in Miami. Professional care, exceptional results, and
              convenience delivered directly to your driveway.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onBookClick}
                className="px-7 py-4 text-sm font-semibold tracking-wider text-white bg-[#FF5500] hover:bg-[#E04800] active:scale-[0.99] rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-[#FF5500]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500]"
              >
                BOOK YOUR DETAIL
              </button>

              <button
                type="button"
                onClick={onExploreServicesClick}
                className="px-7 py-4 text-sm font-semibold tracking-wider text-slate-100 bg-white/[0.04] hover:bg-white/[0.1] border border-white/20 hover:border-white/40 rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500]"
              >
                EXPLORE OUR SERVICES
              </button>
            </div>

            {/* Direct Contact Conversion Strip (Click-to-Call, WhatsApp, Instagram) */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-300">
              <a
                href={DEMO_CONTACT.phoneHref}
                className="inline-flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#FF5500]" />
                <span>{DEMO_CONTACT.phoneDisplay}</span>
              </a>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">
                /
              </span>
              <a
                href={DEMO_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#FF5500]" />
                <span>WhatsApp Concierge</span>
              </a>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">
                /
              </span>
              <a
                href="#work"
                className="inline-flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Instagram className="w-4 h-4 text-slate-400" />
                <span>{DEMO_CONTACT.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="relative z-10 pb-6 flex justify-center">
          <a
            href="#trust-value"
            aria-label="Scroll to trust and value section"
            className="group inline-flex flex-col items-center gap-1.5 text-xs tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4 text-[#FF5500] group-hover:translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>
      </section>

      {/* SECTION 3: TRUST AND VALUE SECTION */}
      <section
        id="trust-value"
        aria-label="Core Value Proposition"
        className="bg-[#0D0F14] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
            {trustBenefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className={`flex flex-col justify-between space-y-3 ${
                    idx === 0 ? 'lg:pr-8' : idx === 3 ? 'lg:pl-8' : 'lg:px-8'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-xs font-medium text-slate-500">
                      0{idx + 1}
                    </span>
                    <IconComponent className="w-5 h-5 text-[#FF5500]" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-lg font-bold text-white tracking-tight">
                    {benefit.title}
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
