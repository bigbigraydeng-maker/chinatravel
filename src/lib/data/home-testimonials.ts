/**
 * Curated real testimonials for the redesigned homepage wall (/preview-home).
 *
 * Plain server-safe data module (NOT a 'use client' file) so the Server
 * Component homepage can map over it at build time. Entries are copied verbatim
 * from the real reviews in src/components/Testimonials.tsx — a hand-picked
 * spread across the three Discovery routes. No fabricated content.
 */

export interface HomeTestimonial {
  id: number;
  name: string;
  location: string;
  tour: string;
  rating: number;
  text: string;
  avatarInitials: string;
}

export const homeTestimonials: HomeTestimonial[] = [
  {
    id: 101,
    name: 'Claire & Tom Mackenzie',
    location: 'Wellington',
    tour: 'A Tale of Two Cities',
    rating: 5,
    text: "The visa-free entry for Kiwis made booking so much easier than we expected — no embassy queues, just flights booked and off we went. Baker's itinerary was brilliantly paced: three days in Beijing (Forbidden City, hutong walk, Great Wall at Mutianyu at sunrise), then a bullet train to Xi'an for the Terracotta Warriors. Two of the world's great historical capitals in ten days. Couldn't have asked for more.",
    avatarInitials: 'CM',
  },
  {
    id: 103,
    name: 'Fiona Hewitt',
    location: 'Auckland',
    tour: 'A Tale of Two Cities',
    rating: 5,
    text: "I'd been putting off China for years, mostly the visa process. Then visa-free access opened for NZ passport holders and I had no more excuses. Baker sorted the rest: a great small group, a private morning at the Wall before the tour buses arrived, and a Xi'an family dinner that turned into a two-hour dumpling lesson. I've been talking about this trip non-stop since I got home.",
    avatarInitials: 'FH',
  },
  {
    id: 201,
    name: 'Simon & Kate Brennan',
    location: 'Christchurch',
    tour: 'Shanghai & Surroundings',
    rating: 5,
    text: "We've done a fair bit of Asia, but Shanghai & Surroundings completely redefined our benchmark for a well-designed tour. The contrast between the futuristic Bund skyline and the classical gardens of Suzhou made us feel like we'd moved through 1,000 years of history in two days. Hangzhou's West Lake at dusk was one of the most beautiful evenings of our lives.",
    avatarInitials: 'SB',
  },
  {
    id: 202,
    name: 'Graham & Shirley Voss',
    location: 'Hamilton',
    tour: 'Shanghai & Surroundings',
    rating: 5,
    text: "We knew the Shanghai skyline would be impressive. We didn't expect it to stop us mid-sentence. Baker timed our Bund walk perfectly — the lights came up as we arrived and the entire Pudong skyline reflected in the Huangpu River. Suzhou's Humble Administrator's Garden the next morning was a completely different kind of beauty. Worth every cent.",
    avatarInitials: 'GV',
  },
  {
    id: 301,
    name: 'Josh & Amy Tanner',
    location: 'Auckland',
    tour: 'Chongqing × Chengdu',
    rating: 5,
    text: "We nearly booked Beijing instead. So glad we didn't. Chongqing is like nothing else on earth — a neon-lit mountain city where the monorail passes through a skyscraper, the ancient Hongyadong stilt houses glow over the river at night, and the hotpot is gloriously fiery. Then Chengdu arrived like a deep breath: morning pandas, afternoon teahouse, Sichuan opera. Do not sleep on this one.",
    avatarInitials: 'JT',
  },
  {
    id: 303,
    name: 'Bec Connelly',
    location: 'Queenstown',
    tour: 'Chongqing × Chengdu',
    rating: 5,
    text: "Baker recommended Chongqing & Chengdu when I called asking about Beijing, and honestly — thank you. Chongqing was a revelation: the city climbs the hillside in layers, the food is extraordinary, and the Dazu Rock Carvings were a genuine surprise most tourists miss. Small group, guides who actually live in these cities, perfect balance of guided time and free evenings. Absolutely coming back.",
    avatarInitials: 'BC',
  },
];
