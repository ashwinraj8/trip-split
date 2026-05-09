export interface Member {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // Member ID
  splitAmong: string[]; // List of Member IDs
  date: number;
}

export interface Trip {
  id: string;
  name: string;
  members: Member[];
  expenses: Expense[];
  createdAt: number;
}

export interface Balance {
  from: string; // Member ID
  to: string; // Member ID
  amount: number;
}
