'use client';

import { useEffect } from 'react';

/**
 * On large screens the enquiry sidebar scrolls inside itself because it is
 * taller than the window. A link to `#enquiry` scrolls the PAGE to the
 * sidebar but does not reset the sidebar's own scroll position, so a visitor
 * who had scrolled the sidebar down would land on testimonials instead of the
 * form. When such a link is clicked, every element marked
 * `data-enquiry-panel` is put back at the top.
 */
export default function EnquiryPanelScrollReset(): null {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (!(event.target instanceof Element)) {
        return;
      }
      if (!event.target.closest('a[href="#enquiry"]')) {
        return;
      }
      document
        .querySelectorAll<HTMLElement>('[data-enquiry-panel]')
        .forEach((panel) => {
          panel.scrollTop = 0;
        });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
