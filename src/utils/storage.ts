import { Trip } from '../types';

const STORAGE_KEY = 'tripsplit_trips';

export function getTrips(): Trip[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveTrips(trips: Trip[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

export function addTrip(trip: Trip) {
  const trips = getTrips();
  saveTrips([trip, ...trips]);
}

export function updateTrip(updatedTrip: Trip) {
  const trips = getTrips();
  const index = trips.findIndex(t => t.id === updatedTrip.id);
  if (index !== -1) {
    trips[index] = updatedTrip;
    saveTrips(trips);
  }
}

export function getTrip(id: string): Trip | undefined {
  return getTrips().find(t => t.id === id);
}

export const SAMPLE_DATA: Trip[] = [
  {
    id: 'sample-1',
    name: 'Goa Trip 2024',
    createdAt: Date.now(),
    members: [
      { id: 'm1', name: 'Ashwin' },
      { id: 'm2', name: 'Rahul' },
      { id: 'm3', name: 'Aman' }
    ],
    expenses: [
      {
        id: 'e1',
        description: 'Dinner at Beach',
        amount: 2400,
        paidBy: 'm2',
        splitAmong: ['m1', 'm2', 'm3'],
        date: Date.now() - 86400000
      }
    ]
  }
];

export function initializeSampleData() {
  if (getTrips().length === 0) {
    saveTrips(SAMPLE_DATA);
  }
}
