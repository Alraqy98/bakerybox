import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Eye,
  Lightbulb,
  Rocket,
  TrendingUp,
  MapPin,
  Activity,
  Sparkles,
  Clock,
  Heart,
  Building2,
  Smartphone,
  BarChart3,
  Route,
  CheckCircle2,
} from 'lucide-react';
import { CONTENT } from './constants';

const SLIDES = [
  'hero',
  'slideOrigin',
  'slideWhyBakery',
  'slideOpportunities',
  'slideImpact',
  'slideRoadmap',
] as const;

type SlideId = (typeof SLIDES)[number];

const SLIDE_STEPS: Record<SlideId, number> = {
  hero: 0,
  slideOrigin: 3,
  slideWhyBakery: 3,
  slideOpportunities: 4,
  slideImpact: 4,
  slideRoadmap: 2,
};

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

      <AnimatePresence>
        {SLIDES[currentSlide] === 'hero' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed top-8 right-8 lg:top-12 lg:right-16 z-50 pointer-events-none"
          >
            <div className="w-24 h-24 lg:w-40 lg:h-40 bg-white rounded-2xl lg:rounded-[3rem] shadow-2xl border border-slate-100 flex items-center justify-center overflow-hidden p-2 lg:p-4">
              <img
                src="/logo.png"
                alt="Roqqi Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://ui-avatars.com/api/?name=R&background=344a92&color=fff';
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    case 'slideOrigin':
      return <SlideOrigin step={step} />;
    case 'slideWhyBakery':
      return <SlideWhyBakery step={step} />;
    case 'slideOpportunities':
      return <SlideOpportunities step={step} />;
    case 'slideImpact':
      return <SlideImpact step={step} />;
    case 'slideRoadmap':
      return <SlideRoadmap step={step} />;
    default:
      return null;
  }
}

function SlideHeader({ title }: { title: string }) {
  return (
    <div className="shrink-0 text-right border-b-2 border-slate-100 pb-3 lg:pb-4 mb-4 lg:mb-6">
      <h2 className="text-2xl md:text-3xl lg:text-[2.75rem] font-black text-brand-blue leading-tight italic">
        {title}
      </h2>
      <div className="mt-2 h-1 w-16 lg:w-24 bg-brand-orange rounded-full mr-0 ml-auto" />
    </div>
  );
}

const SlideHero = () => {
  const descMatch = CONTENT.hero.description.match(/^(.*?)([A-Za-z].*)$/);
  const arabicDesc = descMatch?.[1]?.trim() ?? CONTENT.hero.description;
  const englishDesc = descMatch?.[2]?.trim() ?? '';
  const [titleBlue, titleOrange] = CONTENT.hero.title.split(' | ');

  return (
    <div className="presentation-slide text-center space-y-6 lg:space-y-10">
      <div className="space-y-2 lg:space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-8xl font-black text-brand-blue tracking-tighter leading-[1.1] flex items-center justify-center gap-4 py-2 lg:py-4"
        >
          <span className="not-italic">{titleBlue}</span>
          <div className="h-10 md:h-16 lg:h-24 w-1 bg-brand-blue/40 rounded-full mx-2 lg:mx-6" />
          <span className="text-brand-orange italic">{titleOrange}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl text-brand-blue font-bold"
        >
          {CONTENT.hero.tagline}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto p-6 md:p-8 lg:p-10 bg-white rounded-2xl lg:rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative group"
      >
        <div className="absolute -top-4 lg:-top-6 -right-4 lg:-right-6 w-12 h-12 lg:w-16 lg:h-16 bg-brand-orange rounded-xl lg:rounded-2xl flex items-center justify-center text-white shadow-xl">
          <Zap size={24} className="lg:w-8 lg:h-8" />
        </div>
        <div className="space-y-2 mb-6 lg:mb-8">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-brand-blue leading-tight italic underline decoration-brand-orange underline-offset-8 decoration-4">
            {arabicDesc}
          </h2>
          {englishDesc && (
            <p className="text-base md:text-xl lg:text-3xl font-black text-[#5B76CC] italic mt-1 lg:mt-2 uppercase tracking-wide">
              {englishDesc}
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 lg:gap-12 pt-6 lg:pt-8 border-t border-slate-100">
          <div className="text-center md:text-right">
            <p className="text-lg md:text-xl lg:text-2xl font-black text-brand-blue mb-0.5">
              {CONTENT.hero.consultant}
            </p>
            <p className="text-brand-blue text-[10px] md:text-sm lg:text-xl font-black leading-none">
              {CONTENT.hero.role}
            </p>
            {CONTENT.hero.subrole ? (
              <p className="text-[9px] md:text-xs lg:text-sm text-brand-orange font-black mt-1 leading-relaxed">
                {CONTENT.hero.subrole}
              </p>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ORIGIN_ICONS = [Eye, Lightbulb, TrendingUp, Rocket];

const SlideOrigin = ({ step }: { step: number }) => {
  const { title, points } = CONTENT.slideOrigin;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4 flex justify-center lg:justify-end"
        >
          <div className="relative w-36 h-36 lg:w-52 lg:h-52">
            <div className="absolute inset-0 rounded-[2rem] bg-brand-blue/5 border border-brand-blue/10" />
            <div className="absolute inset-4 lg:inset-6 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center">
              <div className="flex items-center gap-2 text-brand-blue">
                <Eye size={32} className="lg:w-10 lg:h-10 opacity-80" />
                <Lightbulb size={28} className="lg:w-9 lg:h-9 text-brand-orange" />
                <Rocket size={32} className="lg:w-10 lg:h-10 opacity-80" />
              </div>
            </div>
          </div>
        </motion.div>
        <ul className="lg:col-span-8 space-y-3 lg:space-y-4 list-none m-0 p-0">
          {points.map((point, i) => {
            const Icon = ORIGIN_ICONS[i] ?? Sparkles;
            return (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: 24 }}
                animate={step >= i ? { opacity: 1, x: 0 } : { opacity: 0.12, x: 24 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="flex items-center gap-4 p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-md text-right"
              >
                <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-[#dbeafe] flex items-center justify-center text-brand-blue shrink-0">
                  <Icon size={22} strokeWidth={2.25} />
                </div>
                <span className="text-base lg:text-xl font-bold text-slate-700 leading-snug">{point}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const WHY_ICONS = [TrendingUp, MapPin, Activity, Sparkles];

const SlideWhyBakery = ({ step }: { step: number }) => {
  const { title, cards } = CONTENT.slideWhyBakery;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5 content-center">
        {cards.map((card, i) => {
          const Icon = WHY_ICONS[i] ?? Sparkles;
          return (
            <motion.div
              key={card}
              initial={{ opacity: 0, y: 20 }}
              animate={step >= i ? { opacity: 1, y: 0 } : { opacity: 0.12, y: 20 }}
              transition={{ delay: i * 0.1, duration: 0.35 }}
              className="flex flex-col gap-4 p-5 lg:p-7 bg-white rounded-2xl lg:rounded-[2rem] border border-slate-100 shadow-lg hover:border-brand-blue/20 hover:shadow-xl transition-all text-right min-h-[120px] lg:min-h-[140px]"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                <Icon size={26} strokeWidth={2.25} />
              </div>
              <p className="text-base lg:text-xl font-black text-brand-blue leading-snug italic">{card}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const OPP_ICONS = [Clock, Heart, Building2, Smartphone, BarChart3];

const SlideOpportunities = ({ step }: { step: number }) => {
  const { title, cards } = CONTENT.slideOpportunities;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 content-start">
        {cards.map((card, i) => {
          const Icon = OPP_ICONS[i] ?? Sparkles;
          const isWide = i === 4;
          return (
            <motion.div
              key={card}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={step >= i ? { opacity: 1, scale: 1 } : { opacity: 0.12, scale: 0.96 }}
              transition={{ delay: i * 0.08, duration: 0.32 }}
              className={`flex flex-col gap-3 p-4 lg:p-6 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-md text-right hover:border-brand-orange/30 transition-colors ${
                isWide ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Icon size={20} strokeWidth={2.25} />
              </div>
              <p className="text-sm lg:text-lg font-black text-slate-700 leading-snug">{card}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const SlideImpact = ({ step }: { step: number }) => {
  const { title, rows } = CONTENT.slideImpact;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <div className="flex-1 flex flex-col gap-2 lg:gap-3 justify-center min-h-0">
        {rows.map((row, i) => (
          <motion.div
            key={row.opportunity}
            initial={{ opacity: 0, x: 20 }}
            animate={step >= i ? { opacity: 1, x: 0 } : { opacity: 0.12, x: 20 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-0 items-stretch bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-md overflow-hidden"
          >
            <div className="p-3 lg:p-4 bg-brand-blue text-white text-right flex items-center">
              <span className="text-sm lg:text-lg font-black italic leading-snug">{row.opportunity}</span>
            </div>
            <div className="p-3 lg:p-4 bg-slate-50 text-right flex items-center border-t md:border-t-0 md:border-r border-slate-100">
              <span className="text-xs lg:text-base font-bold text-slate-600 leading-snug">{row.impact}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SlideRoadmap = ({ step }: { step: number }) => {
  const { title, phases } = CONTENT.slideRoadmap;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <div className="flex-1 flex flex-col justify-center gap-4 lg:gap-6 relative">
        <div className="hidden lg:block absolute top-12 bottom-12 right-[2.25rem] w-0.5 bg-gradient-to-b from-brand-blue via-brand-orange to-emerald-600 rounded-full" />
        {phases.map((phase, i) => (
          <motion.div
            key={phase.step}
            initial={{ opacity: 0, y: 24 }}
            animate={step >= i ? { opacity: 1, y: 0 } : { opacity: 0.12, y: 24 }}
            transition={{ delay: i * 0.12, duration: 0.38 }}
            className="relative flex gap-4 lg:gap-6 items-start text-right"
          >
            <div
              className={`relative z-10 shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg ${
                phase.paid
                  ? 'bg-brand-orange text-white ring-4 ring-brand-orange/20'
                  : 'bg-brand-blue text-white'
              }`}
            >
              {phase.step}
            </div>
            <div className="flex-1 p-4 lg:p-6 bg-white rounded-2xl lg:rounded-[2rem] border border-slate-100 shadow-lg">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-base lg:text-xl font-black text-brand-blue italic leading-tight">
                  {phase.title}
                </h3>
                {phase.paid && (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange text-[10px] lg:text-xs font-black uppercase tracking-wider border border-brand-orange/20">
                    مدفوع · يُخصم لاحقًا
                  </span>
                )}
              </div>
              <p className="text-sm lg:text-lg font-bold text-slate-600 leading-relaxed">{phase.description}</p>
              {'note' in phase && phase.note && step >= i && (
                <p className="mt-2 text-[10px] lg:text-xs font-semibold text-slate-400 italic">{phase.note}</p>
              )}
            </div>
            {i < phases.length - 1 && (
              <Route
                size={20}
                className="hidden lg:block absolute -bottom-3 right-5 text-slate-300"
                aria-hidden
              />
            )}
          </motion.div>
        ))}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 pt-2 text-slate-400"
          >
            <CheckCircle2 size={16} />
            <span className="text-xs font-black uppercase tracking-widest">تنفيذ · متابعة · استدامة</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
