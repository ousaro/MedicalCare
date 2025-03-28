export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export type Patient = {
    _id: string;
    name: string;
    age: number;
    gender: string,
    bloodType: string,
    contact: string,
    email: string,
    address: string,
    emergencyContact: string,
    lastVisit: string,
    phase: string,
}

export type Appointment = {
    _id: string;
    patientId: string;
    doctorId: string;
    patientName: string;
    doctorName: string;
    department: string;
    date: string;
    time: string;
    status: string;
}

export type MedicalHistory = {
    date: string;
    condition: string;
    notes: string;
}

export type Medication = {
    name: string;
    dosage: string;
    frequency: string;
}

export type MedicalRecord = {
    _id: string;
    patientId: string;
    medicalHistory: MedicalHistory[];
    medications: Medication[];
    condition: string;
    allergies: string[];
}
