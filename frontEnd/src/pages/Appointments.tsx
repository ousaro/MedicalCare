import { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState('2024-03-20');
  
  const appointments = [
    {
      id: 1,
      patientId: 1,
      doctorId: 1,
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Michael Brown',
      department: 'Cardiology',
      date: '2024-03-20',
      time: '09:00 AM',
      status: 'Scheduled'
    },
    {
      id: 2,
      patientId: 2,
      doctorId: 2,
      patientName: 'John Doe',
      doctorName: 'Dr. Emily Smith',
      department: 'Neurology',
      date: '2024-03-21',
      time: '10:30 AM',
      status: 'Scheduled'
    }
  ];

  const filteredAppointments = appointments.filter(app => app.date === selectedDate);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Appointments for {selectedDate}</h2>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="p-6">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border rounded-lg mb-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div className="ml-4">
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <User className="w-4 h-4 mr-1" />
                          {appointment.doctorName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {appointment.time}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No appointments for this date.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-6">Quick Schedule</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Doctor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
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
