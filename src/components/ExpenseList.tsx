import React from 'react';
import { Receipt, User } from 'lucide-react';
import { Expense, Member } from '../types';
import { formatCurrency } from '../utils/balanceUtils';

interface Props {
  expenses: Expense[];
  members: Member[];
}

export default function ExpenseList({ expenses, members }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-[32px] p-10 text-center border border-gray-100 shadow-sm">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
           <Receipt className="text-gray-300 w-8 h-8" />
        </div>
        <p className="text-gray-400 font-medium">No expenses recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => {
        const payer = members.find(m => m.id === expense.paidBy);
        return (
          <div
            key={expense.id}
            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group"
            id={`expense-item-${expense.id}`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-50 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                 <Receipt className="text-gray-400 group-hover:text-indigo-600 transition-colors" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{expense.description}</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  <span className="font-semibold text-gray-700">{payer?.name}</span> paid • {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-black text-gray-900">{formatCurrency(expense.amount)}</div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">
                {expense.splitAmong.length} PEOPLE
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
