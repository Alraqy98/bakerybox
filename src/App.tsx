import { useState, useEffect, useCallback } from 'react';
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
  UserCheck,
  ListChecks,
} from 'lucide-react';
import { CONTENT } from './constants';

const SLIDES = [
  'hero',
  'slideThirtyDayGoal',
  'slideFivePillars',
  'slideAuthoritiesFramework',
  'slideOperationalCapacity',
  'slideFootfallCr',
  'slideSalesEquation',
  'slideProfessionalFraming',
  'slideMeasureOps',
  'slideMeasureFootfall',
  'slideMeasureConversion',
  'slideMeasureBasket',
  'thanks',
] as const;

type MeasureKey =
  | 'slideMeasureOps'
  | 'slideMeasureFootfall'
  | 'slideMeasureConversion'
  | 'slideMeasureBasket';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isPdfMode =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('pdf');

  const paginate = useCallback((newDirection: number) => {
    const next = currentSlide + newDirection;
    if (next >= 0 && next < SLIDES.length) {
      setCurrentSlide(next);
    }
  }, [currentSlide]);

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

  if (isPdfMode) {
    return (
      <div className="pdf-deck bg-brand-light text-brand-dark font-sans rtl">
        {SLIDES.map((slideId, index) => (
          <section key={`${slideId}-${index}`} className="pdf-page" data-pdf-slide={slideId}>
            <div className="pdf-slide-shell">
              <div className="pdf-scale">{renderSlide(index)}</div>
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
        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
          <div className="w-full h-full max-w-7xl flex items-center justify-center">
            {renderSlide(currentSlide)}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 p-12 flex justify-between items-end pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          <button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center opacity-30 hover:opacity-100 hover:bg-slate-50 disabled:opacity-30 border border-slate-100"
          >
            <ArrowRight size={24} className="text-brand-blue" />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentSlide === SLIDES.length - 1}
            className="w-14 h-14 rounded-2xl bg-brand-blue shadow-xl shadow-brand-blue/20 flex items-center justify-center opacity-30 hover:opacity-100 disabled:opacity-30 border border-brand-blue"
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

function renderSlide(index: number) {
  switch (SLIDES[index]) {
    case 'hero':
      return <SlideHero />;
    case 'slideThirtyDayGoal':
      return <SlideThirtyDayGoal />;
    case 'slideFivePillars':
      return <SlideFivePillars />;
    case 'slideAuthoritiesFramework':
      return <SlideAuthoritiesFramework />;
    case 'slideOperationalCapacity':
      return <SlideOperationalCapacity />;
    case 'slideFootfallCr':
      return <SlideFootfallCr />;
    case 'slideSalesEquation':
      return <SlideSalesEquation />;
    case 'slideProfessionalFraming':
      return <SlideProfessionalFraming />;
    case 'slideMeasureOps':
      return <SlideMeasureLayer measureKey="slideMeasureOps" />;
    case 'slideMeasureFootfall':
      return <SlideMeasureLayer measureKey="slideMeasureFootfall" />;
    case 'slideMeasureConversion':
      return <SlideMeasureLayer measureKey="slideMeasureConversion" />;
    case 'slideMeasureBasket':
      return <SlideMeasureLayer measureKey="slideMeasureBasket" />;
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

      <div className="relative w-full max-w-3xl mx-auto">
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
      </div>
    </div>
  );
};

const SlideThirtyDayGoal = () => {
  const { title, intro, points, conclusion } = CONTENT.slideThirtyDayGoal;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <p className="text-base lg:text-xl font-bold text-slate-600 mb-4 lg:mb-6 text-right leading-relaxed">
        {intro}
      </p>
      <ul className="flex-1 space-y-2 lg:space-y-3 list-none m-0 p-0">
        {points.map((point, i) => (
          <li
            key={point}
            className="flex items-start gap-3 p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm text-right"
          >
            <span className="w-7 h-7 rounded-lg bg-brand-blue/10 text-brand-blue font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm lg:text-lg font-bold text-slate-700 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 lg:mt-6 p-4 lg:p-5 rounded-xl bg-brand-blue/5 border border-brand-blue/10 text-sm lg:text-base font-semibold text-brand-blue text-right leading-relaxed">
        {conclusion}
      </p>
    </div>
  );
};

const PILLAR_ICONS = [Search, Gauge, Users, Monitor, BookOpen];

const SlideFivePillars = () => {
  const { title, pillars } = CONTENT.slideFivePillars;

  return (
    <div className="presentation-slide flex flex-col overflow-hidden">
      <SlideHeader title={title} />
      <div className="flex-1 min-h-0 grid grid-cols-1 gap-2 lg:gap-3 content-start">
        {pillars.map((pillar, i) => {
          const Icon = PILLAR_ICONS[i] ?? Activity;
          return (
            <div
              key={pillar.title}
              className="flex items-start gap-3 p-3 lg:p-4 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm text-right"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                <Icon size={20} strokeWidth={2.25} />
              </div>
              <div className="min-w-0">
                <p className="text-sm lg:text-base font-black text-brand-blue mb-0.5">{pillar.title}</p>
                <p className="text-xs lg:text-sm font-semibold text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AUTHORITY_ICONS = [UserCheck, ListChecks, Monitor];

const SlideAuthoritiesFramework = () => {
  const { title, points } = CONTENT.slideAuthoritiesFramework;

  return (
    <div className="presentation-slide flex flex-col justify-center">
      <SlideHeader title={title} />
      <ul className="flex-1 space-y-3 lg:space-y-4 list-none m-0 p-0">
        {points.map((point, i) => {
          const Icon = AUTHORITY_ICONS[i] ?? Activity;
          return (
            <li
              key={point}
              className="flex items-center gap-4 p-5 lg:p-6 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm text-right"
            >
              <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                <Icon size={22} strokeWidth={2.25} />
              </div>
              <span className="text-base lg:text-xl font-bold text-slate-700 leading-snug">{point}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const CAPACITY_ICONS = [Gauge, AlertCircle, TrendingUp];

const SlideOperationalCapacity = () => {
  const { title, subtitle, intro, points, conclusion } = CONTENT.slideOperationalCapacity;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} subtitle={subtitle} />
      <p className="text-sm lg:text-lg font-bold text-slate-600 mb-4 lg:mb-5 text-right leading-relaxed">
        {intro}
      </p>
      <ul className="flex-1 space-y-2 lg:space-y-3 list-none m-0 p-0">
        {points.map((point, i) => {
          const Icon = CAPACITY_ICONS[i] ?? Activity;
          return (
            <li
              key={point}
              className="flex items-start gap-3 p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm text-right"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                <Icon size={20} strokeWidth={2.25} />
              </div>
              <span className="text-sm lg:text-base font-bold text-slate-700 leading-relaxed">{point}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 lg:mt-5 p-4 lg:p-5 rounded-xl bg-brand-blue/5 border border-brand-blue/10 text-sm lg:text-base font-semibold text-brand-blue text-right leading-relaxed">
        {conclusion}
      </p>
    </div>
  );
};

const SlideFootfallCr = () => {
  const { title, footfall, cr, formula, insights } = CONTENT.slideFootfallCr;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <div className="flex-1 flex flex-col gap-3 lg:gap-4 justify-center min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[footfall, cr].map((item) => (
            <div
              key={item.label}
              className="p-4 lg:p-5 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
            >
              <p className="text-xs font-black text-brand-blue uppercase tracking-wide mb-1">{item.label}</p>
              <p className="text-sm lg:text-base font-bold text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="p-4 lg:p-5 bg-brand-blue text-white rounded-xl text-center">
          <p className="text-xs font-bold text-white/70 mb-1">معادلة التحويل</p>
          <p className="text-lg lg:text-2xl font-black tracking-wide" dir="ltr">
            {formula}
          </p>
        </div>

        {insights.map((insight) => (
          <div
            key={insight.title}
            className="p-4 lg:p-5 bg-slate-50 rounded-xl border border-slate-100 text-right"
          >
            <p className="text-sm lg:text-base font-black text-brand-blue mb-1">{insight.title}</p>
            <p className="text-xs lg:text-sm font-semibold text-slate-600">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SlideSalesEquation = () => {
  const { title, intro, factors, equation } = CONTENT.slideSalesEquation;

  return (
    <div className="presentation-slide flex flex-col">
      <SlideHeader title={title} />
      <p className="text-base lg:text-lg font-bold text-slate-600 mb-4 text-right">{intro}</p>
      <ul className="flex-1 space-y-2 list-none m-0 p-0">
        {factors.map((factor) => (
          <li
            key={factor}
            className="flex items-center gap-3 p-3 lg:p-4 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
          >
            <AlertCircle size={18} className="text-brand-orange shrink-0" />
            <span className="text-sm lg:text-base font-bold text-slate-700">{factor}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 p-5 lg:p-6 bg-brand-blue text-white rounded-2xl text-right shadow-lg">
        <p className="text-xs font-bold text-white/70 mb-2">المعادلة التشغيلية</p>
        <p className="text-base lg:text-xl font-black leading-relaxed">{equation}</p>
      </div>
    </div>
  );
};

const SlideProfessionalFraming = () => {
  const { title, blocks } = CONTENT.slideProfessionalFraming;

  return (
    <div className="presentation-slide flex flex-col justify-center">
      <SlideHeader title={title} />
      <div className="space-y-4 lg:space-y-6">
        {blocks.map((block, i) => (
          <p
            key={i}
            className="text-base lg:text-xl font-semibold text-slate-600 leading-relaxed text-right p-5 lg:p-7 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            {block}
          </p>
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

const SlideMeasureLayer = ({ measureKey }: { measureKey: MeasureKey }) => {
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
            <li
              key={item}
              className="flex items-center gap-3 p-4 lg:p-5 bg-white rounded-xl border border-slate-100 shadow-sm text-right"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                <Icon size={18} strokeWidth={2.25} />
              </div>
              <span className="text-sm lg:text-base font-bold text-slate-700 leading-snug">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const SlideThanks = () => {
  const content = CONTENT.thanks;

  return (
    <div className="presentation-slide flex flex-col items-center justify-center text-center space-y-10 lg:space-y-16 py-8 lg:py-12">
      <div className="space-y-4 lg:space-y-8">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-brand-blue tracking-tighter leading-none italic">
          {content.title}
        </h2>
        <p className="text-lg md:text-2xl lg:text-3xl font-bold text-brand-orange italic max-w-4xl mx-auto leading-relaxed px-4">
          {content.subtitle}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4 lg:pt-8">
        <div className="h-px w-16 bg-brand-orange/30" />
        <span className="thanks-contact-name text-xl md:text-2xl lg:text-3xl font-semibold text-brand-blue/80 italic">
          {content.contact}
        </span>
        <div className="h-px w-16 bg-brand-orange/30" />
      </div>
    </div>
  );
};
