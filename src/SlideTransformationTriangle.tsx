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

function TriangleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Target;
  return <Icon className={className} strokeWidth={2} />;
}

function PillarBlock({
  pillar,
  visible,
  align,
}: {
  pillar: Pillar;
  visible: boolean;
  align: 'left' | 'right';
}) {
  const isRight = align === 'right';

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.28 }}
      className={`flex flex-col gap-1 min-w-0 ${isRight ? 'items-start text-left' : 'items-end text-right'} ${
        visible ? '' : 'pointer-events-none'
      }`}
      aria-hidden={!visible}
      dir="ltr"
    >
      <p className="text-[8px] lg:text-[9px] font-black tracking-wide leading-tight" style={{ color: pillar.color }}>
        {pillar.number}. {pillar.titleEn}
      </p>
      <p className="text-[10px] lg:text-xs font-black leading-tight" style={{ color: pillar.color }}>
        {pillar.titleAr}
      </p>
      <ul className={`mt-1 space-y-1.5 ${isRight ? 'items-start' : 'items-end'}`}>
        {pillar.items.map((item) => (
          <li
            key={item.ar}
            className={`flex items-center gap-2 ${isRight ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <span
              className="w-7 h-7 lg:w-8 lg:h-8 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${pillar.color}14`, color: pillar.color }}
            >
              <TriangleIcon name={item.icon} className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </span>
            <span className="text-[10px] lg:text-[11px] font-bold text-slate-600 leading-tight max-w-[140px]">
              {item.ar}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function TransformationTriangleGraphic({ visible }: { visible: boolean }) {
  const { center, pillars } = CONTENT.slideTriangle;
  const gov = pillars[0];
  const rev = pillars[1];
  const exec = pillars[2];

  const top = { x: 200, y: 48 };
  const left = { x: 68, y: 292 };
  const right = { x: 332, y: 292 };
  const centerPt = { x: 200, y: 198 };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`absolute inset-0 flex items-center justify-center ${visible ? '' : 'pointer-events-none'}`}
      aria-hidden={!visible}
      dir="ltr"
    >
      <div className="relative w-[88%] max-w-[380px] aspect-[400/340]">
        <svg viewBox="0 0 400 340" className="w-full h-full overflow-visible" aria-hidden>
          <defs>
            <marker id="tri-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill={GOLD} />
            </marker>
          </defs>
          {/* Colored triangle sides (like reference) */}
          <line x1={top.x} y1={top.y} x2={left.x} y2={left.y} stroke={TEAL} strokeWidth="5" strokeLinecap="round" />
          <line x1={top.x} y1={top.y} x2={right.x} y2={right.y} stroke={ROYAL} strokeWidth="5" strokeLinecap="round" />
          <line x1={left.x} y1={left.y} x2={right.x} y2={right.y} stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
          {/* Gold arrows to center */}
          <line
            x1={top.x}
            y1={top.y + 28}
            x2={centerPt.x}
            y2={centerPt.y - 40}
            stroke={GOLD}
            strokeWidth="2"
            markerEnd="url(#tri-arrow)"
          />
          <line
            x1={left.x + 22}
            y1={left.y - 18}
            x2={centerPt.x - 28}
            y2={centerPt.y + 28}
            stroke={GOLD}
            strokeWidth="2"
            markerEnd="url(#tri-arrow)"
          />
          <line
            x1={right.x - 22}
            y1={right.y - 18}
            x2={centerPt.x + 28}
            y2={centerPt.y + 28}
            stroke={GOLD}
            strokeWidth="2"
            markerEnd="url(#tri-arrow)"
          />
          <circle cx={top.x} cy={top.y} r="30" fill={gov.color} />
          <circle cx={left.x} cy={left.y} r="30" fill={rev.color} />
          <circle cx={right.x} cy={right.y} r="30" fill={exec.color} />
          <circle cx={centerPt.x} cy={centerPt.y} r="48" fill="white" stroke={GOLD} strokeWidth="3" />
        </svg>

        <div
          className="absolute flex items-center justify-center text-white"
          style={{ top: '5%', left: '50%', transform: 'translate(-50%, -50%)', width: 48, height: 48 }}
        >
          <TriangleIcon name={gov.vertexIcon} className="w-6 h-6" />
        </div>
        <div className="absolute flex items-center justify-center text-white" style={{ bottom: '8%', left: '11%' }}>
          <TriangleIcon name={rev.vertexIcon} className="w-6 h-6" />
        </div>
        <div className="absolute flex items-center justify-center text-white" style={{ bottom: '8%', right: '11%' }}>
          <TriangleIcon name={exec.vertexIcon} className="w-6 h-6" />
        </div>

        <div
          className="absolute flex flex-col items-center justify-center text-center"
          style={{ top: '52%', left: '50%', transform: 'translate(-50%, -50%)', width: '36%' }}
        >
          <DollarSign className="w-8 h-8 lg:w-9 lg:h-9 mb-0.5" style={{ color: GOLD }} strokeWidth={2.25} />
          <p className="text-[7px] lg:text-[8px] font-black tracking-wider leading-tight" style={{ color: GOLD }}>
            {center.titleEn}
          </p>
          <p className="text-[9px] lg:text-[10px] font-black text-brand-blue leading-tight">{center.titleAr}</p>
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
    <div className="presentation-slide flex flex-col gap-2 lg:gap-3 overflow-hidden !p-3 md:!p-5 lg:!p-6">
      <div className="shrink-0 text-center space-y-1">
        <h2 className="text-base md:text-lg lg:text-xl font-black text-[#1a365d] tracking-tight">{titleEn}</h2>
        <p className="text-sm md:text-base lg:text-lg font-black text-brand-blue italic">{titleAr}</p>
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto px-6">
          <div className="flex-1 h-px" style={{ backgroundColor: GOLD }} />
          <div className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: GOLD }} />
          <div className="flex-1 h-px" style={{ backgroundColor: GOLD }} />
        </div>
        <p className="text-[9px] md:text-[10px] lg:text-xs font-semibold text-slate-500 max-w-2xl mx-auto leading-relaxed px-2">
          {subtitle}
        </p>
      </div>

      {/* Diagram canvas — LTR layout matches reference image */}
      <div className="flex-1 min-h-[300px] lg:min-h-0 relative" dir="ltr">
        <TransformationTriangleGraphic visible={showDiagram} />

        {/* 1. Governance — top right of triangle */}
        <div className="absolute top-[2%] right-[3%] w-[28%] max-w-[200px] z-10">
          <PillarBlock pillar={gov} visible={showPillars} align="left" />
        </div>

        {/* 2. Revenue — left of bottom-left vertex */}
        <div className="absolute bottom-[22%] left-[1%] w-[30%] max-w-[210px] z-10">
          <PillarBlock pillar={rev} visible={showPillars} align="right" />
        </div>

        {/* 3. Execution — right of bottom-right vertex */}
        <div className="absolute bottom-[22%] right-[1%] w-[30%] max-w-[210px] z-10">
          <PillarBlock pillar={exec} visible={showPillars} align="left" />
        </div>

        {/* Value creation — below triangle center */}
        <motion.div
          initial={false}
          animate={{ opacity: showValue ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          className={`absolute bottom-[4%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center ${
            showValue ? '' : 'pointer-events-none'
          }`}
          aria-hidden={!showValue}
        >
          <div className="w-px h-3 mb-0.5" style={{ backgroundColor: GOLD }} />
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-md border-2 bg-white shadow-sm whitespace-nowrap"
            style={{ borderColor: GOLD }}
          >
            <BarChart3 className="w-4 h-4 shrink-0" style={{ color: GOLD }} strokeWidth={2.25} />
            <div className="text-center">
              <p className="text-[8px] lg:text-[9px] font-black tracking-wider" style={{ color: GOLD }}>
                {valueCreation.titleEn}
              </p>
              <p className="text-[10px] lg:text-xs font-black text-brand-blue">{valueCreation.titleAr}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer — separate pills like reference */}
      <motion.div
        initial={false}
        animate={{ opacity: showOutcomes ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className={`shrink-0 flex flex-wrap justify-center gap-2 lg:gap-3 px-1 ${
          showOutcomes ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!showOutcomes}
      >
        {outcomes.map((outcome) => (
          <div
            key={outcome.ar}
            className="flex items-center gap-1.5 px-3 py-1.5 lg:py-2 bg-slate-100/95 rounded-full border border-slate-200/80"
          >
            <TriangleIcon name={outcome.icon} className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-[9px] lg:text-[10px] font-bold text-slate-600 whitespace-nowrap">
              {outcome.ar}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
