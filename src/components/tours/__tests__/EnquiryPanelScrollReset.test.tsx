import { render, fireEvent } from '@testing-library/react';
import EnquiryPanelScrollReset from '@/components/tours/EnquiryPanelScrollReset';

/**
 * On large screens the enquiry sidebar scrolls inside itself because it is
 * taller than the window. A link to `#enquiry` scrolls the PAGE to the
 * sidebar but does not reset the sidebar's own scroll position, so a visitor
 * who had scrolled the sidebar down would land on testimonials instead of the
 * form. These tests pin the behaviour that clicking such a link puts every
 * marked panel back at the top.
 */
describe('EnquiryPanelScrollReset', () => {
  it('puts the panel back at the top when a link to #enquiry is clicked', () => {
    const { getByTestId } = render(
      <>
        <div data-enquiry-panel data-testid='panel'>
          panel
        </div>
        <a href='#enquiry' data-testid='enquire'>
          <span data-testid='enquire-label'>Enquire</span>
        </a>
        <a href='#faq' data-testid='faq'>
          FAQ
        </a>
        <EnquiryPanelScrollReset />
      </>,
    );

    const panel = getByTestId('panel');
    panel.scrollTop = 300;

    fireEvent.click(getByTestId('enquire'));

    expect(panel.scrollTop).toBe(0);
  });

  it('also works when the click lands on an element inside the link', () => {
    const { getByTestId } = render(
      <>
        <div data-enquiry-panel data-testid='panel'>
          panel
        </div>
        <a href='#enquiry' data-testid='enquire'>
          <span data-testid='enquire-label'>Enquire</span>
        </a>
        <a href='#faq' data-testid='faq'>
          FAQ
        </a>
        <EnquiryPanelScrollReset />
      </>,
    );

    const panel = getByTestId('panel');
    panel.scrollTop = 300;

    fireEvent.click(getByTestId('enquire-label'));

    expect(panel.scrollTop).toBe(0);
  });

  it('leaves the panel alone for other links', () => {
    const { getByTestId } = render(
      <>
        <div data-enquiry-panel data-testid='panel'>
          panel
        </div>
        <a href='#enquiry' data-testid='enquire'>
          <span data-testid='enquire-label'>Enquire</span>
        </a>
        <a href='#faq' data-testid='faq'>
          FAQ
        </a>
        <EnquiryPanelScrollReset />
      </>,
    );

    const panel = getByTestId('panel');
    panel.scrollTop = 300;

    fireEvent.click(getByTestId('faq'));

    expect(panel.scrollTop).toBe(300);
  });

  it('resets every marked panel', () => {
    const { getByTestId } = render(
      <>
        <div data-enquiry-panel data-testid='panel-one'>
          panel one
        </div>
        <div data-enquiry-panel data-testid='panel-two'>
          panel two
        </div>
        <a href='#enquiry' data-testid='enquire'>
          <span data-testid='enquire-label'>Enquire</span>
        </a>
        <a href='#faq' data-testid='faq'>
          FAQ
        </a>
        <EnquiryPanelScrollReset />
      </>,
    );

    const panelOne = getByTestId('panel-one');
    const panelTwo = getByTestId('panel-two');
    panelOne.scrollTop = 300;
    panelTwo.scrollTop = 300;

    fireEvent.click(getByTestId('enquire'));

    expect(panelOne.scrollTop).toBe(0);
    expect(panelTwo.scrollTop).toBe(0);
  });

  it('stops listening after it is unmounted', () => {
    const { unmount } = render(
      <>
        <div data-enquiry-panel data-testid='panel'>
          panel
        </div>
        <a href='#enquiry' data-testid='enquire'>
          <span data-testid='enquire-label'>Enquire</span>
        </a>
        <a href='#faq' data-testid='faq'>
          FAQ
        </a>
        <EnquiryPanelScrollReset />
      </>,
    );

    unmount();

    const survivingPanel = document.createElement('div');
    survivingPanel.setAttribute('data-enquiry-panel', '');
    document.body.appendChild(survivingPanel);

    const survivingLink = document.createElement('a');
    survivingLink.setAttribute('href', '#enquiry');
    document.body.appendChild(survivingLink);

    survivingPanel.scrollTop = 300;

    fireEvent.click(survivingLink);

    expect(survivingPanel.scrollTop).toBe(300);

    document.body.removeChild(survivingPanel);
    document.body.removeChild(survivingLink);
  });
});
