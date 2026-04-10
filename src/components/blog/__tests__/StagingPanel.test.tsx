import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StagingPanel from '../StagingPanel';
import type { StagingContent } from '@/lib/types/staging';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => <div data-testid="md-preview">{children}</div>,
}));

function row(overrides: Partial<StagingContent>): StagingContent {
  return {
    id: 'r1',
    type: 'blog',
    title: 'Draft Post',
    slug: 'draft-post',
    content: '# Hello\n\nWorld',
    metadata: {
      description: 'Meta desc',
      keywords: ['a'],
      category: 'travel-tips',
    },
    socialVersions: { linkedin: 'L', xiaohongshu: 'XHS copy', weibo: 'WB' },
    status: 'draft',
    createdAt: '2026-04-01T10:00:00.000Z',
    updatedAt: '2026-04-01T11:00:00.000Z',
    submittedBy: 'Tester',
    ...overrides,
  };
}

describe('StagingPanel', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ success: false, message: 'stub' }),
    });
  });

  it('renders panel heading', () => {
    render(<StagingPanel initialItems={[row({})]} />);
    expect(screen.getByRole('heading', { name: /Blog staging panel/i })).toBeInTheDocument();
  });

  it('shows empty state when filters exclude all', async () => {
    const user = userEvent.setup();
    render(
      <StagingPanel
        initialItems={[
          row({ id: 'a', status: 'draft' }),
          row({ id: 'b', status: 'published', publishedAt: '2026-04-02T00:00:00.000Z' }),
        ]}
      />
    );
    await user.selectOptions(screen.getByLabelText('Status'), 'pending-review');
    expect(screen.getByText(/No rows match filters/i)).toBeInTheDocument();
  });

  it('filters by search on title', async () => {
    const user = userEvent.setup();
    render(
      <StagingPanel
        initialItems={[
          row({ id: '1', title: 'Packing list' }),
          row({ id: '2', title: 'Other' }),
        ]}
      />
    );
    await user.type(screen.getByLabelText('Search by title or slug'), 'Packing');
    expect(screen.getByText('Packing list')).toBeInTheDocument();
    expect(screen.queryByText('Other')).not.toBeInTheDocument();
  });

  it('opens and closes editor', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ id: 'x', title: 'Editable' })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByRole('region', { name: 'Editor' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('region', { name: 'Editor' })).not.toBeInTheDocument();
  });

  it('updates title in editor', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ title: 'T1' })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    const titleInput = screen.getByDisplayValue('T1');
    await user.clear(titleInput);
    await user.type(titleInput, 'New title');
    expect(screen.getByDisplayValue('New title')).toBeInTheDocument();
  });

  it('submit review changes status in table', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ status: 'draft' })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'Submit review' }));
    expect(screen.getByText(/pending review/i)).toBeInTheDocument();
  });

  it('approve sets approved', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ status: 'pending-review' })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'Approve' }));
    const table = screen.getByRole('table');
    expect(within(table).getByText(/^approved$/i)).toBeInTheDocument();
  });

  it('switches social tabs', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({})]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'LinkedIn' }));
    expect(screen.getByLabelText(/linkedin copy/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Weibo' }));
    expect(screen.getByLabelText(/weibo copy/i)).toBeInTheDocument();
  });

  it('shows char hint for LinkedIn', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ socialVersions: { linkedin: 'abc' } })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'LinkedIn' }));
    expect(screen.getByText(/Chars:/i)).toBeInTheDocument();
  });

  it('toggles preview viewport', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({})]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'Mobile' }));
    expect(screen.getByTestId('preview-wrap').className).toContain('max-w-sm');
  });

  it('renders markdown preview for blog tab', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ content: '# X' })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByTestId('md-preview')).toHaveTextContent('# X');
  });

  it('imports JSON and adds row', async () => {
    const user = userEvent.setup();
    const pkg = JSON.stringify({
      blog: {
        title: 'Imported',
        content: '# I',
        metadata: { description: 'd', keywords: ['k'], category: 'travel-tips' },
      },
    });
    render(<StagingPanel initialItems={[]} />);
    fireEvent.change(screen.getByLabelText('Import JSON'), { target: { value: pkg } });
    await user.click(screen.getByRole('button', { name: /Parse & add row/i }));
    const table = screen.getByRole('table');
    expect(within(table).getByText('Imported')).toBeInTheDocument();
  });

  it('publish calls API and shows notice', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ id: 'pub' })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: /Publish/i }));
    expect(global.fetch).toHaveBeenCalledWith('/api/blog-staging-publish', { method: 'POST' });
    expect(await screen.findByRole('status')).toHaveTextContent('stub');
  });

  it('delete confirms and removes row', async () => {
    const user = userEvent.setup();
    window.confirm = jest.fn(() => true);
    render(
      <StagingPanel
        initialItems={[
          row({ id: 'del', title: 'Gone soon' }),
          row({ id: 'keep', title: 'Stay' }),
        ]}
      />
    );
    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    await user.click(editButtons[0]);
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText('Gone soon')).not.toBeInTheDocument();
    expect(screen.getByText('Stay')).toBeInTheDocument();
  });

  it('publish history lists published rows', () => {
    render(
      <StagingPanel
        initialItems={[
          row({
            id: 'p',
            title: 'Live article',
            status: 'published',
            publishedAt: '2026-04-03T12:00:00.000Z',
            approvedBy: 'Ed',
          }),
        ]}
      />
    );
    const section = screen.getByRole('heading', { name: /Publish history/i }).closest('section');
    expect(section).not.toBeNull();
    if (section) {
      expect(within(section).getByText('Live article')).toBeInTheDocument();
    }
  });

  it('long markdown still renders preview region', async () => {
    const user = userEvent.setup();
    const longContent = '# T\n' + 'para '.repeat(500);
    render(<StagingPanel initialItems={[row({ content: longContent })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByTestId('md-preview')).toBeInTheDocument();
  });

  it('category filter works', async () => {
    const user = userEvent.setup();
    render(
      <StagingPanel
        initialItems={[
          row({ id: '1', metadata: { description: '', keywords: [], category: 'travel-tips' } }),
          row({
            id: '2',
            title: 'Culture piece',
            metadata: { description: '', keywords: [], category: 'culture' },
          }),
        ]}
      />
    );
    await user.selectOptions(screen.getByLabelText('Category'), 'culture');
    expect(screen.getByText('Culture piece')).toBeInTheDocument();
    expect(screen.queryByText('Draft Post')).not.toBeInTheDocument();
  });

  it('sort order select renders', () => {
    render(<StagingPanel initialItems={[row({})]} />);
    expect(screen.getByLabelText('Order')).toBeInTheDocument();
  });

  it('dismiss publish notice', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({})]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: /Publish/i }));
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('updates keyword field', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ metadata: { description: 'd', keywords: ['x'], category: 'travel-tips' } })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    const kw = screen.getByLabelText(/Keywords \(comma-separated\)/i);
    fireEvent.change(kw, { target: { value: 'a, b, c' } });
    expect(screen.getByDisplayValue('a, b, c')).toBeInTheDocument();
  });

  it('filters by type blog', async () => {
    const user = userEvent.setup();
    render(
      <StagingPanel
        initialItems={[
          row({ id: '1', title: 'Only blog', type: 'blog' }),
        ]}
      />
    );
    await user.selectOptions(screen.getByLabelText('Type'), 'blog');
    expect(screen.getByText('Only blog')).toBeInTheDocument();
  });

  it('shows only published when status filter applied', async () => {
    const user = userEvent.setup();
    render(
      <StagingPanel
        initialItems={[
          row({ id: 'd', status: 'draft', title: 'Drafty' }),
          row({
            id: 'p',
            status: 'published',
            title: 'PublishedRowXyz',
            publishedAt: '2026-01-01T00:00:00.000Z',
          }),
        ]}
      />
    );
    await user.selectOptions(screen.getByLabelText('Status'), 'published');
    expect(screen.queryByText('Drafty')).not.toBeInTheDocument();
    expect(within(screen.getByRole('table')).getByText('PublishedRowXyz')).toBeInTheDocument();
  });

  it('save draft keeps editor open', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ title: 'T' })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'Save draft' }));
    expect(screen.getByRole('region', { name: 'Editor' })).toBeInTheDocument();
  });

  it('updates meta description', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({})]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    const ta = screen.getByLabelText(/Meta description/i);
    fireEvent.change(ta, { target: { value: 'New meta' } });
    expect(screen.getByDisplayValue('New meta')).toBeInTheDocument();
  });

  it('opens Xiaohongshu tab', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ socialVersions: { xiaohongshu: 'xhs' } })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'Xiaohongshu' }));
    expect(screen.getByLabelText(/xiaohongshu copy/i)).toBeInTheDocument();
  });

  it('sort by created shows order control', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({})]} />);
    await user.selectOptions(screen.getByLabelText('Sort by'), 'createdAt');
    expect(screen.getByLabelText('Sort by')).toHaveValue('createdAt');
  });

  it('import invalid json does nothing visible in table', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ title: 'Existing' })]} />);
    fireEvent.change(screen.getByLabelText('Import JSON'), { target: { value: 'not json' } });
    await user.click(screen.getByRole('button', { name: /Parse & add row/i }));
    const table = screen.getByRole('table');
    expect(within(table).queryByText('Imported')).not.toBeInTheDocument();
    expect(within(table).getByText('Existing')).toBeInTheDocument();
  });

  it('reject delete keeps row', async () => {
    const user = userEvent.setup();
    window.confirm = jest.fn(() => false);
    render(<StagingPanel initialItems={[row({ title: 'Keep me' })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(within(screen.getByRole('table')).getByText('Keep me')).toBeInTheDocument();
  });

  it('desktop preview removes mobile max width', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({})]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    await user.click(screen.getByRole('button', { name: 'Mobile' }));
    expect(screen.getByTestId('preview-wrap').className).toContain('max-w-sm');
    await user.click(screen.getByRole('button', { name: 'Desktop' }));
    expect(screen.getByTestId('preview-wrap').className).not.toContain('max-w-sm');
  });

  it('changes category in editor', async () => {
    const user = userEvent.setup();
    render(<StagingPanel initialItems={[row({ metadata: { description: '', keywords: [], category: 'travel-tips' } })]} />);
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    const categorySelects = screen.getAllByLabelText('Category');
    await user.selectOptions(categorySelects[categorySelects.length - 1], 'culture');
    expect(categorySelects[categorySelects.length - 1]).toHaveValue('culture');
  });
});
