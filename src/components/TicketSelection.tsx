
import React from 'react';

interface Ticket {
  id: number;
  name: string;
  price: string;
  quantity: number;
  status: string;
}

interface Event {
  prevents: Ticket[];
}

interface TicketSelectionProps {
  event: Event;
  selectedTicket: Ticket | null;
  ticketQuantity: number;
  onTicketSelect: (ticket: Ticket) => void;
  onQuantityChange: (quantity: number) => void;
  onNext: () => void;
}

export const TicketSelection: React.FC<TicketSelectionProps> = ({
  event,
  selectedTicket,
  ticketQuantity,
  onTicketSelect,
  onQuantityChange,
  onNext
}) => {
  const availableTickets = event.prevents
    .filter(ticket => ticket.status === 'ACTIVE')
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  const totalPrice = selectedTicket ? parseFloat(selectedTicket.price) * ticketQuantity : 0;

  const canContinue = selectedTicket && ticketQuantity > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Tickets</h3>
        <div className="space-y-3">
          {availableTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => onTicketSelect(ticket)}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedTicket?.id === ticket.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{ticket.name}</h4>
                  <p className="text-sm text-gray-600">{ticket.quantity} remaining</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ${parseFloat(ticket.price).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTicket && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity (1-10)
          </label>
          <select
            value={ticketQuantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} ticket{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedTicket && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Total Price:</span>
            <span className="text-xl font-bold text-gray-900">
              ${totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!canContinue}
        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
          canContinue
            ? 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );
};
