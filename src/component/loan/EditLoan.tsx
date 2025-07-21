import { useState } from "react";
import { ILoan } from "./Loan.type";
import { IBook } from "../book/Book.type";
import { IUser } from "../user/User.type";
import { IEmployee } from "../employee/Employee.type";
import "../styles/shared.css";

type Props = {
    data: ILoan;
    books: IBook[];
    users: IUser[];
    employees: IEmployee[];
    onBackBtnClickHnd: () => void;
    onUpdateClickHnd: (data: ILoan) => void;
};

const EditLoan = ({ data, books, users, employees, onBackBtnClickHnd, onUpdateClickHnd }: Props) => {
    const [formData, setFormData] = useState<ILoan>(data);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'bookId') {
            const selectedBook = books.find(b => b.id === Number(value));
            setFormData(prev => ({ ...prev, book: selectedBook || data.book }));
        } 
        else if (name === 'userId') {
            const selectedUser = users.find(u => u.id === Number(value));
            setFormData(prev => ({ ...prev, user: selectedUser || data.user }));
        }
        else if (name === 'employeeId') {
            const selectedEmployee = employees.find(e => e.id === Number(value));
            setFormData(prev => ({ ...prev, employee: selectedEmployee || data.employee }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateClickHnd(formData);
        onBackBtnClickHnd();
    };

    return (
        <div className="form-container">
            <h2>Editar Empréstimo</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Livro:</label>
                    <select
                        name="bookId"
                        value={formData.book.id}
                        onChange={handleChange}
                        required
                    >
                        {books.map(book => (
                            <option key={book.id} value={book.id}>
                                {book.titulo} - {book.autor}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Usuário:</label>
                    <select
                        name="userId"
                        value={formData.user.id}
                        onChange={handleChange}
                        required
                    >
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Funcionário:</label>
                    <select
                        name="employeeId"
                        value={formData.employee.id}
                        onChange={handleChange}
                        required
                    >
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name} ({employee.position})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Data de Empréstimo:</label>
                    <input
                        type="date"
                        name="loanDate"
                        value={formData.loanDate.split('T')[0]}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Data de Devolução:</label>
                    <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate.split('T')[0]}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <input
                        type="text"
                        value={formData.returned ? "Devolvido" : "Pendente"}
                        readOnly
                        className="readonly"
                    />
                </div>

               <div className="form-actions">
                <button type="button" onClick={onBackBtnClickHnd} className="button secondary">
                    Voltar
                </button>
                <button type="submit" className="button primary">
                    Atualizar
                </button>
            </div>
            </form>
        </div>
    );
};

export default EditLoan;