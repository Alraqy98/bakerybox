import { motion } from 'motion/react';
import {
  Landmark,
  TrendingUp,
  Settings,
  DollarSign,
  Network,
  Users,
  FileBarChart,
  Shield,
  Tag,
  Car,
  Coins,
  Target,
  Filter,
  Rocket,
  Clock,
  UserCheck,
  Link2,
  Gem,
  Gauge,
  LineChart,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { CONTENT } from './constants';

const GOLD = '#c9a227';
const NAVY = '#1a365d';
const TEAL = '#0f766e';
const ROYAL = '#1d4ed8';

const ICONS: Record<string, LucideIcon> = {
  landmark: Landmark,
  trendingUp: TrendingUp,
  settings: Settings,
  network: Network,
  users: Users,
  fileChart: FileBarChart,
  shield: Shield,
  tag: Tag,
  car: Car,
  coins: Coins,
  target: Target,
  filter: Filter,
  rocket: Rocket,
  clock: Clock,
  userCheck: UserCheck,
  link: Link2,
  gem: Gem,
  gauge: Gauge,
  pieChart: BarChart3,
  lineChart: LineChart,
};

type Pillar = (typeof CONTENT.slideTriangle.pillars)[number];

function TriIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Target;
  return <Icon className={className} strokeWidth={2} />;
}

function PillarListLeft({ pillar, visible }: { pillar: Pillar; visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={visible ? '' : 'pointer-events-none'}
      aria-hidden={!visible}
    >
      <PillarHeader pillar={pillar} />
      <ul className="mt-3 space-y-2.5">
        {pillar.items.map((item) => (
          <li key={item.ar} className="flex items-center gap-3">
            <span
              className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shrink-0 border border-slate-100"
              style={{ backgroundColor: `${pillar.color}10`, color: pillar.color }}
            >
              <TriIcon name={item.icon} className="w-4 h-4 lg:w-5 lg:h-5" />
            </span>
            <span className="text-xs lg:text-sm font-bold text-slate-600 leading-snug">{item.ar}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PillarListRight({ pillar, visible }: { pillar: Pillar; visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`text-right ${visible ? '' : 'pointer-events-none'}`}
      aria-hidden={!visible}
    >
      <PillarHeader pillar={pillar} align="right" />
      <ul className="mt-3 space-y-2.5">
        {pillar.items.map((item) => (
          <li key={item.ar} className="flex items-center justify-end gap-3">
            <span className="text-xs lg:text-sm font-bold text-slate-600 leading-snug">{item.ar}</span>
            <span
              className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shrink-0 border border-slate-100"
              style={{ backgroundColor: `${pillar.color}10`, color: pillar.color }}
            >
              <TriIcon name={item.icon} className="w-4 h-4 lg:w-5 lg:h-5" />
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PillarHeader({ pillar, align = 'left' }: { pillar: Pillar; align?: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className="text-[10px] lg:text-[11px] font-black tracking-wide leading-tight" style={{ color: pillar.color }}>
        {pillar.number}. {pillar.titleEn}
      </p>
      <p className="text-sm lg:text-base font-black leading-tight mt-0.5" style={{ color: pillar.color }}>
        {pillar.titleAr}
      </p>
    </div>
  );
}

const TRI_VIEW = { w: 400, h: 300 };
const TRI_TOP = { x: 200, y: 44 };
const TRI_BL = { x: 62, y: 262 };
const TRI_BR = { x: 338, y: 262 };
const TRI_MID = { x: 200, y: 176 };
const TRI_BASE_MID = { x: 200, y: 262 };
const CENTER_R = 56;

function vertexStyle(x: number, y: number) {
  return {
    left: `${(x / TRI_VIEW.w) * 100}%`,
    top: `${(y / TRI_VIEW.h) * 100}%`,
    transform: 'translate(-50%, -50%)',
  } as const;
}

/** Point along vertex→center line where arrow should stop (before center text) */
function arrowPoints(
  vx: number,
  vy: number,
  vertexR: number,
  circleR: number,
  headGap: number
) {
  const dx = TRI_MID.x - vx;
  const dy = TRI_MID.y - vy;
  const dist = Math.hypot(dx, dy);
  const ux = dx / dist;
  const uy = dy / dist;
  const start = { x: vx + ux * vertexR, y: vy + uy * vertexR };
  const end = {
    x: vx + ux * (dist - circleR - headGap),
    y: vy + uy * (dist - circleR - headGap),
  };
  return { start, end };
}

function TriangleDiagram({ visible }: { visible: boolean }) {
  const { center, pillars } = CONTENT.slideTriangle;
  const gov = pillars[0];
  const rev = pillars[1];
  const exec = pillars[2];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35 }}
      className={`relative w-full aspect-[4/3] max-h-[min(46vh,420px)] min-h-[200px] ${visible ? '' : 'pointer-events-none'}`}
      aria-hidden={!visible}
    >
      <svg viewBox={`0 0 ${TRI_VIEW.w} ${TRI_VIEW.h}`} className="w-full h-full overflow-visible" aria-hidden>
        <defs>
          <marker id="tri-gold-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={GOLD} />
          </marker>
          <filter id="tri-vertex-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.25" />
          </filter>
        </defs>
        {/* Colored sides */}
        <line x1={TRI_TOP.x} y1={TRI_TOP.y} x2={TRI_BL.x} y2={TRI_BL.y} stroke={TEAL} strokeWidth="7" strokeLinecap="round" />
        <line x1={TRI_TOP.x} y1={TRI_TOP.y} x2={TRI_BR.x} y2={TRI_BR.y} stroke={ROYAL} strokeWidth="7" strokeLinecap="round" />
        <line x1={TRI_BL.x} y1={TRI_BL.y} x2={TRI_BR.x} y2={TRI_BR.y} stroke={NAVY} strokeWidth="7" strokeLinecap="round" />
        {/* Gold arrows — stop on the ring, not over the label */}
        {[
          arrowPoints(TRI_TOP.x, TRI_TOP.y, 30, CENTER_R, 10),
          arrowPoints(TRI_BL.x, TRI_BL.y, 30, CENTER_R, 10),
          arrowPoints(TRI_BR.x, TRI_BR.y, 30, CENTER_R, 10),
        ].map((pts, i) => (
          <line
            key={i}
            x1={pts.start.x}
            y1={pts.start.y}
            x2={pts.end.x}
            y2={pts.end.y}
            stroke={GOLD}
            strokeWidth="2"
            markerEnd="url(#tri-gold-arrow)"
          />
        ))}
        {/* Connector to value box (below triangle) */}
        <line x1={TRI_BASE_MID.x} y1={TRI_BL.y + 2} x2={TRI_BASE_MID.x} y2={TRI_VIEW.h - 4} stroke={GOLD} strokeWidth="2" />
        {/* Vertices */}
        <circle cx={TRI_TOP.x} cy={TRI_TOP.y} r="30" fill={gov.color} filter="url(#tri-vertex-shadow)" />
        <circle cx={TRI_BL.x} cy={TRI_BL.y} r="30" fill={rev.color} filter="url(#tri-vertex-shadow)" />
        <circle cx={TRI_BR.x} cy={TRI_BR.y} r="30" fill={exec.color} filter="url(#tri-vertex-shadow)" />
        <circle cx={TRI_MID.x} cy={TRI_MID.y} r={CENTER_R} fill="white" stroke={GOLD} strokeWidth="3.5" />
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute flex items-center justify-center text-white" style={vertexStyle(TRI_TOP.x, TRI_TOP.y)}>
          <TriIcon name={gov.vertexIcon} className="w-7 h-7 lg:w-8 lg:h-8" />
        </div>
        <div className="absolute flex items-center justify-center text-white" style={vertexStyle(TRI_BL.x, TRI_BL.y)}>
          <TriIcon name={rev.vertexIcon} className="w-7 h-7 lg:w-8 lg:h-8" />
        </div>
        <div className="absolute flex items-center justify-center text-white" style={vertexStyle(TRI_BR.x, TRI_BR.y)}>
          <TriIcon name={exec.vertexIcon} className="w-7 h-7 lg:w-8 lg:h-8" />
        </div>
        {/* Labels sit inside the white circle, above arrow tips */}
        <div
          className="absolute z-10 flex flex-col items-center justify-center text-center rounded-full bg-white px-3 py-2"
          style={{
            ...vertexStyle(TRI_MID.x, TRI_MID.y),
            width: `${((CENTER_R * 2 - 10) / TRI_VIEW.w) * 100}%`,
            maxWidth: 128,
            aspectRatio: '1',
          }}
        >
          <DollarSign className="w-7 h-7 lg:w-8 lg:h-8 shrink-0" style={{ color: GOLD }} strokeWidth={2.25} />
          <p
            className="text-[6px] lg:text-[7px] font-black leading-none mt-1 px-0.5 max-w-full"
            style={{ color: GOLD, letterSpacing: '0.04em' }}
          >
            {center.titleEn}
          </p>
          <p className="text-[8px] lg:text-[9px] font-black text-brand-blue leading-tight mt-1 px-0.5 max-w-full">
            {center.titleAr}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function SlideTransformationTriangle({ step }: { step: number }) {
  const { titleEn, titleAr, subtitle, valueCreation, pillars, outcomes } = CONTENT.slideTriangle;
  const showDiagram = step >= 1;
  const showPillars = step >= 2;
  const showValue = step >= 3;
  const showOutcomes = step >= 4;

  const [gov, rev, exec] = pillars;

  return (
    <div className="presentation-slide flex flex-col gap-3 overflow-hidden !p-4 md:!p-6 lg:!p-8">
      <header className="shrink-0 text-center space-y-1.5">
        <h2 className="text-xl md:text-2xl lg:text-[1.65rem] font-black text-[#1a365d] leading-none">{titleEn}</h2>
        <p className="text-lg md:text-xl lg:text-2xl font-black text-brand-blue">{titleAr}</p>
        <div className="flex items-center justify-center gap-2 max-w-lg mx-auto pt-1">
          <div className="flex-1 h-[2px]" style={{ backgroundColor: GOLD }} />
          <div className="w-2 h-2 rotate-45" style={{ backgroundColor: GOLD }} />
          <div className="flex-1 h-[2px]" style={{ backgroundColor: GOLD }} />
        </div>
        <p className="text-[10px] md:text-xs lg:text-sm text-slate-500 max-w-3xl mx-auto leading-relaxed px-2">
          {subtitle}
        </p>
      </header>

      {/* Three columns — no overlap */}
      <div
        className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,1.35fr)_minmax(0,1fr)] gap-4 lg:gap-5 items-stretch"
        dir="ltr"
      >
        <div className="hidden lg:flex flex-col justify-center min-h-0 py-2">
          <PillarListLeft pillar={rev} visible={showPillars} />
        </div>

        <div className="flex flex-col items-center justify-center min-h-0 gap-0 py-1">
          <TriangleDiagram visible={showDiagram} />
          <motion.div
            initial={false}
            animate={{ opacity: showValue ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col items-center shrink-0 -mt-1 ${showValue ? '' : 'pointer-events-none'}`}
            aria-hidden={!showValue}
          >
            <div className="w-[2px] h-2 mb-1" style={{ backgroundColor: GOLD }} />
            <div
              className="flex items-center gap-3 px-5 py-2.5 rounded-lg border-2 bg-white shadow-sm"
              style={{ borderColor: GOLD }}
            >
              <BarChart3 className="w-5 h-5 shrink-0" style={{ color: GOLD }} strokeWidth={2.25} />
              <div className="text-center">
                <p className="text-[9px] lg:text-[10px] font-black tracking-wider" style={{ color: GOLD }}>
                  {valueCreation.titleEn}
                </p>
                <p className="text-xs lg:text-sm font-black text-brand-blue">{valueCreation.titleAr}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:flex flex-col justify-between min-h-0 py-2 gap-6">
          <PillarListRight pillar={gov} visible={showPillars} />
          <div className="h-px bg-slate-200/80 shrink-0" aria-hidden />
          <PillarListRight pillar={exec} visible={showPillars} />
        </div>
      </div>

      {/* Mobile / narrow: pillars below triangle */}
      <div className="lg:hidden shrink-0 grid grid-cols-1 gap-4 max-h-[28vh] overflow-y-auto">
        <PillarListRight pillar={gov} visible={showPillars} />
        <PillarListLeft pillar={rev} visible={showPillars} />
        <PillarListRight pillar={exec} visible={showPillars} />
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: showOutcomes ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`shrink-0 flex flex-wrap justify-center gap-2 lg:gap-3 ${showOutcomes ? '' : 'pointer-events-none'}`}
        aria-hidden={!showOutcomes}
      >
        {outcomes.map((outcome) => (
          <div
            key={outcome.ar}
            className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <TriIcon name={outcome.icon} className="w-4 h-4 text-teal-700 shrink-0" />
            <span className="text-[10px] lg:text-xs font-bold text-slate-700 whitespace-nowrap">{outcome.ar}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
