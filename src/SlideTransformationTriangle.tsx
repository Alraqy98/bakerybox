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

function TriangleDiagram({ visible }: { visible: boolean }) {
  const { center, pillars } = CONTENT.slideTriangle;
  const gov = pillars[0];
  const rev = pillars[1];
  const exec = pillars[2];

  const top = { x: 200, y: 38 };
  const bl = { x: 58, y: 252 };
  const br = { x: 342, y: 252 };
  const mid = { x: 200, y: 168 };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35 }}
      className={`relative w-full aspect-[400/290] max-h-[min(40vh,360px)] ${visible ? '' : 'pointer-events-none'}`}
      aria-hidden={!visible}
    >
      <svg viewBox="0 0 400 290" className="w-full h-full" aria-hidden>
        <defs>
          <marker id="tri-gold-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={GOLD} />
          </marker>
        </defs>
        <line x1={top.x} y1={top.y} x2={bl.x} y2={bl.y} stroke={TEAL} strokeWidth="6" strokeLinecap="round" />
        <line x1={top.x} y1={top.y} x2={br.x} y2={br.y} stroke={ROYAL} strokeWidth="6" strokeLinecap="round" />
        <line x1={bl.x} y1={bl.y} x2={br.x} y2={br.y} stroke={NAVY} strokeWidth="6" strokeLinecap="round" />
        <line x1={top.x} y1={top.y + 24} x2={mid.x} y2={mid.y - 36} stroke={GOLD} strokeWidth="2" markerEnd="url(#tri-gold-arrow)" />
        <line x1={bl.x + 18} y1={bl.y - 14} x2={mid.x - 24} y2={mid.y + 22} stroke={GOLD} strokeWidth="2" markerEnd="url(#tri-gold-arrow)" />
        <line x1={br.x - 18} y1={br.y - 14} x2={mid.x + 24} y2={mid.y + 22} stroke={GOLD} strokeWidth="2" markerEnd="url(#tri-gold-arrow)" />
        <circle cx={top.x} cy={top.y} r="26" fill={gov.color} />
        <circle cx={bl.x} cy={bl.y} r="26" fill={rev.color} />
        <circle cx={br.x} cy={br.y} r="26" fill={exec.color} />
        <circle cx={mid.x} cy={mid.y} r="42" fill="white" stroke={GOLD} strokeWidth="3" />
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute text-white" style={{ top: '1%', left: '50%', transform: 'translateX(-50%)' }}>
          <TriIcon name={gov.vertexIcon} className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
        <div className="absolute text-white" style={{ bottom: '6%', left: '10%' }}>
          <TriIcon name={rev.vertexIcon} className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
        <div className="absolute text-white" style={{ bottom: '6%', right: '10%' }}>
          <TriIcon name={exec.vertexIcon} className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
        <div
          className="absolute flex flex-col items-center text-center"
          style={{ top: '52%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <DollarSign className="w-8 h-8 lg:w-9 lg:h-9" style={{ color: GOLD }} strokeWidth={2.25} />
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
        className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_minmax(260px,1.15fr)_1fr] gap-4 lg:gap-6 items-stretch"
        dir="ltr"
      >
        <div className="hidden lg:flex flex-col justify-center min-h-0 py-2">
          <PillarListLeft pillar={rev} visible={showPillars} />
        </div>

        <div className="flex flex-col items-center justify-center min-h-0 gap-2 py-1">
          <TriangleDiagram visible={showDiagram} />
          <motion.div
            initial={false}
            animate={{ opacity: showValue ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col items-center shrink-0 ${showValue ? '' : 'pointer-events-none'}`}
            aria-hidden={!showValue}
          >
            <div className="w-[2px] h-3 mb-1" style={{ backgroundColor: GOLD }} />
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
