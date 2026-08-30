// jest.setup.js imports '@testing-library/jest-dom', which registers the DOM
// matchers at runtime. That file is .js and outside tsconfig's include globs,
// so the ambient `jest.Matchers` augmentation never reaches the type checker.
// This reference pulls it in so `npx tsc --noEmit` sees the same matchers the
// tests actually use.
import '@testing-library/jest-dom';
