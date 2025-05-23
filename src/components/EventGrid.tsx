
import React from 'react';
import { EventCard } from './EventCard';

interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
  logo: string;
  prevents: Array<{
    id: number;
    name: string;
    price: string;
    quantity: number;
    status: string;
  }>;
}

interface EventGridProps {
  events: Event[];
  onBuyTickets: (event: Event) => void;
}

export const EventGrid: React.FC<EventGridProps> = ({ events, onBuyTickets }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No events found for this filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          onBuyTickets={onBuyTickets}
        />
      ))}
    </div>
  );
};
