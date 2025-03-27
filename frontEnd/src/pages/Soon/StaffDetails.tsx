import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit, Calendar, Clock, User } from 'lucide-react';

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [staff, setStaff] = useState({
    id: 1,
    name: 'Jane Smith',
    role: 'Nurse',
    department: 'Emergency',
    employeeId: 'EMP001',
    contact: '+1 234 567 890',
    email: 'jane.smith@hospital.com',
    address: '123 Healthcare Ave, Medical City',
    joinDate: '2020-03-15',
    shift: 'Morning',
    schedule: {
      monday: '7:00 AM - 3:00 PM',
      tuesday: '7:00 AM - 3:00 PM',
      wednesday: '7:00 AM - 3:00 PM',
      thursday: 'Off',
      friday: '7:00 AM - 3:00 PM'
    },
    qualifications: [
      'Registered Nurse',
      'Basic Life Support Certified',
      'Advanced Cardiac Life Support'
    ],
    status: 'On Duty',
    supervisor: 'Dr. Michael Brown',
    emergencyContact: {
      name: 'John Smith',
      relation: 'Spouse',
      phone: '+1 234 567 891'
    },
    attendance: [
      { date: '2024-03-15', status: 'Present', shift: 'Morning' },
      { date: '2024-03-14', status: 'Present', shift: 'Morning' }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the staff data
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/staff')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Staff Details</h1>
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
              Edit Details
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={staff.name}
                    onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{staff.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                <p className="mt-1 text-gray-900">{staff.employeeId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={staff.role}
                    onChange={(e) => setStaff({ ...staff, role: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{staff.role}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={staff.department}
                    onChange={(e) => setStaff({ ...staff, department: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{staff.department}</p>
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
                    value={staff.contact}
                    onChange={(e) => setStaff({ ...staff, contact: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{staff.contact}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={staff.email}
                    onChange={(e) => setStaff({ ...staff, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{staff.email}</p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                {isEditing ? (
                  <textarea
                    value={staff.address}
                    onChange={(e) => setStaff({ ...staff, address: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{staff.address}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
            <div className="space-y-4">
              {staff.qualifications.map((qualification, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg">
                  <User className="w-5 h-5 mr-3 text-gray-500" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => {
                        const newQualifications = [...staff.qualifications];
                        newQualifications[index] = e.target.value;
                        setStaff({ ...staff, qualifications: newQualifications });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <span>{qualification}</span>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => setStaff({ ...staff, qualifications: [...staff.qualifications, ''] })}
                  className="text-blue-600 hover:text-blue-800"
                >
                  + Add Qualification
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Schedule</h2>
            <div className="space-y-3">
              {Object.entries(staff.schedule).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="capitalize">{day}</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) =>
                        setStaff({
                          ...staff,
                          schedule: { ...staff.schedule, [day]: e.target.value }
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
            <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={staff.emergencyContact.name}
                    onChange={(e) =>
                      setStaff({
                        ...staff,
                        emergencyContact: { ...staff.emergencyContact, name: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{staff.emergencyContact.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relation</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={staff.emergencyContact.relation}
                    onChange={(e) =>
                      setStaff({
                        ...staff,
                        emergencyContact: { ...staff.emergencyContact, relation: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{staff.emergencyContact.relation}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={staff.emergencyContact.phone}
                    onChange={(e) =>
                      setStaff({
                        ...staff,
                        emergencyContact: { ...staff.emergencyContact, phone: e.target.value }
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{staff.emergencyContact.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Attendance</h2>
            <div className="space-y-3">
              {staff.attendance.map((record, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg">
                  <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">{record.date}</div>
                    <div className="text-sm text-gray-500">
                      {record.status} - {record.shift}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;