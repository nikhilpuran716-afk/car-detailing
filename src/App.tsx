import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroAndTrust } from './components/HeroAndTrust';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { WhyChooseAndProcess } from './components/WhyChooseAndProcess';
import { ReviewsAndServiceArea } from './components/ReviewsAndServiceArea';
import { BookingAndFooter } from './components/BookingAndFooter';
import { ImageCustomizerModal } from './components/ImageCustomizerModal';
import { DEFAULT_SITE_IMAGES, SiteImagesConfig } from './data/siteData';

const STORAGE_KEY = 'apex_demo_custom_images_v4';

export default function App() {
  const [preselectedService, setPreselectedService] = useState<string>(
    'Full Interior & Exterior Detail'
  );
  const [preselectedVehicleType, setPreselectedVehicleType] = useState<string>('Coupe / Sedan');
  const [preselectedLocation, setPreselectedLocation] = useState<string>('');
  const [siteImages, setSiteImages] = useState<SiteImagesConfig>(DEFAULT_SITE_IMAGES);
  const [imageCustomizerOpen, setImageCustomizerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.heroSupercar && parsed.services && parsed.beforeAfter) {
          setSiteImages(parsed);
        }
      }
    } catch {
      // Ignore storage read errors in restricted environments
    }
  }, []);

  const handleUpdateSiteImages = (next: SiteImagesConfig) => {
    setSiteImages(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota errors if user uploads very large files
    }
  };

  const handleResetSiteImages = () => {
    setSiteImages(DEFAULT_SITE_IMAGES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceTitle: string, vehicleTypeLabel: string) => {
    setPreselectedService(serviceTitle);
    setPreselectedVehicleType(vehicleTypeLabel);
    scrollToSection('booking');
  };

  const handleBookTransformation = (category: string) => {
    if (category.toLowerCase().includes('interior')) {
      setPreselectedService('Interior Detailing');
    } else if (category.toLowerCase().includes('paint')) {
      setPreselectedService('Ceramic Coating');
    } else if (category.toLowerCase().includes('wheel') || category.toLowerCase().includes('shine')) {
      setPreselectedService('Exterior Detailing');
    } else {
      setPreselectedService('Full Interior & Exterior Detail');
    }
    scrollToSection('booking');
  };

  const handleSelectLocationForBooking = (locationName: string) => {
    setPreselectedLocation(locationName);
    scrollToSection('booking');
  };

  const handleSelectServiceFromFooter = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToSection('services');
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F8FAFC] flex flex-col">
      {/* 1. PREMIUM STICKY NAVIGATION */}
      <Navbar onBookNowClick={() => scrollToSection('booking')} />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* 2. HIGH-IMPACT HERO SECTION & 3. TRUST AND VALUE SECTION */}
        <HeroAndTrust
          heroImageSrc={siteImages.heroSupercar}
          onBookClick={() => scrollToSection('booking')}
          onExploreServicesClick={() => scrollToSection('services')}
        />

        {/* 4. PREMIUM SERVICES SECTION */}
        <ServicesSection
          serviceImages={siteImages.services}
          onOpenImageCustomizer={() => setImageCustomizerOpen(true)}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* 5. BEFORE AND AFTER SHOWCASE */}
        <BeforeAfterShowcase
          beforeAfterImages={siteImages.beforeAfter}
          onUpdateBeforeAfterPair={(categoryId, nextPair) =>
            handleUpdateSiteImages({
              ...siteImages,
              beforeAfter: {
                ...siteImages.beforeAfter,
                [categoryId]: nextPair,
              },
            })
          }
          onOpenImageCustomizer={() => setImageCustomizerOpen(true)}
          onBookTransformation={handleBookTransformation}
        />

        {/* 6. WHY CHOOSE US & 7. HOW IT WORKS */}
        <WhyChooseAndProcess onBookNowClick={() => scrollToSection('booking')} />

        {/* 8. CUSTOMER REVIEWS (DEMO PLACEHOLDERS) & 9. SERVICE AREA */}
        <ReviewsAndServiceArea onSelectLocationForBooking={handleSelectLocationForBooking} />

        {/* 10. HIGH-CONVERTING BOOKING SECTION, 11. FINAL CTA & 12. PREMIUM FOOTER */}
        <BookingAndFooter
          preselectedService={preselectedService}
          preselectedVehicleType={preselectedVehicleType}
          preselectedLocation={preselectedLocation}
          onSelectServiceNav={handleSelectServiceFromFooter}
        />
      </main>

      {/* INTERACTIVE CLIENT IMAGE CUSTOMIZER MODAL */}
      <ImageCustomizerModal
        isOpen={imageCustomizerOpen}
        onClose={() => setImageCustomizerOpen(false)}
        siteImages={siteImages}
        onUpdateSiteImages={handleUpdateSiteImages}
        onResetSiteImages={handleResetSiteImages}
      />
    </div>
  );
}
