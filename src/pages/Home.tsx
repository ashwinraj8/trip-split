import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, ChevronRight, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { getTrips, initializeSampleData } from '../utils/storage';
import { Trip } from '../types';

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    initializeSampleData();
    setTrips(getTrips());
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 min-h-screen pb-24">
      <header className="mb-10 pt-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">TripSplit</h1>
            <p className="text-gray-500 mt-1">Split bills, not friendships.</p>
          </div>
          <div className="bg-indigo-100 p-2 rounded-2xl">
            <MapPin className="text-indigo-600 w-6 h-6" />
          </div>
        </motion.div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Trips</h2>
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {trips.length} {trips.length === 1 ? 'Trip' : 'Trips'}
          </span>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="text-gray-400 w-8 h-8" />
            </div>
            <p className="text-gray-500">No trips yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/trip/${trip.id}`}
                  className="block bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                  id={`trip-card-${trip.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {trip.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {trip.members.length} members
                        </div>
                        <span>•</span>
                        <span>{new Date(trip.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                      <ChevronRight className="text-gray-400 group-hover:text-indigo-600 transition-colors" size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <div className="fixed bottom-8 left-0 right-0 px-6 flex justify-center">
        <Link
          to="/create"
          className="bg-indigo-600 text-white w-full max-w-xs py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
          id="btn-create-trip"
        >
          <Plus size={20} />
          Create New Trip
        </Link>
      </div>
    </div>
  );
}
