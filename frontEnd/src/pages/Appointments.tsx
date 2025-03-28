import { useEffect, useState } from 'react';
import { Appointment, InputChangeEvent, Patient } from '../types/types';
import AppointmentList from '../components/AppointmentsList';
import { createAppointment, getAppointments, updateAppointment } from '../services/appointmentsService';
import { getPatients } from '../services/patientsService';


const doctorsDB = [
  {
    _id: "1",
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
]

const initialAppointment: Partial<Appointment> = {

  patientId: '',
  patientName: '',
  doctorId: '',
  doctorName: '',
  department: '',
  date: '',
  time: '',
  status: 'Scheduled',
}

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // New state for filtering
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState(doctorsDB);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>(initialAppointment);


  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response);
    } catch (error) {
      console.log('Error fetching appointments', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response);
    } catch (error) {
      console.log('Error fetching patients', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await createAppointment(newAppointment);
      setAppointments([...appointments, newAppointment as Appointment]);
    }catch(error){
      console.log('Error in submitting form', error);
    }
    
  }

   // Handle patient selection
   const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPatientId = e.target.value;
    const selectedPatient = patients.find(patient => patient._id === selectedPatientId);
    
    setNewAppointment(prev => ({
      ...prev,
      patientId: selectedPatientId,
      patientName: selectedPatient ? selectedPatient.name : ''
    }));
  };

  // Handle patient selection
  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDoctorId = e.target.value;
    const selectedDoctor = doctors.find(doctor => doctor._id === selectedDoctorId);
    
    setNewAppointment(prev => ({
      ...prev,
      doctorId: selectedDoctorId,
      doctorName: selectedDoctor ? selectedDoctor.name : ''
    }));
  };

  const handleInputChange = (e:InputChangeEvent) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value
    });
  }

  const handleStatusUpdate = async (appointmentId: string, newStatus: 'Scheduled' | 'Completed' | 'Cancelled') => {
    try {
      // First, call the API to update the appointment status
      await updateAppointment(appointmentId, { status: newStatus });
  
      // If API call is successful, update the local state
      const updatedAppointments = appointments.map(appointment => 
        appointment._id === appointmentId 
          ? { ...appointment, status: newStatus } 
          : appointment
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      // Handle any errors from the API call
      console.error('Failed to update appointment status:', error);
     
    }
  };



  // Enhanced filtering logic
  const filteredAppointments = appointments.filter(app => 
    (filterStatus === 'All' || app.status === filterStatus) &&
    (selectedDate ? app.date === selectedDate : true)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Appointments Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Appointment Filters */}
          <div className="flex gap-4 mb-4">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Appointments</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
            </select>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={() => {
                setSelectedDate('');
                setFilterStatus('All');
              }}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Reset Filters
            </button>
          </div>

          {/* Combined Appointments List */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">
                {filterStatus === 'All' ? 'All Appointments' : `${filterStatus} Appointments`}
                {selectedDate && ` on ${selectedDate}`}
              </h2>
            </div>
            <div className="p-6">
              <AppointmentList 
                filteredAppointments={filteredAppointments} 
                onStatusUpdate={handleStatusUpdate} 
              /> 
            </div>
          </div>
        </div>

        {/* Quick Schedule Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-6">Quick Schedule</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <select
                value={newAppointment.patientId}
                onChange={handlePatientChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name}
                  </option>
                ))}
              </select>
              
              {/* Optional: Show selected patient details */}
              {newAppointment.patientName && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {newAppointment.patientName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name
              </label>
              <select
                value={newAppointment.doctorId}
                onChange={handleDoctorChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              
              {/* Optional: Show selected patient details */}
              {newAppointment.doctorName && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {newAppointment.doctorName}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select name='department' value={newAppointment.department} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select department</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={newAppointment.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={newAppointment.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointments;