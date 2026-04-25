'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/types/blog-post';

const CATEGORY_LABELS: Record<BlogPost['category'], string> = {
  destination: 'Destinations',
  experience: 'Experiences',
  'travel-tips': 'Travel Tips',
  culture: 'Culture',
};

const CATEGORY_COLORS: Record<BlogPost['category'], string> = {
  destination: 'bg-blue-500',
  experience: 'bg-green-600',
  'travel-tips': 'bg-primary',
  culture: 'bg-purple-500',
};

type Filter = 'all' | BlogPost['category'];

const TABS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All Articles' },
  { value: 'destination', label: 'Destinations' },
  { value: 'travel-tips', label: 'Travel Tips' },
  { value: 'experience', label: 'Experiences' },
  { value: 'culture', label: 'Culture' },
];

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<Filter>('all');

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active);

  return (
    <section className="py-12 bg-light">
      <div className="container mx-auto px-4">
        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === tab.value
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mb-8 uppercase tracking-wide">
          {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 flex-shrink-0 overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span
                  className={`absolute top-3 left-3 ${CATEGORY_COLORS[post.category]} text-white px-2.5 py-0.5 rounded-full text-xs font-medium`}
                >
                  {CATEGORY_LABELS[post.category]}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2.5">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-NZ', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-[15px] font-bold leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-2 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-20">No articles in this category yet.</p>
        )}
      </div>
    </section>
  );
}
