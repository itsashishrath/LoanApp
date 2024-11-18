import React from 'react';
import { format } from 'date-fns';
import { useLoan } from './LoanContext';

export const RepaymentList = ({ loan, onPaymentClick }) => {
  if (!loan || !loan.repayments || loan.repayments.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No repayments available for this loan.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Repayment Schedule</h3>
      <div className="space-y-2">
        {loan.repayments.map((repayment) => (
          <div
            key={repayment.id}
            className="p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Amount: ${parseFloat(repayment.amount).toFixed(2)}</p>
                <p className="text-sm text-gray-600">
                  Due: {format(new Date(repayment.due_date), 'MMM dd, yyyy')}
                </p>
                <p className={`text-sm ${
                  repayment.status === 'PAID' 
                    ? 'text-green-600' 
                    : 'text-amber-600'
                }`}>
                  Status: {repayment.status}
                </p>
              </div>
              {repayment.status === 'PENDING' && (
                <button
                  onClick={() => onPaymentClick(repayment)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Make Payment
                </button>
              )}
            </div>
            {repayment.paid_at && (
              <p className="text-sm text-gray-600 mt-1">
                Paid on: {format(new Date(repayment.paid_at), 'MMM dd, yyyy')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
