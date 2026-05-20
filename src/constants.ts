
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CONTENT = {
  slideDsRent: {
    titleEn: "Our Understanding of DS Rent",
    titleAr: "فهمنا الأولي لطبيعة أعمال دار المركبة",
    logoSrc: "/ds-rent-logo.png",
    logoAlt: "دار المركبة | DS Rent",
    services: [
      { label: "أفراد", labelEn: "Individuals", icon: "users" },
      { label: "شركات", labelEn: "Corporate", icon: "briefcase" },
      { label: "حكومي", labelEn: "Government", icon: "landmark" },
      { label: "أسطول", labelEn: "Fleet", icon: "car" },
      { label: "فروع", labelEn: "Branches", icon: "mapPin" },
      { label: "تشغيل", labelEn: "Operations", icon: "layers" }
    ],
    points: [
      "تأسست عام 2009",
      "أكثر من 3000 سيارة",
      "خدمات للأفراد والشركات والقطاع الحكومي",
      "تشغيل متعدد الفروع والخدمات",
      "خدمات تشغيلية وموسمية متنوعة",
      "نموذج أعمال يعتمد على إدارة وتشغيل أسطول متعدد الاستخدامات"
    ],
    footer:
      "هذا النوع من الشركات يعتمد بشكل كبير على وضوح الرؤية التشغيلية وسرعة التنفيذ وكفاءة إدارة العمليات المتعددة."
  },
  slideDiscovery: {
    titleEn: "Executive Discovery Framework",
    titleAr: "إطار الاكتشاف التنفيذي",
    examplesLabel: "أمثلة للإجابة",
    questions: [
      {
        number: "السؤال الأول",
        question: "كيف تصفون مرحلة الشركة اليوم؟",
        examples: ["توسع", "رفع كفاءة", "نمو", "تحسين ربحية", "تطوير تشغيلي"]
      },
      {
        number: "السؤال الثاني",
        question: "ما أكبر تحدٍ يؤثر اليوم على سرعة النمو أو كفاءة التشغيل؟",
        examples: ["الفروع", "التقارير", "الأصول", "السرعة", "التنسيق"]
      },
      {
        number: "السؤال الثالث",
        question: "هل تعكس النتائج الحالية حجم الإمكانيات الموجودة داخل الشركة؟",
        examples: ["الاستفادة من الأسطول", "الربحية", "التشغيل", "الفرص"]
      },
      {
        number: "السؤال الرابع",
        question: "أين ترون أكبر فرصة للتحسين اليوم؟",
        examples: ["الربحية", "الكفاءة", "التوسع", "Visibility", "الأداء"]
      }
    ]
  },
  hero: {
    title: "نقطة تحول | 90x90",
    tagline: "بين الإمكانات ... والنتائج",
    description: "برنامج تنفيذي لتفعيل الأداء والنمو Execution-Led Business Activation Framework",
    consultant: "م. رائد أبوعيسى",
    role: "مستشار الحوكمة التشغيلية و نمو الاعمال",
    subrole: "Operational Governance and Business Growth Consultant"
  },
  slideConcept: {
    title: "فكرة البرنامج نقطة تحوّل | 90x90",
    subtitle: "THE CONCEPT",
    minutes: {
      valueAr: "٩٠ دقيقة",
      valueEn: "90 MINUTES",
      descAr: "نشخص و نحدد الفجوة",
      descEn: "DIAGNOSE THE GAP"
    },
    days: {
      valueAr: "٩٠ يوماً",
      valueEn: "90 DAYS",
      descAr: "نفعلها إلى نتائج",
      descEn: "ACTIVATE RESULTS"
    }
  },
  slideTriangle: {
    titleEn: "The Transformation Triangle",
    titleAr: "مثلث التحول التنفيذي",
    subtitle:
      "القيمة الحقيقية (النتائج داخل الشركة) تظهر عندما تعمل الحوكمة التشغيلية والإيرادات والتنفيذ بتناغم.",
    center: {
      titleEn: "HIDDEN VALUE RECOVERY",
      titleAr: "استعادة القيمة الخفية"
    },
    valueCreation: {
      titleEn: "VALUE CREATION",
      titleAr: "خلق قيمة مستدامة"
    },
    pillars: [
      {
        id: "governance",
        number: "1",
        titleEn: "OPERATIONAL GOVERNANCE",
        titleAr: "الحوكمة التشغيلية",
        color: "#1a365d",
        vertexIcon: "landmark",
        align: "right" as const,
        items: [
          { ar: "الهيكل", icon: "network" },
          { ar: "الصلاحيات", icon: "users" },
          { ar: "التقارير", icon: "fileChart" },
          { ar: "الانضباط التشغيلي", icon: "shield" }
        ]
      },
      {
        id: "revenue",
        number: "2",
        titleEn: "REVENUE & COMMERCIAL PERFORMANCE",
        titleAr: "الإيرادات والأداء التجاري",
        color: "#0f766e",
        vertexIcon: "trendingUp",
        align: "left" as const,
        items: [
          { ar: "النمو", icon: "trendingUp" },
          { ar: "التسعير", icon: "tag" },
          { ar: "الاستفادة من الأصول", icon: "car" },
          { ar: "الربحية", icon: "coins" },
          { ar: "التحصيل وتحقيق الإيرادات", icon: "target" },
          { ar: "التحويل وزيادة الطلب", icon: "filter" }
        ]
      },
      {
        id: "execution",
        number: "3",
        titleEn: "EXECUTION & ACTIVATION",
        titleAr: "التنفيذ والتفعيل",
        color: "#1d4ed8",
        vertexIcon: "settings",
        align: "right" as const,
        items: [
          { ar: "التنفيذ", icon: "rocket" },
          { ar: "سرعة اتخاذ القرار", icon: "clock" },
          { ar: "المتابعة والمساءلة", icon: "userCheck" },
          { ar: "التوافق والمواءمة", icon: "link" },
          { ar: "تفعيل الخطط وتحقيق النتائج", icon: "target" }
        ]
      }
    ],
    outcomes: [
      { ar: "قيمة طويلة الأمد", icon: "gem" },
      { ar: "قرارات أسرع وأدق", icon: "gauge" },
      { ar: "كفاءة تشغيلية", icon: "target" },
      { ar: "ربحية أعلى", icon: "pieChart" },
      { ar: "نمو مستدام", icon: "lineChart" }
    ]
  },
  slide2: {
    title: "نمط كثير من الشركات اليوم",
    intro: "كثير من الشركات:",
    positives: [
      "ناجحة تجارياً",
      "فرص نمو حقيقية",
      "منتجات وخدمات قوية",
      "فرصاً داخلية غير مستغلة"
    ],
    challenge: "الإمكانيات داخل الشركة أكبر بكثير من النتائج",
    conflictTitle: "التحدي غالباً لا يكون في السوق، بل في:",
    gaps: [
      { title: "الرؤية التشغيلية", sub: "(Operational Visibility)" },
      { title: "الترابط بين الإدارات", sub: "(الجزر المنعزلة)" },
      { title: "وضوح الأولويات", sub: "" },
      { title: "الانضباط التنفيذي", sub: "(Execution Discipline)" }
    ]
  },
  slide3: {
    title: "كيف تم بناء نقطة تحول | 90×90؟",
    buildMethod: "تم بناء البرنامج من خلال:",
    items: [
      "خبرات داخل شركات عالمية",
      "خبرات تشغيلية و تجارية مباشرة",
      "العمل مع شركات متعددة",
      "تطبيقات عملية في الحوكمة التشغيلية",
      "تجارب فعلية في النمو والتشغيل والمبيعات"
    ],
    focus: [
      { title: "الحوكمة التشغيلية", eng: "(Operational Governance)" },
      { title: "تفعيل الإيرادات", eng: "(Revenue Activation)" },
      { title: "الانضباط التنفيذي", eng: "(Execution Discipline)" }
    ]
  },
  slide4: {
    title: "القطاعات التي يخدمها البرنامج",
    intro: "تم تصميم نقطة تحول | 90×90 ليكون قابلاً للتطبيق على:",
    sectors: [
      { name: "القطاع الصناعي", eng: "(Manufacturing)" },
      { name: "القطاع التجاري", eng: "(Trading & Distribution)" },
      { name: "قطاع التجزئة", eng: "(Retail)" },
      { name: "القطاع الخدمي", eng: "(Services)" },
      { name: "القطاع الزراعي", eng: "(Agriculture)" },
      { name: "القطاع الرقمي والتجارة الإلكترونية", eng: "(Digital & E-Commerce)" }
    ],
    frameworks: [
      { name: "نفس برنامج الجاهزية التشغيلية", eng: "(Operational Readiness Framework)" },
      { name: "و تخصيص تحليل الايرادات حسب طبيعة القطاع", eng: "(Industry-Based Business Lens™)" }
    ]
  },
  slideGap: {
    titleAr: "فجوة النمو",
    titleEn: "The Growth Gap",
    potential: {
      titleAr: "الإمكانيات",
      titleEn: "Potential",
      value: "%100"
    },
    gap: {
      label: "GAP",
      titleAr: "الفجوة",
      value: "%42"
    },
    actual: {
      titleAr: "النتائج الفعلية",
      titleEn: "Actual Results",
      value: "%58"
    },
    drivers: [
      "موارد غير مستغلة | Underutilized Resources",
      "إيرادات غير مفعلة | Inactive Revenue Streams",
      "ضعف في التنفيذ | Weak Execution"
    ]
  },
  slideTimeline: {
    title: "رحلة نقطة تحول",
    phases: [
      { 
        id: "01", 
        title: "التشخيص المبدئي", 
        eng: "Initial Assessment",
        duration: "حتى 90 دقيقة",
        color: "bg-blue-500"
      },
      { 
        id: "02", 
        title: "التشخيص المعمق", 
        eng: "Deep Dive Assessment",
        duration: "5 - 10 أيام داخل الشركة",
        color: "bg-indigo-500"
      },
      { 
        id: "03", 
        title: "التفعيل التنفيذي", 
        eng: "Activation Phase",
        duration: "90 يوم",
        color: "bg-orange-500"
      },
      { 
        id: "04", 
        title: "الشراكة التنفيذية", 
        eng: "Execution Partnership",
        duration: "9 أشهر",
        color: "bg-green-600"
      }
    ]
  },
  slide5: {
    title: "المرحلة الأولى — التشخيص المبدئي | (Initial Assessment)",
    subtitle: "أين تقف شركتكم اليوم؟",
    intro: "diagnostic score --- يحدد المسار الانسب لشركتك",
    items: [
      { title: "تقييم الجاهزية التشغيلية", eng: "(RAI™ Assessment)" },
      { title: "تحليل الايرادات حسب القطاع", eng: "(Industry-Based Revenue Diagnostic™)" },
      { title: "تحديد الفجوات الأولية", eng: "(Initial Gap Identification)" },
      { title: "بوابة القرار", eng: "(Decision Gate™)" }
    ],
    tracks: [
      { name: "مسار التأسيس (Foundation Track™)", desc: "للشركات التي تحتاج إلى بناء الأساس التشغيلي والإداري." },
      { name: "مسار التسارع (Acceleration Track™)", desc: "للشركات الجاهزة للنمو ولكن لديها اختناقات تشغيلية أو في الايرادات." },
      { name: "المسار المختلط (Hybrid Track™)", desc: "للشركات التي تحتاج إلى معالجة تشغيلية وفي الايرادات بالتوازي." }
    ]
  },
  slide6: {
    title: "المرحلة الثانية — التشخيص المعمق (Deep Dive Assessment)",
    intro: "ينقسم التشخيص المعمق إلى مسارين رئيسيين:",
    path1: {
      name: "أولاً — التحليل النوعي (Qualitative Assessment)",
      method: "جاهزية الحوكمة التشغيلية بمنهجية الاضلاع الاربعة (Operational Governance Readiness™ — Four Pillars Methodology™)",
      items: [
        { name: "1. الهيكل التنظيمي", eng: "(Organizational Structure)" },
        { name: "2. مصفوفة الصلاحيات", eng: "(Authority Matrix / DOA)" },
        { name: "3. التقارير المالية (الرقابة التشغيلية)", eng: "(Financial Reporting & Operational Control)" },
        { name: "4. السياسات والإجراءات والوصف الوظيفي ومؤشرات الأداء", eng: "(Policies, SOPs & KPIs)" }
      ]
    },
    path2: {
      name: "ثانياً — التحليل الكمي (Quantitative Assessment)",
      method: "تشخيص الايرادات بمنهجية العدسات حسب الصناعة (Revenue Diagnostics by Industry Business Lens™)",
      items: [
        { name: "عدسة قطاع التجزئة", eng: "Retail Business Lens™" },
        { name: "عدسة القطاع الخدمي", eng: "Services Business Lens™" },
        { name: "عدسة القطاع التجاري", eng: "Trading Business Lens™" },
        { name: "عدسة قطاع الصناعي", eng: "Manufacturing Business Lens™" },
        { name: "عدسة القطاع الرقمي", eng: "Digital & E-Commerce Business Lens™" }
      ]
    }
  },
  slide7: {
    title: "المخرجات الرئيسية للتشخيص المعمق (Deep Dive Outcomes)",
    outcomes: [
      { title: "أولاً: مستوى جاهزية الحوكمة التشغيلية", eng: "(Operational Governance Readiness Score™)", desc: "وهو قياس مستوى الجاهزية التشغيلية والإدارية الفعلية داخل الشركة." },
      { title: "ثانياً: تحليل الايرادات يتبعها تحديد القيمة المالية", eng: "(Quantified Value Gap™)", desc: "Value Gap = Achievable Business Potential - Current performance" }
    ]
  },
  slide8: {
    title: "مثال عملي من الواقع (Real Operational Insight)",
    context: "في إحدى الشركات: أظهرت نتائج الـ Initial Assessment انطباعاً مرتفعاً حول:",
    initialFeedback: ["الانضباط التشغيلي", "الهيكل الإداري", "مستوى الحوكمة", "وضوح العمليات"],
    deepDiveFound: "لكن بعد الـ: Deep Dive Assessment تم اكتشاف:",
    findings: ["فجوات تشغيلية وإدارية غير ظاهرة", "اختناقات في الرؤية والتقارير", "فرص في الايرادات غير مستغلة", "فجوة قيمة كبيرة داخل الشركة"],
    results: {
      title: "النتائج النهائية:",
      score: "Quantified Value Gap™",
      value: "أكثر من: 140M+ SAR",
      ratio: "بنسبة تقارب: %67"
    },
    conclusion: {
      title: "الاستنتاج:",
      text: "في كثير من الشركات، قد يعطي النجاح الحالي انطباعاً بأن الأمور مستقرة، بينما توجد داخل الشركة: فرص غير مستغلة، اختناقات تشغيلية، وقيمة في الايرادات مفقودة لا تظهر في التقييمات السطحية."
    }
  },
  slide9: {
    title: "المرحلة الثالثة — التفعيل التنفيذي خلال 90 يوم (Activation Phase – 90 Days)",
    basis: "يتم بناء مرحلة التفعيل التنفيذي بناءً على نتائج:",
    basisItems: [
      "التشخيص المعمق (Deep Dive Assessment)",
      "مستوى جاهزية الحوكمة التشغيلية (Operational Governance Readiness Score™)",
      "الفجوة القيمية القابلة للقياس (Quantified Value Gap™)",
      "وتحليل الـ Industry Business Lens™"
    ],
    actions: [
      "تفعيل الحوكمة التشغيلية (Governance Activation)",
      "تفعيل مبادرات الإيرادات (Revenue Activation Initiatives)",
      "بناء الإيقاع التشغيلي الصحيح (Operational Reporting Rhythm)",
      "المتابعة التنفيذية (Execution Follow-Up)"
    ],
    followUpItems: ["متابعة التنفيذ", "قياس التقدم", "دعم الإدارة التنفيذية", "والمساعدة في اتخاذ القرار"],
    outcomes: ["وضوح تشغيلي أعلى", "تسريع اتخاذ القرار", "تحسين أداء الايرادات", "رفع الانضباط التنفيذي", "تحسين الرؤية التشغيلية و التجارية", "تفعيل الفرص غير المستغلة داخل الشركة"]
  },
  slide10: {
    title: "المرحلة الرابعة - الشراكة التنفيذية (Execution Partnership)",
    duration: "مدة الشراكة: 9 أشهر",
    includes: ["متابعة الأداء", "دعم اتخاذ القرار", "زيارة أسبوعية", "تقارير شهرية", "متابعة التنفيذ", "دعم الإدارة التنفيذية"],
    goal: "الهدف من الشراكة:",
    goalSummary: "",
    goals: ["نتائج مستدامة", "انضباط تشغيلي مستمر", "رؤية تشغيلية و تجارية أوضح", "وتحسينات قابلة للقياس على مدار السنة"]
  },
  slide11: {
    title: "الخلاصة (Final Message)",
    tagline: "نقطة تحول | 90x90",
    statement: "ليس تقريراً... بل تنفيذ",
    pillars: [
      {
        arabic: "لا نقدّم استشارة... بل نحدّد الفجوة، نقيسها، ونفعّلها",
        english: "We don't deliver advice — we identify, measure and activate the gap"
      },
      {
        arabic: "القيمة موجودة داخل أعمالكم... ودورنا هو تفعيلها",
        english: "The value exists within your business — our role is to activate it"
      }
    ]
  },
  thanks: {
    title: "شكراً لكم",
    subtitle: "نتطلع للعمل معكم نحو تحقيق قصة تحول ناجحة استثنائية",
    contact: "م. رائد أبوعيسى",
    website: "rai-assessment.vercel.app"
  }
};
