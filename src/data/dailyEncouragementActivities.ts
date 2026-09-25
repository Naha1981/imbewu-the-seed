import type { DailyEncouragementActivity, TimeOfDayPeriod } from '../types';

export const DAILY_ENCOURAGEMENT_ACTIVITIES: DailyEncouragementActivity[] = [
  // ==================== MORNING ACTIVITIES (05:00 - 11:59) ====================
  {
    id: 'morn-jojo-wash',
    timeOfDay: 'morning',
    titleEn: 'JoJo Tank Bubble Splash & 20-Count Song',
    titleZu: 'Ukugeza Izandla E-JoJo NeNgoma Yokubala',
    titleSt: 'Ho Hlatswa Matsoho Tankeng le Pina ya Palo',
    taglineEn: 'Wake up hands with a splash of water, bubbly foam, and 20 rhythm claps.',
    taglineZu: 'Vusa izandla ngamanzi ahlanzekile, amagwebu amhlophe, nokubala kuze kufike ku-20.',
    eldaCode: 'ELDA 1: Well-Being',
    eldaSummary: 'Hygiene routines, body awareness, and rhythmic bilateral motor control.',
    icon: '💧',
    durationMinutes: 5,
    accentColor: '#2A9D8F', // Teal / Green
    timeBadge: 'Morning Routine (Kusasa)',
    householdItems: [
      'Basin or JoJo tank tap',
      'Bar of hand soap',
      'Clean towel or dry kitchen cloth'
    ],
    stepsEn: [
      'Wet both hands under the tap or basin: "Fresh morning water, say sawubona to our fingers!"',
      'Rub the soap between palms until a fluffy white cloud of bubbles appears.',
      'Lather between each finger, on the backs of hands, and around thumbs while counting aloud together from 1 to 20: "Kunye, kubili, kuthathu... mashumi amabili!"',
      'Rinse with a quick splash, pat dry with the clean cloth, and give each other a high-ten with squeaky clean hands!'
    ],
    stepsZu: [
      'Thambisa izandla ngaphansi kwepompi: "Amanzi amnandi akusasa, bingelelani iminwe yethu!"',
      'Gcoba insipho ezandleni kuze kuvele amagwebu amhlophe.',
      'Geza phakathi kweminwe nangaphezulu ngenkathi nibala ndawonye: "Kunye, kubili, kuthathu... kuze kufike ku-20!"',
      'Hlanza ngokushesha, wesule ngendwangu ehlanzekile, bese nishayana izandla ngokujabula!'
    ],
    whyItMattersEn: 'The NCF emphasizes independent personal well-being habits. Associating hygiene with song turns a routine into a joyful daily anchor, while the 20-second count establishes intuitive one-to-one number correspondence.',
    whyItMattersZu: 'I-NCF igcizelela ukuzimela nokuhlanzeka komzimba. Ukucula ngenkathi ugeza kwakha injabulo nokufunda ukubala ngendlela elula.',
    culturalTouchpoint: 'Honouring South African water stewardship at the yard JoJo tank, building mindful water-saving and hygiene habits.',
    encouragementQuote: '“Clean hands and a joyful heart make the morning sun shine brighter in our home.”',
    encouragementQuoteAuthor: 'Gogo Nomsa’s Morning Blessing',
    ageAdaptation: {
      forAge3: 'Help them rub the palms together and lead the song while they focus on making giant bubbles.',
      forAge5: 'Ask them to inspect between each finger independently and count in alternating languages (English & isiZulu or Sesotho).'
    }
  },
  {
    id: 'morn-porridge-math',
    timeOfDay: 'morning',
    titleEn: 'Breakfast Porridge Spoon & Steam Count',
    titleZu: 'Ukubala Izinkezo zePholishi yaseKuseni',
    titleSt: 'Palo ya Dikgaba tsa Motoho wa Meso',
    taglineEn: 'Explore warm vs. cool, count 5 nourishing spoonfuls, and practice deep gentle breaths.',
    taglineZu: 'Bala izinkezo ezinhlanu zephalishi elimnandi, bese niphefumula kancane ukwehlisa ukushisa.',
    eldaCode: 'ELDA 4: Exploring Mathematics',
    eldaSummary: 'Early volume estimation, sensory temperature concepts, and 1-to-1 counting.',
    icon: '🥣',
    durationMinutes: 5,
    accentColor: '#F4A261', // Warm Amber
    timeBadge: 'Breakfast Time (Kusasa)',
    householdItems: [
      'Bowl of warm mealie-meal porridge (ipapa / motoho / oats)',
      '1 child tablespoon',
      'Small cup of milk or honey (optional)'
    ],
    stepsEn: [
      'Sit together with the warm bowl: "Feel the warmth on the outside of the bowl. Is it hot, warm, or cool?"',
      'Blow softly on the first spoonful together 3 times: "Cool it down like a morning breeze over the peach trees."',
      'Count 5 spoonfuls into the tummy: "One spoon for strong legs, two for bright eyes, three for big smiles..."',
      'If adding milk, watch the swirling white pattern make circles in the golden porridge!'
    ],
    stepsZu: [
      'Hlalani ndawonye nesitsha esifudumele: "Zizwe ukufudumala kwesitsha. Ingabe siyashisa noma siphilile?"',
      'Vuthelani kancane isinkezo sokuqala kathathu njengomoya obandayo wasekuseni.',
      'Bala izinkezo ezinhlanu: "Esinye samandla emlenze, esibili samahlo abukhali, esithathu sokumamatheka..."',
      'Uma uthela ubisi, bhekani indlela olwenza ngayo imidwebo emhlophe ephalishini!'
    ],
    whyItMattersEn: 'Connecting daily nourishment to mathematical concepts (more/less, temperature, counting sequence) embeds numeracy in emotionally safe, affectionate family rituals.',
    whyItMattersZu: 'Ukuxhumanisa ukudla nezibalo zokuqala kusiza umntwana aqonde amanani nezilinganiso ngaphakathi kothando lomndeni.',
    culturalTouchpoint: 'Anchored in the township morning ritual of steaming Mabele or Umphokoqo before the creche bell rings.',
    encouragementQuote: '“A full belly and a curious mind give our children wings for today.”',
    encouragementQuoteAuthor: 'BanaPele Early Learning Insight',
    ageAdaptation: {
      forAge3: 'Focus on breathing/blowing gently (oral motor tone) and counting 1, 2, 3 with finger cues.',
      forAge5: 'Ask them to predict: "How many spoons do you think are left in the bowl? Let’s test your guess!"'
    }
  },
  {
    id: 'morn-afro-affirmation',
    timeOfDay: 'morning',
    titleEn: 'Mirror Smile & Crown Affirmation',
    titleZu: 'Ukumamatheka Esibukweni Nesiqhenyo Sezinwele',
    titleSt: 'Ho Itlhatlhoba Seiponeng le Boikgantsho ba Moriri',
    taglineEn: 'Celebrate hair crowns, bright eyes, and speak strong Ubuntu morning affirmations.',
    taglineZu: 'Gubha ubuhle bezinwele zakho, amehlo akhanyayo, bese usho amazwi anamandla okuqala usuku.',
    eldaCode: 'ELDA 2: Identity & Belonging',
    eldaSummary: 'African heritage pride, self-worth, and expressive mother-tongue affirmations.',
    icon: '👑',
    durationMinutes: 5,
    accentColor: '#E07A5F', // Terra Cotta
    timeBadge: 'Getting Ready (Kusasa)',
    householdItems: [
      'Bathroom mirror, hand mirror, or front-facing phone screen',
      'Hair comb or soft brush'
    ],
    stepsEn: [
      'Stand together before the mirror and gently touch their hair (afro puff, cornrows, braided beads, or clean cut): "Look at your beautiful crown!"',
      'Make 3 playful faces in the mirror (lion roar, cheeky wink, bright sunrise smile) to wake up facial muscles.',
      'Place a hand on the heart and chant together with power: "I am strong! Nginamandla! I am kind! Nginothando! Today I will learn and play!"',
      'Finish with a warm squeeze hug and a forehead kiss for full confidence.'
    ],
    stepsZu: [
      'Yimani phambi kwesibuko nihlole izinwele: "Bheka isicoco sakho esihle esinezithunzi!"',
      'Yenzani ubuso obuhlekisayo obuthathu esibukweni ukuxegisa izicubu zobuso nokuhleka ndawonye.',
      'Beka isandla enhliziyweni bese nisho amazwi anamandla: "Nginamandla! Nginothando! Namhlanje ngizofunda ngiphumelele!"',
      'Qedani ngokugonana ngothando nokuqabula ebunzini ukuze aqale usuku ngenhliziyo egcwele ukuthula.'
    ],
    whyItMattersEn: 'Positive self-identity in early childhood directly correlates with resilience, social courage in the classroom, and healthy emotional self-regulation.',
    whyItMattersZu: 'Ukuziqhenya ngobuyena kwakha isisekelo esiqinile sokuzethemba nokungesabi lapho engena ekilasini nabanye abantwana.',
    culturalTouchpoint: 'Celebrating natural African hair textures (amaqhina, afro puffs, beads) and proud township identities.',
    encouragementQuote: '“When a child knows who they are, no wind can shake their roots.”',
    encouragementQuoteAuthor: 'African Proverb & BanaPele Curriculum',
    ageAdaptation: {
      forAge3: 'Keep the chant to 2 short words with clapping actions ("Strong! Kind! Happy!").',
      forAge5: 'Ask them to add their own descriptive superpower word (e.g. "Creative", "Fast runner", "Helpful sister").'
    }
  },

  // ==================== AFTERNOON ACTIVITIES (12:00 - 16:59) ====================
  {
    id: 'after-stoep-caps',
    timeOfDay: 'afternoon',
    titleEn: 'Stoep Bottle Cap Hop & AB Pattern Trail',
    titleZu: 'Ukugxuma Phezu Kwezivalo ZaseStupeni',
    titleSt: 'Ho Tlola Dikwahelo tsa Mabotlele Stupung',
    taglineEn: 'Line up colorful cold drink caps in a pattern on the stoep and balance-hop along the trail.',
    taglineZu: 'Hlela izivalo zamabhodlela ngemibala ehlukene bese ugxuma ngokucophelela.',
    eldaCode: 'ELDA 4: Exploring Mathematics',
    eldaSummary: 'Patterning (AB-AB), color sorting, and gross-motor single-leg balance.',
    icon: '🔴',
    durationMinutes: 5,
    accentColor: '#457B9D', // Deep Sky Blue
    timeBadge: 'Afternoon Play (Ntambama)',
    householdItems: [
      '6 to 10 plastic bottle caps (milk, coo-ee, or juice caps)',
      'Chalk piece or simply the line of the stoep tiles/pavement'
    ],
    stepsEn: [
      'Sit on the stoep or veranda with your cap collection: "Let’s create a secret stepping trail!"',
      'Lay out an alternating color pattern: Red cap, Blue cap, Red cap, Blue cap: "What color comes next?"',
      'Have your child point to each cap in the sequence while saying the color aloud.',
      'Now stand up! Challenge your child to hop or tiptoe along the trail without kicking any cap off the line.'
    ],
    stepsZu: [
      'Hlalani e-situpeni nezivalo zenu: "Ake sakhe umzila oyimfihlo!"',
      'Beka izivalo ngokulandelana kwemibala: Ebomvu, eluhlaza, ebomvu... "Imuphi umbala olandelayo?"',
      'Khombisa ingane ukuthi ibize umbala ngamunye ngokulandelana.',
      'Sukuma! Inselele: Gxuma ngomlenze owodwa eceleni komzila ngaphandle kokushaya isivalo!'
    ],
    whyItMattersEn: 'Pattern recognition (algebraic thinking) in preschool is one of the strongest predictive indicators of future math fluency. Adding gross-motor hopping anchors the pattern into spatial memory.',
    whyItMattersZu: 'Ukubona amaphethini kusebancane kuyisihluthulelo sokwenza kahle ezibalweni esikoleni esikhulu. Ukugxuma kusiza ukuxhumanisa ingqondo nomzimba.',
    culturalTouchpoint: 'Township children have ingeniously turned clean scrap bottle caps into games for generations—celebrating zero-cost resourceful play.',
    encouragementQuote: '“The best learning tools aren’t expensive toys; they are everyday treasures found right in our yards.”',
    encouragementQuoteAuthor: 'Township ECD Educator Guild',
    ageAdaptation: {
      forAge3: 'Use simple 2-color patterns (Red, Blue, Red, Blue) and let them jump with both feet together.',
      forAge5: 'Introduce an ABC pattern (Red, Blue, Yellow) or challenge them to hop on one foot!'
    }
  },
  {
    id: 'after-spaza-market',
    timeOfDay: 'afternoon',
    titleEn: 'Spaza Shop Pretend Fruit & Coin Market',
    titleZu: 'Umdlalo Wesitolo SeSpaza Nezithelo',
    titleSt: 'Papadi ya Lebenkele la Spaza le Ditholwana',
    taglineEn: 'Take turns being the spaza shopkeeper, counting 2-Rand coins and selling tasty fruit.',
    taglineZu: 'Shintshanani ngokuba umnikazi wesitolo, nibale imali yephepha, nithengise izithelo.',
    eldaCode: 'ELDA 6: Knowledge & Understanding of the World',
    eldaSummary: 'Community roles, practical transaction math, and polite social exchanges.',
    icon: '🏪',
    durationMinutes: 5,
    accentColor: '#E76F51', // Spaza Coral
    timeBadge: 'Stoep Playtime (Ntambama)',
    householdItems: [
      '3 to 5 real or toy fruits (apples, bananas, lemons, or smooth stones)',
      'Scraps of paper or cardboard drawn with "R2" and "R5" coins',
      'Small box or clean plastic shopping bag'
    ],
    stepsEn: [
      'Set up a mini counter using a chair or doorstep: "Welcome to Thabo’s Spaza!"',
      'Parent acts as customer first: "Sawubona bra! How much is one juicy red apple today?"',
      'Child decides price: "It is two Rands!" Hand over the paper R2 coin and practice a polite: "Ngiyabonga kakhulu!"',
      'Switch roles! Now the child buys from you and practices counting out their coins.'
    ],
    stepsZu: [
      'Yenzani ithebula lesitolo usebenzisa isihlalo: "Wamukelekile eSpaza sethu!"',
      'Umzali uba ngumthengi kuqala: "Sawubona! Malini leli-aphula namuhla?"',
      'Umntwana usho inani: "NgamaRandi amabili!" Mnike imali yephepha bese nisho: "Ngiyabonga kakhulu!"',
      'Shintshanani ngezindima! Manje umntwana nguyena othengayo abale izinhlamvu zemali.'
    ],
    whyItMattersEn: 'Role-play develops executive function, theory of mind (understanding other perspectives), and connects abstract numbers to real economic community life.',
    whyItMattersZu: 'Ukulingisa izindima kuthuthukisa ukuqonda abanye abantu, ukuxhumana ngokuhlonipha, nokusebenzisa izibalo empilweni yangempela.',
    culturalTouchpoint: 'The corner spaza shop is the heartbeat of South African township commerce and neighbourly connection.',
    encouragementQuote: '“Through play, a child rehearses the world they will one day lead.”',
    encouragementQuoteAuthor: 'Wordworks & SmartStart Collaborative Principle',
    ageAdaptation: {
      forAge3: 'Keep transactions to 1 coin for 1 item ("One apple for one coin").',
      forAge5: 'Introduce simple change: "I give you R5 for a R2 banana, how many Rands do I get back?"'
    }
  },
  {
    id: 'after-taxi-gumboot',
    timeOfDay: 'afternoon',
    titleEn: 'Kasi Minibus Sound Symphony & Gumboot Stomp',
    titleZu: 'Imisindo Yamatekisi Nokugxuma Kwezicathulo',
    titleSt: 'Medumo ya Dithekisi le Motjeko wa Dikhutshu',
    taglineEn: 'Imitate neighborhood sounds (taxi hoot, sweet broom, barking dog) and finish with a gumboot beat!',
    taglineZu: 'Lingisani imisindo yelokishi (ihoni letebhisi, umshanelo, inja) bese nishaya isigqi ngezinyawo!',
    eldaCode: 'ELDA 3: Communicating',
    eldaSummary: 'Auditory discrimination, phonological awareness, and cultural rhythmic movement.',
    icon: '🚐',
    durationMinutes: 5,
    accentColor: '#2B2D42', // Taxi Dark / Gold
    timeBadge: 'Active Energy (Ntambama)',
    householdItems: [
      'Gumboots, sneakers (takkies), or bare feet on the grass/mat',
      'Enthusiastic hands for clapping'
    ],
    stepsEn: [
      'Call out township sounds for your child to mimic: "How does the taxi hoot?" — "Peep peep! Bree Bree!"',
      '“How does Mama’s broom sweep the stoep?” — “Shhh, shhh, shhh!”',
      '“How does the neighborhood puppy announce the postman?” — “Wawu, wawu!”',
      'Now combine into a rhythm! Stomp-stomp-clap, stomp-stomp-clap like a proud gumboot dancer in the yard!'
    ],
    stepsZu: [
      'Bizani imisindo yelokishi ukuze umntwana alingise: "Likhala kanjani ihoni letebhisi?" — "Pipi pipi! Bree bree!"',
      '“Ukhala kanjani umshanelo wase stupeni?” — “Shhh, shhh, shhh!”',
      '“Ikhonkotha kanjani injana yomakhelwane?” — “Wawu, wawu!”',
      'Manje hlanganisani nesigqi! Shaya unyawo phansi kabili bese ushaya ihlombe njengomdanso wezicathulo!'
    ],
    whyItMattersEn: 'Phonological awareness (hearing nuances in sounds) is the #1 prerequisite for reading decoding. Gross-motor rhythm coordinates both brain hemispheres.',
    whyItMattersZu: 'Ukuzwa nokuphinda imisindo ehlukahlukene yisinyathelo sokuqala sokufunda ukubhala nokufunda izincwadi.',
    culturalTouchpoint: 'Celebrating the vibrant sonic landscape of Soweto and the deep historical pride of South African gumboot dancing.',
    encouragementQuote: '“Music and rhythm are how our ancestors preserved memory and joy.”',
    encouragementQuoteAuthor: 'BanaPele Cultural Heritage Note',
    ageAdaptation: {
      forAge3: 'Focus on pure sound imitation and clapping along to simple 2-beat rhythms.',
      forAge5: 'Create a 4-part pattern (Stomp, Clap, Taxi Peep, Clap) and let them lead you.'
    }
  },

  // ==================== EVENING ACTIVITIES (17:00 - 21:59) ====================
  {
    id: 'eve-ubuntu-gratitude',
    timeOfDay: 'evening',
    titleEn: 'Ubuntu Heart Pebble & Gratitude Circle',
    titleZu: 'Itshe Lothando LwaseKusihlwa (Ubuntu Chat)',
    titleSt: 'Lejoe la Teboho le Lerato la Mantsiboya',
    taglineEn: 'Pass a smooth pebble and share one person who brought warmth to your heart today.',
    taglineZu: 'Dlulisanani itshe elibushelelezi nibalule umuntu owenze inhliziyo yenu yamamatheka namhlanje.',
    eldaCode: 'ELDA 1: Well-Being',
    eldaSummary: 'Emotional regulation, empathy, community connection (Ubuntu), and reflective talk.',
    icon: '❤️',
    durationMinutes: 5,
    accentColor: '#D90429', // Warm Ubuntu Heart Red
    timeBadge: 'Evening Wind-Down (Kuhlwa)',
    householdItems: [
      '1 smooth garden pebble, clean wooden spoon, or favorite small toy (e.g. igalimoto wire car)'
    ],
    stepsEn: [
      'Sit closely together as twilight sets over the township rooftops.',
      'Hold the smooth pebble: "Whoever holds the Ubuntu stone has the gentle floor to speak from their heart."',
      'Parent shares first: "My heart smiled today when I saw your bright eyes after creche."',
      'Pass the pebble to child: "Who brought joy to your heart today? Who did you share a smile with?"',
      'End with the golden Ubuntu teaching: "Umuntu ngumuntu ngabantu — we are strong because we have each other."'
    ],
    stepsZu: [
      'Hlalani ndawonye ngokunethezeka ngenkathi kuhwalala elokishini.',
      'Bamba itshe elibushelelezi: "Obambe leli tshe ukhuluma ngokukhululeka ngenhliziyo yakhe."',
      'Umzali uqala kuqala: "Inhliziyo yami ithokoze lapho ngikubona umamatheka namhlanje."',
      'Nikeza umntwana itshe: "Ubani okujabulisile namuhla? Ubonise kanjani uthando kumngane wakho?"',
      'Phethani ngesisho sesintu: "Umuntu ngumuntu ngabantu — siqine ngoba sinothando phakathi kwethu."'
    ],
    whyItMattersEn: 'Reflective conversation before sleep lowers cortisol, strengthens parent-child attachment bonds, and develops emotional vocabulary so children can process their feelings safely.',
    whyItMattersZu: 'Ukuxoxa ngenhliziyo kusihlwa kuthulisa umqondo wengane, kunciphise ukukhathazeka, futhi kwakhe isibopho esiqinile sothando nomzali.',
    culturalTouchpoint: 'Rooted in the indigenous Southern African philosophy of Ubuntu (human interconnectedness and shared communal empathy).',
    encouragementQuote: '“A child surrounded by listening ears grows into an adult who speaks with wisdom.”',
    encouragementQuoteAuthor: 'Ubuntu Community Wisdom',
    ageAdaptation: {
      forAge3: 'Ask simple concrete questions: "Did you give a friend a hug or share a toy today?"',
      forAge5: 'Ask them to reflect: "If a friend was feeling sad at creche tomorrow, what could you do to show Ubuntu?"'
    }
  },
  {
    id: 'eve-torch-shadows',
    timeOfDay: 'evening',
    titleEn: 'Torchlight Wall Shadow Animals & Bedtime Tale',
    titleZu: 'Izilwane Zesithunzi Esibonini Sedonga',
    titleSt: 'Diphoofolo tsa Meriti Leboteng la Bosiu',
    taglineEn: 'Cast hand shadows against the bedroom wall and invent a short, soothing bedtime adventure.',
    taglineZu: 'Yenzani izithunzi zezilwane odongeni ngesibani sethoshi bese nixoxa indaba emnandi.',
    eldaCode: 'ELDA 5: Creativity',
    eldaSummary: 'Finger isolation, visual-spatial perception, and bedtime narrative structuring.',
    icon: '🔦',
    durationMinutes: 5,
    accentColor: '#8338EC', // Evening Violet / Torch
    timeBadge: 'Bedtime Calm (Kuhlwa)',
    householdItems: [
      'Flashlight, phone torch, or bedside lamp',
      'A plain wall, door, or hanging curtain'
    ],
    stepsEn: [
      'Dim the bedroom lights and point the torch at the wall from about 1.5 meters away.',
      'Cross your thumbs to create an eagle: "Here flies the wise eagle over the Orlando Towers!"',
      'Curve your fingers to make a talking puppy or a gentle bunny twitching its ears.',
      'Have your child place their hands in the beam and move their fingers to make the animals talk to each other.',
      'End with the animals yawning and curling up to sleep: "Goodnight little eagle, time to dream."'
    ],
    stepsZu: [
      'Cisha amalambu amakhulu bese ukhanyisa ithoshi odongeni.',
      'Phambanisa izithupha wenze inyoni: "Nansi inyoni ehlakaniphile indiza phezu kwelokishi!"',
      'Goba iminwe wenze injana ekhulumayo noma unogwaja ohambisa izindlebe.',
      'Yekela ingane ifake izandla zayo ekukhanyeni bese izilwane zixoxa ndawonye.',
      'Qedani lapho izilwane sezizela zilala: "Lala kahle nyoni encane, sekuyisikhathi samaphupho amnandi."'
    ],
    whyItMattersEn: 'Shadow play turns a dark bedroom into an enchanting creative theater, helping reduce bedtime fear of darkness while exercising intricate hand muscles.',
    whyItMattersZu: 'Ukudlala ngesithunzi kuxosha ukwesaba ubumnyama, kukhulise umcabango wokudala, futhi kuthuthukise izicubu zeminwe.',
    culturalTouchpoint: 'Echoing the timeless African fireside tradition (Izinganekwane) of nighttime oral storytelling.',
    encouragementQuote: '“Stories told in the dark light up the imagination of our children for a lifetime.”',
    encouragementQuoteAuthor: 'Wordworks Literacy Advocate',
    ageAdaptation: {
      forAge3: 'Make big animal sounds for whatever shape appears on the wall.',
      forAge5: 'Encourage them to invent the problem and solution in the story ("The bunny lost his carrot, where did he find it?").'
    }
  },
  {
    id: 'eve-blanket-snuggle',
    timeOfDay: 'evening',
    titleEn: 'Corner-to-Corner Blanket Fold & Thula Baba',
    titleZu: 'Ukugoqa Ingubo Ngokubambisana NeNgoma yeThula Baba',
    titleSt: 'Ho Mena Kobo Mmoho le Pina ya Boroko',
    taglineEn: 'Hold blanket corners together (rectangles and halves) and sing a soft, soothing traditional lullaby.',
    taglineZu: 'Bambani amagumbi engubo nihlanganyele ukugoqa, bese nicula iculo elithulisa ingqondo.',
    eldaCode: 'ELDA 1: Well-Being',
    eldaSummary: 'Bilateral coordination, tactile sensory compression, and acoustic relaxation.',
    icon: '🛏️',
    durationMinutes: 5,
    accentColor: '#3A86FF', // Serene Sleep Blue
    timeBadge: 'Bedtime Snuggle (Kuhlwa)',
    householdItems: [
      '1 cozy bedtime blanket or soft duvet'
    ],
    stepsEn: [
      'Each take two corners of the blanket: "Let’s match the corners together like matching puzzle pieces!"',
      'Step toward each other to fold in half: "From a giant rectangle into a square!"',
      'Tuck your child under the cozy folded blanket.',
      'Hum or sing the tender verse of Thula Baba softly:',
      '“Thula baba, thula sana, thul’umntwana, ephezu kombhede...”',
      'Whisper three things you love about them before turning off the light.'
    ],
    stepsZu: [
      'Bambani amagumbi amabili engubo ngamunye: "Ake sihlanganise amagumbi njengezicucu ze-puzzle!"',
      'Sondelanani ukuze nigoqe phakathi: "Kusuka kukanxande omkhulu kuya esikweleni!"',
      'Membese kahle ngengubo efudumele.',
      'Cula kancane ngomoya ophansi:',
      '“Thula baba, thula sana, tul’umam’uzofika ekuseni...”',
      'Mtshele izinto ezintathu ozithandayo ngaye ngaphambi kokucisha ugesi.'
    ],
    whyItMattersEn: 'Repetitive rhythmic singing combined with gentle deep pressure from bedding stimulates the parasympathetic nervous system, inducing restorative REM sleep crucial for cognitive consolidation.',
    whyItMattersZu: 'Ukucula ngokuthula nokufudumala kwengubo kuthulisa imizwa, kusize ingqondo igcine konke ekufundile namhlanje.',
    culturalTouchpoint: 'Thula Baba is South Africa’s beloved cradle song, passing generational maternal protection and peace.',
    encouragementQuote: '“Sleep is the soil in which the seeds of today’s learning take deep root.”',
    encouragementQuoteAuthor: 'Imbewu ECD Neuro-Development Guide',
    ageAdaptation: {
      forAge3: 'Help them tuck their favorite teddy or doll in first to practice caretaking.',
      forAge5: 'Ask them to identify the geometric shapes as you fold: "Is it a rectangle or square now?"'
    }
  },

  // ==================== NIGHT / EARLY DAWN (22:00 - 04:59) ====================
  {
    id: 'night-star-breathing',
    timeOfDay: 'night',
    titleEn: 'Soweto Star Breath & Calm Night Thoughts',
    titleZu: 'Ukuphefumula Kwezinkanyezi zaseSoweto',
    titleSt: 'Phefumolo ya Dinaledi tsa Bosiu',
    taglineEn: 'Deep soothing star breaths to relax growing muscles and usher in peaceful, safe dreams.',
    taglineZu: 'Ukuphefumula okuzolile okuphumuza umzimba okhulayo nokuletha amaphupho amnandi.',
    eldaCode: 'ELDA 1: Well-Being',
    eldaSummary: 'Autonomic nervous regulation, slow abdominal breathing, and tranquil bedtime safety.',
    icon: '✨',
    durationMinutes: 5,
    accentColor: '#1D3557', // Midnight Navy
    timeBadge: 'Night Quiet (Ubusuku)',
    householdItems: [
      'A soft pillow or the child’s own hand placed on their tummy'
    ],
    stepsEn: [
      'Place your hand gently on their tummy: "Imagine a bright shining star above the Orlando Towers in the night sky."',
      'Breathe in slowly through the nose as the tummy rises like a rising star: 1, 2, 3...',
      'Breathe out gently through the mouth as the star twinkles softly: 1, 2, 3, 4...',
      'Whisper: "Your body is safe, your mind is resting, tomorrow is full of wonders."'
    ],
    stepsZu: [
      'Beka isandla sakho esiswini sakhe: "Cabanga ngenkanyezi ekhanyayo esibhakabhakeni ebusuku."',
      'Donsa umoya kancane ngamakhala isisu siphakame: 1, 2, 3...',
      'Khipha umoya ngomlomo kancane: 1, 2, 3, 4...',
      'Hleba ngothando: "Uphephile, uphumulile, ikusasa likuphathele izinto ezinhle."'
    ],
    whyItMattersEn: 'Teaching children slow, intentional abdominal breathing equips them with a lifelong self-soothing tool for anxiety and dysregulation.',
    whyItMattersZu: 'Ukufundisa ingane ukuphefumula kancane kuyipha isikhali sempilo yonke sokuzilawula nokuzithoba lapho iphathwa novalo.',
    culturalTouchpoint: 'Night skies across Gauteng and the township rooftops, wrapping the child in neighborhood sanctuary.',
    encouragementQuote: '“Peace in the child’s heart tonight is peace for our nation tomorrow.”',
    encouragementQuoteAuthor: 'Archbishop Desmond Tutu’s Ubuntu Heritage',
    ageAdaptation: {
      forAge3: 'Place a small toy on their tummy and tell them to give the toy a gentle elevator ride with their breath.',
      forAge5: 'Ask them to imagine sending a warm thought of peace to someone in their class or family.'
    }
  }
];

export function getCurrentTimeOfDay(customDate?: Date): TimeOfDayPeriod {
  const date = customDate || new Date();
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 17) {
    return 'afternoon';
  } else if (hour >= 17 && hour < 22) {
    return 'evening';
  } else {
    return 'night';
  }
}

export function getTimeSlotInfo(period: TimeOfDayPeriod, language: string = 'en') {
  switch (period) {
    case 'morning':
      return {
        labelEn: 'Morning (05:00 - 11:59)',
        labelZu: 'Kusasa (05:00 - 11:59)',
        greetingEn: 'Good morning!',
        greetingZu: 'Sawubona kusasa!',
        kasiNote: 'Kusasa / Morning Rise & JoJo Spark',
        icon: '🌅',
        bgGradient: 'from-amber-50 to-orange-50 border-amber-200'
      };
    case 'afternoon':
      return {
        labelEn: 'Afternoon (12:00 - 16:59)',
        labelZu: 'Ntambama (12:00 - 16:59)',
        greetingEn: 'Good afternoon!',
        greetingZu: 'Sanibonani ntambama!',
        kasiNote: 'Ntambama / Stoep Play & Kasi Energy',
        icon: '☀️',
        bgGradient: 'from-sky-50 to-teal-50 border-sky-200'
      };
    case 'evening':
      return {
        labelEn: 'Evening (17:00 - 21:59)',
        labelZu: 'Kuhlwa (17:00 - 21:59)',
        greetingEn: 'Good evening!',
        greetingZu: 'Kuhlwa kamnandi!',
        kasiNote: 'Kuhlwa / Ubuntu Chat & Blanket Snuggle',
        icon: '🌙',
        bgGradient: 'from-indigo-50 to-purple-50 border-indigo-200'
      };
    case 'night':
      return {
        labelEn: 'Night (22:00 - 04:59)',
        labelZu: 'Ubusuku (22:00 - 04:59)',
        greetingEn: 'Sweet dreams!',
        greetingZu: 'Lala kahle!',
        kasiNote: 'Ubusuku / Star Breath & Quiet Rest',
        icon: '✨',
        bgGradient: 'from-slate-50 to-indigo-50 border-slate-200'
      };
  }
}

export function getActivitiesForTime(period: TimeOfDayPeriod): DailyEncouragementActivity[] {
  const matches = DAILY_ENCOURAGEMENT_ACTIVITIES.filter(a => a.timeOfDay === period);
  if (matches.length > 0) return matches;
  // fallback if none
  return DAILY_ENCOURAGEMENT_ACTIVITIES.filter(a => a.timeOfDay === 'morning');
}
