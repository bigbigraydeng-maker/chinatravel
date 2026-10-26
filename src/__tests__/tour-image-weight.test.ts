/**
 * Tour pages and tour cards point at pictures stored in public/images/tours. The site's image
 * loader returns a local file unchanged, and the photo gallery at the top of a tour page shows its
 * pictures unresized too, so every visitor downloads the file exactly as it sits on disk. On
 * 2026-10-21 the Natural China ad page was found to ship a 3.5 MB hero picture (mobile Largest
 * Contentful Paint 32 s on a slow phone connection) and a 12 MB gallery picture; they were replaced
 * by compressed copies, and the cards and photo galleries of the three advertised tours (A Tale of
 * Two Cities, Best of China, Shanghai & Surroundings) followed. This test keeps that from coming
 * back: no local picture that an active tour (hero, gallery or the photo gallery of its page) or a
 * tour card points at may be bigger than 500 KB, except the ones listed below as still waiting to
 * be compressed. The list may only shrink: an entry that is no longer needed must be deleted from
 * it, and a picture of an advertised tour may never be on it.
 */

import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { galleryForTour } from '@/components/upgrade/UpgradedTourPage';
import { getAllActiveTours } from '@/lib/data/tours';
import { getTourCardMedia } from '@/lib/tour-card-media';

const LIMIT_BYTES = 500 * 1024;

// The tours that ads send visitors to.
const ADVERTISED_TOURS = ['beijing-xian', 'essentials', 'shanghai-surroundings'];

// Still to compress, next round: the Silk Road and Imperial Heritage cards, the two Guilin
// stopovers, and the photo galleries of the Yunnan and Zhangjiajie tours.
const KNOWN_HEAVY: readonly string[] = [
  '/images/tours/silk-road-wall.jpg',
  '/images/tours/forbidden-city-aerial.jpg',
  '/images/tours/li-river-karst-boats.jpg',
  '/images/tours/yangshuo-karst-aerial.jpg',
];

function localPictures(): Map<string, string[]> {
  const pictures = new Map<string, string[]>();

  const add = (path: string, user: string) => {
    if (!path.startsWith('/')) {
      return;
    }
    const users = pictures.get(path);
    if (users) {
      users.push(user);
    } else {
      pictures.set(path, [user]);
    }
  };

  for (const tour of getAllActiveTours()) {
    add(tour.heroImage, `${tour.slug}: hero`);
    for (const picture of tour.gallery) {
      add(picture, `${tour.slug}: gallery`);
    }
    add(getTourCardMedia(tour).src, `${tour.slug}: card`);
    for (const photo of galleryForTour(tour)) {
      add(photo.src, `${tour.slug}: page photos`);
    }
  }

  return pictures;
}

function sizeOf(path: string): number {
  return statSync(join(process.cwd(), 'public', path)).size;
}

describe('local tour pictures stay light', () => {
  it('every local picture a tour or tour card points at exists', () => {
    const missing = [...localPictures().keys()].filter(
      (path) => !existsSync(join(process.cwd(), 'public', path)),
    );

    expect(missing).toEqual([]);
  });

  it('no local picture is heavier than 500 KB unless it is on the still-to-compress list', () => {
    const offenders = [...localPictures().entries()]
      .filter(([path]) => !KNOWN_HEAVY.includes(path))
      .map(([path, users]) => ({ path, users, size: sizeOf(path) }))
      .filter(({ size }) => size > LIMIT_BYTES)
      .map(
        ({ path, users, size }) =>
          `${path} (${Math.round(size / 1024)} KB, used by ${users.join(', ')})`,
      );

    expect(offenders).toEqual([]);
  });

  it('the still-to-compress list has no stale entries', () => {
    const pictures = localPictures();

    const stale = KNOWN_HEAVY.filter((path) => {
      if (!pictures.has(path)) {
        return true;
      }
      return sizeOf(path) <= LIMIT_BYTES;
    });

    expect(stale).toEqual([]);
  });

  it('the Natural China page and its cards use the compressed pictures', () => {
    const tours = getAllActiveTours();

    const landscapes = tours.find((tour) => tour.slug === 'landscapes');
    if (!landscapes) {
      throw new Error('Active tour "landscapes" (Natural China) was not found');
    }

    const chengdu = tours.find((tour) => tour.slug === 'chengdu');
    if (!chengdu) {
      throw new Error('Active tour "chengdu" was not found');
    }

    const paths = [
      landscapes.heroImage,
      ...landscapes.gallery,
      getTourCardMedia(landscapes).src,
      getTourCardMedia(chengdu).src,
    ].filter((path) => path.startsWith('/'));

    const tooHeavy = paths.filter((path) => sizeOf(path) > LIMIT_BYTES);

    expect(tooHeavy).toEqual([]);
  });

  it('the advertised tours show only light pictures, on their pages and on their cards', () => {
    const heavy = [...localPictures().entries()]
      .filter(([, users]) =>
        users.some((user) => ADVERTISED_TOURS.some((slug) => user.startsWith(`${slug}: `))),
      )
      .filter(([path]) => sizeOf(path) > LIMIT_BYTES)
      .map(
        ([path, users]) =>
          `${path} (${Math.round(sizeOf(path) / 1024)} KB, used by ${users.join(', ')})`,
      );

    expect(heavy).toEqual([]);
  });
});
