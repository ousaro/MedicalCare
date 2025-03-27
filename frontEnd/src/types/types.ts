
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

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
