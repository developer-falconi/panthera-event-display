
import React from 'react';

interface ClientData {
  fullName: string;
  phone: string;
  docNumber: string;
  gender: 'HOMBRE' | 'MUJER' | 'OTRO';
}

interface Ticket {
  id: number;
  name: string;
  price: string;
}

interface Event {
  name: string;
}

interface FinalStepProps {
  event: Event;
  selectedTicket: Ticket;
  ticketQuantity: number;
  clientsData: ClientData[];
  email: string;
  paymentProof: File | null;
  onEmailChange: (email: string) => void;
  onPaymentProofChange: (file: File | null) => void;
  onSubmit: () => void;
  onPrevious: () => void;
}

export const FinalStep: React.FC<FinalStepProps> = ({
  event,
  selectedTicket,
  ticketQuantity,
  clientsData,
  email,
  paymentProof,
  onEmailChange,
  onPaymentProofChange,
  onSubmit,
  onPrevious
}) => {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const totalPrice = parseFloat(selectedTicket.price) * ticketQuantity;

  const isFormValid = () => {
    return validateEmail(email) && paymentProof !== null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        onPaymentProofChange(file);
      } else {
        alert('Please upload a PDF, JPG, or PNG file.');
        e.target.value = '';
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Order Summary & Payment
        </h3>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Event:</span>
          <span className="font-medium">{event.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Ticket Type:</span>
          <span className="font-medium">{selectedTicket.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Quantity:</span>
          <span className="font-medium">{ticketQuantity}</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-lg">${totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Clients Summary */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Attendees:</h4>
        <div className="space-y-2">
          {clientsData.map((client, index) => (
            <div key={index} className="text-sm text-gray-600">
              {index + 1}. {client.fullName} - {client.phone}
            </div>
          ))}
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Email *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
            email && !validateEmail(email)
              ? 'border-red-300'
              : 'border-gray-300'
          }`}
          placeholder="your@email.com"
        />
        {email && !validateEmail(email) && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Proof *
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          Upload proof of payment (PDF, JPG, or PNG)
        </p>
        {paymentProof && (
          <p className="text-sm text-green-600 mt-1">
            ✓ {paymentProof.name} uploaded
          </p>
        )}
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onPrevious}
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onSubmit}
          disabled={!isFormValid()}
          className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
            isFormValid()
              ? 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
};
