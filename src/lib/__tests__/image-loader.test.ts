import imageLoader from '../image-loader';

const SUPABASE = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/great-wall-mist/great-wall-mist.jpg';

describe('imageLoader — Supabase transform', () => {
  it('asks for the whole photo scaled down (resize=contain), not a centre crop at the original height', () => {
    const url = imageLoader({ src: SUPABASE, width: 640 });
    expect(url).toBe(
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/render/image/public/tour-images/tours/great-wall-mist/great-wall-mist.jpg?width=640&quality=75&resize=contain'
    );
  });

  it('leaves local paths untouched', () => {
    expect(imageLoader({ src: '/images/tours/three-gorges-cruise-wide-2000.jpg', width: 640 })).toBe(
      '/images/tours/three-gorges-cruise-wide-2000.jpg'
    );
  });
});
