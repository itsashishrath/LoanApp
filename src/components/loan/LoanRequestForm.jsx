import React, { useState, useEffect } from 'react';
import { useLoan } from './LoanContext';


export const LoanRequestForm = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const { createLoan } = useLoan();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createLoan(parseFloat(amount), parseInt(term));
    if (success) {
      setAmount('');
      setTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium">Loan Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          min="1"
          step="0.01"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Term (weeks)</label>
        <input
          type="number"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          min="1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
      >
        Request Loan
      </button>
    </form>
  );
};