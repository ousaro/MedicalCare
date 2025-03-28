import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit, Calendar, ReceiptText } from 'lucide-react';
import { getPatient, updatePatient } from '../services/patientsService';
import { Patient, InputChangeEvent, Appointment } from '../types/types';
import { getPatientAppointments } from '../services/appointmentsService';
import AppointmentList from '../components/AppointmentsList';


const phaseColors = {
  consulting: 'bg-blue-100 text-blue-800',
  diagnosis: 'bg-yellow-100 text-yellow-800',
  treatment: 'bg-green-100 text-green-800',
  'follow-up': 'bg-purple-100 text-purple-800',
};


const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState<Partial<Patient>>({});
  const [updatedPatient, setUpdatedPatient] = useState<Partial<Patient>>({});
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);

  useEffect(()=>{
    fetchPatient();
    fetchAppointments();
  },[])

  const fetchPatient = async () => {
    try {
      const response = await getPatient(id);
      if (response) {
        setPatient(response);
        setUpdatedPatient(patient)
      } else {
        console.error(`Patient with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Failed to fetch patient:", error);
    }
  }

  const fetchAppointments = async () => {
    try {
      const response = await getPatientAppointments(id);
      if (response) {
        setUpcomingAppointments(response);
      } 
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  }

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setUpdatedPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try{
      const response = await updatePatient(id, updatedPatient)
      if(response){
        setPatient(response);
        setUpdatedPatient(patient);
      }


    }catch(error){
      console.error("Failed to update patient:", error);
    }
    setIsEditing(false);
   
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
              onClick={() => {setIsEditing(true), setUpdatedPatient(patient)}}
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
                  name="phase"
                  value={updatedPatient.phase}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>consulting</option>
                  <option>diagnosis</option>
                  <option>treatment</option>
                  <option>follow-up</option>
                </select>
              ) : (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${phaseColors[patient.phase as keyof typeof phaseColors]}`}>
                  {patient.phase}
                </span>
              )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['name', 'age', 'contact', 'email'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  {isEditing ? (
                    <input
                      name={field}
                      type={field === 'age' ? 'number' : 'text'}
                      value={updatedPatient[field as keyof typeof updatedPatient] as string | number}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{patient[field as keyof typeof patient] as string | number}</p>
                  )}
                </div>
              ))}
              <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">Gender</label>
                  {isEditing ? (
                      <select name="Gender" value={updatedPatient.gender} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-gray-900">{patient.gender}</p>
                    )}
              </div>
              <div >
                  <label className="block text-sm font-medium text-gray-700 capitalize">Blood Type</label>
                  {isEditing ? (
                      <select name="bloodType" value={updatedPatient.bloodType} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-gray-900">{patient.bloodType}</p>
                    )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <div className="space-y-3">
              <AppointmentList filteredAppointments={upcomingAppointments} onStatusUpdate={()=>{}} isEditable={false}/>
            </div>
          </div>

          <button onClick={() => navigate(`/medicalRecord/${patient._id}`)} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <ReceiptText className="w-5 h-5 mr-2" /> View Medical Record
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;