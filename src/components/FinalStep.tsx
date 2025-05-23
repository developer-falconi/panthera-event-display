
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
        <h3 className="text-lg font-semibold text-white mb-4">
          Order Summary & Payment
        </h3>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-800 p-4 rounded-lg space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Event:</span>
          <span className="font-medium text-white">{event.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Ticket Type:</span>
          <span className="font-medium text-white">{selectedTicket.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Quantity:</span>
          <span className="font-medium text-white">{ticketQuantity}</span>
        </div>
        <div className="flex justify-between border-t border-gray-600 pt-3">
          <span className="font-semibold text-white">Total:</span>
          <span className="font-bold text-lg text-white">${totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Clients Summary */}
      <div>
        <h4 className="font-medium text-white mb-3">Attendees:</h4>
        <div className="space-y-2">
          {clientsData.map((client, index) => (
            <div key={index} className="text-sm text-gray-300">
              {index + 1}. {client.fullName} - {client.phone}
            </div>
          ))}
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Contact Email *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={`w-full p-3 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
            email && !validateEmail(email)
              ? 'border-red-400'
              : 'border-gray-600'
          }`}
          placeholder="your@email.com"
        />
        {email && !validateEmail(email) && (
          <p className="text-red-400 text-sm mt-1">Please enter a valid email address</p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Payment Proof *
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />
        <p className="text-xs text-gray-400 mt-1">
          Upload proof of payment (PDF, JPG, or PNG)
        </p>
        {paymentProof && (
          <p className="text-sm text-green-400 mt-1">
            ✓ {paymentProof.name} uploaded
          </p>
        )}
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onPrevious}
          className="flex-1 py-3 border border-gray-600 text-gray-300 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onSubmit}
          disabled={!isFormValid()}
          className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
            isFormValid()
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
};
