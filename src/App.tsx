/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTrip from './pages/CreateTrip';
import TripDashboard from './pages/TripDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-600">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTrip />} />
          <Route path="/trip/:id" element={<TripDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
