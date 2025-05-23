
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
  const [activeFilter, setActiveFilter] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const producerData = mockData.data;
  const filteredEvents = producerData.events.filter(event => event.status === activeFilter);

  const handleBuyTickets = (event) => {
    setSelectedEvent(event);
    setIsPurchaseModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EventProducerHeader producer={producerData} />
      
      <main className="container mx-auto px-4 py-8">
        <EventFilters 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
        />
        
        <EventGrid 
          events={filteredEvents}
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
