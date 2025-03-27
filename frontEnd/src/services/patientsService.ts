import axios from 'axios';
import { Patient } from '../types/types';

const API_URL = 'http://localhost:5000/patients';



const getPatients = async (): Promise<Patient[]> => {
    try {
        const response = await axios.get<Patient[]>(API_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getPatient = async (id: string | undefined): Promise<Patient | null> => {
    try {
        if (!id) return null;
        const response = await axios.get<Patient>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const createPatient = async (newPatient: Partial<Patient>): Promise<Patient | null> => {
    try {
        const response = await axios.post<Patient>(API_URL, newPatient);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updatePatient = async (id: string | undefined, updates: Partial<Patient>): Promise<Patient | null> => {
    try {
        if (!id) return null;
        const response = await axios.patch<Patient>(`${API_URL}/update/${id}`, updates);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deletePatient = async (id: string): Promise<{ success: boolean }> => {
    try {
        const response = await axios.delete<{ success: boolean }>(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

export { getPatients, getPatient, createPatient, updatePatient, deletePatient };
