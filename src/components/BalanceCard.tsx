import React from 'react';
import { ArrowRight, Wallet } from 'lucide-react';
import { Balance, Member } from '../types';
import { formatCurrency } from '../utils/balanceUtils';
import { motion } from 'motion/react';

interface Props {
  balances: Balance[];
  members: Member[];
}

export default function BalanceCard({ balances, members }: Props) {
  if (balances.length === 0) {
    return (
      <div className="bg-indigo-50/50 rounded-[32px] p-8 text-center border border-indigo-100/50">
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm shadow-indigo-100">
           <Wallet className="text-indigo-500 w-7 h-7" />
        </div>
        <p className="text-indigo-700 font-bold mb-1">Everyone is settled up!</p>
        <p className="text-indigo-400 text-xs">No pending debts to settle.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-50">
        {balances.map((balance, index) => {
          const fromMember = members.find(m => m.id === balance.from);
          const toMember = members.find(m => m.id === balance.to);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-gray-900">{fromMember?.name}</span>
                    <ArrowRight size={12} className="text-gray-300 my-0.5" />
                    <span className="text-xs font-medium text-gray-500">{toMember?.name}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-500 mb-1">owes</div>
                <div className="text-xl font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
                  {formatCurrency(balance.amount)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
