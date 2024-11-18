import React, { useState, useEffect } from 'react';
import { useLoan } from './LoanContext';
import { useAuth } from '../auth/AuthContext';
import { RepaymentList } from './RepaymentList';
import { PaymentModal } from './PaymentModal';

export const LoanList = () => {
  const { loans, fetchLoans, selectedLoan, setSelectedLoan } = useLoan();
  const { user } = useAuth();
  const [selectedRepayment, setSelectedRepayment] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleLoanClick = (loan) => {
    setSelectedLoan(selectedLoan?.id === loan.id ? null : loan);
  };

  const handlePaymentClick = (repayment) => {
    setSelectedRepayment(repayment);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Loans</h2>
      <div className="grid gap-4">
        {loans.map(loan => (
          <div key={loan.id} className="space-y-2">
            <div
              className={`p-4 border rounded-lg shadow hover:shadow-md cursor-pointer
                ${selectedLoan?.id === loan.id ? 'border-blue-500 ring-2 ring-blue-200' : ''}`}
              onClick={() => handleLoanClick(loan)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Amount: ${parseFloat(loan.amount).toFixed(2)}</p>
                  <p className="text-sm">Term: {loan.term} weeks</p>
                  <p className="text-sm">Status: {loan.status}</p>
                </div>
              </div>
            </div>
            
            {selectedLoan?.id === loan.id && (
              <RepaymentList 
                loan={loan}
                onPaymentClick={handlePaymentClick}
              />
            )}
          </div>
        ))}
      </div>

      {selectedRepayment && (
        <PaymentModal
          repayment={selectedRepayment}
          onClose={() => setSelectedRepayment(null)}
        />
      )}
    </div>
  );
};