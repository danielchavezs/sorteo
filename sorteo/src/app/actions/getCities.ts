import axios from "axios";

type Department = {
    id:number,
    name:string
};

export async function getDepartments () {

    const response = await axios.get("https://api-colombia.com/api/v1/Department");
    
    // Extraemos solo `id` y `name` de la API general.
    const departments: Department[] = response.data.map(({ id, name }: Department) => ({
        id,
        name
    })).sort((a: Department, b:Department) => a.name.localeCompare(b.name));

    // console.log(departments);
    return departments;
};

export async function getCities( id: number ) {
    
    // Con el id extraído previamente de la anterior lista, podemos hacer una nueva llamada a la API con solo el id del Departamento.

    const response = await axios.get(`https://api-colombia.com/api/v1/Department/${id}/cities`);
    const cities:String[] = response.data.map(({ name }: { name: string }) => name).sort();
    // console.log(cities)
    return cities;

};
