import React, { useState } from 'react';
import { Check, ArrowUpRight, X, Clock, Shield, Image as ImageIcon } from 'lucide-react';
import {
  SERVICES_DATA,
  VEHICLE_SIZE_OPTIONS,
  VehicleSizeKey,
  ServiceItem,
  SiteImagesConfig,
  DEFAULT_SITE_IMAGES,
} from '../data/siteData';

interface ServicesSectionProps {
  serviceImages?: SiteImagesConfig['services'];
  onOpenImageCustomizer?: () => void;
  onSelectServiceForBooking: (serviceTitle: string, vehicleTypeLabel: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  serviceImages = DEFAULT_SITE_IMAGES.services,
  onOpenImageCustomizer,
  onSelectServiceForBooking,
}) => {
  const [selectedSize, setSelectedSize] = useState<VehicleSizeKey>('coupe');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const currentVehicleLabel =
    VEHICLE_SIZE_OPTIONS.find((opt) => opt.key === selectedSize)?.label || 'Coupe / Sedan';

  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-[#08080A] border-b border-white/10 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Interactive Vehicle Class Rate Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-slate-400">
              <span className="text-[#FF5500] font-semibold">Detailing Packages</span>
              <span aria-hidden="true">·</span>
              <span>Miami Mobile Service</span>
              <span aria-hidden="true">·</span>
              <span>Transparent Tiered Pricing</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Precision Detailing Packages Tailored to Your Vehicle
            </h2>
            <p className="text-base text-slate-400 leading-relaxed">
              Every appointment is performed on-site using spot-free deionized water, dedicated
              surface chemistry, and single-vehicle microfiber media. Select your vehicle class to
              view package rates.
            </p>
          </div>

          {/* Interactive Segmented Filter Control for Vehicle Size */}
          <div className="flex flex-col gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-medium">
              Select Vehicle Class to View Starting Rates:
            </span>
            <div
              role="group"
              aria-label="Select vehicle class to view starting price"
              className="inline-flex items-center p-1 bg-[#11131A] border border-white/10 rounded-lg"
            >
              {VEHICLE_SIZE_OPTIONS.map((option) => {
                const isActive = selectedSize === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setSelectedSize(option.key)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#FF5500] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2x2 Architectural Grid of Premium Service Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service) => {
            const samplePrice = service.samplePrices[selectedSize];
            const resolvedImageSrc = serviceImages[service.id] || service.imageSrc;

            return (
              <article
                key={service.id}
                className="group flex flex-col justify-between bg-[#0E1016] border border-white/10 hover:border-white/25 rounded-xl overflow-hidden transition-colors duration-200"
              >
                <div>
                  {/* Service Real Photograph Header with Resilient Fallback */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#161922] to-[#090B10] border-b border-white/10">
                    <img
                      src={resolvedImageSrc}
                      alt={service.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0E1016] via-[#0E1016]/20 to-black/25"
                      aria-hidden="true"
                    />

                    {/* Clean Unboxed Top Overlay Metadata */}
                    <div className="absolute bottom-3 left-5 right-5 flex items-baseline justify-between gap-4">
                      <span className="font-mono-tabular text-xs font-semibold text-slate-200">
                        {service.index}. {service.subtitle}
                      </span>
                      <span className="font-mono-tabular text-xs text-slate-300">
                        {service.durationEstimate}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                      <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                        {service.title}
                      </h3>
                      <div className="flex items-baseline gap-1.5 shrink-0">
                        <span className="text-xs text-slate-400">Starting at</span>
                        <span className="font-mono-tabular text-2xl font-bold text-[#FF5500]">
                          {samplePrice}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Core Deliverables List */}
                    <ul className="space-y-2.5 pt-1">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-slate-300"
                        >
                          <Check
                            className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalService(service)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FF5500]" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForBooking(service.title, currentVehicleLabel)
                    }
                    className="inline-flex items-center justify-center px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Book {service.title}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Unit Inclusion Note */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs text-slate-400">
          <p>
            All mobile packages include on-board spot-free deionized water, quiet power generation,
            and a complimentary multi-point paint &amp; cabin inspection upon arrival.
          </p>
          <span className="font-mono-tabular text-slate-300 shrink-0">
            100% Self-Contained Miami Mobile Studio
          </span>
        </div>
      </div>

      {/* Interactive Service Specification Modal */}
      {activeModalService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#11131A] border border-white/15 rounded-xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0B0D12]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-tabular">
                  <span>PACKAGE {activeModalService.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalService.subtitle}</span>
                </div>
                <h3
                  id="service-modal-title"
                  className="font-display text-xl sm:text-2xl font-bold text-white"
                >
                  {activeModalService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                aria-label="Close service details modal"
                className="w-10 h-10 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeModalService.detailedDescription}
              </p>

              {/* Tiered Pricing Breakdown */}
              <div className="p-4 rounded-lg bg-[#090B10] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Starting Investment by Vehicle Class</span>
                  <span>Mobile Service Rate Card</span>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {VEHICLE_SIZE_OPTIONS.map((opt) => (
                    <div
                      key={opt.key}
                      className="p-3 rounded-md bg-[#11131A] border border-white/10"
                    >
                      <div className="text-xs text-slate-400">{opt.label}</div>
                      <div className="font-mono-tabular text-lg font-bold text-white mt-1">
                        {activeModalService.samplePrices[opt.key]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Step Technical Process */}
              <div className="space-y-3">
                <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200">
                  What Is Included in This Mobile Visit:
                </h4>
                <ul className="space-y-2.5">
                  {activeModalService.processHighlights.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <span className="font-mono-tabular text-xs font-semibold text-[#FF5500] mt-0.5">
                        0{i + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metadata Footer inside Modal */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Estimated Time</span>
                    <span>{activeModalService.durationEstimate}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Ideal For</span>
                    <span>{activeModalService.recommendedFor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0B0D12] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white border border-white/15 rounded-md transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const chosenTitle = activeModalService.title;
                  setActiveModalService(null);
                  onSelectServiceForBooking(chosenTitle, currentVehicleLabel);
                }}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] rounded-md transition-colors cursor-pointer"
              >
                Select {activeModalService.title} &amp; Request Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
