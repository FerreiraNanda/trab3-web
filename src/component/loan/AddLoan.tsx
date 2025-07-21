import { useState } from "react";
import "../styles/shared.css";
import { ILoan } from "./Loan.type";
import { IBook } from "../book/Book.type";
import { IUser } from "../user/User.type";
import { IEmployee } from "../employee/Employee.type";

type Props = {
    books: IBook[];
    users: IUser[];
    employees: IEmployee[];
    onBackBtnClickHnd: () => void;
    onSubmitClickHnd: (data: ILoan) => void;
};

const AddLoan = ({ books, users, employees, onBackBtnClickHnd, onSubmitClickHnd }: Props) => {
    const [formData, setFormData] = useState<Omit<ILoan, 'id' | 'returned'>>({
        book: {} as IBook,
        user: {} as IUser,
        employee: {} as IEmployee,
        loanDate: new Date().toISOString().split('T')[0],
        returnDate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'bookId') {
            const selectedBook = books.find(b => b.id === Number(value));
            setFormData(prev => ({ ...prev, book: selectedBook || {} as IBook }));
        } 
        else if (name === 'userId') {
            const selectedUser = users.find(u => u.id === Number(value));
            setFormData(prev => ({ ...prev, user: selectedUser || {} as IUser }));
        }
        else if (name === 'employeeId') {
            const selectedEmployee = employees.find(e => e.id === Number(value));
            setFormData(prev => ({ ...prev, employee: selectedEmployee || {} as IEmployee }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.book.id || !formData.user.id || !formData.employee.id || !formData.returnDate) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const newLoan: ILoan = {
            id: 0,
            ...formData,
            returned: false
        };

        onSubmitClickHnd(newLoan);
        onBackBtnClickHnd();
    };
return (
    <div className="form-container">
        <h2>Registrar Empréstimo</h2>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Livro:</label>
                <select
                    name="bookId"
                    onChange={handleChange}
                    required>
                    <option value="">Selecione um livro</option>
                    {books.filter(b => b.disponivel).map(book => (
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
                    onChange={handleChange}
                    required>
                    <option value="">Selecione um usuário</option>
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
                    onChange={handleChange}
                    required>
                    <option value="">Selecione um funcionário</option>
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
                    value={formData.loanDate}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Data de Devolução:</label>
                <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                    min={formData.loanDate}
                />
            </div>

            <div className="button-group">
                <button type="button" onClick={onBackBtnClickHnd} className="cancel-button">Cancelar</button>
                <button type="submit" className="submit-button">Salvar</button>
            </div>
        </form>
    </div>
    );
};

export default AddLoan;