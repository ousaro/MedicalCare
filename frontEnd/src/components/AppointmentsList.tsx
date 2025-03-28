import React, { useState } from 'react';
import { User, CheckCircle, ClockIcon, XCircle } from 'lucide-react';

import { Appointment } from '../types/types';

interface AppointmentListProps {
  filteredAppointments: Appointment[];
  onStatusUpdate: (appointmentId: string, newStatus: 'Scheduled' | 'Completed' | 'Cancelled') => void;
  isEditable?: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ filteredAppointments, onStatusUpdate, isEditable = true }) => {
  const [editingAppointmentId, setEditingAppointmentId] = useState<string>("");

  // Predefined status options
  const statusOptions = ['Scheduled', 'Completed', 'Cancelled'];

  const handleStatusChange = (appointmentId : string, newStatus : 'Scheduled' | 'Completed' | 'Cancelled') => {
    // Call the parent component's status update function
    onStatusUpdate(appointmentId, newStatus);
    // Close the editing dropdown
    setEditingAppointmentId("");
  };

  return (
    <>
      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <div
            key={appointment._id}
            className="flex items-center justify-between p-4 border rounded-lg mb-4 hover:bg-gray-50"
          >
            <div>
              <h3 className="font-medium">{appointment.patientName}</h3>
              <p className="flex items-center gap-1 text-sm text-gray-500">
                <User className="w-4 h-4 mr-1" /> 
                {appointment.doctorName} - {appointment.department}
              </p>
            </div>
            <div className="text-right flex items-center gap-2">
              <div>
                <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                
                {/* Status display and update */}
                {editingAppointmentId === appointment._id ? (
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment._id, e.target.value as 'Scheduled' | 'Completed' | 'Cancelled')}
                    onBlur={() => setEditingAppointmentId("")}
                    className="text-sm font-semibold border rounded px-2 py-1 mt-1"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p 
                    onClick={() => isEditable && setEditingAppointmentId(appointment._id)}
                    className={`text-sm font-semibold cursor-pointer ${
                      appointment.status === 'Scheduled' 
                        ? 'text-blue-600' 
                        : appointment.status === 'Completed' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                    }`}
                  >
                    {appointment.status}
                  </p>
                )}
              </div>
              
              {/* Status Icons */}
              {appointment.status === 'Scheduled' ? (
                <ClockIcon className="w-5 h-5 text-blue-600" />
              ) : appointment.status === 'Completed' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-4">
          No appointments found
        </div>
      )}
    </>
  );
};

export default AppointmentList;