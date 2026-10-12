// Subjects of the emails the site sends that need logic (the rest are inline in their routes).
// All subjects must stay English — enforced by src/__tests__/email-subjects.test.ts.

export function travellerDetailsSubject(leadName: string, bookingRef?: string): string {
  return `Traveller details form — ${leadName}${bookingRef ? ` (${bookingRef})` : ''}`;
}

const DESTINATION_NAMES_EN: Record<string, string> = {
  auckland: 'Auckland',
  rotorua: 'Rotorua',
  queenstown: 'Queenstown',
  hobbiton: 'Hobbiton',
  waitomo: 'Waitomo',
  taupo: 'Taupo',
};

export function itineraryEmailSubject(days: number, destination: string): string {
  const name = DESTINATION_NAMES_EN[destination] ?? destination;
  return `Your ${days}-day ${name} itinerary`;
}
