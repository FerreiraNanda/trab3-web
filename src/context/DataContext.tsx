import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { IUser } from '../component/user/User.type';
import { IBook } from '../component/book/Book.type';
import { IEmployee } from '../component/employee/Employee.type';
import { ILoan } from '../component/loan/Loan.type';

interface IDataContext {
    users: IUser[];
    books: IBook[];
    employees: IEmployee[];
    loans: ILoan[]; 
    loading: {
        users: boolean;
        books: boolean;
        employees: boolean;
        loans: boolean;
    };
    errors: {
        users: string | null;
        books: string | null;
        employees: string | null;
        loans: string | null;
    };
    fetchUsers: () => Promise<void>;
    fetchBooks: () => Promise<void>;
    fetchEmployees: () => Promise<void>;
    fetchLoans: () => Promise<void>;
}

const DataContext = createContext<IDataContext | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [books, setBooks] = useState<IBook[]>([]);
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [loans, setLoans] = useState<ILoan[]>([]);

    const [loading, setLoading] = useState({ 
        users: true, 
        books: true, 
        employees: true, 
        loans: true 
    });
    const [errors, setErrors] = useState<IDataContext['errors']>({ 
        users: null, 
        books: null, 
        employees: null, 
        loans: null 
    });

    const fetchUsers = useCallback(async () => {
        setLoading(prev => ({ ...prev, users: true }));
        setErrors(prev => ({ ...prev, users: null }));
        try {
            const response = await fetch("http://localhost:5103/api/Users"); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: IUser[] = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setErrors(prev => ({ ...prev, users: `Falha ao carregar usuários: ${error instanceof Error ? error.message : "Erro desconhecido"}` }));
        } finally {
            setLoading(prev => ({ ...prev, users: false }));
        }
    }, []);

    const fetchBooks = useCallback(async () => {
        setLoading(prev => ({ ...prev, books: true }));
        setErrors(prev => ({ ...prev, books: null }));
        try {
            const response = await fetch('http://localhost:5103/api/Livros');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: IBook[] = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
            setErrors(prev => ({ ...prev, books: `Falha ao carregar livros: ${error instanceof Error ? error.message : "Erro desconhecido"}` }));
            setBooks([]);
        } finally {
            setLoading(prev => ({ ...prev, books: false }));
        }
    }, []);

    const fetchEmployees = useCallback(async () => {
        setLoading(prev => ({ ...prev, employees: true }));
        setErrors(prev => ({ ...prev, employees: null }));
        try {
            const response = await fetch("http://localhost:5103/api/Employees");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: IEmployee[] = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
            setErrors(prev => ({ ...prev, employees: `Falha ao carregar funcionários: ${error instanceof Error ? error.message : "Erro desconhecido"}` }));
            setEmployees([]);
        } finally {
            setLoading(prev => ({ ...prev, employees: false }));
        }
    }, []);

    const fetchLoans = useCallback(async () => {
        setLoading(prev => ({ ...prev, loans: true }));
        setErrors(prev => ({ ...prev, loans: null }));
        try {
            const response = await fetch("http://localhost:5103/api/Loans"); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: ILoan[] = await response.json();
            setLoans(data);
        } catch (error) {
            console.error("Erro ao buscar empréstimos:", error);
            setErrors(prev => ({ ...prev, loans: `Falha ao carregar empréstimos: ${error instanceof Error ? error.message : "Erro desconhecido"}` }));
            setLoans([]);
        } finally {
            setLoading(prev => ({ ...prev, loans: false }));
        }
    }, []);

    useEffect(() => {
        fetchUsers();
        fetchBooks();
        fetchEmployees();
        fetchLoans();
    }, [fetchUsers, fetchBooks, fetchEmployees, fetchLoans]);

    const value = {
        users,
        books,
        employees,
        loans,
        loading,
        errors,
        fetchUsers,
        fetchBooks,
        fetchEmployees,
        fetchLoans,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};