/**
 * generateHowToSchema — SERP step-carousel rich result contract.
 *
 * Google renders HowTo schema as a numbered step carousel in the SERP. The
 * schema shape is strict (@type / step / HowToStep / position), so pin it —
 * a silent field rename would kill the rich result without any test failure.
 */
import { generateHowToSchema } from '@/lib/schema-seo';

describe('generateHowToSchema', () => {
  it('emits the required Schema.org fields for HowTo rich results', () => {
    const schema = generateHowToSchema('How to enter China visa-free', 'Four steps at the border.', [
      { name: 'Passport valid', text: 'NZ passport, 6+ months validity.' },
      { name: 'Return ticket', text: 'Departure within 30 days.' },
    ]);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('HowTo');
    expect(schema.name).toBe('How to enter China visa-free');
    expect(schema.description).toBe('Four steps at the border.');
    expect(schema.step).toHaveLength(2);
  });

  it('numbers steps starting at 1 and preserves order', () => {
    const schema = generateHowToSchema('Test', 'Test description', [
      { name: 'A', text: 'a' },
      { name: 'B', text: 'b' },
      { name: 'C', text: 'c' },
    ]);

    expect(schema.step[0]).toEqual({
      '@type': 'HowToStep',
      position: 1,
      name: 'A',
      text: 'a',
    });
    expect(schema.step[2].position).toBe(3);
    expect(schema.step[2].name).toBe('C');
  });

  it('handles an empty step array without throwing', () => {
    const schema = generateHowToSchema('Empty', 'No steps', []);
    expect(schema.step).toEqual([]);
  });
});
