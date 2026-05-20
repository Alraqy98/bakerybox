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
}: {
  pillar: Pillar;
  visible: boolean;
}) {
  const alignRight = pillar.align === 'right';

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col gap-1.5 min-w-0 ${alignRight ? 'items-end text-right' : 'items-start text-left'} ${
        visible ? '' : 'pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className={`flex items-center gap-2 ${alignRight ? 'flex-row' : 'flex-row-reverse'}`}>
        <span
          className="text-[9px] lg:text-[10px] font-black tracking-wider"
          style={{ color: pillar.color }}
        >
          {pillar.number}. {pillar.titleEn}
        </span>
      </div>
      <p className="text-xs lg:text-sm font-black leading-tight" style={{ color: pillar.color }}>
        {pillar.titleAr}
      </p>
      <ul className={`mt-1 space-y-1 ${alignRight ? 'items-end' : 'items-start'}`}>
        {pillar.items.map((item) => (
          <li
            key={item.ar}
            className={`flex items-center gap-2 ${alignRight ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <span
              className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${pillar.color}18`, color: pillar.color }}
            >
              <TriangleIcon name={item.icon} className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </span>
            <span className="text-[10px] lg:text-xs font-bold text-slate-600 leading-tight">
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

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35 }}
      className={`relative w-full max-w-[340px] lg:max-w-[400px] mx-auto aspect-[10/9] ${visible ? '' : 'pointer-events-none'}`}
      aria-hidden={!visible}
    >
      <svg viewBox="0 0 400 360" className="w-full h-full" aria-hidden>
        {/* Triangle frame */}
        <polygon
          points="200,52 72,298 328,298"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        {/* Gold arrows toward center */}
        <line x1="200" y1="95" x2="200" y2="175" stroke={GOLD} strokeWidth="2" markerEnd="url(#arrowGold)" />
        <line x1="115" y1="265" x2="175" y2="210" stroke={GOLD} strokeWidth="2" markerEnd="url(#arrowGold)" />
        <line x1="285" y1="265" x2="225" y2="210" stroke={GOLD} strokeWidth="2" markerEnd="url(#arrowGold)" />
        <defs>
          <marker id="arrowGold" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={GOLD} />
          </marker>
        </defs>
        {/* Vertex circles */}
        <circle cx="200" cy="52" r="32" fill={gov.color} />
        <circle cx="72" cy="298" r="32" fill={rev.color} />
        <circle cx="328" cy="298" r="32" fill={exec.color} />
        {/* Center circle */}
        <circle cx="200" cy="200" r="52" fill="white" stroke={GOLD} strokeWidth="3" />
      </svg>

      {/* Vertex icons (HTML overlay for lucide) */}
      <div
        className="absolute w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white"
        style={{ top: '2%', left: '50%', transform: 'translateX(-50%)' }}
      >
        <TriangleIcon name={gov.vertexIcon} className="w-5 h-5 lg:w-6 lg:h-6" />
      </div>
      <div
        className="absolute w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white"
        style={{ bottom: '10%', left: '8%' }}
      >
        <TriangleIcon name={rev.vertexIcon} className="w-5 h-5 lg:w-6 lg:h-6" />
      </div>
      <div
        className="absolute w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white"
        style={{ bottom: '10%', right: '8%' }}
      >
        <TriangleIcon name={exec.vertexIcon} className="w-5 h-5 lg:w-6 lg:h-6" />
      </div>

      {/* Center label */}
      <div
        className="absolute flex flex-col items-center justify-center text-center px-2"
        style={{ top: '46%', left: '50%', transform: 'translate(-50%, -50%)', width: '38%' }}
      >
        <DollarSign className="w-7 h-7 lg:w-9 lg:h-9 mb-0.5" style={{ color: GOLD }} strokeWidth={2.25} />
        <p className="text-[7px] lg:text-[8px] font-black tracking-wider leading-tight" style={{ color: GOLD }}>
          {center.titleEn}
        </p>
        <p className="text-[9px] lg:text-[10px] font-black text-brand-blue leading-tight mt-0.5">
          {center.titleAr}
        </p>
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
      {/* Header */}
      <div className="shrink-0 text-center space-y-1.5">
        <h2 className="text-lg md:text-xl lg:text-2xl font-black text-[#1a365d] tracking-tight">
          {titleEn}
        </h2>
        <p className="text-base md:text-lg lg:text-xl font-black text-brand-blue italic">{titleAr}</p>
        <div className="flex items-center justify-center gap-2 max-w-xl mx-auto px-4">
          <div className="flex-1 h-px" style={{ backgroundColor: GOLD }} />
          <div className="w-2 h-2 rotate-45 shrink-0" style={{ backgroundColor: GOLD }} />
          <div className="flex-1 h-px" style={{ backgroundColor: GOLD }} />
        </div>
        <p className="text-[10px] md:text-xs lg:text-sm font-semibold text-slate-500 max-w-3xl mx-auto leading-relaxed px-2">
          {subtitle}
        </p>
      </div>

      {/* Main diagram + pillars */}
      <div className="flex-1 min-h-0 flex flex-col gap-1 lg:gap-2">
        {/* Governance — top */}
        <div className="shrink-0 flex justify-center lg:justify-end lg:pr-[8%] max-w-5xl mx-auto w-full">
          <div className="w-full max-w-xs lg:max-w-sm">
            <PillarBlock pillar={gov} visible={showPillars} />
          </div>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-[1fr_auto_1fr] gap-1 lg:gap-3 items-center">
          <PillarBlock pillar={rev} visible={showPillars} />
          <TransformationTriangleGraphic visible={showDiagram} />
          <PillarBlock pillar={exec} visible={showPillars} />
        </div>

        {/* Value creation */}
        <motion.div
          initial={false}
          animate={{ opacity: showValue ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`shrink-0 flex flex-col items-center ${showValue ? '' : 'pointer-events-none'}`}
          aria-hidden={!showValue}
        >
          <div className="w-px h-4" style={{ backgroundColor: GOLD }} />
          <div
            className="flex items-center gap-3 px-5 py-2.5 lg:py-3 rounded-lg border-2 bg-white shadow-sm"
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

      {/* Footer outcomes */}
      <motion.div
        initial={false}
        animate={{ opacity: showOutcomes ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`shrink-0 bg-slate-100/90 rounded-xl lg:rounded-2xl px-3 py-2.5 lg:py-3 ${
          showOutcomes ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!showOutcomes}
      >
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 lg:gap-x-8">
          {outcomes.map((outcome) => (
            <div key={outcome.ar} className="flex items-center gap-1.5">
              <TriangleIcon name={outcome.icon} className="w-4 h-4 text-brand-blue" />
              <span className="text-[10px] lg:text-xs font-bold text-slate-600 whitespace-nowrap">
                {outcome.ar}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
