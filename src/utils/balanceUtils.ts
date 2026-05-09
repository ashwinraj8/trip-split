import { Trip, Balance } from '../types';

export function calculateBalances(trip: Trip): Balance[] {
  const balances: Record<string, number> = {};

  // Initialize balances for each member
  trip.members.forEach(member => {
    balances[member.id] = 0;
  });

  // Calculate net balance for each member
  trip.expenses.forEach(expense => {
    const share = expense.amount / expense.splitAmong.length;
    
    // The person who paid gets a credit of the full amount
    balances[expense.paidBy] += expense.amount;
    
    // Each person who is part of the split owes their share
    expense.splitAmong.forEach(memberId => {
      balances[memberId] -= share;
    });
  });

  // Now settle the balances
  const creditors: { id: string, amount: number }[] = [];
  const debtors: { id: string, amount: number }[] = [];

  Object.entries(balances).forEach(([id, amount]) => {
    if (amount > 0.01) {
      creditors.push({ id, amount });
    } else if (amount < -0.01) {
      debtors.push({ id, amount: Math.abs(amount) });
    }
  });

  const settlements: Balance[] = [];

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].amount, creditors[j].amount);
    
    settlements.push({
      from: debtors[i].id,
      to: creditors[j].id,
      amount
    });

    debtors[i].amount -= amount;
    creditors[j].amount -= amount;

    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }

  return settlements;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
