import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit, Calendar, ReceiptText } from 'lucide-react';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState({
    id: id,
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodType: 'A+',
    contact: '+1 234 567 890',
    email: 'john.doe@email.com',
    address: '123 Main St, City, Country',
    emergencyContact: 'Jane Doe (+1 234 567 891)',
    lastVisit: '2024-03-15',
    phase: 'consulting',
    upcomingAppointments: [
      { date: '2024-04-01', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Follow-up' }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // API call to update patient data
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate('/patients')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Patient Details</h1>
        </div>
        <div className="flex space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <Save className="w-5 h-5 mr-2" /> Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Edit className="w-5 h-5 mr-2" /> Edit Details
            </button>
          )}
        </div>
      </div>

     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Phase</h2>
              {isEditing ? (
                <select
                  value={patient.phase}
                  onChange={(e) => setPatient({ ...patient, phase: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['consulting', 'diagnosis', 'treatment', 'follow-up'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${patient.phase === 'consulting' ? 'bg-blue-500' : patient.phase === 'diagnosis' ? 'bg-yellow-500' : patient.phase === 'treatment' ? 'bg-red-500' : 'bg-green-500'}`}>
                  {patient.phase}
                </span>
              )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['name', 'age', 'gender', 'bloodType', 'contact', 'email'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  {isEditing ? (
                    <input
                      type={field === 'age' ? 'number' : 'text'}
                      value={patient[field as keyof typeof patient] as string | number}
                      onChange={(e) => setPatient({ ...patient, [field]: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{patient[field as keyof typeof patient] as string | number}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <div className="space-y-3">
              {patient.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg">
                  <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">{appointment.type}</div>
                    <div className="text-sm text-gray-500">{appointment.date} at {appointment.time}</div>
                    <div className="text-sm text-gray-500">{appointment.doctor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => navigate(`/medicalRecord/${patient.id}`)} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <ReceiptText className="w-5 h-5 mr-2" /> View Medical Record
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;