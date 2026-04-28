// Google Analytics 4 gtag.js type definitions
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'consent' | 'set',
      targetId: string,
      config?: { [key: string]: any }
    ) => void;
  }
}

export {};
