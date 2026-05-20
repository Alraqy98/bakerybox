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

/** Revenue (left of triangle): icon → text */
function PillarListLeft({ pillar, visible }: { pillar: Pillar; visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-2 ${visible ? '' : 'pointer-events-none'}`}
      aria-hidden={!visible}
    >
      <div>
        <p className="text-[10px] lg:text-[11px] font-black tracking-wide" style={{ color: pillar.color }}>
          {pillar.number}. {pillar.titleEn}
        </p>
        <p className="text-xs lg:text-sm font-black mt-0.5" style={{ color: pillar.color }}>
          {pillar.titleAr}
        </p>
      </div>
      <ul className="space-y-2">
        {pillar.items.map((item) => (
          <li key={item.ar} className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${pillar.color}12`, color: pillar.color }}
            >
              <TriIcon name={item.icon} className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
            </span>
            <span className="text-[11px] lg:text-xs font-bold text-slate-600 leading-snug">{item.ar}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/** Governance & Execution (right of triangle): text ← icon */
function PillarListRight({ pillar, visible }: { pillar: Pillar; visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-2 text-right ${visible ? '' : 'pointer-events-none'}`}
      aria-hidden={!visible}
    >
      <div>
        <p className="text-[10px] lg:text-[11px] font-black tracking-wide" style={{ color: pillar.color }}>
          {pillar.number}. {pillar.titleEn}
        </p>
        <p className="text-xs lg:text-sm font-black mt-0.5" style={{ color: pillar.color }}>
          {pillar.titleAr}
        </p>
      </div>
      <ul className="space-y-2">
        {pillar.items.map((item) => (
          <li key={item.ar} className="flex items-center justify-end gap-2.5">
            <span className="text-[11px] lg:text-xs font-bold text-slate-600 leading-snug">{item.ar}</span>
            <span
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${pillar.color}12`, color: pillar.color }}
            >
              <TriIcon name={item.icon} className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function TriangleDiagram({ visible }: { visible: boolean }) {
  const { center, pillars } = CONTENT.slideTriangle;
  const gov = pillars[0];
  const rev = pillars[1];
  const exec = pillars[2];

  const top = { x: 200, y: 42 };
  const bl = { x: 62, y: 268 };
  const br = { x: 338, y: 268 };
  const mid = { x: 200, y: 178 };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35 }}
      className={`absolute inset-0 ${visible ? '' : 'pointer-events-none'}`}
      aria-hidden={!visible}
    >
      <svg
        viewBox="0 0 400 300"
        className="absolute left-1/2 top-[6%] -translate-x-1/2 w-[min(92%,420px)] h-[min(68%,340px)]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <marker id="tri-gold-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={GOLD} />
          </marker>
          <filter id="vertex-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>
        <line x1={top.x} y1={top.y} x2={bl.x} y2={bl.y} stroke={TEAL} strokeWidth="6" strokeLinecap="round" />
        <line x1={top.x} y1={top.y} x2={br.x} y2={br.y} stroke={ROYAL} strokeWidth="6" strokeLinecap="round" />
        <line x1={bl.x} y1={bl.y} x2={br.x} y2={br.y} stroke={NAVY} strokeWidth="6" strokeLinecap="round" />
        <line x1={top.x} y1={top.y + 26} x2={mid.x} y2={mid.y - 38} stroke={GOLD} strokeWidth="2" markerEnd="url(#tri-gold-arrow)" />
        <line x1={bl.x + 20} y1={bl.y - 16} x2={mid.x - 26} y2={mid.y + 24} stroke={GOLD} strokeWidth="2" markerEnd="url(#tri-gold-arrow)" />
        <line x1={br.x - 20} y1={br.y - 16} x2={mid.x + 26} y2={mid.y + 24} stroke={GOLD} strokeWidth="2" markerEnd="url(#tri-gold-arrow)" />
        <circle cx={top.x} cy={top.y} r="28" fill={gov.color} filter="url(#vertex-shadow)" />
        <circle cx={bl.x} cy={bl.y} r="28" fill={rev.color} filter="url(#vertex-shadow)" />
        <circle cx={br.x} cy={br.y} r="28" fill={exec.color} filter="url(#vertex-shadow)" />
        <circle cx={mid.x} cy={mid.y} r="44" fill="white" stroke={GOLD} strokeWidth="3" />
      </svg>

      {/* Vertex icons */}
      <div className="absolute left-1/2 top-[6%] w-[min(92%,420px)] h-[min(68%,340px)] -translate-x-1/2 pointer-events-none">
        <div className="absolute text-white" style={{ top: '2%', left: '50%', transform: 'translate(-50%,0)' }}>
          <TriIcon name={gov.vertexIcon} className="w-7 h-7" />
        </div>
        <div className="absolute text-white" style={{ bottom: '4%', left: '7%' }}>
          <TriIcon name={rev.vertexIcon} className="w-7 h-7" />
        </div>
        <div className="absolute text-white" style={{ bottom: '4%', right: '7%' }}>
          <TriIcon name={exec.vertexIcon} className="w-7 h-7" />
        </div>
        <div
          className="absolute flex flex-col items-center text-center"
          style={{ top: '48%', left: '50%', transform: 'translate(-50%,-50%)' }}
        >
          <DollarSign className="w-9 h-9 lg:w-10 lg:h-10" style={{ color: GOLD }} strokeWidth={2.25} />
          <p className="text-[8px] lg:text-[9px] font-black tracking-wider mt-1" style={{ color: GOLD }}>
            {center.titleEn}
          </p>
          <p className="text-[10px] lg:text-[11px] font-black text-brand-blue">{center.titleAr}</p>
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
    <div className="presentation-slide flex flex-col gap-2 overflow-hidden !p-4 md:!p-6 lg:!p-8">
      {/* Header — match reference scale */}
      <header className="shrink-0 text-center space-y-1.5 pb-1">
        <h2 className="text-xl md:text-2xl lg:text-[1.75rem] font-black text-[#1a365d] tracking-tight leading-none">
          {titleEn}
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl font-black text-brand-blue leading-tight">{titleAr}</p>
        <div className="flex items-center justify-center gap-2 max-w-lg mx-auto pt-1">
          <div className="flex-1 h-[2px]" style={{ backgroundColor: GOLD }} />
          <div className="w-2 h-2 rotate-45 shrink-0" style={{ backgroundColor: GOLD }} />
          <div className="flex-1 h-[2px]" style={{ backgroundColor: GOLD }} />
        </div>
        <p className="text-[10px] md:text-xs lg:text-sm font-medium text-slate-500 max-w-3xl mx-auto leading-relaxed px-4">
          {subtitle}
        </p>
      </header>

      {/* Canvas: triangle + lists hugging vertices (reference layout) */}
      <div
        className="flex-1 min-h-[340px] lg:min-h-0 relative w-full max-w-6xl mx-auto"
        dir="ltr"
      >
        <TriangleDiagram visible={showDiagram} />

        {/* 1. Governance — upper right of triangle */}
        <div className="absolute top-[4%] right-[2%] lg:right-[4%] w-[34%] max-w-[240px] z-10">
          <PillarListRight pillar={gov} visible={showPillars} />
        </div>

        {/* 2. Revenue — lower left of triangle */}
        <div className="absolute bottom-[26%] left-[1%] lg:left-[3%] w-[34%] max-w-[240px] z-10">
          <PillarListLeft pillar={rev} visible={showPillars} />
        </div>

        {/* 3. Execution — lower right of triangle */}
        <div className="absolute bottom-[22%] right-[1%] lg:right-[2%] w-[34%] max-w-[250px] z-10">
          <PillarListRight pillar={exec} visible={showPillars} />
        </div>

        {/* Value creation */}
        <motion.div
          initial={false}
          animate={{ opacity: showValue ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-[11%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center ${
            showValue ? '' : 'pointer-events-none'
          }`}
          aria-hidden={!showValue}
        >
          <div className="w-[2px] h-4 mb-1" style={{ backgroundColor: GOLD }} />
          <div
            className="flex items-center gap-3 px-5 py-2.5 lg:py-3 rounded-lg border-2 bg-white shadow-md"
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

      {/* Outcome cards — white boxes like reference */}
      <motion.div
        initial={false}
        animate={{ opacity: showOutcomes ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`shrink-0 flex flex-wrap justify-center gap-2 lg:gap-3 pt-1 ${
          showOutcomes ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!showOutcomes}
      >
        {outcomes.map((outcome) => (
          <div
            key={outcome.ar}
            className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2.5 bg-white rounded-xl border border-slate-200/90 shadow-sm"
          >
            <TriIcon name={outcome.icon} className="w-4 h-4 text-teal-700 shrink-0" />
            <span className="text-[10px] lg:text-xs font-bold text-slate-700 whitespace-nowrap">
              {outcome.ar}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
