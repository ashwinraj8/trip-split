import React, { useState } from 'react';
import { X, CheckCircle2, User, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { v4 as uuidv4 } from 'uuid';
import { Member, Expense } from '../types';

interface Props {
  members: Member[];
  onClose: () => void;
  onSave: (expense: Expense) => void;
}

export default function AddExpenseModal({ members, onClose, onSave }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(members[0].id);
  const [splitAmong, setSplitAmong] = useState(members.map(m => m.id));

  const toggleMember = (id: string) => {
    if (splitAmong.includes(id)) {
      if (splitAmong.length > 1) {
        setSplitAmong(splitAmong.filter(mId => mId !== id));
      }
    } else {
      setSplitAmong([...splitAmong, id]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || parseFloat(amount) <= 0) return;

    const newExpense: Expense = {
      id: uuidv4(),
      description: description.trim(),
      amount: parseFloat(amount),
      paidBy,
      splitAmong,
      date: Date.now()
    };

    onSave(newExpense);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[32px] overflow-hidden shadow-2xl p-6 pb-10 sm:pb-8"
      >
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />
        
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Add Expense</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
            <X size={24} />
          </button>
        </header>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">What was it for?</label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Dinner, Taxi, Hotel"
              className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="input-expense-name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">How much?</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">₹</span>
              <input
                type="number"
                required
                placeholder="0.00"
                className="w-full bg-gray-50 border-none rounded-2xl px-10 py-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-2xl font-bold"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="input-expense-amount"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Paid by</label>
              <div className="relative">
                <select
                  className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none cursor-pointer text-sm font-medium"
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  id="select-paid-by"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <Wallet size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Split</label>
              <div className="w-full bg-indigo-50 rounded-2xl px-4 py-3.5 border border-indigo-100">
                 <span className="text-indigo-700 text-sm font-bold">{splitAmong.length} people</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 ml-1">Split among</label>
            <div className="grid grid-cols-2 gap-2">
              {members.map(member => (
                <button
                  type="button"
                  key={member.id}
                  onClick={() => toggleMember(member.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all text-sm font-medium ${
                    splitAmong.includes(member.id)
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                  }`}
                  id={`btn-toggle-member-${member.id}`}
                >
                  <span className="truncate">{member.name}</span>
                  {splitAmong.includes(member.id) && <CheckCircle2 size={16} className="shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all mt-4"
            id="btn-save-expense"
          >
            Save Expense
          </button>
        </form>
      </motion.div>
    </div>
  );
}
