import { ArrowLeft, FileText, Plus, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MedicalRecord = () => {
    const navigate = useNavigate();
    const [medicalRecord, setMedicalRecord] = useState({
        id: 1,
        patientId: 1,
        medicalHistory: [
            { date: '2024-03-15', condition: 'Hypertension', notes: 'Prescribed medication' },
            { date: '2024-02-20', condition: 'Regular Checkup', notes: 'All vitals normal' }
        ],
        medications: [
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily' },
            { name: 'Aspirin', dosage: '81mg', frequency: 'Daily' }
        ],
        condition: "Hypertension",
        allergies: ['Penicillin', 'Peanuts'],
    });

    const [modal, setModal] = useState('');
    const [formData, setFormData] = useState({ name: "", dosage: "", frequency: "" });

    const openModal = (type:string) => setModal(type);
    const closeModal = () => {
        setModal('');
        setFormData({ name: "", dosage: "", frequency: "" });
    };

    const handleAdd = () => {
        if (modal === "allergy" && formData.name) {
            setMedicalRecord({ ...medicalRecord, allergies: [...medicalRecord.allergies, formData.name] });
        } else if (modal === "medication" && formData.name && formData.dosage && formData.frequency) {
            setMedicalRecord({
                ...medicalRecord,
                medications: [...medicalRecord.medications, { ...formData }],
            });
        }
        closeModal();
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button onClick={() => navigate(`/patients/${medicalRecord.patientId}`)} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 ml-4">Medical Record Details</h1>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Condition</h2>
                    <div className="text-sm text-gray-500">{medicalRecord.condition}</div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Current Medications</h2>
                        <button onClick={() => openModal("medication")} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {medicalRecord.medications.map((medication, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                                <div className="font-medium">{medication.name}</div>
                                <div className="text-sm text-gray-500">{medication.dosage} - {medication.frequency}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Allergies</h2>
                        <button onClick={() => openModal("allergy")} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {medicalRecord.allergies.map((allergy, index) => (
                            <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                {allergy}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Medical History</h2>
                    <div className="space-y-4">
                        {medicalRecord.medicalHistory.map((record, index) => (
                            <div key={index} className="flex items-start p-4 border rounded-lg">
                                <FileText className="w-5 h-5 mr-3 text-gray-500" />
                                <div>
                                    <div className="font-medium">{record.condition}</div>
                                    <div className="text-sm text-gray-500">{record.date}</div>
                                    <div className="mt-1 text-gray-700">{record.notes}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add {modal === "allergy" ? "Allergy" : "Medication"}</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="w-full p-2 border rounded mb-2"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {modal === "medication" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter dosage"
                                    className="w-full p-2 border rounded mb-2"
                                    value={formData.dosage}
                                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter frequency"
                                    className="w-full p-2 border rounded mb-2"
                                    value={formData.frequency}
                                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                                />
                            </>
                        )}
                        <button onClick={handleAdd} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
