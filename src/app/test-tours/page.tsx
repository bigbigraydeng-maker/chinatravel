import type { Metadata } from 'next';
import { getToursByDestination, getToursByDestinationAndTier } from '@/lib/data/tours';

export const metadata: Metadata = {
  title: 'Tour data check (internal) | CTS Tours',
  description: 'Internal listing of tours from data files for QA. Not for public search.',
  robots: { index: false, follow: false },
};

export default function TestToursPage() {
  const japanTours = getToursByDestination('japan');
  const vietnamTours = getToursByDestination('vietnam');
  const chinaTours = getToursByDestination('china');
  
  const japanSignatureTours = getToursByDestinationAndTier('japan', 'signature');
  const japanDiscoveryTours = getToursByDestinationAndTier('japan', 'discovery');
  const vietnamDiscoveryTours = getToursByDestinationAndTier('vietnam', 'discovery');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Test Tours Data</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">China Tours</h2>
        <p>Total: {chinaTours.length}</p>
        <ul className="list-disc pl-6">
          {chinaTours.map(tour => (
            <li key={tour.id}>{tour.name}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Japan Tours</h2>
        <p>Total: {japanTours.length}</p>
        <ul className="list-disc pl-6">
          {japanTours.map(tour => (
            <li key={tour.id}>{tour.name}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Vietnam Tours</h2>
        <p>Total: {vietnamTours.length}</p>
        <ul className="list-disc pl-6">
          {vietnamTours.map(tour => (
            <li key={tour.id}>{tour.name}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Japan Signature Tours</h2>
        <p>Total: {japanSignatureTours.length}</p>
        <ul className="list-disc pl-6">
          {japanSignatureTours.map(tour => (
            <li key={tour.id}>{tour.name}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Japan Discovery Tours</h2>
        <p>Total: {japanDiscoveryTours.length}</p>
        <ul className="list-disc pl-6">
          {japanDiscoveryTours.map(tour => (
            <li key={tour.id}>{tour.name}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Vietnam Discovery Tours</h2>
        <p>Total: {vietnamDiscoveryTours.length}</p>
        <ul className="list-disc pl-6">
          {vietnamDiscoveryTours.map(tour => (
            <li key={tour.id}>{tour.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
