import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit, Calendar, Users, Clock, Activity } from 'lucide-react';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [doctor, setDoctor] = useState({
    id: id,
    name: 'Dr. Michael Brown',
    specialty: 'Cardiology',
    qualification: 'MD, FACC',
    experience: '15 years',
    contact: '+1 234 567 890',
    email: 'dr.brown@hospital.com',
    schedule: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 1:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM'
    },
    currentPatients: [
      { id: 1, name: 'John Doe', condition: 'Hypertension', lastVisit: '2024-03-15' },
      { id: 2, name: 'Jane Smith', condition: 'Arrhythmia', lastVisit: '2024-03-14' }
    ],
    upcomingAppointments: [
      { time: '10:00 AM', patient: 'Alice Johnson', type: 'Follow-up' },
      { time: '11:30 AM', patient: 'Bob Wilson', type: 'New Patient' }
    ],
    roomNumber: '301',
    availability: 'Available' // in surgery , break, available
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the doctor data
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/doctors')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Doctor Profile</h1>
        </div>
        <div className="flex space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={doctor.name}
                    onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{doctor.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialty</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={doctor.specialty}
                    onChange={(e) => setDoctor({ ...doctor, specialty: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{doctor.specialty}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Qualification</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={doctor.qualification}
                    onChange={(e) => setDoctor({ ...doctor, qualification: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{doctor.qualification}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={doctor.experience}
                    onChange={(e) => setDoctor({ ...doctor, experience: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{doctor.experience}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={doctor.roomNumber}
                    onChange={(e) => setDoctor({ ...doctor, roomNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{doctor.roomNumber}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={doctor.contact}
                    onChange={(e) => setDoctor({ ...doctor, contact: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{doctor.contact}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={doctor.email}
                    onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{doctor.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Current Patients</h2>
            <div className="space-y-4">
              {doctor.currentPatients.map((patient) => (
                <div key={patient.id} className="flex items-start p-4 border rounded-lg">
                  <Users className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.condition}</div>
                    <div className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Schedule</h2>
            <div className="space-y-3">
              {Object.entries(doctor.schedule).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="capitalize">{day}</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) =>
                        setDoctor({
                          ...doctor,
                          schedule: { ...doctor.schedule, [day]: e.target.value }
                        })
                      }
                      className="w-40 text-right rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-600">{hours}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
            <div className="space-y-3">
              {doctor.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg">
                  <Clock className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">{appointment.time}</div>
                    <div className="text-sm text-gray-500">{appointment.patient}</div>
                    <div className="text-sm text-gray-500">{appointment.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <div className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-green-500 font-medium">{doctor.availability}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;