import type { TrackSituationId } from './types';

const THRESHOLD = 70;

function readinessLabel(score: number): string {
  if (score >= 80) return 'جاهزية مرتفعة';
  if (score >= THRESHOLD) return 'جاهزية جيدة';
  return 'جاهزية تحتاج تعزيز';
}

function axisPhrase(raiScore: number, revenueScore: number): string {
  const raiLabel = readinessLabel(raiScore);
  const revLabel = readinessLabel(revenueScore);
  return `درجة الجاهزية التشغيلية ${raiScore}% (${raiLabel}) ونموذج الإيرادات ${revenueScore}% (${revLabel})`;
}

/** Long personalized copy for the highlighted track card (TPD-style) */
export function getTrackInsight(
  trackId: TrackSituationId,
  raiScore: number,
  revenueScore: number
): string {
  const axes = axisPhrase(raiScore, revenueScore);

  switch (trackId) {
    case 'acceleration':
      return (
        `${axes} — كلاهما فوق عتبة ${THRESHOLD}% على المحورين. ` +
        `هذا لا يعني أن كل شيء مكتمل، بل أن الأساس التشغيلي والإيرادي موجود: أنتم في مسار التسارع — جاهزون للنمو مع اختناقات محددة يُحددها التشخيص المعمّق، ثم تُعالج تنفيذياً خلال 90 يوماً لتحويل الإمكانات إلى نتائج ملموسة في قطاع تأجير السيارات.`
      );
    case 'foundation':
      return (
        `${axes} — كلاهما تحت عتبة ${THRESHOLD}% على المحورين. ` +
        `مرحلة التأسيس تعني أن التقييم الأولي يوضح وجود تحديات أساسية في البنية التشغيلية ونموذج الإيرادات معاً في شركتكم: الأساس يحتاج إلى بناء قبل التسريع. يُنصح بالانتقال إلى التشخيص المعمّق لتحديد الأسباب الجذرية بدقة، ثم تفعيل مسار تنفيذي يعيد ضبط العمليات والإيرادات بالتوازي.`
      );
    case 'revenue_activation':
      return (
        `${axes} — الجاهزية التشغيلية فوق ${THRESHOLD}% بينما الإيرادات تحتها. ` +
        `المسار المختلط هنا يعني تفعيل نموذج الإيرادات بالتوازي مع استقرار التشغيل: البنية موجودة لكن توليد الإيرادات في تأجير السيارات يحتاج إعادة ضبط (تسعير، إشغال الأسطول، قنوات الحجز). التشخيص المعمّق يحدد مكامن الخلل قبل برنامج التفعيل التنفيذي.`
      );
    case 'governance_activation':
      return (
        `${axes} — الإيرادات فوق ${THRESHOLD}% بينما الجاهزية التشغيلية تحتها. ` +
        `المسار المختلط يعني معالجة الهشاشة التشغيلية والحوكمة دون إبطاء ما يعمل في الإيرادات: خطر التوسع قبل ضبط العمليات. يُوصى بالتشخيص المعمّق لربط مؤشرات التشغيل بالإيرادات، ثم خطة 90 يوماً لاستقرار التنفيذ والحوكمة.`
      );
    default:
      return '';
  }
}

/** One-line summary for the score badge in the slide header */
export function getTrackInsightShort(
  trackId: TrackSituationId,
  raiScore: number,
  revenueScore: number
): string {
  switch (trackId) {
    case 'acceleration':
      return `جاهزية تشغيلية ${raiScore}% وإيرادات ${revenueScore}% — فوق عتبة ${THRESHOLD}%: مسار التسارع هو الأنسب لشركتكم اليوم.`;
    case 'foundation':
      return `جاهزية تشغيلية ${raiScore}% وإيرادات ${revenueScore}% — تحت عتبة ${THRESHOLD}%: مسار التأسيس هو الأنسب لبناء الأساس أولاً.`;
    case 'revenue_activation':
      return `تشغيل ${raiScore}% فوق العتبة وإيرادات ${revenueScore}% تحتها — المسار المختلط (تفعيل الإيرادات مع استقرار التشغيل).`;
    case 'governance_activation':
      return `إيرادات ${revenueScore}% فوق العتبة وتشغيل ${raiScore}% تحتها — المسار المختلط (تعزيز الحوكمة مع الحفاظ على الإيرادات).`;
    default:
      return '';
  }
}
