import React, { useState } from 'react';
import { X, Upload, RotateCcw, Image as ImageIcon, Check } from 'lucide-react';
import {
  SiteImagesConfig,
  DEFAULT_SITE_IMAGES,
  SERVICES_DATA,
  BEFORE_AFTER_ITEMS,
} from '../data/siteData';

interface ImageCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteImages: SiteImagesConfig;
  onUpdateSiteImages: (next: SiteImagesConfig) => void;
  onResetSiteImages: () => void;
}

export const ImageCustomizerModal: React.FC<ImageCustomizerModalProps> = ({
  isOpen,
  onClose,
  siteImages,
  onUpdateSiteImages,
  onResetSiteImages,
}) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'beforeAfter'>('services');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerSavedToast = (label: string) => {
    setSavedNotice(`Updated ${label}`);
    setTimeout(() => setSavedNotice(null), 2200);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    applyDataUrl: (dataUrl: string) => void,
    label: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        applyDataUrl(reader.result);
        triggerSavedToast(label);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-customizer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#0E1117] border border-white/15 rounded-xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#090B10] border-b border-white/10 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#FF5500]">
              <ImageIcon className="w-4 h-4" />
              <span>CLIENT MEDIA MANAGER · REPLACEABLE REAL PHOTOS</span>
            </div>
            <h2
              id="image-customizer-title"
              className="font-display text-xl sm:text-2xl font-bold text-white"
            >
              Customize Website Photography
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {savedNotice && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-xs font-medium text-emerald-200">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{savedNotice}</span>
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image customizer"
              className="w-10 h-10 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 bg-[#0B0D13] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('hero')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'hero'
                  ? 'bg-[#FF5500] text-white'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              Hero Section Photo (1)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-[#FF5500] text-white'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              Service Package Photos (4)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('beforeAfter')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'beforeAfter'
                  ? 'bg-[#FF5500] text-white'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              Before &amp; After Showcase (8)
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onResetSiteImages();
              triggerSavedToast('All Default Photos Restored');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-white/15 rounded-md transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>Reset All to Default Real Photos</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every visual slot across this website uses a real photograph and is structured for
            effortless client customization. Upload any client photo from your device below, paste
            an image URL/path, or edit <code className="text-slate-200">DEFAULT_SITE_IMAGES</code>{' '}
            in <code className="text-slate-200">src/data/siteData.ts</code>.
          </p>

          {activeTab === 'hero' && (
            <div className="p-5 rounded-xl bg-[#090B10] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Hero Background Photograph
                  </h3>
                  <p className="text-xs text-slate-400">
                    Recommended: 1920×1080 (16:9) dark studio or driveway luxury vehicle photo.
                  </p>
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#FF5500] hover:bg-[#E04800] text-xs font-semibold text-white cursor-pointer self-start sm:self-auto">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Client Hero Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(
                        e,
                        (dataUrl) =>
                          onUpdateSiteImages({
                            ...siteImages,
                            heroSupercar: dataUrl,
                          }),
                        'Hero Photograph'
                      )
                    }
                  />
                </label>
              </div>

              <div className="aspect-[16/9] max-h-64 w-full rounded-lg overflow-hidden bg-black border border-white/10">
                <img
                  src={siteImages.heroSupercar}
                  alt="Current Hero Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-slate-400">
                  Image File Path or URL:
                </label>
                <input
                  type="text"
                  value={siteImages.heroSupercar}
                  onChange={(e) =>
                    onUpdateSiteImages({
                      ...siteImages,
                      heroSupercar: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded bg-[#0E1117] border border-white/15 text-xs font-mono-tabular text-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SERVICES_DATA.map((service) => {
                const currentSrc = siteImages.services[service.id];
                return (
                  <div
                    key={service.id}
                    className="p-4 rounded-xl bg-[#090B10] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-mono-tabular text-[#FF5500]">
                          SERVICE {service.index}
                        </span>
                        <h3 className="font-display text-base font-bold text-white">
                          {service.title}
                        </h3>
                      </div>

                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FF5500] hover:bg-[#E04800] text-xs font-semibold text-white cursor-pointer whitespace-nowrap">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(
                              e,
                              (dataUrl) =>
                                onUpdateSiteImages({
                                  ...siteImages,
                                  services: {
                                    ...siteImages.services,
                                    [service.id]: dataUrl,
                                  },
                                }),
                              service.title
                            )
                          }
                        />
                      </label>
                    </div>

                    <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-black border border-white/10">
                      <img
                        src={currentSrc}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <input
                      type="text"
                      value={currentSrc}
                      aria-label={`${service.title} image URL or file path`}
                      onChange={(e) =>
                        onUpdateSiteImages({
                          ...siteImages,
                          services: {
                            ...siteImages.services,
                            [service.id]: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-[#0E1117] border border-white/15 text-xs font-mono-tabular text-slate-200"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'beforeAfter' && (
            <div className="space-y-5">
              {BEFORE_AFTER_ITEMS.map((item) => {
                const pair = siteImages.beforeAfter[item.id];
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-[#090B10] border border-white/10 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="font-display text-base font-bold text-white">
                        {item.category}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateSiteImages({
                            ...siteImages,
                            beforeAfter: {
                              ...siteImages.beforeAfter,
                              [item.id]: DEFAULT_SITE_IMAGES.beforeAfter[item.id],
                            },
                          });
                          triggerSavedToast(item.category);
                        }}
                        className="text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        Reset Pair
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Before Slot */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-semibold">BEFORE Photo</span>
                          <label className="inline-flex items-center gap-1 text-[#FF5500] hover:underline cursor-pointer font-semibold">
                            <Upload className="w-3 h-3" />
                            <span>Upload Before</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(
                                  e,
                                  (dataUrl) =>
                                    onUpdateSiteImages({
                                      ...siteImages,
                                      beforeAfter: {
                                        ...siteImages.beforeAfter,
                                        [item.id]: { ...pair, before: dataUrl },
                                      },
                                    }),
                                  `${item.category} (Before)`
                                )
                              }
                            />
                          </label>
                        </div>
                        <div className="aspect-[16/10] rounded-lg overflow-hidden bg-black border border-white/10">
                          <img
                            src={pair.before}
                            alt={`${item.category} Before`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <input
                          type="text"
                          value={pair.before}
                          aria-label={`${item.category} Before image URL`}
                          onChange={(e) =>
                            onUpdateSiteImages({
                              ...siteImages,
                              beforeAfter: {
                                ...siteImages.beforeAfter,
                                [item.id]: { ...pair, before: e.target.value },
                              },
                            })
                          }
                          className="w-full px-2.5 py-1.5 rounded bg-[#0E1117] border border-white/15 text-xs font-mono-tabular text-slate-300"
                        />
                      </div>

                      {/* After Slot */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white font-semibold">AFTER Photo</span>
                          <label className="inline-flex items-center gap-1 text-[#FF5500] hover:underline cursor-pointer font-semibold">
                            <Upload className="w-3 h-3" />
                            <span>Upload After</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(
                                  e,
                                  (dataUrl) =>
                                    onUpdateSiteImages({
                                      ...siteImages,
                                      beforeAfter: {
                                        ...siteImages.beforeAfter,
                                        [item.id]: { ...pair, after: dataUrl },
                                      },
                                    }),
                                  `${item.category} (After)`
                                )
                              }
                            />
                          </label>
                        </div>
                        <div className="aspect-[16/10] rounded-lg overflow-hidden bg-black border border-white/10">
                          <img
                            src={pair.after}
                            alt={`${item.category} After`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <input
                          type="text"
                          value={pair.after}
                          aria-label={`${item.category} After image URL`}
                          onChange={(e) =>
                            onUpdateSiteImages({
                              ...siteImages,
                              beforeAfter: {
                                ...siteImages.beforeAfter,
                                [item.id]: { ...pair, after: e.target.value },
                              },
                            })
                          }
                          className="w-full px-2.5 py-1.5 rounded bg-[#0E1117] border border-white/15 text-xs font-mono-tabular text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#090B10] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Changes apply immediately across the live page preview.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#FF5500] hover:bg-[#E04800] rounded-md transition-colors cursor-pointer"
          >
            Done Customizing
          </button>
        </div>
      </div>
    </div>
  );
};
