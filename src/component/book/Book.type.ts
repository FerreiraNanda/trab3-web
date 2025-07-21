export interface IBook {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
    genero: string;
    disponivel: boolean;
    registeredBy?: string;
}

export enum BookPageEnum {
    list,
    add,
    edit,
    view
}