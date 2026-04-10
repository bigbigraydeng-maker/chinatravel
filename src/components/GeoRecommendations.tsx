'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { detectLocation, getPersonalizedRecommendations, getSeasonalRecommendations } from '@/lib/geo';

const GeoRecommendations = () => {
  const [location, setLocation] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [seasonalInfo, setSeasonalInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 检测用户位置
        const userLocation = await detectLocation();
        setLocation(userLocation);

        // 获取个性化推荐
        const recs = await getPersonalizedRecommendations(userLocation);
        setRecommendations(recs);

        // 获取季节推荐
        const seasonal = getSeasonalRecommendations();
        setSeasonalInfo(seasonal);
      } catch (error) {
        // Silently handle geo data fetch failure
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="section bg-light">
        <div className="container py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Personalizing your experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendations) {
    return null;
  }

  return (
    <div className="section bg-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold font-serif mb-4">Personalized Recommendations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your location in {location?.city}, {location?.country},
            we've curated the perfect China travel experiences for you.
          </p>
        </div>

        {/* 季节推荐 */}
        {seasonalInfo && (
          <div className="mb-16">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 font-serif">
                Current Season in China: {seasonalInfo.season}
              </h3>
              <p className="text-gray-600 mb-4">
                Recommended destinations for {seasonalInfo.season}:
              </p>
              <div className="flex flex-wrap gap-3">
                {seasonalInfo.recommendedDestinations.map((destination: string, index: number) => (
                  <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {destination}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 推荐旅游产品 */}
        {recommendations.tours && recommendations.tours.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 font-serif">Recommended Tours</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.tours.map((tour: any) => (
                <Link 
                  key={tour.id} 
                  href={`/tours/${tour.slug}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={tour.image_url}
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      {tour.isPremium && (
                        <span className="inline-block px-3 py-1 bg-secondary text-primary text-xs font-semibold rounded-full mb-3">
                          Premium
                        </span>
                      )}
                      <h4 className="text-xl font-semibold mb-3 font-serif group-hover:text-primary transition-colors">{tour.title}</h4>
                      <p className="text-gray-600 mb-4">{tour.description.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {tour.duration}
                        </span>
                        <span className="text-primary font-semibold">{tour.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 推荐文章 */}
        {recommendations.articles && recommendations.articles.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6 font-serif">Recommended Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.articles.map((article: any) => (
                <Link 
                  key={article.id} 
                  href={`/guide/${article.slug}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-3 font-serif group-hover:text-primary transition-colors">{article.title}</h4>
                      <p className="text-gray-600 mb-4">{article.content.substring(0, 100)}...</p>
                      <p className="text-sm text-gray-500">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeoRecommendations;