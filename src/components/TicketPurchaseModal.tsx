
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { TicketSelection } from './TicketSelection';
import { ClientForm } from './ClientForm';
import { FinalStep } from './FinalStep';

interface Event {
  id: number;
  name: string;
  prevents: Array<{
    id: number;
    name: string;
    price: string;
    quantity: number;
    status: string;
  }>;
}

interface TicketPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

interface ClientData {
  fullName: string;
  phone: string;
  docNumber: string;
  gender: 'HOMBRE' | 'MUJER' | 'OTRO' | '';
}

export const TicketPurchaseModal: React.FC<TicketPurchaseModalProps> = ({ 
  isOpen, 
  onClose, 
  event 
}) => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [clientsData, setClientsData] = useState<ClientData[]>([]);
  const [email, setEmail] = useState('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setStep(1);
      setSelectedTicket(null);
      setTicketQuantity(1);
      setClientsData([]);
      setEmail('');
      setPaymentProof(null);
    }
  }, [isOpen]);

  useEffect(() => {
    // Initialize clients data when ticket quantity changes
    if (ticketQuantity > 0) {
      const newClientsData = Array.from({ length: ticketQuantity }, () => ({
        fullName: '',
        phone: '',
        docNumber: '',
        gender: '' as const
      }));
      setClientsData(newClientsData);
    }
  }, [ticketQuantity]);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step < ticketQuantity + 1) {
      setStep(step + 1);
    } else {
      setStep(ticketQuantity + 2); // Final step
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const updateClientData = (index: number, data: Partial<ClientData>) => {
    const newClientsData = [...clientsData];
    newClientsData[index] = { ...newClientsData[index], ...data };
    setClientsData(newClientsData);
  };

  const handleSubmit = () => {
    console.log('Final submission:', {
      event: event.id,
      ticket: selectedTicket,
      quantity: ticketQuantity,
      clients: clientsData,
      email,
      paymentProof
    });
    // Here you would typically send the data to your backend
    onClose();
  };

  const getTotalSteps = () => ticketQuantity + 2; // Ticket selection + client forms + final step
  const getCurrentStepTitle = () => {
    if (step === 1) return 'Select Tickets';
    if (step <= ticketQuantity + 1) return `Client ${step - 1} Information`;
    return 'Confirmation';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
            <p className="text-sm text-gray-600">{getCurrentStepTitle()}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-2">
            {Array.from({ length: getTotalSteps() }, (_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full flex-1 ${
                  i + 1 <= step ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Step {step} of {getTotalSteps()}
          </p>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {step === 1 && (
            <TicketSelection
              event={event}
              selectedTicket={selectedTicket}
              ticketQuantity={ticketQuantity}
              onTicketSelect={setSelectedTicket}
              onQuantityChange={setTicketQuantity}
              onNext={handleNextStep}
            />
          )}

          {step > 1 && step <= ticketQuantity + 1 && (
            <ClientForm
              clientIndex={step - 2}
              clientData={clientsData[step - 2]}
              onUpdateClient={(data) => updateClientData(step - 2, data)}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />
          )}

          {step === ticketQuantity + 2 && (
            <FinalStep
              event={event}
              selectedTicket={selectedTicket}
              ticketQuantity={ticketQuantity}
              clientsData={clientsData}
              email={email}
              paymentProof={paymentProof}
              onEmailChange={setEmail}
              onPaymentProofChange={setPaymentProof}
              onSubmit={handleSubmit}
              onPrevious={handlePreviousStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};
