
import React, { useState } from 'react';
import { EventProducerHeader } from '../components/EventProducerHeader';
import { EventFilters } from '../components/EventFilters';
import { EventGrid } from '../components/EventGrid';
import { TicketPurchaseModal } from '../components/TicketPurchaseModal';

// Mock data as provided
const mockData = {
  "success": true,
  "data": {
    "id": 2,
    "name": "Panthera",
    "domain": "https://panthera.web.app",
    "firebaseWebAppId": "1:56736542635:web:a9c3d7954608bb617f2cee",
    "status": "ACTIVE",
    "logo": "http://res.cloudinary.com/dxmi0j9yh/image/upload/v1746571655/Productoras/Panthera/Flyers/mkjnq0vgkhjufhflkknw.png",
    "phone": "+5491123009533",
    "instagram": "panthera__________",
    "createdAt": "2025-05-06T22:47:33.758Z",
    "updatedAt": "2025-05-08T17:56:28.967Z",
    "events": [
      {
        "id": 2,
        "name": "Panthera III",
        "description": "🍻Barra Libre\r\n\r\n🎧DJs invitados\r\n\r\n🎼House y Cachengue\r\n\r\n🚘Estacionamiento privado\r\n\r\n👩🏼‍🤝‍👨🏽+23",
        "startDate": "2025-06-08T01:00:00.000Z",
        "endDate": "2025-06-08T08:00:00.000Z",
        "location": "Mustang, Nordelta",
        "status": "ACTIVE",
        "folder": true,
        "alias": "moranoguer",
        "logo": "http://res.cloudinary.com/dxmi0j9yh/image/upload/v1746571655/Productoras/Panthera/Flyers/mkjnq0vgkhjufhflkknw.png",
        "createdAt": "2025-05-06T22:48:18.586Z",
        "updatedAt": "2025-05-22T15:57:30.667Z",
        "prevents": [
          {
            "id": 11,
            "name": "Preventa 2",
            "price": "23000.00",
            "quantity": 300,
            "status": "INACTIVE",
            "startDate": "2025-05-20T20:27:15.849Z",
            "endDate": "2025-06-07T20:27:00.000Z",
            "createdAt": "2025-05-20T20:32:31.885Z",
            "updatedAt": "2025-05-20T20:38:40.471Z"
          },
          {
            "id": 10,
            "name": "Preventa 1",
            "price": "22000.00",
            "quantity": 200,
            "status": "INACTIVE",
            "startDate": "2025-05-20T20:27:15.849Z",
            "endDate": "2025-06-07T20:27:00.000Z",
            "createdAt": "2025-05-20T20:31:27.125Z",
            "updatedAt": "2025-05-20T20:38:32.177Z"
          },
          {
            "id": 9,
            "name": "Early Birds",
            "price": "21000.00",
            "quantity": 70,
            "status": "ACTIVE",
            "startDate": "2025-05-20T20:27:15.849Z",
            "endDate": "2025-06-07T20:27:00.000Z",
            "createdAt": "2025-05-20T20:30:26.768Z",
            "updatedAt": "2025-05-23T14:57:27.415Z"
          }
        ]
      }
    ],
    "email": {
      "id": 2,
      "email": "comunidad.panthera@gmail.com",
      "key": "dwlu bhqa gkyf eicf",
      "createdAt": "2025-05-06T22:47:34.361Z",
      "updatedAt": "2025-05-21T11:32:10.761Z"
    }
  }
};

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<'ACTIVE' | 'INACTIVE' | 'ALL'>('ALL');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const producerData = mockData.data;
  const allEvents = producerData.events;
  
  // Separate active and inactive events
  const activeEvents = allEvents.filter(event => event.status === 'ACTIVE');
  const inactiveEvents = allEvents.filter(event => event.status === 'INACTIVE');
  
  // Get filtered events based on current filter
  const getFilteredEvents = () => {
    switch (activeFilter) {
      case 'ACTIVE':
        return activeEvents;
      case 'INACTIVE':
        return inactiveEvents;
      default:
        return allEvents;
    }
  };

  const handleBuyTickets = (event) => {
    setSelectedEvent(event);
    setIsPurchaseModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <EventProducerHeader producer={producerData} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero section with active event */}
        {activeEvents.length > 0 && (
          <section className="mb-12">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12 min-h-[80vh] items-center">
                <div className="space-y-6 text-white">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Live Event
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    {activeEvents[0].name}
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {activeEvents[0].description.split('\r\n').map((line, index) => (
                      <span key={index} className="block">{line}</span>
                    ))}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <span className="font-medium">📅 {new Date(activeEvents[0].startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="font-medium">📍 {activeEvents[0].location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBuyTickets(activeEvents[0])}
                    className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                  >
                    Get Tickets Now
                  </button>
                </div>
                <div className="relative">
                  <img 
                    src={activeEvents[0].logo} 
                    alt={activeEvents[0].name}
                    className="w-full h-auto max-w-lg mx-auto rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        <EventFilters 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
        />
        
        <EventGrid 
          events={getFilteredEvents()}
          onBuyTickets={handleBuyTickets}
        />
      </main>

      {selectedEvent && (
        <TicketPurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => {
            setIsPurchaseModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default Index;
