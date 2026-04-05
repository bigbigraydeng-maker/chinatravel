// Google Analytics 4 configuration
// Requires NEXT_PUBLIC_GA_ID environment variable

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track pageview
export const pageview = (url: string) => {
  if (!GA_ID) return;

  (window as any).gtag?.config({
    page_path: url,
  });
};

// Track custom events
export const event = (action: string, params?: Record<string, any>) => {
  if (!GA_ID) return;

  (window as any).gtag?.event(action, params);
};

// Common events
export const trackTourView = (tourName: string, destination: string) => {
  event('view_item', {
    items: [
      {
        item_name: tourName,
        item_category: destination,
        item_category2: 'tour',
      },
    ],
  });
};

export const trackGuideView = (guideName: string, destination: string) => {
  event('view_item', {
    items: [
      {
        item_name: guideName,
        item_category: destination,
        item_category2: 'guide',
      },
    ],
  });
};

export const trackInquiry = (inquiryType: string) => {
  event('begin_checkout', {
    items: [
      {
        item_name: inquiryType,
        item_category: 'inquiry',
      },
    ],
  });
};

export const trackContactForm = () => {
  event('contact', {
    contact_type: 'inquiry_form',
  });
};

export const trackTailorMadeClick = () => {
  event('view_item_list', {
    item_list_name: 'tailor_made_cta',
  });
};
