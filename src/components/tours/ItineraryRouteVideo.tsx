'use client';

interface ItineraryRouteVideoProps {
  src?: string;
}

export default function ItineraryRouteVideo({ src = '/videos/route-schematic.mp4' }: ItineraryRouteVideoProps) {
  return (
    <div className="w-full flex justify-center bg-white p-4 rounded-lg shadow-sm">
      <video
        src={src}
        controls
        className="w-full max-w-2xl rounded-lg"
        style={{ aspectRatio: '16 / 9' }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
