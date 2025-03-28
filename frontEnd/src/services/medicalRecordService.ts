import axios from 'axios';
import { MedicalRecord } from '../types/types';

const API_URL = 'http://localhost:5002/medicalRecords';



const getMedicalRecords = async (): Promise<MedicalRecord[]> => {
    try {
        const response = await axios.get<MedicalRecord[]>(API_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getMedicalRecord = async (id: string | undefined): Promise<MedicalRecord | null> => {
    try {
        if (!id) return null;
        const response = await axios.get<MedicalRecord>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getPatientMedicalRecord = async (patientId: string | undefined): Promise<MedicalRecord | null> => {
    try {
        if (!patientId) return null;
        const response = await axios.get<MedicalRecord>(`${API_URL}/patient/${patientId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const createMedicalRecord = async (newMedicalRecord: Partial<MedicalRecord>): Promise<MedicalRecord | null> => {
    try {
        const response = await axios.post<MedicalRecord>(API_URL, newMedicalRecord);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateMedicalRecord = async (id: string | undefined, updates: Partial<MedicalRecord>): Promise<MedicalRecord | null> => {
    try {
        if (!id) return null;
        const response = await axios.patch<MedicalRecord>(`${API_URL}/update/${id}`, updates);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteMedicalRecord = async (id: string): Promise<{ success: boolean }> => {
    try {
        const response = await axios.delete<{ success: boolean }>(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

export { getMedicalRecords, getMedicalRecord,getPatientMedicalRecord, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord };
