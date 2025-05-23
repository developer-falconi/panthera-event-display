
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

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

interface EventCardProps {
  event: Event;
  onBuyTickets: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onBuyTickets }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDescription = (description: string) => {
    return description.split('\r\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  const availableTickets = event.prevents.filter(prevent => prevent.status === 'ACTIVE');
  const cheapestPrice = availableTickets.length > 0 
    ? Math.min(...availableTickets.map(ticket => parseFloat(ticket.price)))
    : null;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={event.logo} 
          alt={event.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            event.status === 'ACTIVE' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {event.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-700 mb-4 whitespace-pre-line">
          {formatDescription(event.description)}
        </div>
        
        {availableTickets.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Available tickets from:</p>
            <p className="text-2xl font-bold text-gray-900">
              ${cheapestPrice?.toLocaleString()}
            </p>
          </div>
        )}
        
        <button
          onClick={() => onBuyTickets(event)}
          disabled={availableTickets.length === 0}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
            availableTickets.length > 0
              ? 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {availableTickets.length > 0 ? 'Buy Tickets' : 'No Tickets Available'}
        </button>
      </div>
    </div>
  );
};
