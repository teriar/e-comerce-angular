export  interface login
{
    correo:string;
    password:string; 
}

export interface usuario{
    nombre:string;
    correo:string;
    rol:string;
    estado: boolean;
    google: boolean;
    uid: string;
}