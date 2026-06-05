import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  Gauge,
  Users,
  Monitor,
  BookOpen,
  Search,
  TrendingUp,
  ShoppingCart,
  Package,
  ChefHat,
  Clock,
  BarChart3,
  Percent,
  AlertCircle,
} from 'lucide-react';
import { CONTENT } from './constants';

const SLIDES = [
  'hero',
  'slideThirtyDayGoal',
  'slideFivePillars',
  'slideFootfallCr',
  'slideSalesEquation',
  'slideProfessionalFraming',
  'slideMeasureOps',
  'slideMeasureFootfall',
  'slideMeasureConversion',
  'slideMeasureBasket',
  'thanks',
] as const;

type SlideId = (typeof SLIDES)[number];

const SLIDE_STEPS: Record<SlideId, number> = {
  hero: 0,
  slideThirtyDayGoal: 4,
  slideFivePillars: 4,
  slideFootfallCr: 3,
  slideSalesEquation: 4,
  slideProfessionalFraming: 1,
  slideMeasureOps: 3,
  slideMeasureFootfall: 3,
  slideMeasureConversion: 3,
  slideMeasureBasket: 3,
  thanks: 0,
};

type MeasureKey =
  | 'slideMeasureOps'
  | 'slideMeasureFootfall'
  | 'slideMeasureConversion'
  | 'slideMeasureBasket';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const isPdfMode =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('pdf');

  const getStepsForSlide = (index: number) => SLIDE_STEPS[SLIDES[index]];

  const paginate = useCallback(
    (newDirection: number) => {
      const maxSteps = getStepsForSlide(currentSlide);

      if (newDirection > 0 && currentStep < maxSteps) {
        setCurrentStep((prev) => prev + 1);
        return;
      }
      if (newDirection < 0 && currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
        return;
      }

      const next = currentSlide + newDirection;
      if (next >= 0 && next < SLIDES.length) {
        setDirection(newDirection);
        setCurrentSlide(next);
        setCurrentStep(newDirection > 0 ? 0 : getStepsForSlide(next));
      }
    },
    [currentSlide, currentStep]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(-1);
      if (e.key === 'ArrowLeft') paginate(1);
      if (e.key === ' ') paginate(1);
      if (e.key === 'Backspace') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.02,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  if (isPdfMode) {
    return (
      <div className="pdf-deck bg-brand-light text-brand-dark font-sans rtl">
        {SLIDES.map((slideId, index) => (
          <section key={`${slideId}-${index}`} className="pdf-page" data-pdf-slide={slideId}>
            <div className="pdf-slide-shell">
              <div className="pdf-scale">{renderSlide(index, getStepsForSlide(index))}</div>
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-brand-light text-brand-dark overflow-hidden selection:bg-brand-orange selection:text-white font-sans flex flex-col rtl">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <div className="fixed -top-24 -right-24 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <main
        className="relative flex-grow overflow-hidden cursor-pointer"
        onClick={(e) => {
          if (
            (e.target as HTMLElement).closest('button') ||
            (e.target as HTMLElement).closest('a')
          )
            return;
          paginate(1);
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
          >
            <div className="w-full h-full max-w-7xl flex items-center justify-center">
              {renderSlide(currentSlide, currentStep)}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 p-12 flex justify-between items-end pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          <button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center opacity-30 hover:opacity-100 hover:bg-slate-50 transition-all disabled:opacity-30 disabled:scale-95 group border border-slate-100"
          >
            <ArrowRight size={24} className="text-brand-blue" />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentSlide === SLIDES.length - 1}
            className="w-14 h-14 rounded-2xl bg-brand-blue shadow-xl shadow-brand-blue/20 flex items-center justify-center opacity-30 hover:opacity-100 group hover:scale-110 active:scale-95 transition-all disabled:opacity-30 disabled:scale-95 border border-brand-blue"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
        </div>
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase">
            Slide {currentSlide + 1} / {SLIDES.length}
          </span>
        </div>
      </footer>
    </div>
  );
}

function renderSlide(index: number, step: number) {
  switch (SLIDES[index]) {
    case 'hero':
      return <SlideHero />;
    case 'slideThirtyDayGoal':
      return <SlideThirtyDayGoal step={step} />;
    case 'slideFivePillars':
      return <SlideFivePillars step={step} />;
    case 'slideFootfallCr':
      return <SlideFootfallCr step={step} />;
    case 'slideSalesEquation':
      return <SlideSalesEquation step={step} />;
    case 'slideProfessionalFraming':
      return <SlideProfessionalFraming step={step} />;
    case 'slideMeasureOps':
      return <SlideMeasureLayer measureKey="slideMeasureOps" step={step} />;
    case 'slideMeasureFootfall':
      return <SlideMeasureLayer measureKey="slideMeasureFootfall" step={step} />;
    case 'slideMeasureConversion':
      return <SlideMeasureLayer measureKey="slideMeasureConversion" step={step} />;
    case 'slideMeasureBasket':
      return <SlideMeasureLayer measureKey="slideMeasureBasket" step={step} />;
    case 'thanks':
      return <SlideThanks />;
    default:
      return null;
  }
}

function SlideHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="shrink-0 text-right border-b-2 border-slate-100 pb-3 lg:pb-4 mb-4 lg:mb-6">
      <h2 className="text-2xl md:text-3xl lg:text-[2.75rem] font-black text-brand-blue leading-tight italic">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1 text-base lg:text-xl font-bold text-slate-500">{subtitle}</p>
      ) : null}
      <div className="mt-2 h-1 w-16 lg:w-24 bg-brand-orange rounded-full mr-0 ml-auto" />
    </div>
  );
}

const SlideHero = () => {
  const { brand, subtitle, consultant } = CONTENT.hero;

  return (
    <div className="presentation-slide hero-cover flex items-center justify-center relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] select-none flex items-center justify-center"
        aria-hidden
      >
        <span className="text-[28rem] font-black text-brand-blue tracking-tighter leading-none">BB</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl mx-auto"
      >
        <div className="absolute -inset-px rounded-[2rem] lg:rounded-[2.75rem] bg-gradient-to-br from-amber-200/60 via-white to-brand-blue/20" />
        <div className="relative bg-white/90 backdrop-blur-sm rounded-[2rem] lg:rounded-[2.75rem] shadow-[0_24px_80px_-20px_rgba(52,74,146,0.18)] border border-white px-10 py-14 lg:px-16 lg:py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-10 lg:mb-12">
            <span className="h-px w-12 lg:w-16 bg-gradient-to-l from-transparent to-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/90 shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
            <span className="h-px w-12 lg:w-16 bg-gradient-to-r from-transparent to-brand-blue/30" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-blue tracking-tight leading-none mb-5 lg:mb-6">
            {brand}
          </h1>

          <p className="text-2xl md:text-3xl lg:text-[2.125rem] font-bold text-brand-blue/75 leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>

          <div className="mt-10 lg:mt-12 pt-8 lg:pt-10 border-t border-slate-100/90">
            <p className="text-base lg:text-lg font-semibold text-slate-600 tracking-wide">{consultant}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SlideThirtyDayGoal = ({ step }: { step: number }) => {
  const { title, intro, points, conclusion } = CONTENT.slideThirtyDayGoal;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-base lg:text-xl font-bold text-slate-600 mb-4 lg:mb-6 text-right leading-relaxed"
      >
        {intro}
      </motion.p>
      <ul className="flex-1 space-y-2 lg:space-y-3 list-none m-0 p-0">
        {points.map((point, i) => (
          <motion.li
            key={point}
            initial={{ opacity: 0, x: 20 }}
            animate={step >= i ? { opacity: 1, x: 0 } : { opacity: 0.1, x: 20 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3 p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm text-right"
          >
            <span className="w-7 h-7 rounded-lg bg-brand-blue/10 text-brand-blue font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm lg:text-lg font-bold text-slate-700 leading-relaxed">{point}</span>
          </motion.li>
        ))}
      </ul>
      {step >= 4 && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 lg:mt-6 p-4 lg:p-5 rounded-xl bg-brand-blue/5 border border-brand-blue/10 text-sm lg:text-base font-semibold text-brand-blue text-right leading-relaxed"
        >
          {conclusion}
        </motion.p>
      )}
    </div>
  );
};

const PILLAR_ICONS = [Search, Gauge, Users, Monitor, BookOpen];

const SlideFivePillars = ({ step }: { step: number }) => {
  const { title, pillars } = CONTENT.slideFivePillars;

  return (
    <div className="presentation-slide flex flex-col overflow-hidden">
      <SlideHeader title={title} />
      <div className="flex-1 min-h-0 grid grid-cols-1 gap-2 lg:gap-3 content-start">
        {pillars.map((pillar, i) => {
          const Icon = PILLAR_ICONS[i] ?? Activity;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 14 }}
              animate={step >= i ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 14 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-3 lg:p-4 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm text-right"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                <Icon size={20} strokeWidth={2.25} />
              </div>
              <div className="min-w-0">
                <p className="text-sm lg:text-base font-black text-brand-blue mb-0.5">{pillar.title}</p>
                <p className="text-xs lg:text-sm font-semibold text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const SlideFootfallCr = ({ step }: { step: number }) => {
  const { title, footfall, cr, formula, insights } = CONTENT.slideFootfallCr;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <div className="flex-1 flex flex-col gap-3 lg:gap-4 justify-center min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[footfall, cr].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={step >= i ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 12 }}
              className="p-4 lg:p-5 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
            >
              <p className="text-xs font-black text-brand-blue uppercase tracking-wide mb-1">{item.label}</p>
              <p className="text-sm lg:text-base font-bold text-slate-600">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 lg:p-5 bg-brand-blue text-white rounded-xl text-center"
          >
            <p className="text-xs font-bold text-white/70 mb-1">معادلة التحويل</p>
            <p className="text-lg lg:text-2xl font-black tracking-wide" dir="ltr">
              {formula}
            </p>
          </motion.div>
        )}

        {step >= 3 &&
          insights.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 lg:p-5 bg-slate-50 rounded-xl border border-slate-100 text-right"
            >
              <p className="text-sm lg:text-base font-black text-brand-blue mb-1">{insight.title}</p>
              <p className="text-xs lg:text-sm font-semibold text-slate-600">{insight.text}</p>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

const SlideSalesEquation = ({ step }: { step: number }) => {
  const { title, intro, factors, equation } = CONTENT.slideSalesEquation;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-base lg:text-lg font-bold text-slate-600 mb-4 text-right"
      >
        {intro}
      </motion.p>
      <ul className="flex-1 space-y-2 list-none m-0 p-0">
        {factors.map((factor, i) => (
          <motion.li
            key={factor}
            initial={{ opacity: 0, x: 16 }}
            animate={step >= i ? { opacity: 1, x: 0 } : { opacity: 0.1, x: 16 }}
            className="flex items-center gap-3 p-3 lg:p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
          >
            <AlertCircle size={18} className="text-brand-orange shrink-0" />
            <span className="text-sm lg:text-base font-bold text-slate-700">{factor}</span>
          </motion.li>
        ))}
      </ul>
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-5 lg:p-6 bg-brand-blue text-white rounded-2xl text-right shadow-lg"
        >
          <p className="text-xs font-bold text-white/70 mb-2">المعادلة التشغيلية</p>
          <p className="text-base lg:text-xl font-black leading-relaxed">{equation}</p>
        </motion.div>
      )}
    </div>
  );
};

const SlideProfessionalFraming = ({ step }: { step: number }) => {
  const { title, blocks } = CONTENT.slideProfessionalFraming;

  return (
    <div className="presentation-slide flex flex-col justify-center">
      <SlideHeader title={title} />
      <div className="space-y-4 lg:space-y-6">
        {blocks.map((block, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={step >= i ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 14 }}
            transition={{ delay: i * 0.15 }}
            className="text-base lg:text-xl font-semibold text-slate-600 leading-relaxed text-right p-5 lg:p-7 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            {block}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

const MEASURE_ICONS: Record<MeasureKey, typeof ChefHat[]> = {
  slideMeasureOps: [ChefHat, Clock, Activity, Gauge],
  slideMeasureFootfall: [Users, Clock, TrendingUp, BarChart3],
  slideMeasureConversion: [Monitor, Percent, Clock, AlertCircle],
  slideMeasureBasket: [ShoppingCart, Package, TrendingUp, BarChart3],
};

const SlideMeasureLayer = ({
  measureKey,
  step,
}: {
  measureKey: MeasureKey;
  step: number;
}) => {
  const data = CONTENT[measureKey];
  const icons = MEASURE_ICONS[measureKey];
  const showSubtitle = 'subtitle' in data && data.subtitle;

  return (
    <div className="presentation-slide flex flex-col">
      <div className="shrink-0 text-right border-b-2 border-slate-100 pb-3 lg:pb-4 mb-4 lg:mb-6">
        {showSubtitle && (
          <p className="text-xs lg:text-sm font-bold text-brand-orange uppercase tracking-widest mb-1">
            {data.subtitle}
          </p>
        )}
        <div className="flex items-center justify-end gap-3">
          <h2 className="text-2xl md:text-3xl lg:text-[2.75rem] font-black text-brand-blue leading-tight italic">
            {data.title}
          </h2>
          <span className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-brand-blue text-white font-black text-lg flex items-center justify-center shrink-0">
            {data.layer}
          </span>
        </div>
        <div className="mt-2 h-1 w-16 lg:w-24 bg-brand-orange rounded-full mr-0 ml-auto" />
      </div>

      <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 list-none m-0 p-0 content-center">
        {data.items.map((item, i) => {
          const Icon = icons[i] ?? Activity;
          return (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 12 }}
              animate={step >= i ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 12 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-4 lg:p-5 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                <Icon size={18} strokeWidth={2.25} />
              </div>
              <span className="text-sm lg:text-base font-bold text-slate-700 leading-snug">{item}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

const SlideThanks = () => {
  const content = CONTENT.thanks;
  const isPdfExport =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('pdf');
  const pdfMotion = {
    initial: { opacity: 1, x: 0, y: 0, scale: 1 } as const,
    transition: { duration: 0 } as const,
  };

  return (
    <div className="presentation-slide flex flex-col items-center justify-center text-center space-y-10 lg:space-y-16 py-8 lg:py-12">
      <div className="space-y-4 lg:space-y-8">
        <motion.h2
          initial={isPdfExport ? pdfMotion.initial : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={isPdfExport ? pdfMotion.transition : undefined}
          className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-blue tracking-tighter leading-none italic"
        >
          {content.title}
        </motion.h2>
        <motion.p
          initial={isPdfExport ? pdfMotion.initial : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={isPdfExport ? pdfMotion.transition : { delay: 0.3 }}
          className="text-lg md:text-2xl lg:text-3xl font-bold text-brand-orange italic max-w-4xl mx-auto leading-relaxed px-4"
        >
          {content.subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={isPdfExport ? pdfMotion.initial : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={isPdfExport ? pdfMotion.transition : { delay: 0.5 }}
        className="flex flex-col items-center gap-4 pt-4 lg:pt-8"
      >
        <div className="h-px w-16 bg-brand-orange/30" />
        <span
          className={`thanks-contact-name text-xl md:text-2xl lg:text-3xl font-semibold text-brand-blue/80 ${
            isPdfExport ? 'not-italic' : 'italic'
          }`}
        >
          {content.contact}
        </span>
        <div className="h-px w-16 bg-brand-orange/30" />
      </motion.div>
    </div>
  );
};
