import axios from 'axios';
import { Appointment } from '../types/types';

const API_URL = 'http://localhost:5001/appointments';



const getAppointments = async (): Promise<Appointment[]> => {
    try {
        const response = await axios.get<Appointment[]>(API_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getAppointment = async (id: string | undefined): Promise<Appointment | null> => {
    try {
        if (!id) return null;
        const response = await axios.get<Appointment>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getPatientAppointments = async (patientId: string | undefined): Promise<Appointment[] | null> => {
    try {
        if (!patientId) return null;
        const response = await axios.get<Appointment[]>(`${API_URL}/patient/${patientId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const createAppointment = async (newAppointment: Partial<Appointment>): Promise<Appointment | null> => {
    try {
        const response = await axios.post<Appointment>(API_URL, newAppointment);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateAppointment = async (id: string | undefined, updates: Partial<Appointment>): Promise<Appointment | null> => {
    try {
        if (!id) return null;
        const response = await axios.patch<Appointment>(`${API_URL}/update/${id}`, updates);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteAppointment = async (id: string): Promise<{ success: boolean }> => {
    try {
        const response = await axios.delete<{ success: boolean }>(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return { success: false };
    }
};

export { getAppointments, getAppointment,getPatientAppointments, createAppointment, updateAppointment, deleteAppointment };
