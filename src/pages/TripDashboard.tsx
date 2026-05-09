import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Receipt, IndianRupee, History, Users2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getTrip, updateTrip } from '../utils/storage';
import { calculateBalances, formatCurrency } from '../utils/balanceUtils';
import { Trip, Expense } from '../types';
import AddExpenseModal from '../components/AddExpenseModal';
import ExpenseList from '../components/ExpenseList';
import BalanceCard from '../components/BalanceCard';

export default function TripDashboard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const data = getTrip(id);
      if (data) {
        setTrip(data);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!trip) return null;

  const handleAddExpense = (expense: Expense) => {
    const updatedTrip = {
      ...trip,
      expenses: [expense, ...trip.expenses]
    };
    setTrip(updatedTrip);
    updateTrip(updatedTrip);
    setIsModalOpen(false);
  };

  const balances = calculateBalances(trip);
  const totalExpense = trip.expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="max-w-md mx-auto min-h-screen pb-32">
      <div className="bg-indigo-600 pt-12 pb-24 px-6 rounded-b-[40px] shadow-xl shadow-indigo-100">
        <header className="flex items-center justify-between mb-8">
          <Link to="/" className="p-2 -ml-2 text-indigo-100 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-2 bg-indigo-500/30 px-3 py-1 rounded-full border border-indigo-400/30">
            <Users2 size={14} className="text-indigo-100" />
            <span className="text-indigo-100 text-xs font-semibold">{trip.members.length} members</span>
          </div>
        </header>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white tracking-tight">{trip.name}</h1>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">{formatCurrency(totalExpense)}</span>
            <span className="text-indigo-200 text-sm font-medium">total spent</span>
          </div>
        </motion.div>
      </div>

      <div className="px-6 -mt-16 space-y-8">
        {/* Balances Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
             <div className="bg-emerald-100 p-1.5 rounded-lg">
                <IndianRupee size={16} className="text-emerald-600" />
             </div>
             <h2 className="text-xl font-bold text-gray-900">Settlements</h2>
          </div>
          <BalanceCard balances={balances} members={trip.members} />
        </section>

        {/* Expenses Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
             <div className="bg-orange-100 p-1.5 rounded-lg">
                <History size={16} className="text-orange-600" />
             </div>
             <h2 className="text-xl font-bold text-gray-900">Recent Expenses</h2>
          </div>
          <ExpenseList expenses={trip.expenses} members={trip.members} />
        </section>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-0 right-0 px-6 flex justify-center z-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white w-full max-w-xs py-4 rounded-2xl font-bold shadow-2xl shadow-indigo-300 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
          id="btn-add-expense"
        >
          <Plus size={20} />
          Add Expense
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <AddExpenseModal
            members={trip.members}
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddExpense}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
