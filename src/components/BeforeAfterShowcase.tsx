import React, { useState } from 'react';
import {
  MoveHorizontal,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import {
  BEFORE_AFTER_ITEMS,
  SiteImagesConfig,
  DEFAULT_SITE_IMAGES,
} from '../data/siteData';

interface BeforeAfterShowcaseProps {
  beforeAfterImages?: SiteImagesConfig['beforeAfter'];
  onUpdateBeforeAfterPair?: (
    categoryId: keyof SiteImagesConfig['beforeAfter'],
    nextPair: { before: string; after: string }
  ) => void;
  onOpenImageCustomizer?: () => void;
  onBookTransformation: (category: string) => void;
}

export const BeforeAfterShowcase: React.FC<BeforeAfterShowcaseProps> = ({
  beforeAfterImages = DEFAULT_SITE_IMAGES.beforeAfter,
  onUpdateBeforeAfterPair,
  onOpenImageCustomizer,
  onBookTransformation,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [inlineEditorOpen, setInlineEditorOpen] = useState(false);

  const currentItem = BEFORE_AFTER_ITEMS[activeIndex];
  const currentPair = beforeAfterImages[currentItem.id] || {
    before: currentItem.beforeImageSrc,
    after: currentItem.afterImageSrc,
  };

  const handleInlineFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: 'before' | 'after'
  ) => {
    const file = e.target.files?.[0];
    if (!file || !onUpdateBeforeAfterPair) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateBeforeAfterPair(currentItem.id, {
          ...currentPair,
          [side]: reader.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section
      id="work"
      className="py-20 md:py-28 bg-[#0B0D12] border-b border-white/10 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading + Transformation Category Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-slate-400">
              <span className="text-[#FF5500] font-semibold">Transformation Gallery</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Before &amp; After Inspection</span>
              <span aria-hidden="true">·</span>
              <span>Miami Mobile Studio Results</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Visible Precision Across Paint, Cabin, and Wheels
            </h2>
            <p className="text-base text-slate-400 leading-relaxed">
              Drag the inspection slider to compare swirl marks, brake dust, and cabin grime on the
              <strong className="text-slate-200 font-medium"> Before</strong> side against the
              corrected, detailed finish on the{' '}
              <strong className="text-slate-200 font-medium">After</strong> side.
            </p>
          </div>

          {/* Interactive Category Switcher Buttons */}
          <div
            role="tablist"
            aria-label="Transformation showcase categories"
            className="flex flex-wrap gap-2"
          >
            {BEFORE_AFTER_ITEMS.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-md border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FF5500] text-white border-[#FF5500]'
                      : 'bg-[#12151E] text-slate-300 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {item.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Split Comparison Area */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Before/After Image Slider (7 Columns on Desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#08090D] border border-white/10 rounded-xl overflow-hidden">
            <div className="relative aspect-[16/10] w-full select-none overflow-hidden bg-[#0E1117]">
              {/* Base Layer: AFTER Image (Full Width - Corrected Finish) */}
              <img
                src={currentPair.after}
                alt={`${currentItem.title} - After detailing corrected result`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Clipped Top Layer: BEFORE Image (Swirls / Dirt / Brake Dust) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={currentPair.before}
                  alt={`${currentItem.title} - Before detailing dirty or swirled condition`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Top Corner Unboxed Labels */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded bg-black/80 backdrop-blur-sm border border-white/15 text-xs font-mono-tabular text-slate-200 pointer-events-none">
                {currentItem.beforeLabel}
              </div>
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded bg-black/80 backdrop-blur-sm border border-[#FF5500]/50 text-xs font-mono-tabular text-white pointer-events-none">
                {currentItem.afterLabel}
              </div>

              {/* Vertical Divider Line & Drag Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 w-0.5 bg-[#FF5500] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
                aria-hidden="true"
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FF5500] text-white shadow-lg flex items-center justify-center border-2 border-white">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>

              {/* Accessible Range Input Covering the Viewport */}
              <input
                type="range"
                min={0}
                max={100}
                value={sliderPosition}
                aria-label={`Before and after comparison slider for ${currentItem.category}`}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize"
              />
            </div>

            {/* Slider Quick Controls Bar */}
            <div className="px-5 py-3.5 bg-[#0D1017] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-400 font-mono-tabular">
                <span>Split: {sliderPosition}% Before (Dirty/Swirled)</span>
                <span aria-hidden="true">·</span>
                <span>{100 - sliderPosition}% After (Corrected)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSliderPosition(90)}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Show Before
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(50)}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  50 / 50 Split
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(10)}
                  className="px-2.5 py-1 rounded bg-[#FF5500]/20 hover:bg-[#FF5500]/30 text-[#FF5500] font-semibold transition-colors cursor-pointer"
                >
                  Show After
                </button>
              </div>
            </div>

            {/* Inline Quick Client Photo Customizer Drawer inside #work */}
            {inlineEditorOpen && onUpdateBeforeAfterPair && (
              <div className="p-5 bg-[#090B10] border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">
                    Customize &ldquo;{currentItem.category}&rdquo; Client Photos:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateBeforeAfterPair(
                        currentItem.id,
                        DEFAULT_SITE_IMAGES.beforeAfter[currentItem.id]
                      )
                    }
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 text-[#FF5500]" />
                    <span>Reset Pair to Default</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Inline Upload/URL for BEFORE Image */}
                  <div className="p-3 rounded-lg bg-[#0E1117] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-semibold">
                        1. Before Photo (Marks / Dirt)
                      </span>
                      <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FF5500] hover:bg-[#E04800] text-white font-semibold cursor-pointer">
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleInlineFileUpload(e, 'before')}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={currentPair.before}
                      onChange={(e) =>
                        onUpdateBeforeAfterPair(currentItem.id, {
                          ...currentPair,
                          before: e.target.value,
                        })
                      }
                      placeholder="Paste Before image URL or path..."
                      className="w-full px-2.5 py-1.5 rounded bg-[#08090D] border border-white/15 text-xs font-mono-tabular text-slate-300"
                    />
                  </div>

                  {/* Inline Upload/URL for AFTER Image */}
                  <div className="p-3 rounded-lg bg-[#0E1117] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white font-semibold">
                        2. After Photo (Corrected Finish)
                      </span>
                      <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FF5500] hover:bg-[#E04800] text-white font-semibold cursor-pointer">
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleInlineFileUpload(e, 'after')}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={currentPair.after}
                      onChange={(e) =>
                        onUpdateBeforeAfterPair(currentItem.id, {
                          ...currentPair,
                          after: e.target.value,
                        })
                      }
                      placeholder="Paste After image URL or path..."
                      className="w-full px-2.5 py-1.5 rounded bg-[#08090D] border border-white/15 text-xs font-mono-tabular text-slate-300"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Technical Transformation Details (5 Columns on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-[#0E1117] border border-white/10 rounded-xl space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-mono-tabular text-slate-400">
                {currentItem.vehicleLabel}
              </div>

              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                {currentItem.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">{currentItem.summary}</p>

              {/* Before vs After Comparison Lists */}
              <div className="pt-2 space-y-5">
                <div className="p-4 rounded-lg bg-[#090B10] border border-white/10 space-y-2.5">
                  <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-slate-400" />
                    <span>Pre-Detailing Condition (Before)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-400">
                    {currentItem.beforeNotes.map((note) => (
                      <li key={note} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-slate-600">
                          —
                        </span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#090B10] border border-white/15 space-y-2.5">
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5500]" />
                    <span>Post-Treatment Result (After)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                    {currentItem.afterNotes.map((note) => (
                      <li key={note} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-[#FF5500]">
                          ·
                        </span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveIndex((prev) => (prev + 1) % BEFORE_AFTER_ITEMS.length);
                  setSliderPosition(50);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-md bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <span>Next Transformation</span>
                <span aria-hidden="true" className="text-[#FF5500]">
                  →
                </span>
              </button>

              <button
                type="button"
                onClick={() => onBookTransformation(currentItem.category)}
                className="px-5 py-3 text-xs font-semibold tracking-wide text-white bg-[#FF5500] hover:bg-[#E04800] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request Similar Treatment
              </button>
            </div>
          </div>
        </div>

        {/* 4-Card Visual Transformation Thumbnail Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BEFORE_AFTER_ITEMS.map((item, idx) => {
            const pair = beforeAfterImages[item.id] || {
              before: item.beforeImageSrc,
              after: item.afterImageSrc,
            };
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setSliderPosition(50);
                }}
                className={`group text-left rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#121621] border-[#FF5500] ring-1 ring-[#FF5500]/50'
                    : 'bg-[#0E1117] border-white/10 hover:border-white/25'
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#08090D]">
                  {/* Split Thumbnail Preview: Left Half Before, Right Half After */}
                  <img
                    src={pair.after}
                    alt={`${item.category} after preview`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                  >
                    <img
                      src={pair.before}
                      alt={`${item.category} before preview`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div
                    className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#FF5500]/90 pointer-events-none"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono-tabular text-slate-300">
                    BEFORE
                  </div>
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#FF5500] text-[10px] font-mono-tabular font-semibold text-white">
                    AFTER
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-white group-hover:text-[#FF5500] transition-colors truncate">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono-tabular text-slate-400 shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{item.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
