import { Search, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPatients, createPatient } from '../services/patientsService';
import { Patient } from '../types/types';
import { createMedicalRecord } from '../services/medicalRecordService';

const phaseColors = {
  consulting: 'bg-blue-100 text-blue-800',
  diagnosis: 'bg-yellow-100 text-yellow-800',
  treatment: 'bg-green-100 text-green-800',
  'follow-up': 'bg-purple-100 text-purple-800',
};

const initialPatient ={
  name: '',
  age: '',
  gender: 'Male',
  bloodType: 'A+',
  contact: '',
  email: '',
  address: '',
  emergencyContact: '',
  lastVisit: '',
  phase: 'consulting',
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
const Patients = () => {

  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [phaseFilter, setPhaseFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState(initialPatient);
  

  useEffect(()=>{
    fetchPatients();
  }, []);


  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      console.log(response);
      setPatients(response);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  };

  const addPatient = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewPatient(initialPatient)
  };

 

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try{
      const newPatientData = {
        ...newPatient,
        age: parseInt(newPatient.age),
      };

      const response = await createPatient(newPatientData);
      if(response){
        await createMedicalRecord({patientId: response._id});
        setPatients((prev) => [...prev, response]);
      }
      

    }catch(error){
      console.error("Failed to create patient:", error);
    }
    setNewPatient(initialPatient);
    closeModal();
  };

  if (!patients) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
        <button onClick={addPatient} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add New Patient
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients by name..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
            >
              <option value="">All Phases</option>
              <option value="consulting">Consulting</option>
              <option value="diagnosis">Diagnosis</option>
              <option value="treatment">Treatment</option>
              <option value="follow-up">Follow-up</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.filter(patient => (!phaseFilter || patient.phase === phaseFilter) && patient.name.toLowerCase().includes(nameFilter.toLowerCase())).map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${phaseColors[patient.phase as keyof typeof phaseColors]}`}>{patient.phase}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button onClick={() => navigate(`/patients/${patient._id}`)} className="text-blue-600 hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Patient</h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-900"><X /></button>
            </div>
            <div className="space-y-2">
              <input type="text" name="name" value={newPatient.name} onChange={handleInputChange} placeholder="Name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="number" name="age" value={newPatient.age} onChange={handleInputChange} placeholder="Age" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <select name="gender" value={newPatient.gender} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Male</option>
                <option>Female</option>
              </select>
              <select name="bloodType" value={newPatient.bloodType} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
              <input type="text" name="contact" value={newPatient.contact} onChange={handleInputChange} placeholder="Contact" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" name="email" value={newPatient.email} onChange={handleInputChange} placeholder="Email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" name="address" value={newPatient.address} onChange={handleInputChange} placeholder="Address" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" name="emergencyContact" value={newPatient.emergencyContact} onChange={handleInputChange} placeholder="Emergency Contact" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="date" name="lastVisit" value={newPatient.lastVisit} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <select name="phase" value={newPatient.phase} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>consulting</option>
                <option>diagnosis</option>
                <option>treatment</option>
                <option>follow-up</option>
              </select>
              <button onClick={handleSubmit} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
