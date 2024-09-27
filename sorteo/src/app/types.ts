export interface Results {
    solved: boolean,
    code: string,
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

export interface Errors {
    firstName: string,
    lastName: string,
    nationalID: string,
    department: string,
    city: string,
    phone: string,
    email: string,
    habeasData: string,
};

export interface Department {
    id: number;
    name: string;
};