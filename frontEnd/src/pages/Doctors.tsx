import { Search, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const availabilityColors = {
  available: 'bg-green-100 text-green-800',
  'in surgery': 'bg-blue-100 text-blue-800',
  break: 'bg-yellow-100 text-yellow-800',
};

const timeSlots = [
  '9:00 AM - 1:00 PM',
  '1:00 PM - 5:00 PM',
  '5:00 PM - 9:00 PM',
  '9:00 AM - 5:00 PM'
];


const initialDoctor ={
  name: '',
  specialty: 'cardiology',
  qualification: '',
  experience: '',
  contact: '',
  email: '',
  schedule: {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 1:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM'
  },
  roomNumber: '',
  availability: 'Available' // in surgery , break, available
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors]=useState([
    {
      id: 1,
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
      availability: 'Available' // in surgery , break, available, with patient
    }
  ])


    const [availabilityFilter, setAvailabilityFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDoctor, setNewDoctor] = useState(initialDoctor);
    
    const addDoctor = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setNewDoctor(initialDoctor)
    };
  
   
  
    const handleInputChange = (e: InputChangeEvent) => {
      const { name, value } = e.target;
      setNewDoctor((prev) => ({ ...prev, [name]: value }));
    };

    const handleScheduleChange = (day: keyof typeof initialDoctor.schedule, value: string) => {
      setNewDoctor((prev) => ({
        ...prev,
        schedule: { ...prev.schedule, [day]: value },
      }));
    };
  
    const handleSubmit = () => {
      setDoctors((prev) => [...prev, { ...newDoctor, id: prev.length + 1, currentPatients: [], upcomingAppointments: [] }]);
      closeModal();
    };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
        <button onClick={addDoctor} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add New Doctor
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={nameFilter}
                onChange={(e)=>setNameFilter(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="In-surgery">In surgery</option>
              <option value="Break">Break</option>
              <option value="Available">Available</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.filter(doctor => (!availabilityFilter || doctor.availability === availabilityFilter) && doctor.name.toLowerCase().includes(nameFilter.toLowerCase())).map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doctor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.specialty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${availabilityColors[doctor.availability.toLowerCase() as keyof typeof availabilityColors]}`}>{doctor.availability}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={()=>navigate(`/doctors/${doctor.id}`)} className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add New Doctor</h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 col-span-full">Personal Information</h3>
                <input 
                  type="text" 
                  name="name" 
                  value={newDoctor.name} 
                  onChange={handleInputChange} 
                  placeholder="Full Name" 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                />
                <input 
                  type="text" 
                  name="contact" 
                  value={newDoctor.contact} 
                  onChange={handleInputChange} 
                  placeholder="Contact Number" 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  value={newDoctor.email} 
                  onChange={handleInputChange} 
                  placeholder="Email Address" 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                />
                <input 
                  type="text" 
                  name="qualification" 
                  value={newDoctor.qualification} 
                  onChange={handleInputChange} 
                  placeholder="Medical Qualification" 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 col-span-full">Professional Details</h3>
                <input 
                  type="text" 
                  name="experience" 
                  value={newDoctor.experience} 
                  onChange={handleInputChange} 
                  placeholder="Years of Experience" 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <input 
                  type="text" 
                  name="roomNumber" 
                  value={newDoctor.roomNumber} 
                  onChange={handleInputChange} 
                  placeholder="Room Number" 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <select 
                  name="specialty" 
                  value={newDoctor.specialty} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>Select Specialty</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                  <option>Ophthalmology</option>
                  <option>Oncology</option>
                  <option>Urology</option>
                  <option>Psychiatry</option>
                  <option>Endocrinology</option>
                </select>
              </div>
              
              <div className="md:col-span-full space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Availability and Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select 
                    name="availability" 
                    value={newDoctor.availability} 
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select Availability</option>
                    <option>Available</option>
                    <option>Break</option>
                    <option>In surgery</option>
                  </select>
                  
                  {Object.keys(newDoctor.schedule).map((day) => (
                    <div key={day}>
                      <label className="block text-sm font-medium mb-1">
                        {day.charAt(0).toUpperCase() + day.slice(1)} Schedule
                      </label>
                      <select 
                        value={newDoctor.schedule[day as keyof typeof initialDoctor.schedule]} 
                        onChange={(e) => handleScheduleChange(day as keyof typeof initialDoctor.schedule, e.target.value)} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-full mt-4">
                <button 
                  onClick={handleSubmit} 
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;