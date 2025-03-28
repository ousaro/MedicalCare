import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import { ArrowRightIcon } from 'lucide-react';
import { MedicalRecordPage } from './pages/MedicalRecordPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar (always visible on larger screens, toggled on mobile) */}
        <div className="hidden md:flex w-64">
          <Sidebar sidebarOpen={true} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Mobile Sidebar Toggle */}
        {!sidebarOpen && (
          <button
            className="absolute top-1/2 left-0 z-50 p-1 bg-gray-800 text-white rounded-md rounded-l-none  md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <ArrowRightIcon size={24} />
          </button>
        )}

        {/* Sidebar (Mobile - Overlay) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="relative w-64 bg-gray-800">
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Patients />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            <Route path="/medicalRecord/:id" element={<MedicalRecordPage />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
