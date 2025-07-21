import { ReactNode } from 'react';
export interface IUser {
    id: number;
    name: string;
    email: string;
    telefone?: string;
}

export enum UserPageEnum {
    list,
    add,
    edit,
}