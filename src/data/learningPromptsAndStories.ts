import type { DailyLearningPrompt, DomainMilestoneHistoryPoint, MilestoneCheckpoint, StoryResourceItem } from '../types';

export const HOUSEHOLD_DAILY_PROMPTS: DailyLearningPrompt[] = [
  {
    id: 'prompt-maize-tray',
    title: 'Mealie Meal Letter Tracing Tray',
    titleZu: 'Ukubhala Izinhlamvu Emphupheni',
    category: 'fine_motor',
    durationMinutes: 5,
    householdItems: [
      'Baking tray or flat dinner plate',
      '2 spoonfuls of dry mealie meal (maize meal) or dry sand',
      'Child’s index finger or a clean twig'
    ],
    householdItemsZu: [
      'Ithreyi noma ipuleti eliyisicaba',
      'Izinkezo ezimbili zempuphu eyomile noma isihlabathi',
      'Umunwe wengane'
    ],
    instructions: [
      'Sprinkle a thin layer of mealie meal across the flat plate or tray.',
      'Show your child how to draw a large letter (like "B" for Ball or "S" for Sun) with your finger.',
      'Gently shake the tray side-to-side to "erase" and let your child draw their own letter or zig-zag pattern!',
      'Encourage saying the letter sound aloud together: "/b/ /b/ ibhola!"'
    ],
    instructionsZu: [
      'Fafaza ungqimba oluncane lwempuphu eplatini.',
      'Khombisa ingane ukuthi idweba kanjani uhlamvu (njengo "B" webhola) ngomunwe.',
      'Nyakazisa ipuleti kancane ukuze ucishe, bese umntwana ezidwebele.',
      'Biza umsindo wezwi ndawonye ngokujabula: "/b/ /b/ ibhola!"'
    ],
    learningGoal: 'Pencil control, tactile sensory exploration, and letter shape recall.',
    learningGoalZu: 'Ukulungiselela ukubamba ipensela nokukhumbula izinhlamvu.',
    parentPraiseTip: 'Celebrate their effort, even if the letter is upside down! Sensory tracing builds confidence without fear of making mistakes.',
    parentPraiseTipZu: 'Mincome ngomzamo wakhe! Ukubhala emphupheni kwakha ukuzethemba ngaphandle kokwesaba amaphutha.',
    icon: '🌽',
    difficulty: 'Easy'
  },
  {
    id: 'prompt-peg-counting',
    title: 'Clothes Peg Rainbow Counting',
    titleZu: 'Ukubala Izikhonkwane Zezingubo',
    category: 'numeracy',
    durationMinutes: 5,
    householdItems: [
      '5 to 10 colorful clothes pegs',
      'Cardboard scrap or the rim of an ice cream container'
    ],
    householdItemsZu: [
      'Izikhonkwane zezingubo ezingu 5 kuya ku 10',
      'Ucezu lwekhadibhodi noma ibhakede le-ice cream'
    ],
    instructions: [
      'Pinch a peg together and clip it onto the rim of the cardboard: "One peg!"',
      'Ask your child to squeeze and attach two more pegs alongside yours.',
      'Touch and count each peg in rhythm (1, 2, 3...) both in English and isiZulu (kunye, kubili, kuthathu).',
      'Try grouping by color: "Can we find all the yellow pegs for the sunny side?"'
    ],
    instructionsZu: [
      'Cindezela isikhonkwane bese usifaka ekhadibhodini: "Isikhonkwane esisodwa!"',
      'Cela ingane icindezele ifake ezinye ezimbili.',
      'Bala izikhonkwane ngesigqi ngesiNgisi nangesiZulu (kunye, kubili, kuthathu).',
      'Hlukanisa ngemibala: "Ake siqoqe zonke eziphuzi njengokukhanya kwelanga."'
    ],
    learningGoal: 'Pincer grasp strengthening for pencil holding & 1-to-1 number correspondence.',
    learningGoalZu: 'Ukuqinisa iminwe yokubamba ipensela nokufunda ukubala.',
    parentPraiseTip: 'Squeezing pegs works the tiny muscles needed for writing. If it’s tough, place your hand gently over theirs!',
    parentPraiseTipZu: 'Ukukhama izikhonkwane kuqinisa izicubu zeminwe. Bamba isandla sakhe kancane uma kusinda.',
    icon: '🧺',
    difficulty: 'Playful'
  },
  {
    id: 'prompt-sock-sorting',
    title: 'Family Sock Match & Roll',
    titleZu: 'Ukufanisa Amasokisi Omndeni',
    category: 'language',
    durationMinutes: 5,
    householdItems: [
      '4 to 6 pairs of clean, mixed socks of different sizes and colors'
    ],
    householdItemsZu: [
      'Amasokisi ahlanzekile anemibala nosayizi abahlukene'
    ],
    instructions: [
      'Scatter the socks on a clean mat or bed: "Look at this sock mountain!"',
      'Hold up one sock: "Who wears this big sock? Daddy or Gogo? Where is its matching friend?"',
      'Help your child pair identical patterns or colors and roll them into a soft ball.',
      'Toss the soft rolled sock into a laundry basket: "Goal! Iqembu liyawina!"'
    ],
    instructionsZu: [
      'Chitha amasokisi phezu kombhede: "Bheka le ntaba yamasokisi!"',
      'Phakamisa elilodwa: "Ubani ogqoka leli elikhulu? Ubaba noma uGogo? Liphi elihambisana nalo?"',
      'Siza ingane ifanise imibala bese izigoqa zibe yibhola elithambile.',
      'Phonsani ibhola likasokisi ebhasikidini: "Umgomo! Siphumelele!"'
    ],
    learningGoal: 'Visual discrimination, size comparison (big/small), and gross motor tossing.',
    learningGoalZu: 'Ukuqonda ubukhulu (okukhulu nokuncane) nokuxhumanisa imibala.',
    parentPraiseTip: 'Ask open questions: "How did you know these two match?" Let them explain in their own words.',
    parentPraiseTipZu: 'Buza: "Wazi kanjani ukuthi lawa ayahambisana?" Myeke achaze ngamazwi akhe.',
    icon: '🧦',
    difficulty: 'Easy'
  },
  {
    id: 'prompt-spoon-balance',
    title: 'Kitchen Spoon Size Parade',
    titleZu: 'Uhlu Lwezinkezo zaseKhisini',
    category: 'numeracy',
    durationMinutes: 5,
    householdItems: [
      'Teaspoon, tablespoon, serving spoon, wooden cooking spoon'
    ],
    householdItemsZu: [
      'Isipuni setiye, isipuni sokudla, isipuni esikhulu, uphini lokupheka'
    ],
    instructions: [
      'Lay the spoons out on a towel or table.',
      'Explore the sizes: "Which spoon is the baby spoon? Which one is the giant mama spoon?"',
      'Help your child arrange the spoons from smallest to largest in a neat line.',
      'Tap each spoon with a small stick or knuckle to listen to the different musical pitch!'
    ],
    instructionsZu: [
      'Beka izinkezo phezu kwetafula.',
      'Bhekisisani ubukhulu: "Isiphi esomntwana omncane? Isiphi esikhulu sikaMama?"',
      'Siza ingane ihlele izinkezo kusukela kwencane kakhulu kuya kwenkulu kunazo zonke.',
      'Shaya isipuni ngasinye ngomunwe ukuzwa umsindo omuhle womculo!'
    ],
    learningGoal: 'Seriation (ordering by size), spatial reasoning, and auditory discrimination.',
    learningGoalZu: 'Ukuhlela ngezilinganiso nokulalela imisindo ehlukene.',
    parentPraiseTip: 'Seriation is a core foundation for early mathematics and understanding sequences.',
    parentPraiseTipZu: 'Ukuhlela ngezilinganiso kuyisisekelo esibalulekile sezibalo zokuqala.',
    icon: '🥄',
    difficulty: 'Easy'
  },
  {
    id: 'prompt-water-cups',
    title: 'Cup Pouring & Volume Splash',
    titleZu: 'Ukuthela Amanzi Ezinkomishini',
    category: 'sensory_science',
    durationMinutes: 5,
    householdItems: [
      'Plastic washbasin or bowl with a little water',
      '2 or 3 plastic cups of different shapes',
      'Small dry dishcloth'
    ],
    householdItemsZu: [
      'Isitsha sepulasitiki esinamanzi amancane',
      'Izinkomishi zepulasitiki ezingu 2 noma 3',
      'Indwangu yokusula'
    ],
    instructions: [
      'Sit outside in the sunshine or by the kitchen floor with the washbasin.',
      'Ask: "If we pour this tall cup into this wide cup, will it fit or overflow?"',
      'Let your child pour carefully from cup to cup, listening to the water trickles.',
      'Teach vocabulary: "Full / Igcwele", "Half-full / Ingxenye", "Empty / Ayinalutho".'
    ],
    instructionsZu: [
      'Hlalani ngaphandle elangeni noma phansi ekhisini nesitsha samanzi.',
      'Buza: "Uma sithela le nkomishi ende kule ebanzi, azongena wonke amanzi?"',
      'Yekela umntwana athele amanzi ngokucophelela elalele umculo wamanzi.',
      'Fundisa amagama: "Kugcwele", "Kusele kancane", "Akunalutho".'
    ],
    learningGoal: 'Hand-eye coordination, conservation of volume, and early scientific inquiry.',
    learningGoalZu: 'Ukuxhumanisa amehlo nezandla nokufunda ngobuningi.',
    parentPraiseTip: 'Pouring without spilling takes immense concentration. Notice how still their eyes stay!',
    parentPraiseTipZu: 'Ukuthela ngaphandle kokuchitha kudinga ukugxila okukhulu. Bheka indlela agxile ngayo!',
    icon: '💧',
    difficulty: 'Engaging'
  },
  {
    id: 'prompt-shadow-puppets',
    title: 'Sunlight Wall Shadow Animals',
    titleZu: 'Izilwane Zesithunzi Elangeni',
    category: 'creative',
    durationMinutes: 5,
    householdItems: [
      'A sunny wall, door, or torchlight in a dim room',
      'Two hands!'
    ],
    householdItemsZu: [
      'Udonga olunelanga noma isibani sethoshi',
      'Izandla ezimbili kuphela!'
    ],
    instructions: [
      'Stand with your backs to the sun so your hand casts a crisp shadow on the wall.',
      'Cross your thumbs and flutter your fingers to make an eagle: "Inkonjane iyandiza!"',
      'Make a barking dog with your fingers and have your child make the puppy sound.',
      'Let your child try making their own shadow creature and tell a short 10-second adventure.'
    ],
    instructionsZu: [
      'Yimani ngomhlane elangeni ukuze isithunzi sesandla sivele odongeni.',
      'Phambanisa izithupha uvule iminwe njengenyoni endizayo: "Inyoni iyandiza!"',
      'Yenza inja ngeminwe bese ingane ikhonkotha kancane.',
      'Yekela ingane izenzele isithunzi sayo bese ixoxa indaba emfushane.'
    ],
    learningGoal: 'Finger isolation, bilateral coordination, and imaginative expressive language.',
    learningGoalZu: 'Ukuqinisa iminwe nokukhulisa amakhono okuxoxa izindaba.',
    parentPraiseTip: 'Storytelling through body movement enhances vocabulary retention and narrative confidence.',
    parentPraiseTipZu: 'Ukuxoxa izindaba ngezandla kuthuthukisa amagama nokuzethemba kwengane.',
    icon: '🦅',
    difficulty: 'Playful'
  }
];

export const DEFAULT_DEVELOPMENTAL_DATA: DomainMilestoneHistoryPoint[] = [
  {
    monthLabel: 'Oct (Month 44)',
    childAgeMonths: 44,
    languageScore: 62,
    motorScore: 68,
    numeracyScore: 54,
    benchmarkScore: 60,
    unlockedMilestones: ['Listens to 5-min story', 'Draws circular scribbles', 'Counts 1 to 3 items']
  },
  {
    monthLabel: 'Nov (Month 45)',
    childAgeMonths: 45,
    languageScore: 68,
    motorScore: 72,
    numeracyScore: 60,
    benchmarkScore: 64,
    unlockedMilestones: ['Uses 4-word sentences', 'Snips paper with plastic scissors', 'Recognizes circle shape']
  },
  {
    monthLabel: 'Dec (Month 46)',
    childAgeMonths: 46,
    languageScore: 74,
    motorScore: 75,
    numeracyScore: 66,
    benchmarkScore: 68,
    unlockedMilestones: ['Identifies first letter of name', 'Catches large bounce ball', 'Sorts objects by 2 colors']
  },
  {
    monthLabel: 'Jan (Month 47)',
    childAgeMonths: 47,
    languageScore: 80,
    motorScore: 79,
    numeracyScore: 72,
    benchmarkScore: 71,
    unlockedMilestones: ['Speaks in bilingual phrases', 'Draws cross & ladder lines', 'Counts 5 objects accurately']
  },
  {
    monthLabel: 'Feb (Month 48)',
    childAgeMonths: 48,
    languageScore: 86,
    motorScore: 84,
    numeracyScore: 78,
    benchmarkScore: 75,
    unlockedMilestones: ['Retells simple folk story', 'Holds pencil with 3-finger tripod', 'Identifies "more" vs "less"']
  },
  {
    monthLabel: 'Current (Month 49)',
    childAgeMonths: 49,
    languageScore: 91,
    motorScore: 88,
    numeracyScore: 84,
    benchmarkScore: 78,
    unlockedMilestones: ['Matches letters to sounds /b/, /m/, /s/', 'Cuts along straight line', 'Shares items into two groups']
  }
];

export const DEVELOPMENTAL_CHECKPOINTS: MilestoneCheckpoint[] = [
  // Language
  {
    id: 'lang-1',
    domain: 'language',
    title: 'Recognizes First Letter Sound',
    titleZu: 'Ukuqaphela Umsindo Wokuqala Wegama',
    ageMonthExpected: 42,
    achieved: true,
    achievedDate: 'Nov 2025',
    notes: 'Knows /l/ for Lerato and /b/ for ball in English & isiZulu.'
  },
  {
    id: 'lang-2',
    domain: 'language',
    title: 'Follows 2-Step Instruction',
    titleZu: 'Ukulandela Iziqondiso Ezimbili',
    ageMonthExpected: 45,
    achieved: true,
    achievedDate: 'Dec 2025',
    notes: 'Can pick up shoes and put them on the rack when asked.'
  },
  {
    id: 'lang-3',
    domain: 'language',
    title: 'Bilingual Word Association',
    titleZu: 'Ukuxhuma Amagama Ngezilimi Ezimbili',
    ageMonthExpected: 48,
    achieved: true,
    achievedDate: 'Feb 2026',
    notes: 'Transitions naturally between "apple / i-aphula" and "milk / ubisi".'
  },
  {
    id: 'lang-4',
    domain: 'language',
    title: 'Rhyme & Sound Repetition',
    titleZu: 'Ukubamba Imilolozelo Nemiculo',
    ageMonthExpected: 52,
    achieved: false,
    notes: 'Currently practicing with traditional nursery rhymes.'
  },

  // Motor
  {
    id: 'motor-1',
    domain: 'motor',
    title: 'Tripod Pencil Grip',
    titleZu: 'Ukubamba Iphensela Ngezandla Ezintathu',
    ageMonthExpected: 44,
    achieved: true,
    achievedDate: 'Jan 2026',
    notes: 'Uses thumb, index, and middle finger smoothly.'
  },
  {
    id: 'motor-2',
    domain: 'motor',
    title: 'Scissor Snips along Line',
    titleZu: 'Ukusika Iphepha Ngolayini Oqondile',
    ageMonthExpected: 48,
    achieved: true,
    achievedDate: 'Mar 2026',
    notes: 'Can cut paper strips with blunt-tip children scissors.'
  },
  {
    id: 'motor-3',
    domain: 'motor',
    title: 'One-Foot Balance (5 seconds)',
    titleZu: 'Ukuma Ngonyawo Olulodwa',
    ageMonthExpected: 50,
    achieved: false,
    notes: 'Reaching 3 seconds currently during hopping games.'
  },

  // Numeracy
  {
    id: 'num-1',
    domain: 'numeracy',
    title: '1-to-1 Counting up to 5',
    titleZu: 'Ukubala Izinto Ezinhlanu Ngazinye',
    ageMonthExpected: 44,
    achieved: true,
    achievedDate: 'Dec 2025',
    notes: 'Touches stones or beans while counting without skipping.'
  },
  {
    id: 'num-2',
    domain: 'numeracy',
    title: 'Sorting by Shape & Color',
    titleZu: 'Ukuhlela Ngomumo Nangemibala',
    ageMonthExpected: 46,
    achieved: true,
    achievedDate: 'Jan 2026',
    notes: 'Sorts circles, squares, and triangles into separate piles.'
  },
  {
    id: 'num-3',
    domain: 'numeracy',
    title: 'Pattern Completion (AB / AB)',
    titleZu: 'Ukuqeda Iphethini Elilandelanayo',
    ageMonthExpected: 50,
    achieved: false,
    notes: 'Starting to predict Red-Blue-Red-Blue sequences.'
  }
];

export const CURATED_STORIES_RESOURCES: StoryResourceItem[] = [
  {
    id: 'story-gogo-garden',
    title: "Gogo's Sunshine Garden",
    titleZu: "Isivande SikaGogo Selanga",
    ageGroup: '3-4',
    theme: 'nature_gardening',
    contentType: 'story',
    readingTimeMinutes: 3,
    summaryEn: 'Sipho helps his grandmother water the orange pumpkin patch and discovers tiny ladybird friends.',
    summaryZu: 'USipho usiza ugogo wakhe ukuthela ithanga amanzi bese ethola iziphungumangathi ezinhle.',
    coverEmoji: '🎃',
    themeColor: 'from-amber-400 to-orange-500',
    keyVocabulary: [
      { en: 'Pumpkin', zu: 'Ithanga', icon: '🎃' },
      { en: 'Sun', zu: 'Ilanga', icon: '☀️' },
      { en: 'Water', zu: 'Amanzi', icon: '💧' },
      { en: 'Seed', zu: 'Imbewu', icon: '🌱' }
    ],
    pages: [
      {
        pageNumber: 1,
        textEn: "Every morning when the golden sun warms the red soil, Gogo puts on her straw hat. 'Come Sipho,' she smiles, 'the seeds are thirsty!'",
        textZu: "Njalo ekuseni lapho ilanga lifudumeza umhlabathi obomvu, uGogo ufaka isigqoko sakhe. 'Woza Sipho,' amomotheke, 'izimbewu zomile!'",
        illustrationEmoji: '👩🏾‍🌾',
        dialoguePrompt: "Can you point to the sun? What sound does 'sun' start with?",
        dialoguePromptZu: "Ungakhomba ilanga? Liqala ngamuphi umsindo igama elithi 'ilanga'?"
      },
      {
        pageNumber: 2,
        textEn: "Sipho carries the little green watering tin. Splish! Splash! Water drops dance on the broad green leaves like shiny beads.",
        textZu: "USipho uphatha ithini eliluhlaza lokunisela. Qha! Phosho! Amathonsi amanzi agxuma emaqabungeni abanzi njengobuhlalu obukhazimulayo.",
        illustrationEmoji: '💧',
        dialoguePrompt: "Make the water sound with your tongue: splish, splash, splash!",
        dialoguePromptZu: "Yenza umsindo wamanzi: splish, splash! Uzwa kanjani umoya wamanzi?"
      },
      {
        pageNumber: 3,
        textEn: "Look under the big leaf! A little red ladybird with black dots is taking a sip. 'Sawubona, little friend,' whispers Sipho.",
        textZu: "Bheka ngaphansi kweqabunga elikhulu! Isinambuzane esibomvu esinamachashaza amnyama siphuza amanzi. 'Sawubona mngani omncane,' kuhleba uSipho.",
        illustrationEmoji: '🐞',
        dialoguePrompt: "Can you count the black dots on the ladybird's back? One, two, three!",
        dialoguePromptZu: "Ungabala amachashaza amnyama? Kunye, kubili, kuthathu!"
      },
      {
        pageNumber: 4,
        textEn: "Gogo gently pats Sipho's shoulder: 'Just like this little seed, you grow bigger every day with love and good food.'",
        textZu: "UGogo wamphulula ehlombe: 'Njengale mbewu encane, nawe uyakhula nsuku zonke ngothando nokudla okunempilo.'",
        illustrationEmoji: '🌻',
        dialoguePrompt: "Give your child a warm hug: 'You are my growing seed!'",
        dialoguePromptZu: "Gona ingane yakho ngokufudumele: 'Uyimbewu yami ekhulayo!'"
      }
    ],
    parentReadingTipEn: "Encourage your child to make the garden sound effects (splish-splash, buzzing bee) to build oral phonological awareness.",
    parentReadingTipZu: "Khuthaza ingane ukuthi ilingise imisindo yemvelo ukuze icije amakhono okulalela nokubiza.",
    printableSheetsCount: 3
  },
  {
    id: 'story-bushbaby-leaps',
    title: 'Lulu the Brave Bushbaby',
    titleZu: 'ULulu Insimbi Enesibindi',
    ageGroup: '3-4',
    theme: 'animals',
    contentType: 'story',
    readingTimeMinutes: 4,
    summaryEn: 'A night-time tale of a curious little bushbaby with big round eyes learning to jump from acacia branch to branch.',
    summaryZu: 'Indaba yasebusuku ngensimbi encane enamehlo amakhulu efunda ukweqa emagatsheni omunga.',
    coverEmoji: '🐒',
    themeColor: 'from-indigo-500 to-purple-600',
    keyVocabulary: [
      { en: 'Night', zu: 'Ubusuku', icon: '🌙' },
      { en: 'Tree', zu: 'Isihlahla', icon: '🌳' },
      { en: 'Jump', zu: 'Eqani', icon: '🦘' },
      { en: 'Eyes', zu: 'Amehlo', icon: '👀' }
    ],
    pages: [
      {
        pageNumber: 1,
        textEn: "High up in the thorn tree, Lulu opened her giant golden eyes. Blink, blink! The bright moon was smiling over the quiet veld.",
        textZu: "Phezulu esihlahleni somunga, uLulu wavula amehlo akhe amakhulu asagolide. Cwayiza, cwayiza! Inyanga ekhanyayo yayimamatheka phezu kwezwe.",
        illustrationEmoji: '🌕',
        dialoguePrompt: "Open your eyes wide like Lulu! What do you see in the dark room?",
        dialoguePromptZu: "Vula amehlo akho abanzi njengoLulu! Ubonani ekamelweni?"
      },
      {
        pageNumber: 2,
        textEn: "'Can I jump to that sweet flower branch, Mama?' asked Lulu. 'Bend your knees and trust your strong little legs,' Mama said softly.",
        textZu: "'Ngingeqela kulelo gatsha elinezimbali ezimnandi Mama?' kwabuza uLulu. 'Goba amadolo akho wethembe imilenze yakho emincane,' kusho uMama kancane.",
        illustrationEmoji: '🐾',
        dialoguePrompt: "Let's stand up and bend our knees together: 1, 2, 3... ready to leap!",
        dialoguePromptZu: "Asisukume sigobe amadolo ndawonye: 1, 2, 3... silungele ukweqa!"
      },
      {
        pageNumber: 3,
        textEn: "ONE... TWO... THREE... BOING! Lulu soared through the cool night air like a tiny flying kite and landed safely on the mossy bark.",
        textZu: "KUNYE... KUBILI... KUTHATHU... GQU! ULulu wandiza emoyeni opholile wasebusuku wafika ngokuphepha egatsheni elithambile.",
        illustrationEmoji: '⭐',
        dialoguePrompt: "Clap your hands for Lulu! Say 'Halala Lulu!'",
        dialoguePromptZu: "Shayela uLulu ihlombe! Hlabelela: 'Halala Lulu!'"
      }
    ],
    parentReadingTipEn: "Ask your child to demonstrate 'big eyes' and 'gentle landing' with their feet to support whole-body gross motor play.",
    parentReadingTipZu: "Cela ingane ifanise ukweqa okuthambile ukuze iqinise imisipha yemilenze.",
    printableSheetsCount: 2
  },
  {
    id: 'story-ubuntu-soup',
    title: 'The Village Ubuntu Pot',
    titleZu: 'Ibhodwe Elimnandi Le-Ubuntu',
    ageGroup: '4-5',
    theme: 'ubuntu_family',
    contentType: 'story',
    readingTimeMinutes: 4,
    summaryEn: 'When the autumn chill arrives, four friends bring one vegetable each to create a warm communal vegetable pot.',
    summaryZu: 'Lapho kufika amakhaza, abangane abane baletha imifino ukuze bapheke ibhodwe elimnandi lomphakathi.',
    coverEmoji: '🍲',
    themeColor: 'from-emerald-500 to-teal-600',
    keyVocabulary: [
      { en: 'Friend', zu: 'Umngani', icon: '🤝' },
      { en: 'Carrot', zu: 'Isaqathe', icon: '🥕' },
      { en: 'Potato', zu: 'Izambane', icon: '🥔' },
      { en: 'Together', zu: 'Ndawonye', icon: '❤️' }
    ],
    pages: [
      {
        pageNumber: 1,
        textEn: "The cool autumn wind whispered through the valley: 'Whoosh!' In the village square, Jabu had a big iron three-legged pot with pure water, but nothing else.",
        textZu: "Umoya wamakhaza wawuphephetha esigodini: 'Hhuuu!' Esigcawini sendawo, uJabu wayenebhodwe elikhulu elinezinyawo ezintathu elinamanzi kuphela.",
        illustrationEmoji: '🫕',
        dialoguePrompt: "Blow cool air like the wind: Whoooosh! How does cool air feel?",
        dialoguePromptZu: "Vuthela umoya njengamakhaza: Hhuuu! Uzizwa kanjani?"
      },
      {
        pageNumber: 2,
        textEn: "Thabo arrived carrying two sweet orange carrots. 'I will share with you!' he called. Plip! Plop! Into the pot they went.",
        textZu: "UThabo wafika ephethe izaqathe ezimbili eziwolintshi. 'Ngizokwabelana nawe!' ememeza. Qha! Phosho! Zangena ebhodweni.",
        illustrationEmoji: '🥕',
        dialoguePrompt: "What color were Thabo's carrots? What crunchy sound does a carrot make?",
        dialoguePromptZu: "Zazinamabala amanjani izaqathe? Wenza muphi umsindo uma uziluma?"
      },
      {
        pageNumber: 3,
        textEn: "Zola brought green spinach from her garden, and Neo brought round golden potatoes. Soon, fragrant steam filled the air with delicious warmth.",
        textZu: "UZola waletha isipinashi esiluhlaza, kanti uNeo waletha amazambane ayindilinga. Ngokushesha, iphunga elimnandi lagcwala umoya wonke.",
        illustrationEmoji: '🥬',
        dialoguePrompt: "Sniff the air: Mmm, smell the warm soup! What food do you love sharing?",
        dialoguePromptZu: "Hogela umoya: Mmm, leli phunga elimnandi! Yikuphi ukudla othanda ukwabelana ngakho?"
      },
      {
        pageNumber: 4,
        textEn: "All the children sat around the fire with their clay bowls. Jabu smiled: 'Umuntu ngumuntu ngabantu — a person is a person through other people.'",
        textZu: "Zonke izingane zahlala phansi ngasomlilweni nezitsha zazo zobumba. UJabu wamomotheka: 'Umuntu ngumuntu ngabantu.'",
        illustrationEmoji: '🥣',
        dialoguePrompt: "Talk about sharing: What toy or snack can we share with a friend today?",
        dialoguePromptZu: "Xoxani ngokwabelana: Isiphi isithombe noma ithoyizi esingabelana ngalo namuhla?"
      }
    ],
    parentReadingTipEn: "Talk about what 'sharing' means in your family. Ask your child how helping someone else makes their heart feel warm.",
    parentReadingTipZu: "Xoxani ngencazelo ye-Ubuntu emndenini. Buza ingane ukuthi ukusiza abanye kuyenza izizwe kanjani.",
    printableSheetsCount: 4
  },
  {
    id: 'story-khanya-stars',
    title: 'Khanya Counts the Karoo Stars',
    titleZu: 'UKhanya Ubala Izinkanyezi ZeKaroo',
    ageGroup: '4-5',
    theme: 'shapes_counting',
    contentType: 'story',
    readingTimeMinutes: 4,
    summaryEn: 'Under the vast Karoo sky, Khanya and her grandfather connect constellations and count twinkling stars.',
    summaryZu: 'Ngaphansi kwesibhakabhaka seKaroo, uKhanya nomkhulu wakhe babala izinkanyezi ezikhanyayo.',
    coverEmoji: '✨',
    themeColor: 'from-blue-600 to-indigo-800',
    keyVocabulary: [
      { en: 'Star', zu: 'Inkanyezi', icon: '⭐' },
      { en: 'Sky', zu: 'Isibhakabhaka', icon: '🌌' },
      { en: 'Count', zu: 'Bala', icon: '🔢' },
      { en: 'Bright', zu: 'Khanyayo', icon: '💡' }
    ],
    pages: [
      {
        pageNumber: 1,
        textEn: "Out in the wide Karoo, the night was so quiet you could hear the crickets singing: 'Chirp, chirp, chirp!' Khanya sat on the porch with Tata.",
        textZu: "EKaroo enkulu, ubusuku babuthule uyezwa nezigcilikisha zihlabelela: 'Cwe, cwe, cwe!' UKhanya wayehleli noTata kuvulandi.",
        illustrationEmoji: '🦗',
        dialoguePrompt: "Can you whisper like the crickets? Chirp, chirp, chirp!",
        dialoguePromptZu: "Ungahleba njengezigcilikisha? Cwe, cwe, cwe!"
      },
      {
        pageNumber: 2,
        textEn: "Khanya pointed her finger straight up: 'Look Tata! One giant star above the windmill, two diamonds next to the moon, and three little fireflies!'",
        textZu: "UKhanya wakhomba phezulu: 'Bheka Tata! Inkanyezi eyodwa enkulu phezu kwejika-moya, ezimbili eduze kwenyanga, nezintathu ezincane!'",
        illustrationEmoji: '🔭',
        dialoguePrompt: "Trace a star in the air with your finger. How many points does it have?",
        dialoguePromptZu: "Dweba inkanyezi emoyeni ngomunwe wakho. Inezihloko ezingaki?"
      },
      {
        pageNumber: 3,
        textEn: "Tata laughed: 'They look like dots in your tracing book! If we connect these four stars, what shape do you see?' 'A diamond kite!' shouted Khanya.",
        textZu: "UTata wahleka: 'Zibukeka njengamachashaza encwadini yakho yokudweba! Uma sixhuma lezi ezine, ubona umumo muni?' 'Idayimane lendiza!' kumemeza uKhanya.",
        illustrationEmoji: '💎',
        dialoguePrompt: "Find a diamond or rectangle shape in your room right now!",
        dialoguePromptZu: "Thola into enesimo sedayimane noma unxande ekamelweni lakho manje!"
      }
    ],
    parentReadingTipEn: "Connect story counting with real-world spatial orientation: pointing up, tracing imaginary shapes across the ceiling.",
    parentReadingTipZu: "Xhumanisa ukubala nokukhomba phezulu, phansi, kwesokudla nakwesobunxele.",
    printableSheetsCount: 3
  },
  {
    id: 'story-weaver-bird',
    title: 'The Clever Little Weaver Bird',
    titleZu: 'Inyoni Yomanyano Ehlakaniphile',
    ageGroup: '5-6',
    theme: 'animals',
    contentType: 'story',
    readingTimeMinutes: 5,
    summaryEn: 'Vusi the bright yellow weaver bird discovers that knotting and weaving grass requires patience and perseverance.',
    summaryZu: 'UVusi inyoni ephuzi ufunda ukuthi ukwaluka isidleke kudinga ukubekezela nokuzikhandla.',
    coverEmoji: '🌾',
    themeColor: 'from-yellow-400 to-amber-600',
    keyVocabulary: [
      { en: 'Bird', zu: 'Inyoni', icon: '🐦' },
      { en: 'Grass', zu: 'Utshani', icon: '🌿' },
      { en: 'Nest', zu: 'Isidleke', icon: '🪺' },
      { en: 'Try again', zu: 'Zama futhi', icon: '💪' }
    ],
    pages: [
      {
        pageNumber: 1,
        textEn: "Over the willow stream, Vusi flapped his bright yellow feathers. It was nest-building season! He found the longest, strongest strand of green river reed.",
        textZu: "Phezu komfula, uVusi wavukuza izimpaphe zakhe eziphuzi. Kwakuyisikhathi sokwakha izidleke! Wathola utshani obude futhi obuqinile bomfula.",
        illustrationEmoji: '🪶',
        dialoguePrompt: "Flap your arms like a weaver bird! Swish, swish, swish!",
        dialoguePromptZu: "Phaphazisa izingalo zakho njengenyoni! Phapha, phapha!"
      },
      {
        pageNumber: 2,
        textEn: "He looped the reed over the twig: in, out, under, over. But SNAP! The dry grass broke. Vusi hung his little beak in sadness.",
        textZu: "Waluka utshani egatsheni: ngaphakathi, ngaphandle, ngaphansi. Kodwa KHAHLA! Utshani baphuka. UVusi wehlisa uqhwaku lwakhe ngokudumala.",
        illustrationEmoji: '🍂',
        dialoguePrompt: "What do you do when a tower of blocks falls down or a drawing rips?",
        dialoguePromptZu: "Wenzani uma umbhoshongo wamathoyizi uwa phansi noma iphepha lidabuka?"
      },
      {
        pageNumber: 3,
        textEn: "Old Weaver Baba chirped from the reed bed: 'A strong nest is made of many tries. Pick a fresh green blade that bends without snapping.'",
        textZu: "UBaba omdala wezinyoni wahlabelela: 'Isidleke esiqinile sakhiwa ngemizamo eminingi. Khetha utshani obuluhlaza obugobekayo ngaphandle kokuphuka.'",
        illustrationEmoji: '🌱',
        dialoguePrompt: "Take a deep breath together. Say: 'I can try again!'",
        dialoguePromptZu: "Donsani umoya ndawonye. Yithi: 'Ngingazama futhi!'",
      },
      {
        pageNumber: 4,
        textEn: "Vusi picked a fresh blade. Over, under, loop and tie! By sunset, a snug, round hanging nest swung safely above the water. Vusi sang with pure joy!",
        textZu: "UVusi wacosha utshani obusha. Phezu, ngaphansi, waluka waphotha! Lapho ilanga lishona, isidleke esiyindilinga sasigxuma ngokuphepha phezu kwamanzi. UVusi wahlabelela ngenjabulo enkulu!",
        illustrationEmoji: '🪺',
        dialoguePrompt: "Celebrate finishing a tough task: What is something you practiced until you got good at it?",
        dialoguePromptZu: "Jabulela ukuqeda umsebenzi onzima: Yini oyijwayezile waze wayazi kahle?"
      }
    ],
    parentReadingTipEn: "Talk about 'Growth Mindset' and resilience. Remind your child that making mistakes is simply proof that their brain is growing.",
    parentReadingTipZu: "Fundisa ingane ngokubekezela nokuthi ukwenza amaphutha kuyingxenye yokufunda nokukhula komqondo.",
    printableSheetsCount: 4
  },
  {
    id: 'story-market-day',
    title: 'Market Day with Mama',
    titleZu: 'Usuku LweMakethe NoMama',
    ageGroup: '5-6',
    theme: 'food_culture',
    contentType: 'story',
    readingTimeMinutes: 5,
    summaryEn: 'Zinhle counts coins, compares weights of fresh fruit, and creates a colorful shopping list at the bustling township market.',
    summaryZu: 'UZinhle ubala izinhlamvu zemali, uqhathanisa izithelo, bese ebhala uhlu lwezitolo emakethe ephithizelayo.',
    coverEmoji: '🍉',
    themeColor: 'from-rose-500 to-pink-600',
    keyVocabulary: [
      { en: 'Market', zu: 'Imakethe', icon: '🏪' },
      { en: 'Fruit', zu: 'Izithelo', icon: '🍎' },
      { en: 'Coins', zu: 'Izinhlamvu Zemali', icon: '🪙' },
      { en: 'Heavy', zu: 'Kuyasinda', icon: '⚖️' }
    ],
    pages: [
      {
        pageNumber: 1,
        textEn: "The Saturday market was alive with laughter and music! Colorful canopies fluttered in the breeze, displaying bright pyramids of avocados, bananas, and sweet naartjies.",
        textZu: "Imakethe yangoMgqibelo yayigcwele ukuhleka nomculo! Amathende anemibala ayephephezela emoyeni, egcwele amapheya, ubhanana, nama-naartjies amnandi.",
        illustrationEmoji: '🍌',
        dialoguePrompt: "What is your favorite fruit to eat at home? What color is it?",
        dialoguePromptZu: "Isiphi isithelo osithanda kakhulu ekhaya? Sinamabala amanjani?"
      },
      {
        pageNumber: 2,
        textEn: "Mama gave Zinhle a little cloth bag: 'We need three green apples, five yellow bananas, and one round watermelon. Can you help me find them?'",
        textZu: "UMama wanika uZinhle isikhwama sendwangu: 'Sidinga ama-aphula amathathu aluhlaza, ubhanana oyisihlanu, nehabhula elilodwa elikhulu. Ungangisiza sizithole?'",
        illustrationEmoji: '🛍️',
        dialoguePrompt: "Let's count on our fingers: 3 apples + 5 bananas = how many fruits in total?",
        dialoguePromptZu: "Asibale ngeminwe yethu: ama-aphula amathathu no-bhanana abayisihlanu benza izithelo ezingaki zizonke?"
      },
      {
        pageNumber: 3,
        textEn: "At Mama Bongi's stall, Zinhle held a big watermelon in both hands: 'Whew! This is heavy!' Then she held a plum: 'This is light!'",
        textZu: "Esitolo sikaMama uBongi, uZinhle waphatha ihabhula ngezandla zombili: 'Hheyi! Leli liyasinda!' Bese ephatha iplamu: 'Leli lilula kakhulu!'",
        illustrationEmoji: '⚖️',
        dialoguePrompt: "Pretend to carry something very heavy... now pretend to blow a light feather!",
        dialoguePromptZu: "Zenze othwele into esinda kakhulu... manje yiba lula njengophaphe!"
      }
    ],
    parentReadingTipEn: "Practicing functional math during shopping or cooking gives numbers immediate, joyful real-world purpose.",
    parentReadingTipZu: "Ukubala ngenkathi uthenga noma upheka kwenza izibalo zibe nomqondo ojabulisayo empilweni yangempela.",
    printableSheetsCount: 4
  }
];
