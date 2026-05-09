import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, UserPlus, X, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { v4 as uuidv4 } from 'uuid';
import { addTrip } from '../utils/storage';
import { Member, Trip } from '../types';

export default function CreateTrip() {
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('');
  const [members, setMembers] = useState<string[]>(['', '', '']);

  const handleAddMember = () => {
    setMembers([...members, '']);
  };

  const handleRemoveMember = (index: number) => {
    if (members.length > 2) {
      const newMembers = [...members];
      newMembers.splice(index, 1);
      setMembers(newMembers);
    }
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripName.trim()) return;

    const validMembers: Member[] = members
      .filter(m => m.trim() !== '')
      .map(name => ({
        id: uuidv4(),
        name: name.trim()
      }));

    if (validMembers.length < 2) {
      alert('Please add at least 2 members');
      return;
    }

    const newTrip: Trip = {
      id: uuidv4(),
      name: tripName.trim(),
      members: validMembers,
      expenses: [],
      createdAt: Date.now()
    };

    addTrip(newTrip);
    navigate(`/trip/${newTrip.id}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 min-h-screen pb-24">
      <header className="mb-8 pt-8 flex items-center gap-4">
        <Link to="/" className="p-2 -ml-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Trip</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Trip Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Goa Trip 2024"
            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            id="input-trip-name"
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4 ml-1">
            <label className="text-sm font-semibold text-gray-700">
              Members
            </label>
            <span className="text-xs text-gray-400">At least 2 required</span>
          </div>
          
          <div className="space-y-3">
            {members.map((member, index) => (
              <div key={index} className="flex gap-2 relative group">
                <input
                  type="text"
                  placeholder={`Member ${index + 1}`}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  id={`input-member-${index}`}
                />
                {members.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddMember}
            className="mt-4 flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors ml-1"
            id="btn-add-member"
          >
            <UserPlus size={16} />
            Add Another Member
          </button>
        </motion.div>

        <div className="fixed bottom-8 left-0 right-0 px-6 flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white w-full max-w-xs py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
              id="btn-start-trip"
            >
              <Rocket size={20} />
              Start Trip
            </button>
        </div>
      </form>
    </div>
  );
}
