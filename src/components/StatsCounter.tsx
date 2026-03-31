'use client';

import { useEffect, useState, useRef } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
}

const stats: StatItem[] = [
  { value: 98, suffix: '', label: 'Years in China', icon: '🏛️', color: 'from-amber-400 to-orange-500' },
  { value: 10000, suffix: '+', label: 'Kiwis Shown China', icon: '😊', color: 'from-emerald-400 to-teal-500' },
  { value: 50, suffix: '+', label: 'Handcrafted Journeys', icon: '🗺️', color: 'from-sky-400 to-blue-500' },
  { value: 30, suffix: '+', label: 'Destinations Explored', icon: '📍', color: 'from-purple-400 to-pink-500' },
];

function AnimatedNumber({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, isVisible]);

  const formatted = target >= 1000
    ? `${(count / 1000).toFixed(count >= target ? 0 : 1)}k`
    : count.toString();

  return <span>{formatted}{suffix}</span>;
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-20 bg-gradient-to-r from-accent via-gray-800 to-accent relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating accent orbs */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                <AnimatedNumber target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="text-gray-300 text-sm font-medium tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
