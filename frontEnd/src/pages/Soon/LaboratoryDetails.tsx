import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit, FileText, User, Building } from 'lucide-react';

const LaboratoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [test, setTest] = useState({
    id: 1,
    patientName: 'John Smith',
    testName: 'Complete Blood Count',
    testType: 'Hematology',
    requestedBy: 'Dr. Michael Brown',
    date: '2024-03-20',
    status: 'Pending',
    priority: 'Normal',
    location: 'Internal',
    facility: 'Main Laboratory',
    technician: 'Sarah Johnson',
    collectionTime: '09:00 AM',
    expectedResults: '24 hours',
    notes: 'Fasting required for 8 hours',
    previousResults: [
      {
        date: '2024-02-15',
        result: 'Normal',
        comments: 'All parameters within range'
      }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the test data
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/laboratory')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Laboratory Test Details</h1>
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
            <h2 className="text-xl font-semibold mb-4">Test Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Test Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={test.testName}
                    onChange={(e) => setTest({ ...test, testName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{test.testName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Test Type</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={test.testType}
                    onChange={(e) => setTest({ ...test, testType: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{test.testType}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={test.patientName}
                    onChange={(e) => setTest({ ...test, patientName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{test.patientName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requested By</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={test.requestedBy}
                    onChange={(e) => setTest({ ...test, requestedBy: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{test.requestedBy}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                {isEditing ? (
                  <select
                    value={test.location}
                    onChange={(e) => setTest({ ...test, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Internal</option>
                    <option>External</option>
                  </select>
                ) : (
                  <p className="mt-1 text-gray-900">{test.location}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Facility</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={test.facility}
                    onChange={(e) => setTest({ ...test, facility: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{test.facility}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Technician</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={test.technician}
                    onChange={(e) => setTest({ ...test, technician: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{test.technician}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                {isEditing ? (
                  <select
                    value={test.status}
                    onChange={(e) => setTest({ ...test, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                ) : (
                  <p className="mt-1 text-gray-900">{test.status}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                {isEditing ? (
                  <textarea
                    value={test.notes}
                    onChange={(e) => setTest({ ...test, notes: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{test.notes}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Test Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Test Requested</p>
                  <p className="text-sm text-gray-500">{test.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Sample Collection</p>
                  <p className="text-sm text-gray-500">{test.collectionTime}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Expected Results</p>
                  <p className="text-sm text-gray-500">{test.expectedResults}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Previous Results</h2>
            <div className="space-y-4">
              {test.previousResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{result.date}</span>
                    <span className="text-sm text-green-600">{result.result}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{result.comments}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryDetails;