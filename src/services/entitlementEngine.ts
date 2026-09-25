import type { PlanTier, PlanEntitlements, BanaPeleTierDetails } from '../types';

export const BANAPELE_PRICING_TIERS: BanaPeleTierDetails[] = [
  {
    id: 'FREE',
    name: '1. Ubuntu Free',
    priceZAR: 0,
    billingPeriod: 'forever',
    targetAudience: 'Organic viral hook & WhatsApp sharing',
    tagline: 'Always free for every South African family',
    economicJustification: 'Township adoption spreads through WhatsApp groups, church networks, and school gates. A completely functional, culturally resonant free tier builds immediate trust and removes the barrier to entry.',
    inclusions: [
      'Full access to Daily Encouragement 5-minute activity card (with browser TTS)',
      '2 personalized digital stories per month (default system voices)',
      '1 low-resolution, watermarked printable activity sample',
      'Voice cloning studio trial with 30-second Golden Teaser (Chapter 1 preview)'
    ]
  },
  {
    id: 'PARENT_PRO',
    name: '2. Parent Pro',
    priceZAR: 39,
    billingPeriod: 'month',
    weeklyMicroBillingZAR: 12,
    annualBillingZAR: 349,
    targetAudience: 'Working parents, shift workers, Gogos',
    tagline: 'Kasi Hero Pass — Cheaper than Showmax Mobile (R45)',
    badge: 'Zero-Guilt Price',
    economicJustification: 'R39 is roughly the price of a 2L milk or a loaf of Albany bread with a cold drink. Can easily be paid out of a weekly grocery buffer. Weekly R12 micro-billing fits weekly wage earners.',
    inclusions: [
      'Unlimited Bedtime Audiobooks with cloned Fish Audio voice',
      '2 Voice Clones (e.g. Mother + Gogo / Father)',
      'Bedtime Dark Mode (anti-blue light with glowing stars to protect melatonin)',
      'Direct-to-WhatsApp Voice Notes for late night-shift workers (Chris Hani Baragwanath nurses)',
      'High-Resolution Physical Printables (clean, ink-saver A4 sheets without watermarks)'
    ]
  },
  {
    id: 'CRECHE_STARTER',
    name: '3. Creche Starter',
    priceZAR: 149,
    billingPeriod: 'month',
    annualBillingZAR: 1450,
    targetAudience: 'Home-based creches & playgroups (up to 25 kids)',
    tagline: 'Inkulisa Baseline — Save on expensive exercise workbooks',
    badge: 'Under R6 / child',
    economicJustification: 'R149 represents less than half of one child’s monthly tuition (R350–R450). Replaces pre-printed workbooks that cost R150+ per child/year, saving thousands annually.',
    inclusions: [
      'Up to 25 enrolled learners capacity',
      '1 Teacher Voice Clone (classroom instructions & resting-time stories)',
      'Unlimited classroom physical activity printable mats',
      'Basic NCF / ELDA early learning milestone tracking',
      'Low-ink black-and-white templates (uses 80% less black toner)'
    ]
  },
  {
    id: 'CRECHE_CHAMPION',
    name: '4. Creche Champion',
    priceZAR: 289,
    billingPeriod: 'month',
    annualBillingZAR: 2800,
    targetAudience: 'Established community ECD centres (up to 60 kids)',
    tagline: 'DBE Compliance & Subsidy Protection Engine',
    badge: 'Protects R24/day DBE Subsidy',
    economicJustification: 'At 40 kids paying R500/month, R289 represents less than 1.5% of operating income. Automates official Portfolio of Evidence (PoE) required for the R24/day/child DBE subsidy.',
    inclusions: [
      'Up to 60 learners capacity across all classes',
      '3 Teacher Voice Clones (Baby class, Toddler class, Grade R)',
      'Auto-Generated DBE Portfolio of Evidence (PoE) with creche stamp',
      'Official ELDA assessment rubrics for department inspection audits',
      'Weekly WhatsApp Parent Broadcaster with PDF learning summaries',
      'Bulk ink-saving print queues'
    ]
  }
];

export const PLAN_CONFIGS: Record<PlanTier, PlanEntitlements> = {
  FREE: {
    maxChildren: 1,
    maxClasses: 1,
    maxLearners: 5,
    monthlyWorksheetGenerations: 3,
    canDownloadPDF: false,
    canPrint: false,
    canGenerateWeeklyPacks: false,
    canAccessFullStoryLibrary: false,
    canAccessBilingualCurriculum: false,
    hasClassroomManagement: false,
    priceMonthlyZAR: 0,
  },
  PARENT_PRO: {
    maxChildren: 5,
    maxClasses: 0,
    maxLearners: 0,
    monthlyWorksheetGenerations: 50,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: false,
    priceMonthlyZAR: 39,
  },
  CRECHE_STARTER: {
    maxChildren: 25,
    maxClasses: 2,
    maxLearners: 25,
    monthlyWorksheetGenerations: 250,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: true,
    priceMonthlyZAR: 149,
  },
  CRECHE_CHAMPION: {
    maxChildren: 60,
    maxClasses: 5,
    maxLearners: 60,
    monthlyWorksheetGenerations: 600,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: true,
    priceMonthlyZAR: 289,
  },
  // Legacy Aliases for seamless backward compatibility
  FAMILY: {
    maxChildren: 5,
    maxClasses: 0,
    maxLearners: 0,
    monthlyWorksheetGenerations: 50,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: false,
    priceMonthlyZAR: 39, // Normalized to Parent Pro
  },
  ECD: {
    maxChildren: 60,
    maxClasses: 5,
    maxLearners: 60,
    monthlyWorksheetGenerations: 600,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: true,
    priceMonthlyZAR: 289, // Normalized to Creche Champion
  },
  CENTRE: {
    maxChildren: 60,
    maxClasses: 5,
    maxLearners: 60,
    monthlyWorksheetGenerations: 600,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: true,
    priceMonthlyZAR: 289,
  },
  ENTERPRISE: {
    maxChildren: 9999,
    maxClasses: 999,
    maxLearners: 9999,
    monthlyWorksheetGenerations: 9999,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: true,
    priceMonthlyZAR: 599,
  },
};

export class EntitlementService {
  static getEntitlements(plan: PlanTier): PlanEntitlements {
    return PLAN_CONFIGS[plan] || PLAN_CONFIGS.FREE;
  }

  static canDownloadPDF(plan: PlanTier): boolean {
    return this.getEntitlements(plan).canDownloadPDF;
  }

  static canPrint(plan: PlanTier): boolean {
    return this.getEntitlements(plan).canPrint;
  }

  static canGenerateWeeklyPack(plan: PlanTier): boolean {
    return this.getEntitlements(plan).canGenerateWeeklyPacks;
  }

  static canCreateChild(plan: PlanTier, currentCount: number): boolean {
    return currentCount < this.getEntitlements(plan).maxChildren;
  }

  static canCreateClass(plan: PlanTier, currentCount: number): boolean {
    return currentCount < this.getEntitlements(plan).maxClasses;
  }

  static canGenerateWorksheet(plan: PlanTier, currentUsageThisMonth: number): boolean {
    return currentUsageThisMonth < this.getEntitlements(plan).monthlyWorksheetGenerations;
  }

  /**
   * Generates a high-value descriptive upgrade moment grounded in Soweto economics:
   */
  static getUpgradeOffer(feature: 'pdf_download' | 'weekly_pack' | 'multi_child' | 'classroom_pack' | 'story_library' | 'screen_free_printables'): {
    title: string;
    subtitle: string;
    highlights: string[];
    recommendedPlan: PlanTier;
    priceFormatted: string;
    taglineBadge?: string;
  } {
    switch (feature) {
      case 'screen_free_printables':
        return {
          title: 'Save Ink, Protect Eyesight & Learn Offline 🌱',
          subtitle: 'Pure high-contrast black-and-white printables with your child’s name, pre-writing tracing, and hands-on shape puzzles.',
          taglineBadge: 'Parent Pro (R39 / mo or R12 / wk)',
          highlights: [
            'Zero watermarks & crisp vector lines for crystal-clear A4 printing',
            'Ink-Saver Tech: pure outline black art uses 80% less printer toner',
            'Personalized with your child’s name on every coloring & tracing sheet',
            'One-tap "Send PDF to WhatsApp" for easy printing at local internet cafes or spazas (R2/page)',
            'Weekly micro-billing (R12/week) for weekly wage earners'
          ],
          recommendedPlan: 'PARENT_PRO',
          priceFormatted: 'R39 / month'
        };
      case 'weekly_pack':
        return {
          title: 'Your 5-Day Learning Pack is Ready 🌱',
          subtitle: 'A full week of planned South African early learning prepared for your child or classroom.',
          highlights: [
            '5 structured daily learning themes (Mon–Fri)',
            '8 printable activities with stroke guides & local illustrations',
            'Full bilingual support: English + isiZulu',
            'Step-by-step teacher & parent instructions'
          ],
          recommendedPlan: 'PARENT_PRO',
          priceFormatted: 'R39 / month'
        };
      case 'classroom_pack':
        return {
          title: 'Protect Your R24/Day DBE Subsidy with Automated PoE 🏫',
          subtitle: 'Creche Champion automates inspection-ready Portfolios of Evidence and classroom printables.',
          taglineBadge: 'Creche Champion (R289 / mo)',
          highlights: [
            'Printable classroom sets for up to 60 learners',
            'Auto-generated DBE Portfolio of Evidence (PoE) with creche stamp',
            '3 Teacher Voice Clones for classroom rest-time stories',
            'Weekly WhatsApp Parent Broadcaster with PDF summaries',
            'Replaces generic exercise books (saves R150+/child/year)'
          ],
          recommendedPlan: 'CRECHE_CHAMPION',
          priceFormatted: 'R289 / month'
        };
      case 'pdf_download':
      default:
        return {
          title: 'Download & Print High-Resolution A4 Pack 🌱',
          subtitle: 'Clean, printer-ink-friendly A4 worksheets with answer keys and teacher notes.',
          taglineBadge: 'Parent Pro (R39 / mo)',
          highlights: [
            'Printable vector worksheets with South African vocabulary',
            'No watermarks, high-contrast tracing guidelines',
            'Personalised skill progressions for your child',
            'Keep offline learning packets ready at home or school'
          ],
          recommendedPlan: 'PARENT_PRO',
          priceFormatted: 'R39 / month'
        };
    }
  }
}
