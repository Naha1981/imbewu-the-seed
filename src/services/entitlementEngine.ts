import type { PlanTier, PlanEntitlements } from '../types';

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
  FAMILY: {
    maxChildren: 5,
    maxClasses: 0,
    maxLearners: 0,
    monthlyWorksheetGenerations: 35,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: false,
    priceMonthlyZAR: 79,
  },
  ECD: {
    maxChildren: 10,
    maxClasses: 5,
    maxLearners: 50,
    monthlyWorksheetGenerations: 150,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: true,
    priceMonthlyZAR: 399,
  },
  CENTRE: {
    maxChildren: 50,
    maxClasses: 20,
    maxLearners: 250,
    monthlyWorksheetGenerations: 500,
    canDownloadPDF: true,
    canPrint: true,
    canGenerateWeeklyPacks: true,
    canAccessFullStoryLibrary: true,
    canAccessBilingualCurriculum: true,
    hasClassroomManagement: true,
    priceMonthlyZAR: 799,
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
    priceMonthlyZAR: 2499,
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
   * Generates a high-value descriptive upgrade moment as mandated by Section 11:
   * "Do not simply show 'Upgrade to continue'. Show the value the user was about to receive."
   */
  static getUpgradeOffer(feature: 'pdf_download' | 'weekly_pack' | 'multi_child' | 'classroom_pack' | 'story_library'): {
    title: string;
    subtitle: string;
    highlights: string[];
    recommendedPlan: PlanTier;
    priceFormatted: string;
  } {
    switch (feature) {
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
          recommendedPlan: 'FAMILY',
          priceFormatted: 'R79 / month'
        };
      case 'classroom_pack':
        return {
          title: 'Unlock Full ECD Classroom Pack 🏫',
          subtitle: 'Designed specifically for South African creches and early learning centres.',
          highlights: [
            'Printable classroom sets for up to 50 learners',
            'Weekly CAPS-aligned learning outcomes',
            'Class progress tracking & learner observation log',
            'Google Calendar schedule synchronization'
          ],
          recommendedPlan: 'ECD',
          priceFormatted: 'R399 / month'
        };
      case 'pdf_download':
      default:
        return {
          title: 'Download & Print High-Resolution A4 Pack 🌱',
          subtitle: 'Clean, printer-ink-friendly A4 worksheets with answer keys and teacher notes.',
          highlights: [
            'Printable vector worksheets with South African vocabulary',
            'No watermarks, high-contrast tracing guidelines',
            'Personalised skill progressions for your child',
            'Keep offline learning packets ready at home or school'
          ],
          recommendedPlan: 'FAMILY',
          priceFormatted: 'R79 / month'
        };
    }
  }
}
