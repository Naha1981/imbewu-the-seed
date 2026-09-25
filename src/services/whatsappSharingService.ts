/**
 * WhatsApp Sharing Service for Imbewu & BanaPele AI
 * Facilitates teachers and ECD educators sharing personalized, screen-free printable activity kits
 * with parents and parent class WhatsApp groups via deep links.
 */

export type PrintableKitType = 
  | 'coloring_sheet' 
  | 'tracing_mat' 
  | 'shape_puzzle' 
  | 'complete_weekly_pack';

export interface WhatsAppShareOptions {
  teacherName?: string;
  centreName?: string;
  childName: string;
  parentPhone?: string;
  parentName?: string;
  kitType: PrintableKitType;
  kitTitle: string;
  theme: string;
  ageGroup: string;
  eldaFocus?: string;
  language?: 'en' | 'zu' | 'bilingual';
  teacherNote?: string;
  customBaseUrl?: string;
}

export interface BroadcastGroupShareOptions {
  teacherName: string;
  centreName: string;
  className: string;
  theme: string;
  ageGroup: string;
  kitCount: number;
  printTip?: string;
  customBaseUrl?: string;
}

export class WhatsAppSharingService {
  /**
   * Generates a web deep link directly opening the printable activity generator in Imbewu
   */
  static generateDeepLink(options: {
    childName?: string;
    kitType?: PrintableKitType;
    theme?: string;
    ageGroup?: string;
    customBaseUrl?: string;
  }): string {
    const origin = options.customBaseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://imbewu.co.za');
    const params = new URLSearchParams();
    
    if (options.childName) params.set('child', options.childName);
    if (options.kitType) params.set('kit', options.kitType);
    if (options.theme) params.set('theme', options.theme);
    if (options.ageGroup) params.set('age', options.ageGroup);
    params.set('mode', 'printable');

    return `${origin}/#printable-preview?${params.toString()}`;
  }

  /**
   * Formats a direct, warm, localized message tailored for an individual parent contact
   */
  static formatParentActivityKitMessage(opts: WhatsAppShareOptions): string {
    const teacherName = opts.teacherName || 'Teacher Thandi';
    const centreName = opts.centreName || 'Little Seeds ECD';
    const childName = opts.childName || 'Little Learner';
    const deepLink = WhatsAppSharingService.generateDeepLink({
      childName,
      kitType: opts.kitType,
      theme: opts.theme,
      ageGroup: opts.ageGroup,
      customBaseUrl: opts.customBaseUrl
    });

    const kitDescription = WhatsAppSharingService.getKitBreakdown(opts.kitType, childName);
    const greeting = opts.parentName ? `Sawubona / Dumela ${opts.parentName}` : `Sawubona / Dumela Parent`;

    return `🌱 *IMBEWU ECD · SCREEN-FREE ACTIVITY KIT*
🏫 *From:* ${teacherName} (${centreName})
👶 *Learner:* ${childName} (${opts.ageGroup})
📚 *Theme:* ${opts.theme}
🎯 *NCF / ELDA Focus:* ${opts.eldaFocus || 'ELDA 4 (Mathematics) & ELDA 5 (Creativity & Fine Motor)'}

${greeting}! 👋
Here is a personalized screen-free printable activity kit prepared specially for *${childName}*. 

It is designed to give your child hands-on offline practice, protect developing eyesight from mobile screens, and strengthen pencil grip.

✂️ *Included in this Printable Kit:*
${kitDescription}

🖨️ *How to Print (Quick & Affordable):*
• *At Home:* Pure black-and-white ink-saver layout uses 80% less toner.
• *At Local Internet Cafe / Spaza:* Tap the link below or forward this message to their WhatsApp number (costs ~R2 per page).

🔗 *Open & Print Activity Kit:*
${deepLink}

💡 *Teacher Note:* ${opts.teacherNote || "Set aside 10-15 minutes of quiet time. Praise your child's effort and let them color inside or outside the lines freely!"}

_Imbewu (The Seed) · Early Childhood Development for Every South African Child_`;
  }

  /**
   * Formats a broadcast message for creche class WhatsApp groups (e.g., "Grade R Bumblebees Parents")
   */
  static formatClassBroadcastMessage(opts: BroadcastGroupShareOptions): string {
    const deepLink = WhatsAppSharingService.generateDeepLink({
      kitType: 'complete_weekly_pack',
      theme: opts.theme,
      ageGroup: opts.ageGroup,
      customBaseUrl: opts.customBaseUrl
    });

    return `📢 *WEEKLY ACTIVITY PACK: ${opts.className.toUpperCase()}*
🏫 *Centre:* ${opts.centreName}
👩‍🏫 *Educator:* ${opts.teacherName}
📚 *Theme of the Week:* ${opts.theme} (${opts.ageGroup})

Sanibonani / Dumelang Parents! 🌟
We have published our new 5-day screen-free printable learning pack. 

Parents can open the link below, select their child's name for custom personalized lettering, and print at home or at your local internet cafe.

✨ *Activities Included:*
1. 🎨 *High-Contrast Township Coloring Sheets* (Name-personalized & ink-saver)
2. ✍️ *Pre-Writing Stroke & Curve Tracing Mats* (Builds pencil grip without screens)
3. ✂️ *Cut-Out Geometric Shape Matching Puzzles* (Hands-on spatial development)

🔗 *Tap to Access & Print Pack:*
${deepLink}

🖨️ *Tip:* All sheets are 100% black-and-white outline vector art — cheap to print and easy on ink cartridges.

Let's help our children grow together! 🌱`;
  }

  /**
   * Generates a direct WhatsApp Click-to-Chat URL
   */
  static getWhatsAppShareUrl(message: string, phoneNumber?: string): string {
    const encoded = encodeURIComponent(message);
    if (phoneNumber) {
      // Clean phone number (e.g. remove spaces, dashes, ensure +27 or local prefix)
      let cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
      if (cleanPhone.startsWith('0') && cleanPhone.length === 10) {
        cleanPhone = '27' + cleanPhone.substring(1);
      }
      return `https://wa.me/${cleanPhone}?text=${encoded}`;
    }
    return `https://wa.me/?text=${encoded}`;
  }

  /**
   * Helper to copy formatted text to clipboard
   */
  static async copyToClipboard(text: string): Promise<boolean> {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Clipboard write failed, using fallback', err);
      }
    }

    // Fallback using textarea
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch {
      return false;
    }
  }

  private static getKitBreakdown(type: PrintableKitType, childName: string): string {
    switch (type) {
      case 'coloring_sheet':
        return `• 🎨 *Ink-Saver Coloring Sheet:* Township scene featuring ${childName}'s name in bold bubble letters to color in!`;
      case 'tracing_mat':
        return `• ✍️ *Pre-Writing Tracing Mat:* Dotted stroke guides, Highveld hill waves, and dotted letter paths for ${childName}.`;
      case 'shape_puzzle':
        return `• 🧩 *Cut-Out Shape Puzzle:* 2D geometric shapes (taxi wheel, spaza window, stoep roof) with scissors guides to cut & paste.`;
      case 'complete_weekly_pack':
      default:
        return `1. 🎨 *Personalized Coloring Sheet:* High-contrast black & white outlines with ${childName}'s name.\n2. ✍️ *Pre-Writing Tracing Mat:* Dotted curves, waves, and stroke directions for fine motor control.\n3. 🧩 *Cut-Out Shape Puzzle:* Scissor practice and silhouette matching game.`;
    }
  }
}
