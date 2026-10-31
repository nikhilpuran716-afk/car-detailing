import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Mail, Instagram, CheckCircle2, Star } from 'lucide-react';
import {
  DEMO_TESTIMONIALS,
  MIAMI_SERVICE_AREAS,
  DEMO_CONTACT,
  ServiceAreaLocation,
} from '../data/siteData';

interface ReviewsAndServiceAreaProps {
  onSelectLocationForBooking: (locationName: string) => void;
}

const GoogleGIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

export const ReviewsAndServiceArea: React.FC<ReviewsAndServiceAreaProps> = ({
  onSelectLocationForBooking,
}) => {
  const [selectedArea, setSelectedArea] = useState<ServiceAreaLocation>(MIAMI_SERVICE_AREAS[0]);

  return (
    <>
      {/* SECTION 8: CUSTOMER REVIEWS */}
      <section
        id="reviews"
        className="py-20 md:py-28 bg-[#08080A] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wider text-slate-400">
                <span className="text-[#FF5500] font-semibold">Client Testimonials</span>
                <span aria-hidden="true">·</span>
                <span>Verified by Google</span>
                <span aria-hidden="true">·</span>
                <span>Miami-Dade Luxury Vehicle Owners</span>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Trusted by Discerning Vehicle Owners Across Miami
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                From daily-driven luxury SUVs in Brickell to weekend exotics in Coral Gables and
                Miami Beach, our mobile studio delivers consistent, showroom-caliber results right
                at our clients’ driveways.
              </p>
            </div>

            {/* Google Verified Summary Header Card */}
            <div className="p-4 sm:px-5 rounded-xl bg-[#11131A] border border-white/15 flex items-center gap-4 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <GoogleGIcon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-white text-base">5.0</span>
                  <div className="flex items-center gap-0.5 text-[#FABB05]" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified by Google</span>
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Greater Miami Mobile Detailing Concierge
                </div>
              </div>
            </div>
          </div>

          {/* 3 Client Testimonial Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMO_TESTIMONIALS.map((item) => (
              <article
                key={item.id}
                className="p-7 rounded-xl bg-[#0E1117] border border-white/10 hover:border-white/25 transition-colors flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  {/* Top Row: 5 Stars + Verified by Google Badge */}
                  <div className="pb-4 border-b border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[#FABB05]" aria-label="5 star rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-200">
                      <GoogleGIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>Verified by Google</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {item.quote}
                  </blockquote>
                </div>

                {/* Reviewer Identity, Vehicle & Detailed Miami Customer Location */}
                <div className="pt-5 border-t border-white/10 space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#161B26] border border-white/15 flex items-center justify-center font-display text-xs font-bold text-[#FF5500] shrink-0">
                        {item.initials}
                      </div>
                      <div>
                        <div className="font-display text-base font-bold text-white leading-tight">
                          {item.clientName}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-300 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono-tabular text-slate-500 shrink-0">
                      {item.reviewDate}
                    </span>
                  </div>

                  {/* Customer Location & Vehicle Service Details Box */}
                  <div className="p-3 rounded-lg bg-[#090B10] border border-white/10 space-y-1 text-xs">
                    <div className="text-slate-200 font-medium truncate">
                      {item.vehicle} · <span className="text-[#FF5500]">{item.service}</span>
                    </div>
                    <div className="text-slate-400 truncate">
                      {item.neighborhoodDetail}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: SERVICE AREA & DIRECT CONTACT DETAILS */}
      <section
        id="contact"
        className="py-20 md:py-28 bg-[#0B0D12] border-b border-white/10 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 pb-12">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-slate-400">
              <span className="text-[#FF5500] font-semibold">Mobile Coverage Area</span>
              <span aria-hidden="true">·</span>
              <span>Miami, Florida &amp; Surrounding Areas</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              We Bring the Detailing Studio Across Greater Miami
            </h2>
            <p className="text-base text-slate-400 leading-relaxed">
              As a dedicated mobile detailing operation, we dispatch directly to your residence,
              waterfront driveway, or executive parking structure across Miami-Dade County. Select
              a service zone on the interactive coverage map below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Interactive Stylized Greater Miami Vector Map Placeholder (7 Columns) */}
            <div className="lg:col-span-7 bg-[#08090D] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full bg-[#090C12] overflow-hidden">
                {/* Architectural Dark Vector Map of Miami & Biscayne Bay */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                  aria-label="Interactive Service Area Map of Miami, Florida"
                >
                  <defs>
                    <pattern id="mapGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path
                        d="M 10 0 L 0 0 0 10"
                        fill="none"
                        stroke="#1E293B"
                        strokeWidth="0.3"
                      />
                    </pattern>
                  </defs>

                  {/* Water Background (Biscayne Bay & Atlantic Ocean) */}
                  <rect width="100" height="100" fill="#070A10" />
                  <rect width="100" height="100" fill="url(#mapGrid)" />

                  {/* Miami Mainland Coastline Polygon */}
                  <polygon
                    points="0,0 64,0 62,25 58,48 54,68 44,88 38,100 0,100"
                    fill="#11151E"
                    stroke="#334155"
                    strokeWidth="0.5"
                  />

                  {/* Miami Beach & Barrier Islands Polygon */}
                  <polygon
                    points="70,12 78,12 79,52 72,54 69,34"
                    fill="#141923"
                    stroke="#475569"
                    strokeWidth="0.5"
                  />

                  {/* Key Biscayne Island Polygon */}
                  <polygon
                    points="70,66 76,65 75,84 69,82"
                    fill="#141923"
                    stroke="#475569"
                    strokeWidth="0.5"
                  />

                  {/* Major Highway Corridors (I-95, US-1, I-195, Dolphin Expy) */}
                  <path
                    d="M60,0 L56,50 L40,85 M10,44 L74,44 M56,52 L72,72"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="0.6"
                    strokeDasharray="1.5 1"
                  />

                  {/* Service Radius Ring */}
                  <circle
                    cx="56"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke="#FF5500"
                    strokeWidth="0.35"
                    strokeDasharray="2 1.5"
                    opacity="0.65"
                  />
                </svg>

                {/* Interactive Neighborhood Pins */}
                {MIAMI_SERVICE_AREAS.map((area) => {
                  const isSelected = selectedArea.id === area.id;
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSelectedArea(area)}
                      style={{
                        left: `${area.coordinates.x}%`,
                        top: `${area.coordinates.y}%`,
                      }}
                      aria-label={`Select ${area.name} service area`}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'z-20 bg-[#FF5500] text-white shadow-lg scale-105'
                          : 'z-10 bg-[#0D1017]/90 text-slate-300 border border-white/15 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{area.name.split('&')[0].trim()}</span>
                    </button>
                  );
                })}

                <div className="absolute bottom-3 left-4 text-[11px] font-mono-tabular text-slate-400 bg-black/70 px-2.5 py-1 rounded border border-white/10">
                  Interactive Miami-Dade Mobile Dispatch Map
                </div>
              </div>

              {/* Selected Zone Spotlight Bar */}
              <div className="p-6 bg-[#0E1117] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#FF5500]">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{selectedArea.zone}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedArea.arrivalNote}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {selectedArea.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">{selectedArea.accessDetails}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectLocationForBooking(selectedArea.name)}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Book in {selectedArea.name.split('&')[0].trim()}
                </button>
              </div>
            </div>

            {/* Right Column: Neighborhood Directory & Replaceable Demo Contact Info (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-[#0E1117] border border-white/10 rounded-xl space-y-6">
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-white">
                  Primary Miami Dispatch Zones
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Click any community below to inspect local mobile unit access notes or pre-fill
                  your booking location:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {MIAMI_SERVICE_AREAS.map((area) => {
                    const isSelected = selectedArea.id === area.id;
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setSelectedArea(area)}
                        className={`text-left px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#FF5500]/15 border-[#FF5500] text-white'
                            : 'bg-[#090B10] border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{area.name}</span>
                        <span className="text-[#FF5500] font-mono-tabular shrink-0">→</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Concierge Contact Details */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="text-xs font-semibold tracking-wider text-slate-300">
                  DIRECT CONCIERGE CONTACT:
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <a
                    href={DEMO_CONTACT.phoneHref}
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#FF5500] shrink-0" />
                    <span>{DEMO_CONTACT.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${DEMO_CONTACT.emailDisplay}`}
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#FF5500] shrink-0" />
                    <span>{DEMO_CONTACT.emailDisplay}</span>
                  </a>
                  <a
                    href="#work"
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#FF5500] shrink-0" />
                    <span>{DEMO_CONTACT.instagramHandle}</span>
                  </a>
                </div>

                <p className="text-xs text-slate-500">
                  Dedicated mobile detailing studio operating across Greater Miami, Coral Gables,
                  Miami Beach, and surrounding coastal communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
