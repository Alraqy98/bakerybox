export type TrackSituationId =
  | 'foundation'
  | 'acceleration'
  | 'revenue_activation'
  | 'governance_activation';

export interface AssessmentSessionResult {
  raiScore: number;
  revenueScore: number;
  trackId: TrackSituationId;
  trackTitle: string;
  trackDescription: string;
  companyName?: string;
  fullName?: string;
}

export const ASSESSMENT_STORAGE_KEY = 'car_rental_presentation_assessment';

/** Maps decision-gate track to slide5 card index (Foundation, Acceleration, Hybrid) */
export function trackIdToSlideIndex(trackId: TrackSituationId): number {
  switch (trackId) {
    case 'foundation':
      return 0;
    case 'acceleration':
      return 1;
    case 'revenue_activation':
    case 'governance_activation':
      return 2;
    default:
      return 0;
  }
}

export function getTrackDisplayNameAr(trackId: TrackSituationId): string {
  switch (trackId) {
    case 'foundation':
      return 'مسار التأسيس';
    case 'acceleration':
      return 'مسار التسارع';
    default:
      return 'المسار المختلط';
  }
}
