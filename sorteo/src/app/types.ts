export interface Department {
    id: number;
    name: string;
};

export interface Parameters {
    firstName: string,
    lastName: string,
    nationalID: number | string,
    department: string,
    city: string,
    phone: number | string,
    email: string,
    habeasData: boolean,
};