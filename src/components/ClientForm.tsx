
import React from 'react';

interface ClientData {
  fullName: string;
  phone: string;
  docNumber: string;
  gender: 'HOMBRE' | 'MUJER' | 'OTRO' | '';
}

interface ClientFormProps {
  clientIndex: number;
  clientData: ClientData;
  onUpdateClient: (data: Partial<ClientData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  clientIndex,
  clientData,
  onUpdateClient,
  onNext,
  onPrevious
}) => {
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    return phoneRegex.test(phone);
  };

  const isFormValid = () => {
    return (
      clientData.fullName.trim() !== '' &&
      clientData.phone.trim() !== '' &&
      validatePhone(clientData.phone) &&
      clientData.docNumber.trim() !== '' &&
      clientData.gender !== ''
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Client {clientIndex + 1} Information
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={clientData.fullName}
          onChange={(e) => onUpdateClient({ fullName: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="Enter full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          value={clientData.phone}
          onChange={(e) => onUpdateClient({ phone: e.target.value })}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
            clientData.phone && !validatePhone(clientData.phone)
              ? 'border-red-300'
              : 'border-gray-300'
          }`}
          placeholder="+54 11 1234 5678"
        />
        {clientData.phone && !validatePhone(clientData.phone) && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid phone number</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Document Number *
        </label>
        <input
          type="text"
          value={clientData.docNumber}
          onChange={(e) => onUpdateClient({ docNumber: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="Enter document number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Gender *
        </label>
        <div className="space-y-2">
          {['HOMBRE', 'MUJER', 'OTRO'].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name={`gender-${clientIndex}`}
                value={option}
                checked={clientData.gender === option}
                onChange={(e) => onUpdateClient({ gender: e.target.value as 'HOMBRE' | 'MUJER' | 'OTRO' })}
                className="mr-3 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onPrevious}
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid()}
          className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
            isFormValid()
              ? 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
