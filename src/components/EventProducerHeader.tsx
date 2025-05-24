
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
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Details shifted to left */}
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-xl font-bold text-white">{producer.name}</h1>
            <div className="flex items-center space-x-4 mt-1">
              {producer.instagram && (
                <a 
                  href={`https://instagram.com/${producer.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  @{producer.instagram}
                </a>
              )}
              {producer.phone && (
                <a 
                  href={`tel:${producer.phone}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {producer.phone}
                </a>
              )}
            </div>
          </div>
          {/* Logo shifted to right */}
          <div className="flex items-center space-x-3">
            <img 
              src={producer.logo} 
              alt={`${producer.name} logo`}
              className="h-10 w-10 rounded-lg object-cover transition-transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
