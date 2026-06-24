/**
 * Curated list of kosher and vegan-friendly restaurants in Israel.
 * No ratings, review counts, or exact prices — those change frequently.
 * Kosher status and menus can change; always verify before visiting.
 */
export interface Restaurant {
  id: string;
  name: string;
  city: string;
  area: string;
  /** Display label, e.g. 'Vegan', 'Kosher dairy', 'Vegan-friendly' */
  dietLabel: string;
  /** Machine tags used by the filter: vegan, vegetarian, kosher-dairy, kosher-meat, kosher, vegan-friendly */
  dietTags: string[];
  cuisine: string;
  description: string;
}

export const RESTAURANTS: Restaurant[] = [
  // Tel Aviv — Vegan / Plant-based
  {
    id: 'anastasia-tl',
    name: 'Anastasia',
    city: 'Tel Aviv',
    area: 'Gordon Beach area',
    dietLabel: 'Fully vegan',
    dietTags: ['vegan'],
    cuisine: 'Vegan café',
    description:
      "One of Israel's pioneer plant-based cafés. Known for inventive vegan brunch dishes, smoothie bowls, raw desserts, and baked goods. Buzzy Gordon Beach neighbourhood.",
  },
  {
    id: 'meshek-barzilay',
    name: 'Meshek Barzilay',
    city: 'Tel Aviv',
    area: 'Neve Tzedek',
    dietLabel: 'Fully vegan',
    dietTags: ['vegan'],
    cuisine: 'Plant-based Mediterranean',
    description:
      "Acclaimed farm-to-table restaurant in leafy Neve Tzedek with a fully plant-based menu. Ingredients come from the owners' small farm; the brunch and dinner menus change seasonally.",
  },
  {
    id: 'green-cat',
    name: 'Green Cat',
    city: 'Tel Aviv',
    area: 'Florentin',
    dietLabel: 'Fully vegan',
    dietTags: ['vegan'],
    cuisine: 'Vegan Italian / pizza',
    description:
      'Casual vegan pizzeria and trattoria in the Florentin neighbourhood. Popular for plant-based wood-fired pies, fresh pasta, and Italian-style mains — all 100% animal-free.',
  },
  {
    id: 'opa-tl',
    name: 'Opa',
    city: 'Tel Aviv',
    area: 'City centre',
    dietLabel: 'Fully vegan',
    dietTags: ['vegan'],
    cuisine: 'Plant-based Mediterranean',
    description:
      'Plant-based fine-dining spot praised for creative mezze platters, seasonal Mediterranean mains, and elegant vegan desserts. Good for a special-occasion plant-based dinner.',
  },
  // Tel Aviv — Kosher
  {
    id: 'miznon-tl',
    name: 'Miznon',
    city: 'Tel Aviv',
    area: 'HaCarmel Market area',
    dietLabel: 'Kosher',
    dietTags: ['kosher', 'vegan-friendly'],
    cuisine: 'Israeli street food',
    description:
      'Lively kosher pita-sandwich spot by chef Eyal Shani. Famous for its whole roasted cauliflower, lamb chops, and ratatouille pita. Vegan pita options are available. Multiple Tel Aviv branches.',
  },
  {
    id: 'messa-tl',
    name: 'Messa',
    city: 'Tel Aviv',
    area: "Ha'Arba'a St",
    dietLabel: 'Kosher (meat)',
    dietTags: ['kosher-meat', 'kosher'],
    cuisine: 'Modern Israeli kosher',
    description:
      'Upscale kosher meat restaurant with a long-running reputation for tasting-menu dinners of refined modern Israeli cuisine. Smart-casual setting; advance booking recommended.',
  },
  // Tel Aviv — Vegan-friendly (not kosher-certified)
  {
    id: 'abu-hassan-jaffa',
    name: 'Hummus Abu Hassan',
    city: 'Tel Aviv / Jaffa',
    area: 'Old Jaffa',
    dietLabel: 'Vegan-friendly (not kosher-certified)',
    dietTags: ['vegan-friendly'],
    cuisine: 'Hummus bar',
    description:
      'Legendary hummusiya in Old Jaffa, beloved by locals for decades. Hummus, ful medames, and extras are all naturally plant-based; open on Shabbat. No formal kosher certificate.',
  },
  // Jerusalem — Vegan / Vegetarian
  {
    id: 'village-green-jlm',
    name: 'Village Green',
    city: 'Jerusalem',
    area: 'Ben Yehuda / City centre',
    dietLabel: 'Vegan & vegetarian',
    dietTags: ['vegan', 'vegetarian'],
    cuisine: 'Vegetarian & vegan café',
    description:
      'Long-running self-service café near the Ben Yehuda pedestrian street. Generous vegetarian and vegan plates, hot dishes, salads, and soups — a reliable affordable option for plant-based travellers in Jerusalem.',
  },
  // Jerusalem — Kosher
  {
    id: 'tmol-shilshom',
    name: 'Tmol Shilshom',
    city: 'Jerusalem',
    area: 'Nahalat Shiva',
    dietLabel: 'Kosher (dairy)',
    dietTags: ['kosher-dairy', 'kosher', 'vegetarian'],
    cuisine: 'Kosher dairy literary café',
    description:
      'Intimate kosher dairy café set inside a stone-walled 19th-century building in Nahalat Shiva. Quiches, salads, pasta, and cakes on the menu; the café doubles as a bookshop and hosts regular literary events — a Jerusalem institution.',
  },
  {
    id: 'chakra-jlm',
    name: 'Chakra',
    city: 'Jerusalem',
    area: 'King George St',
    dietLabel: 'Kosher (meat)',
    dietTags: ['kosher-meat', 'kosher'],
    cuisine: 'Modern Israeli kosher',
    description:
      'Well-regarded kosher meat restaurant on King George Street. Buzzing evening atmosphere, broad wine list, and contemporary Israeli dishes. Popular with both locals and visitors.',
  },
  {
    id: 'miznon-jlm',
    name: 'Miznon (Mahane Yehuda)',
    city: 'Jerusalem',
    area: 'Mahane Yehuda Market',
    dietLabel: 'Kosher',
    dietTags: ['kosher', 'vegan-friendly'],
    cuisine: 'Israeli street food',
    description:
      "Jerusalem branch of Eyal Shani's famous kosher pita chain, located in the Mahane Yehuda market. Vegan pita options available alongside meat and fish pitas.",
  },
  {
    id: 'pasta-basta-jlm',
    name: 'Pasta Basta',
    city: 'Jerusalem',
    area: 'Nahalat Shiva',
    dietLabel: 'Kosher (dairy)',
    dietTags: ['kosher-dairy', 'kosher', 'vegetarian'],
    cuisine: 'Kosher Italian pasta',
    description:
      'Compact and beloved kosher dairy pasta bar near Zion Square. Fresh-made pasta in generous portions at reasonable prices — a local favourite for a quick, hearty kosher lunch.',
  },
  // Haifa
  {
    id: 'douzan-haifa',
    name: 'Douzan',
    city: 'Haifa',
    area: 'German Colony',
    dietLabel: 'Vegan-friendly',
    dietTags: ['vegan-friendly', 'vegetarian'],
    cuisine: 'Arab-Israeli Mediterranean',
    description:
      "Celebrated restaurant in Haifa's German Colony neighbourhood. Seasonally driven Arab-Israeli Mediterranean menu with an extensive selection of mezze and salads — many dishes are naturally vegan or vegetarian.",
  },
  // Nazareth
  {
    id: 'diana-nazareth',
    name: 'Diana',
    city: 'Nazareth',
    area: 'City centre',
    dietLabel: 'Vegan-friendly',
    dietTags: ['vegan-friendly'],
    cuisine: 'Arab-Israeli grill',
    description:
      'Landmark Arab-Israeli restaurant in Nazareth with a wide spread of mezze — hummus, baba ganoush, tabbouleh — that makes the menu excellent for plant-based eaters. Known equally for its grilled meats.',
  },
  // Eilat
  {
    id: 'last-refuge-eilat',
    name: 'The Last Refuge',
    city: 'Eilat',
    area: 'Lagoon area',
    dietLabel: 'Vegan-friendly',
    dietTags: ['vegan-friendly'],
    cuisine: 'Seafood & Mediterranean',
    description:
      "Eilat's most famous fish restaurant, serving fresh Red Sea catch in a nautical-themed dining room by the lagoon. The broad menu includes salads and mezze suitable for pescatarian and vegan-friendly diners.",
  },
];

/** All unique city values for the filter. */
export const CITIES = [...new Set(RESTAURANTS.map((r) => r.city))].sort();

/** Diet filter options shown in the UI. */
export const DIET_FILTERS = [
  { value: 'all', label: 'All dietary types' },
  { value: 'vegan', label: 'Fully vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'kosher', label: 'Any kosher' },
  { value: 'kosher-dairy', label: 'Kosher dairy' },
  { value: 'kosher-meat', label: 'Kosher meat' },
  { value: 'vegan-friendly', label: 'Vegan-friendly' },
];
