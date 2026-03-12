'use client';

type TransportType = 'flight' | 'high-speed-train' | 'train' | 'river-cruise' | 'coach' | 'private-car' | 'ferry';

interface RouteStop {
  city: string;
  days: string;
  highlights?: string[];
}

interface RouteSegment {
  from: string;
  to: string;
  transport: TransportType;
  duration: string;
  notes?: string;
}

interface TourRoute {
  stops: RouteStop[];
  segments: RouteSegment[];
}

interface ItineraryMapProps {
  route: TourRoute;
  tourName: string;
}

const transportIcons: Record<TransportType, string> = {
  'flight': '✈️',
  'high-speed-train': '🚄',
  'train': '🚂',
  'river-cruise': '🚢',
  'coach': '🚌',
  'private-car': '🚗',
  'ferry': '⛴️'
};

const transportColors: Record<TransportType, string> = {
  'flight': '#3B82F6',
  'high-speed-train': '#10B981',
  'train': '#F59E0B',
  'river-cruise': '#06B6D4',
  'coach': '#8B5CF6',
  'private-car': '#EC4899',
  'ferry': '#14B8A6'
};

export default function ItineraryMap({ route, tourName }: ItineraryMapProps) {
  const { stops, segments } = route;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        Tour Route
      </h3>
      
      {/* Route Timeline */}
      <div className="space-y-0">
        {stops.map((stop, index) => {
          const segment = segments[index];
          
          return (
            <div key={index} className="relative">
              {/* Stop */}
              <div className="flex items-start gap-4 pb-4">
                {/* Stop Number */}
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                
                {/* Stop Details */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-semibold text-gray-900">{stop.city}</h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {stop.days}
                    </span>
                  </div>
                  
                  {stop.highlights && stop.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {stop.highlights.map((highlight, i) => (
                        <span 
                          key={i}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Transport Segment */}
              {segment && (
                <div className="ml-5 pl-5 pb-4 border-l-2 border-dashed border-gray-200">
                  <div 
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: `${transportColors[segment.transport]}10` }}
                  >
                    <span className="text-2xl">{transportIcons[segment.transport]}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {segment.from} → {segment.to}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="capitalize">
                          {segment.transport.replace(/-/g, ' ')}
                        </span>
                        <span>•</span>
                        <span>{segment.duration}</span>
                        {segment.notes && (
                          <>
                            <span>•</span>
                            <span className="italic">{segment.notes}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Transport Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Transport Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(transportIcons).map(([type, icon]) => (
            <div key={type} className="flex items-center gap-2 text-sm">
              <span>{icon}</span>
              <span className="capitalize text-gray-600">
                {type.replace(/-/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
