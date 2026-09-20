import type { SkillDefinition, SkillProgress, SkillStatus, LanguageCode, WorksheetData } from '../types';

export const CURRICULUM_SKILLS: SkillDefinition[] = [
  {
    id: 'skill-matching-case',
    category: 'literacy',
    nameEn: 'Uppercase & Lowercase Matching',
    nameZu: 'Ukufanisa Onhlamvukazi Nonhlamvana',
    descriptionEn: 'Recognise and connect capital letters to their small letter pairs.',
    descriptionZu: 'Bona bese uhlanganisa izinhlamvu ezinkulu nezincane.',
    targetAge: 4,
  },
  {
    id: 'skill-letter-tracing',
    category: 'literacy',
    nameEn: 'Letter Tracing (A–Z)',
    nameZu: 'Ukubhala Izinhlamvu (A–Z)',
    descriptionEn: 'Develop muscle memory and correct pencil stroke order for alphabet letters.',
    descriptionZu: 'Ukuthuthukisa ukubamba ipensela nokubhala izinhlamvu ngendlela efanele.',
    targetAge: 4,
  },
  {
    id: 'skill-missing-letter',
    category: 'literacy',
    nameEn: 'Missing Letters Sequence',
    nameZu: 'Izinhlamvu Ezishodayo',
    descriptionEn: 'Identify which letter comes next or fills the gap in short alphabet sequences.',
    descriptionZu: 'Thola ukuthi iyiphi inhlamvu elandelayo noma eshodayo.',
    targetAge: 5,
  },
  {
    id: 'skill-circle-letter',
    category: 'literacy',
    nameEn: 'Find & Circle the Letter',
    nameZu: 'Thola Bese Ukokelezela Inhlamvu',
    descriptionEn: 'Visual discrimination of the target letter among distractor letters.',
    descriptionZu: 'Ukubona inhlamvu eqondiwe phakathi kwezinye izinhlamvu.',
    targetAge: 3,
  },
  {
    id: 'skill-colour-objects',
    category: 'literacy',
    nameEn: 'Beginning Sounds & Colouring',
    nameZu: 'Umsindo Wokuqala Nokufaka Umbala',
    descriptionEn: 'Phonemic awareness with South African vocabulary (Ball, Bus, Bread, Milk, Mango).',
    descriptionZu: 'Ukuqonda umsindo wokuqala ngamagama asendaweni (Ibhola, Ibhasi, Isinkwa, Ubisi).',
    targetAge: 4,
  },
  {
    id: 'skill-number-counting',
    category: 'numeracy',
    nameEn: 'Counting & Number Matching (1–10)',
    nameZu: 'Ukubala Nokufanisa Izinombolo (1–10)',
    descriptionEn: 'One-to-one correspondence using familiar South African items.',
    descriptionZu: 'Ukubala izinto ezijwayelekile ngasinye ngasinye.',
    targetAge: 4,
  },
  {
    id: 'skill-pencil-control',
    category: 'fine_motor',
    nameEn: 'Pencil Control & Path Tracing',
    nameZu: 'Ukulawula Ipensela Nemigqa',
    descriptionEn: 'Steady line tracing, gentle curves, and simple hand-eye coordination mazes.',
    descriptionZu: 'Ukulandela imigqa ecijile nemicu ngezandla.',
    targetAge: 3,
  }
];

export const SA_VOCABULARY: Record<string, { en: string; zu: string; icon: string; category: string }[]> = {
  'A': [
    { en: 'Apple', zu: 'I-aphula', icon: '🍎', category: 'food' },
    { en: 'Ant', zu: 'Intuthwane', icon: '🐜', category: 'nature' }
  ],
  'B': [
    { en: 'Ball', zu: 'Ibhola', icon: '⚽', category: 'play' },
    { en: 'Bus', zu: 'Ibhasi', icon: '🚌', category: 'transport' },
    { en: 'Bread', zu: 'Isinkwa', icon: '🍞', category: 'food' }
  ],
  'C': [
    { en: 'Cat', zu: 'Ikati', icon: '🐱', category: 'animal' },
    { en: 'Cow', zu: 'Inkomo', icon: '🐄', category: 'animal' }
  ],
  'D': [
    { en: 'Dog', zu: 'Inja', icon: '🐶', category: 'animal' },
    { en: 'Drum', zu: 'Isigubhu', icon: '🥁', category: 'music' }
  ],
  'M': [
    { en: 'Milk', zu: 'Ubisi', icon: '🥛', category: 'food' },
    { en: 'Mango', zu: 'Umango', icon: '🥭', category: 'food' },
    { en: 'Moon', zu: 'Inyanga', icon: '🌙', category: 'nature' }
  ],
  'S': [
    { en: 'Sun', zu: 'Ilanga', icon: '☀️', category: 'nature' },
    { en: 'Star', zu: 'Inkanyezi', icon: '⭐', category: 'nature' },
    { en: 'Shoe', zu: 'Isicathulo', icon: '👟', category: 'clothing' }
  ]
};

/**
 * Deterministic recommendation engine following educational rules:
 * IF skill = PRACTISING and recentScore < 70 -> recommend focused practice
 * IF skill = DEVELOPING -> introduce slight challenge/variation
 * IF skill = CONFIDENT -> advance to next skill
 */
export function getRecommendedNextAction(
  childName: string,
  progressList: SkillProgress[]
): {
  skill: SkillDefinition;
  recommendationTitle: string;
  recommendationReason: string;
  estimatedMinutes: number;
} {
  const current = progressList.find(p => p.status === 'PRACTISING') || progressList[0];
  const skillDef = CURRICULUM_SKILLS.find(s => s.id === current?.skillId) || CURRICULUM_SKILLS[0];

  if (current && current.recentScore < 75) {
    return {
      skill: skillDef,
      recommendationTitle: `5-Minute Practice: ${skillDef.nameEn}`,
      recommendationReason: `${childName} showed great enthusiasm with recent matching. A quick 5-minute repetition reinforces letter recognition.`,
      estimatedMinutes: 5
    };
  }

  // Next skill in line
  const nextSkillIndex = Math.min(
    CURRICULUM_SKILLS.findIndex(s => s.id === skillDef.id) + 1,
    CURRICULUM_SKILLS.length - 1
  );
  const nextSkill = CURRICULUM_SKILLS[nextSkillIndex];

  return {
    skill: nextSkill,
    recommendationTitle: `Step Forward: ${nextSkill.nameEn}`,
    recommendationReason: `${childName} is growing confident. Ready to explore ${nextSkill.nameEn.toLowerCase()}.`,
    estimatedMinutes: 7
  };
}

export const INITIAL_DEMO_WORKSHEET: WorksheetData = {
  id: 'ws-demo-1',
  title: 'Letter Tracing & Sound: Letter B',
  titleZu: 'Ukubhala Nomsindo: Inhlamvu B',
  type: 'matching_case',
  ageRange: '4-5 Years',
  language: 'en',
  skillId: 'skill-matching-case',
  learningObjective: 'Connect uppercase B to lowercase b, and identify words starting with the sound /b/ (Ball, Bus, Bread).',
  instructions: 'Draw a line from the big uppercase letter to the matching small lowercase letter. Colour the picture that begins with B.',
  targetLetterOrNumber: 'B',
  items: [
    { id: '1', prompt: 'Match B', options: ['b', 'd', 'p'], answer: 'b', hint: 'Look for the circle at the bottom' },
    { id: '2', prompt: 'Match M', options: ['w', 'm', 'n'], answer: 'm', hint: 'Two soft bumps like mangoes' },
    { id: '3', prompt: 'Match S', options: ['c', 's', 'z'], answer: 's', hint: 'Curves like a snake' },
    { id: '4', prompt: 'Match A', options: ['e', 'a', 'o'], answer: 'a', hint: 'Round with a little tail' }
  ],
  teacherNotes: 'Observe learner pencil grip. Encourage verbal sound reproduction /b/ as in ibhola or bus.',
  parentNotes: 'Practise saying the sound around the kitchen table: B for bread, B for ball.',
  isPaidEntitlement: false,
  watermark: false
};
