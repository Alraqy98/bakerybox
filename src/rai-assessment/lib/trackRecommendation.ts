export type TrackSituationId =
  | 'foundation'
  | 'acceleration'
  | 'revenue_activation'
  | 'governance_activation';

export interface TrackSituation {
  id: TrackSituationId;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

const GOVERNANCE_THRESHOLD = 70;
const COMMERCIAL_READINESS_THRESHOLD = 70;

export const getCompanySituation = (
  rai: number,
  rev: number,
  _sector: string | null = null
): TrackSituation => {
  if (rai >= GOVERNANCE_THRESHOLD && rev < COMMERCIAL_READINESS_THRESHOLD) {
    return {
      id: 'revenue_activation',
      title: 'Revenue Activation Track™️',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      desc: 'مرحلة تفعيل الإيرادات تعني أن التقييم الأولي يظهر استقراراً في البنية التشغيلية لشركتكم، لكن مع وجود فجوات في نموذج توليد الإيرادات.',
    };
  }
  if (rai >= GOVERNANCE_THRESHOLD && rev >= COMMERCIAL_READINESS_THRESHOLD) {
    return {
      id: 'acceleration',
      title: 'Acceleration Track™️',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      desc: 'مرحلة التسارع تشير إلى أداء أولي إيجابي وتوازن ملحوظ بين الكفاءة التشغيلية في شركتكم ونتائج الإيرادات.',
    };
  }
  if (rai < GOVERNANCE_THRESHOLD && rev < COMMERCIAL_READINESS_THRESHOLD) {
    return {
      id: 'foundation',
      title: 'Foundation Track™️',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      desc: 'مرحلة التأسيس تعني أن التقييم الأولي يوضح وجود تحديات أساسية في البنية التشغيلية ونموذج الإيرادات معاً في شركتكم.',
    };
  }
  return {
    id: 'governance_activation',
    title: 'Governance Activation Track™️',
    color: 'text-accent-orange',
    bg: 'bg-accent-orange/10',
    border: 'border-accent-orange/20',
    desc: 'مرحلة تفعيل الحوكمة تدل على أن الإيرادات جيدة، ولكن التقييم الأولي يظهر هشاشة في البنية التشغيلية التي قد تعيق التوسع في شركتكم.',
  };
};

export interface AssessmentSessionPayload {
  raiScore: number;
  revenueScore: number;
  trackId: TrackSituationId;
  trackTitle: string;
  trackDescription: string;
  companyName?: string;
  fullName?: string;
}

export function buildSessionPayload(
  raiScore: number,
  revenueScore: number,
  sector: string | null,
  userData?: { companyName?: string; fullName?: string } | null
): AssessmentSessionPayload {
  const situation = getCompanySituation(raiScore, revenueScore, sector);
  return {
    raiScore,
    revenueScore,
    trackId: situation.id,
    trackTitle: situation.title,
    trackDescription: situation.desc,
    companyName: userData?.companyName,
    fullName: userData?.fullName,
  };
}
