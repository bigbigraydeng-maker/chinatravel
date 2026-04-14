/**
 * First-person voice from Baker Gu on product + campaign pages (China tours only).
 * Optional relatedBlogSlug links to a supporting blog article where relevant.
 */
export type BakerTourVoice = {
  intro: string;
  /** Slug under /blog/... */
  relatedBlogSlug?: string;
};

const BAKER_VOICE_BY_SLUG: Record<string, BakerTourVoice> = {
  'silk-road': {
    intro:
      "I built our Silk Road journey for travellers who want the history of the trade routes without sacrificing comfort — the pacing lets you absorb Kashgar's markets, Dunhuang's caves, and the landscapes in between. This is the China I keep going back to myself.",
    relatedBlogSlug: 'why-silk-road-should-be-your-next-adventure',
  },
  'imperial-heritage': {
    intro:
      'I focus this Signature line on imperial Beijing and the great monuments — fewer hotel moves, more time inside the stories. If you want depth in the north before you add other regions, this is the spine I recommend.',
  },
  'grand-tour': {
    intro:
      "When clients ask for 'one big China trip,' I map this as a coherent arc — north, east, and highlights in between, with rail where it saves you grief. I only keep cities on the list if they earn their night.",
  },
  'landscapes': {
    intro:
      'I put this natural-China route together for people who have done the cities and want Jiuzhaigou-style drama and Zhangjiajie without a DIY logistics headache. I time the transfers so you are looking out the window, not staring at booking apps.',
  },
  'beijing-xian': {
    intro:
      "This is my go-to first-timer pairing: the Wall and the Forbidden City in Beijing, then the high-speed train west to Xi'an for the Terracotta Army. I keep the rhythm tight so you feel the story from empire to tomb — it's the tale I tell friends from New Zealand.",
    relatedBlogSlug: 'beijing-xian-first-visit-guide-nz',
  },
  essentials: {
    intro:
      'I designed Essentials as a broad China sweep — one itinerary that hits the icons so you do not have to choose Beijing or Shanghai alone on visit one. Expect full days; I have trimmed the fluff so the highlights stay honest.',
    relatedBlogSlug: 'first-trip-china-beijing-or-shanghai',
  },
  'shanghai-surroundings': {
    intro:
      "I love this Yangtze Delta loop: Shanghai's energy, then Suzhou and Hangzhou at a human pace — gardens, canals, real food. If you are drawn to Jiangnan rather than the northern capitals, this is the Discovery line I steer you toward.",
    relatedBlogSlug: 'shanghai-surroundings-jiangnan-guide-nz',
  },
  'yunnan-explorer': {
    intro:
      "Yunnan is where I send travellers who want colour and minority culture without altitude extremes everywhere — Lijiang, Dali, and Kunming balanced with driving days that make sense. I tweak seasons in the brief so you are not fighting the rain for nothing.",
  },
  beijing: {
    intro:
      'I keep this Beijing stopover dense: the Wall and the palace quarter without wasting nights. If you only have a few days from Auckland, I want you landing with a clear daily rhythm — that is how I travel when I am short on time.',
  },
  'beijing-express': {
    intro:
      'This is the express lane — hutongs, Tiananmen context, and a Wall day that fits a tight return ticket. I use it when clients say they might never come back; we still make the memories count.',
  },
  shanghai: {
    intro:
      'I treat Shanghai as a standalone pulse check on modern China — Bund walks, French Concession lanes, and evenings you can own. I pick hotels so you are not commuting away from what you came to see.',
    relatedBlogSlug: 'shanghai-surroundings-jiangnan-guide-nz',
  },
  'shanghai-express': {
    intro:
      'Short on days but want the skyline and Yu Garden done properly? I compress what I would show friends — no filler days, just the city at a walkable tempo.',
  },
  chengdu: {
    intro:
      'I start every Chengdu stopover with pandas and honest Sichuan food — the city is my reset button between heavier itineraries. If you are nervous about spice, I still want you to try one proper meal with guidance.',
    relatedBlogSlug: 'giant-pandas-chengdu-complete-guide',
  },
  guilin: {
    intro:
      'Guilin and the Li River are where I send photographers and families — the karst light is worth the humidity. I keep boat and village timing practical so you are not stuck in tourist bottlenecks all day.',
  },
  xian: {
    intro:
      "Xi'an is non-negotiable for me once someone cares about where China became an empire — the warriors reward an early start. I pair the museum pace with Muslim Quarter food so the day has contrast.",
    relatedBlogSlug: 'beijing-xian-first-visit-guide-nz',
  },
  guangzhou: {
    intro:
      'I use Guangzhou as a Cantonese food and trade-history gateway — less imperial theatre, more real port-city texture. Good if your flights hub through the south.',
  },
  'shanghai-suzhou': {
    intro:
      'I like this micro-loop: Shanghai nights, then Suzhou gardens before you fly — it is how I show Jiangnan when someone only has a long weekend.',
    relatedBlogSlug: 'shanghai-surroundings-jiangnan-guide-nz',
  },
  'shanghai-wuzhen': {
    intro:
      'Water-town atmosphere without pretending you have a week — I slot Wuzhen so you see canals and teahouses without dragging luggage through five cities.',
    relatedBlogSlug: 'shanghai-surroundings-jiangnan-guide-nz',
  },
  'guilin-surrounds': {
    intro:
      'I extended Guilin with surrounds so you get Yangshuo countryside and river time, not just a single boat snapshot. I hate rushing karst — you need a morning and an evening here.',
  },
  zhangjiajie: {
    intro:
      'Zhangjiajie is demanding on the legs but I still push for it when clients want those vertical peaks — I sequence cable cars and viewpoints so you are not in queues at the worst hours.',
    relatedBlogSlug: 'avatar-mountains-zhangjiajie-guide',
  },
  'guangzhou-shenzhen': {
    intro:
      'I pair Guangzhou and Shenzhen when you want southern dynamism and crossing into Hong Kong later feels natural — it is a different China than Beijing, and I explain that in the briefing.',
  },
  huangshan: {
    intro:
      'Huangshan is personal for me — sunrise on those granite steps is worth the hotel strategy. I only add it when fitness and weather windows are realistic.',
  },
};

/** Short labels for related blog links in the Baker block */
export const BAKER_RELATED_BLOG_LABELS: Record<string, string> = {
  'why-silk-road-should-be-your-next-adventure': 'Why I love the Silk Road',
  'beijing-xian-first-visit-guide-nz': 'My Beijing & Xi’an first-timer notes',
  'first-trip-china-beijing-or-shanghai': 'Beijing or Shanghai first?',
  'shanghai-surroundings-jiangnan-guide-nz': 'Shanghai & Jiangnan',
  'giant-pandas-chengdu-complete-guide': 'My Chengdu panda guide',
  'avatar-mountains-zhangjiajie-guide': 'Zhangjiajie field notes',
};

export function getBakerVoiceForTour(
  slug: string,
  name: string,
  destination: string
): BakerTourVoice | null {
  if (destination !== 'china') return null;
  const specific = BAKER_VOICE_BY_SLUG[slug];
  if (specific) return specific;
  return {
    intro: `I put this ${name} itinerary together for New Zealand travellers who want the route to feel human — hotels, pacing, and local guides are chosen so you spend your energy on the places, not on fixing problems on the ground. Ask our Auckland team if you want my eyes on the dates; I still review Discovery and Signature lines myself.`,
  };
}
