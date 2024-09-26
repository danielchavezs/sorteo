import axios from "axios";
import { Department } from "../types";

export async function getDepartments () {
    
    try {
        const response = await axios.get("https://api-colombia.com/api/v1/Department");
        // Extraemos solo `id` y `name` de la API general.
        const departments: Department[] = response.data.map(({ id, name }: Department) => ({
            id,
            name
        })).sort((a: Department, b:Department) => a.name.localeCompare(b.name));
    
        // console.log(departments);
        return departments;
    
    } catch (error) {
        console.error(error);
        return [];
    };
};

// export const departments = getDepartments();

export async function getCities( id: number ) {
    try {
        // Con el id extraído previamente de la anterior lista, podemos hacer una nueva llamada a la API con solo el id del Departamento.

        const response = await axios.get(`https://api-colombia.com/api/v1/Department/${id}/cities`);
        const cities:String[] = response.data.map(({ name }: { name: string }) => name).sort();
        // console.log(cities)
        return cities;
        
    } catch (error) {
        console.error(error);
        return [];
    };
};