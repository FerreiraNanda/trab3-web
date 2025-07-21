import { IBook } from "../book/Book.type";
import { IUser } from "../user/User.type";
import { IEmployee } from "../employee/Employee.type";

export interface ILoan {
    id: number;
    book: IBook;
    user: IUser;
    employee: IEmployee;
    loanDate: string;
    returnDate: string;
    returned: boolean;
}

export enum LoanPageEnum {
    list,
    add,
    edit,
}