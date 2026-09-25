/**
 * Personalized Audio Book Generator Service
 * Creates multi-chapter stories centered on the child with authentic South African township grounding,
 * inline Fish Audio s2.1-pro expressive tags, word timestamps for karaoke highlighting, and ambient soundscapes.
 */

import type { AudioBook, AudioBookChapter, VoiceProfile, ChildProfile, AudioBookWordTimestamp } from '../types';

export interface StoryTemplate {
  id: string;
  title: string;
  theme: string;
  coverArtTheme: string;
  synopsis: string;
  chapters: Array<{
    chapterNumber: number;
    title: string;
    rawTextTemplate: string;
    ssmlWithTagsTemplate: string;
  }>;
}

export const TOWNSHIP_STORY_TEMPLATES: StoryTemplate[] = [
  {
    id: 'tpl-magic-wire-car',
    title: 'The Magic Wire Car of Orlando West',
    theme: 'Creativity, Courage & Ubuntu',
    coverArtTheme: 'sunset-orlando',
    synopsis: 'When the golden sun dips behind Orlando Towers, {{CHILD_NAME}} and {{FRIEND_OR_PET}} discover a sparkling wire car that can glide on Highveld starlight.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'The Stoep on Vilakazi Street',
        rawTextTemplate: `Under the warm afternoon sky in {{SOWETO_SUBURB}}, {{CHILD_NAME}} was sitting on the clean red stoep with {{FRIEND_OR_PET}}. In {{CHILD_NAME}}'s hand was a wire car with shiny bottle-cap wheels and a tall steering handle. "BEEP BEEP!" called {{CHILD_NAME}}, nibbling a piece of {{FAVORITE_SNACK}}. Suddenly, a soft golden light sparkled across the wire frame. The little car turned its steering wheel all on its own!`,
        ssmlWithTagsTemplate: `[warm] Under the warm afternoon sky in {{SOWETO_SUBURB}}, {{CHILD_NAME}} was sitting on the clean red stoep with {{FRIEND_OR_PET}}. [pause] In {{CHILD_NAME}}'s hand was a wire car with shiny bottle-cap wheels and a tall steering handle. [excited] "BEEP BEEP!" called {{CHILD_NAME}}, nibbling a piece of {{FAVORITE_SNACK}}. [whispering] Suddenly, a soft golden light sparkled across the wire frame. [pause] The little car turned its steering wheel all on its own!`
      },
      {
        chapterNumber: 2,
        title: 'The Highveld Starlight Glide',
        rawTextTemplate: `{{CHILD_NAME}} held the handle gently. The wire car rolled down the driveway, making a sweet humming sound like Gogo's favorite hymn. Past the blooming peach trees, past the friendly yellow taxis at the corner, the little car lifted two inches above the ground! {{FRIEND_OR_PET}} clapped with delight. "Look at the colorful Orlando Towers ahead!" whispered {{CHILD_NAME}}. The cool evening breeze felt like a gentle hug.`,
        ssmlWithTagsTemplate: `[warm] {{CHILD_NAME}} held the handle gently. [cheerful] The wire car rolled down the driveway, making a sweet humming sound like Gogo's favorite hymn. [pause] Past the blooming peach trees, past the friendly yellow taxis at the corner, [excited] the little car lifted two inches above the ground! [cheerful] {{FRIEND_OR_PET}} clapped with delight. [whispering] "Look at the colorful Orlando Towers ahead!" whispered {{CHILD_NAME}}. [warm] The cool evening breeze felt like a gentle hug.`
      },
      {
        chapterNumber: 3,
        title: 'Stars Over Soweto',
        rawTextTemplate: `High above the rooftops, stars began to blink like tiny fireflies. The magic wire car gently glided back toward the gate in {{SOWETO_SUBURB}}. It landed softly on the grass, right next to the JoJo tank. {{CHILD_NAME}} parked the car beside the stoep, feeling cozy, safe, and deeply loved. "Goodnight, brave adventurer," whispered the quiet night wind. And {{CHILD_NAME}} closed their eyes, drifting into sweet dreams.`,
        ssmlWithTagsTemplate: `[whispering] High above the rooftops, stars began to blink like tiny fireflies. [warm] The magic wire car gently glided back toward the gate in {{SOWETO_SUBURB}}. It landed softly on the grass, right next to the JoJo tank. [pause] {{CHILD_NAME}} parked the car beside the stoep, feeling cozy, safe, and deeply loved. [whispering] "Goodnight, brave adventurer," whispered the quiet night wind. [warm] And {{CHILD_NAME}} closed their eyes, drifting into sweet dreams.`
      }
    ]
  },
  {
    id: 'tpl-gogo-dumpling-mystery',
    title: "Gogo's Sunday Dumpling Mystery",
    theme: 'Family, Warmth & Problem Solving',
    coverArtTheme: 'kitchen-warmth',
    synopsis: "In a cozy Soweto kitchen, the savory aroma of dombolo stew fills the air. But where did Gogo's special wooden spoon go? {{CHILD_NAME}} investigates!",
    chapters: [
      {
        chapterNumber: 1,
        title: 'The Steaming Pot of Dombolo',
        rawTextTemplate: `Sunday morning in {{SOWETO_SUBURB}} always smelled of sweet dough and fresh rosemary. Gogo had her big cast-iron pot on the stove. "Hawu!" chuckled Gogo. "{{CHILD_NAME}}, where has my favorite wooden spoon run off to?" {{CHILD_NAME}} smiled, having just finished sharing {{FAVORITE_SNACK}} with {{FRIEND_OR_PET}}. "Don't worry, Gogo! Detective {{CHILD_NAME}} is on the case!"`,
        ssmlWithTagsTemplate: `[warm] Sunday morning in {{SOWETO_SUBURB}} always smelled of sweet dough and fresh rosemary. Gogo had her big cast-iron pot on the stove. [excited] "Hawu!" chuckled Gogo. "{{CHILD_NAME}}, where has my favorite wooden spoon run off to?" [cheerful] {{CHILD_NAME}} smiled, having just finished sharing {{FAVORITE_SNACK}} with {{FRIEND_OR_PET}}. [excited] "Don't worry, Gogo! Detective {{CHILD_NAME}} is on the case!"`
      },
      {
        chapterNumber: 2,
        title: 'Clues Behind the Kitchen Table',
        rawTextTemplate: `{{CHILD_NAME}} knelt down near the embroidered kitchen tablecloth. There on the polished floor was a tiny dusting of white flour! Following the flour footsteps, {{CHILD_NAME}} peeked behind the sunny peach curtain. There sat {{FRIEND_OR_PET}}, gently guarding Gogo's wooden spoon like a royal baton. Gogo laughed with pure joy. "Halala, {{CHILD_NAME}}! You found it with clever eyes and a kind heart!"`,
        ssmlWithTagsTemplate: `[whispering] {{CHILD_NAME}} knelt down near the embroidered kitchen tablecloth. There on the polished floor was a tiny dusting of white flour! [pause] [excited] Following the flour footsteps, {{CHILD_NAME}} peeked behind the sunny peach curtain. [cheerful] There sat {{FRIEND_OR_PET}}, gently guarding Gogo's wooden spoon like a royal baton. [warm] Gogo laughed with pure joy. "Halala, {{CHILD_NAME}}! You found it with clever eyes and a kind heart!"`
      },
      {
        chapterNumber: 3,
        title: 'Tummy Full, Heart Peaceful',
        rawTextTemplate: `The warm dumplings puffed up big and fluffy in the rich vegetable stew. Gogo spooned a golden dumpling onto {{CHILD_NAME}}'s plate. Everyone sat together around the wooden table, sharing stories and laughter. As the night crickets started their song in {{SOWETO_SUBURB}}, {{CHILD_NAME}} snuggled under the colorful fleece blanket, smiling at a wonderful Sunday.`,
        ssmlWithTagsTemplate: `[warm] The warm dumplings puffed up big and fluffy in the rich vegetable stew. [cheerful] Gogo spooned a golden dumpling onto {{CHILD_NAME}}'s plate. Everyone sat together around the wooden table, sharing stories and laughter. [whispering] As the night crickets started their song in {{SOWETO_SUBURB}}, [warm] {{CHILD_NAME}} snuggled under the colorful fleece blanket, smiling at a wonderful Sunday.`
      }
    ]
  },
  {
    id: 'tpl-brave-firefly',
    title: 'The Little Brave Firefly of Dobsonville',
    theme: 'Bedtime Calm, Nature & Overcoming Fear',
    coverArtTheme: 'night-stars',
    synopsis: 'A gentle bedtime tale where {{CHILD_NAME}} helps a timid firefly find its inner glow to guide bedtime dreams across the neighborhood.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'The Tiny Light in the Aloe Garden',
        rawTextTemplate: `The twilight sky over {{SOWETO_SUBURB}} was painted deep purple and indigo. Outside the window, in the garden of tall green aloes, a tiny blinking green light flickered. {{CHILD_NAME}} stepped onto the stoep with {{FRIEND_OR_PET}}. Sitting upon an aloe leaf was a tiny firefly whose light was very small and quiet. "Sawubona little friend," whispered {{CHILD_NAME}} gently.`,
        ssmlWithTagsTemplate: `[whispering] The twilight sky over {{SOWETO_SUBURB}} was painted deep purple and indigo. Outside the window, in the garden of tall green aloes, a tiny blinking green light flickered. [pause] [warm] {{CHILD_NAME}} stepped onto the stoep with {{FRIEND_OR_PET}}. Sitting upon an aloe leaf was a tiny firefly whose light was very small and quiet. [whispering] "Sawubona little friend," whispered {{CHILD_NAME}} gently.`
      },
      {
        chapterNumber: 2,
        title: 'A Song of Ubuntu and Warmth',
        rawTextTemplate: `The firefly blinked nervously. "I am too small to light up the big Highveld sky," it chirped. {{CHILD_NAME}} offered a tiny crumb of {{FAVORITE_SNACK}} and began singing a soft melody: "Thula thu, thula baba." Hearing the kind voice, the firefly took a deep, brave breath. Suddenly, its belly glowed with brilliant emerald radiance, illuminating the whole garden!`,
        ssmlWithTagsTemplate: `[whispering] The firefly blinked nervously. "I am too small to light up the big Highveld sky," it chirped. [warm] {{CHILD_NAME}} offered a tiny crumb of {{FAVORITE_SNACK}} and began singing a soft melody: [whispering] "Thula thu, thula baba." [excited] Hearing the kind voice, the firefly took a deep, brave breath. [cheerful] Suddenly, its belly glowed with brilliant emerald radiance, illuminating the whole garden!`
      },
      {
        chapterNumber: 3,
        title: 'The Blanket of Starlight',
        rawTextTemplate: `Together, {{CHILD_NAME}} and the glowing firefly sent warm green beams into the night sky, greeting the distant stars. With a happy dance, the firefly fluttered into the warm night air. {{CHILD_NAME}} crawled back into bed, feeling calm and peaceful. The room was softly glowing with sweet dreams. "Lala kahle, my clever star," said the night. Sleep came easy and sweet.`,
        ssmlWithTagsTemplate: `[warm] Together, {{CHILD_NAME}} and the glowing firefly sent warm green beams into the night sky, greeting the distant stars. [cheerful] With a happy dance, the firefly fluttered into the warm night air. [whispering] {{CHILD_NAME}} crawled back into bed, feeling calm and peaceful. The room was softly glowing with sweet dreams. [whispering] "Lala kahle, my clever star," said the night. [warm] Sleep came easy and sweet.`
      }
    ]
  }
];

const STORAGE_KEY_AUDIOBOOKS = 'imbewu_generated_audiobooks_v1';

export class AudioBookGeneratorService {
  /**
   * Replaces variables with authentic child details
   */
  static injectVariables(template: string, child: ChildProfile, suburb?: string, favoriteSnack?: string, friendOrPet?: string): string {
    const childName = child.nickname || 'Thabo';
    const sub = suburb || child.neighborhood || 'Meadowlands, Zone 2';
    const snack = favoriteSnack || child.favoriteSnack || 'warm magwinya with apricot jam';
    const friend = friendOrPet || child.favoriteToy || 'wire car Jabu';

    return template
      .replace(/\{\{CHILD_NAME\}\}/g, childName)
      .replace(/\{\{SOWETO_SUBURB\}\}/g, sub)
      .replace(/\{\{FAVORITE_SNACK\}\}/g, snack)
      .replace(/\{\{FRIEND_OR_PET\}\}/g, friend);
  }

  /**
   * Generates word timestamps for karaoke-style synchronized text highlighting
   */
  static generateWordTimestamps(text: string, totalSeconds: number): AudioBookWordTimestamp[] {
    const words = text.split(/\s+/).filter(w => w.trim().length > 0);
    if (words.length === 0) return [];

    const durationPerWord = totalSeconds / words.length;
    let currentStart = 0;

    return words.map(w => {
      const cleanWord = w.replace(/[^\w\s\u00C0-\u017F]/gi, '');
      const start = parseFloat(currentStart.toFixed(2));
      const end = parseFloat((currentStart + durationPerWord).toFixed(2));
      currentStart += durationPerWord;
      return { word: cleanWord || w, start, end };
    });
  }

  /**
   * Generates a complete 3-chapter AudioBook customized for the child
   */
  static generateAudioBook(params: {
    templateId: string;
    child: ChildProfile;
    voiceProfile: VoiceProfile;
    suburb?: string;
    favoriteSnack?: string;
    friendOrPet?: string;
  }): AudioBook {
    const template = TOWNSHIP_STORY_TEMPLATES.find(t => t.id === params.templateId) || TOWNSHIP_STORY_TEMPLATES[0];
    const suburb = params.suburb || params.child.neighborhood || 'Meadowlands, Zone 2';
    const favoriteSnack = params.favoriteSnack || params.child.favoriteSnack || 'warm magwinya with apricot jam';
    const friendOrPet = params.friendOrPet || params.child.favoriteToy || 'his wire car Jabu';

    const chapters: AudioBookChapter[] = template.chapters.map((ch, idx) => {
      const storyText = AudioBookGeneratorService.injectVariables(ch.rawTextTemplate, params.child, suburb, favoriteSnack, friendOrPet);
      const ssmlWithTags = AudioBookGeneratorService.injectVariables(ch.ssmlWithTagsTemplate, params.child, suburb, favoriteSnack, friendOrPet);
      
      // Average 110-130 seconds per chapter
      const durationSeconds = 120 + idx * 10;
      const timestamps = AudioBookGeneratorService.generateWordTimestamps(storyText, durationSeconds);

      return {
        chapterNumber: ch.chapterNumber,
        title: ch.title,
        durationSeconds,
        storyText,
        ssmlWithTags,
        timestamps
      };
    });

    const totalDurationSeconds = chapters.reduce((acc, c) => acc + c.durationSeconds, 0);

    const audioBook: AudioBook = {
      id: `ab_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      templateId: template.id,
      title: template.title,
      theme: template.theme,
      childName: params.child.nickname,
      suburb,
      favoriteSnack,
      friendOrPet,
      voiceProfileId: params.voiceProfile.id,
      voiceProfileName: params.voiceProfile.speakerName,
      voiceRole: params.voiceProfile.role,
      chapters,
      totalDurationSeconds,
      coverArtTheme: template.coverArtTheme,
      createdAt: new Date().toISOString(),
      isCachedOffline: true
    };

    AudioBookGeneratorService.saveAudioBook(audioBook);
    return audioBook;
  }

  /**
   * Persist audiobook to storage
   */
  static saveAudioBook(audioBook: AudioBook): void {
    try {
      const existing = AudioBookGeneratorService.getAllAudioBooks();
      const updated = [audioBook, ...existing.filter(a => a.id !== audioBook.id)];
      localStorage.setItem(STORAGE_KEY_AUDIOBOOKS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save audio book offline', e);
    }
  }

  /**
   * Retrieve all saved audiobooks
   */
  static getAllAudioBooks(): AudioBook[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_AUDIOBOOKS);
      if (data) return JSON.parse(data);
    } catch {
      // return default
    }
    return [];
  }

  /**
   * Get single audiobook by ID
   */
  static getAudioBookById(id: string): AudioBook | null {
    const all = AudioBookGeneratorService.getAllAudioBooks();
    return all.find(a => a.id === id) || null;
  }
}
