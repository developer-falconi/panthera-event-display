
import React from 'react';

interface Producer {
  name: string;
  logo: string;
  instagram?: string;
  phone?: string;
}

interface EventProducerHeaderProps {
  producer: Producer;
}

export const EventProducerHeader: React.FC<EventProducerHeaderProps> = ({ producer }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img 
              src={producer.logo} 
              alt={`${producer.name} logo`}
              className="h-10 w-10 rounded-lg object-cover transition-transform hover:scale-105"
            />
            <h1 className="text-xl font-bold text-gray-900">{producer.name}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {producer.instagram && (
              <a 
                href={`https://instagram.com/${producer.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                @{producer.instagram}
              </a>
            )}
            {producer.phone && (
              <a 
                href={`tel:${producer.phone}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {producer.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
