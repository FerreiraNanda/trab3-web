import { useEffect, useState } from "react";
import { IUser, UserPageEnum } from "../user/User.type"
import { IBook, BookPageEnum } from "../book/Book.type";
import { ILoan, LoanPageEnum } from "../loan/Loan.type";
import { IEmployee, EmployeePageEnum } from "../employee/Employee.type";
import "./Home.style.css"

import UserList from "../user/UserList";
import AddUser from "../user/AddUser";
import EditUser from "../user/EditUser";

import BookList from "../book/BookList";
import AddBook from "../book/AddBook";
import EditBook from "../book/EditBook";

import AddLoan from "../loan/AddLoan";
import EditLoan from "../loan/EditLoan";
import LoanList from "../loan/LoanList";

import AddEmployee from "../employee/AddEmployee";
import EditEmployee from "../employee/EditEmployee";
import EmployeeList from "../employee/EmployeeList";

const Home = () => {
    const [activeTab, setActiveTab] = useState<'books' | 'users' | 'loans' | 'employees'>('books');

    const [userList, setUserList] = useState([] as IUser[]);
    const [showUserPage, setShowUserPage] = useState(UserPageEnum.list);
    const [userToEdit, setUserToEdit] = useState({} as IUser);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [errorUsers, setErrorUsers] = useState<string | null>(null);

    const [bookList, setBookList] = useState<IBook[]>([]);
    const [bookPage, setBookPage] = useState<BookPageEnum>(BookPageEnum.list);
    const [dataToEditBook, setDataToEditBook] = useState<IBook | null>(null);
    const generosDisponiveis = ["Ficção", "História", "Tecnologia", "Romance", "Terror", "Fantasia", "Biografia", "Autoajuda"];
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [errorBooks, setErrorBooks] = useState<string | null>(null);

    const [loanList, setLoanList] = useState<ILoan[]>([]);
    const [loanPage, setLoanPage] = useState<LoanPageEnum>(LoanPageEnum.list);
    const [dataToEditLoan, setDataToEditLoan] = useState<ILoan | null>(null);

    const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
    const [employeePage, setEmployeePage] = useState<EmployeePageEnum>(EmployeePageEnum.list);
    const [dataToEditEmployee, setDataToEditEmployee] = useState<IEmployee | null>(null);

    const fetchBooksFromApi = async () => {
        setLoadingBooks(true);
        setErrorBooks(null);
        try {
            const response = await fetch('http://localhost:5103/api/Livros');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: IBook[] = await response.json();
            setBookList(data);
        } catch (error) {
            console.error("Erro ao buscar livros da API:", error);
            setErrorBooks(`Falha ao carregar livros: ${error instanceof Error ? error.message : "Erro desconhecido"}.`);
            setBookList([]);
        } finally {
            setLoadingBooks(false);
        }
    };

    const fetchUsersFromApi = async () => {
        setLoadingUsers(true);
        setErrorUsers(null);
        try {
            const response = await fetch("http://localhost:5103/api/Users"); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: IUser[] = await response.json();
            setUserList(data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setErrorUsers(`Falha ao carregar usuários: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        } finally {
            setLoadingUsers(false);
        }
    };

     const fetchEmployeeList = async () => {
        try {
            const response = await fetch("http://localhost:5103/api/Employees");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: IEmployee[] = await response.json();
            setEmployeeList(data);
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
            setEmployeeList([]);
        }
    };

    const fetchLoanList = async () => {
        try {
            const response = await fetch("http://localhost:5103/api/Loans"); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: ILoan[] = await response.json();
            setLoanList(data);
            await fetchBooksFromApi(); 
            await fetchUsersFromApi(); 
            await fetchEmployeeList();
        } catch (error) {
            console.error("Erro ao buscar empréstimos:", error);
            setLoanList([]);
        }
    };

    useEffect(() => {
        fetchUsersFromApi();
        fetchBooksFromApi(); 
        fetchEmployeeList();
        fetchLoanList();
    }, []);

    const addUser = async (data: IUser) => {
        try {
            const { id, ...userToSend } = data; 
            const response = await fetch("http://localhost:5103/api/Users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao adicionar usuário: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            await fetchUsersFromApi(); 
            setShowUserPage(UserPageEnum.list);
            alert("Usuário adicionado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao adicionar usuário via API:", error);
            alert(`Erro ao adicionar usuário: ${error.message}`); 
        }
    };

    const deleteUser = async (data: IUser) => {
        if (!window.confirm(`Tem certeza que deseja deletar o usuário ${data.name}?`)) {
            return; 
        }
        try {
            const response = await fetch(`http://localhost:5103/api/Users/${data.id}`, { method: "DELETE" });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ao deletar usuário: ${response.status} - ${errorText}`);
            }
            await fetchUsersFromApi();
            alert("Usuário deletado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao deletar usuário via API:", error);
            alert(`Erro ao deletar usuário: ${error.message}`);
        }
    };

    const editUserData = (data: IUser) => {
        setUserToEdit(data); 
        setShowUserPage(UserPageEnum.edit);
    };

    const updateUserData = async (data: IUser) => {
        try {
            const response = await fetch(`http://localhost:5103/api/Users/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao atualizar usuário: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            await fetchUsersFromApi(); 
            setShowUserPage(UserPageEnum.list);
            alert("Usuário atualizado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao atualizar usuário via API:", error);
            alert(`Erro ao atualizar usuário: ${error.message}`); 
        }
    };

    const addBook = async (data: IBook) => {
        try {
            const { id, ...bookToSend } = data;
            const response = await fetch("http://localhost:5103/api/Livros", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao adicionar livro: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            alert("Livro adicionado com sucesso!");
            await fetchBooksFromApi();
            setBookPage(BookPageEnum.list);
        } catch (error: any) {
            console.error("Erro ao adicionar livro via API:", error);
            alert(`Erro ao adicionar livro: ${error.message}`);
        }
    };

    const deleteBook = async (data: IBook) => {
        if (!window.confirm(`Tem certeza que deseja deletar o livro "${data.titulo}"?`)) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5103/api/Livros/${data.id}`, { method: "DELETE" });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ao deletar livro: ${response.status} - ${errorText}`);
            }
            alert("Livro deletado com sucesso!");
            await fetchBooksFromApi();
        } catch (error: any) {
            console.error("Erro ao deletar livro via API:", error);
            alert(`Erro ao deletar livro: ${error.message}`);
        }
    };

    const editBookData = (data: IBook) => {
        setDataToEditBook(data);
        setBookPage(BookPageEnum.edit);
    };

    const updateBookData = async (data: IBook) => {
        try {
            const response = await fetch(`http://localhost:5103/api/Livros/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao atualizar livro: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            alert("Livro atualizado com sucesso!");
            await fetchBooksFromApi();
            setBookPage(BookPageEnum.list);
        } catch (error: any) {
            console.error("Erro ao atualizar livro via API:", error);
            alert(`Erro ao atualizar livro: ${error.message}`);
        }
    };

    const addLoan = async (data: ILoan) => {
        try {
            const loanToSend = {
                bookId: data.book.id,
                userId: data.user.id,
                employeeId: data.employee.id,
                loanDate: data.loanDate,
                returnDate: data.returnDate,
                returned: data.returned
            };

            const response = await fetch("http://localhost:5103/api/Loans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loanToSend),
            });

            if (!response.ok) throw new Error("Falha ao registrar empréstimo");
            
            const createdLoan = await response.json(); 
            setLoanList([...loanList, createdLoan]);
            setLoanPage(LoanPageEnum.list);
            alert("Empréstimo registrado com sucesso!");
        
            await fetchLoanList(); 
        } catch (error) {
            console.error("Erro ao registrar empréstimo:", error);
            alert(`Erro: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
    };

    const deleteLoan = async (data: ILoan) => {
        if (!window.confirm(`Tem certeza que deseja deletar o empréstimo do livro "${data.book?.titulo || 'ID ' + data.book}"?`)) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5103/api/Loans/${data.id}`, { method: "DELETE" });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ao deletar empréstimo: ${response.status} - ${errorText}`);
            }
            alert("Empréstimo deletado com sucesso!");
            await fetchLoanList();
        } catch (error: any) {
            console.error("Erro ao deletar empréstimo via API:", error);
            alert(`Erro ao deletar empréstimo: ${error.message}`);
        }
    };

    const editLoanData = (data: ILoan) => {
        setDataToEditLoan(data);
        setLoanPage(LoanPageEnum.edit);
    };

    const updateLoanData = async (data: ILoan) => {
        try {
            const response = await fetch(`http://localhost:5103/api/Loans/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao atualizar empréstimo: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            alert("Empréstimo atualizado com sucesso!");
            await fetchLoanList();
            setLoanPage(LoanPageEnum.list);
        } catch (error: any) {
            console.error("Erro ao atualizar empréstimo via API:", error);
            alert(`Erro ao atualizar empréstimo: ${error.message}`);
        }
    };

    const returnLoan = async (data: ILoan) => {
        if (!window.confirm(`Tem certeza que deseja marcar o empréstimo do livro "${data.book?.titulo || 'ID ' + data.book}" como devolvido?`)) {
            return;
        }
        const updatedLoan = { ...data, returned: true };
        await updateLoanData(updatedLoan);
    };

    const addEmployee = async (data: IEmployee) => { 
        try {
            const { id, ...employeeToSend } = data; 
            const response = await fetch("http://localhost:5103/api/Employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao adicionar funcionário: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            await fetchEmployeeList();
            setEmployeePage(EmployeePageEnum.list);
            alert("Funcionário adicionado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao adicionar funcionário via API:", error);
            alert(`Erro ao adicionar funcionário: ${error.message}`);
        }
    };

    const deleteEmployee = async (data: IEmployee) => {
        if (!window.confirm(`Tem certeza que deseja deletar o funcionário ${data.name}?`)) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5103/api/Employees/${data.id}`, { method: "DELETE" });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ao deletar funcionário: ${response.status} - ${errorText}`);
            }
            alert("Funcionário deletado com sucesso!");
            await fetchEmployeeList();
        } catch (error: any) {
            console.error("Erro ao deletar funcionário via API:", error);
            alert(`Erro ao deletar funcionário: ${error.message}`);
        }
    };

    const editEmployeeData = (data: IEmployee) => {
        setDataToEditEmployee(data);
        setEmployeePage(EmployeePageEnum.edit);
    };

    const updateEmployeeData = async (data: IEmployee) => {
        try {
            const response = await fetch(`http://localhost:5103/api/Employees/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao atualizar funcionário: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            await fetchEmployeeList(); 
            setEmployeePage(EmployeePageEnum.list);
            alert("Funcionário atualizado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao atualizar funcionário via API:", error);
            alert(`Erro ao atualizar funcionário: ${error.message}`);
        }
    };

    return(
        <>
            <article className="article-header">
                <header>
                    <h1>Sistema de Empréstimo de Livros</h1>
                </header>
            </article>
            <nav className="tab-navigation">
                <button 
                    className={activeTab === 'books' ? 'active' : ''}
                    onClick={() => setActiveTab('books')}> Livros </button>
                <button 
                    className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}> Usuários </button>
                <button 
                    className={activeTab === 'loans' ? 'active' : ''} onClick={() => setActiveTab('loans')}> Empréstimos </button>
                <button 
                    className={activeTab === 'employees' ? 'active' : ''} onClick={() => setActiveTab('employees')}> Funcionários </button>
            </nav>

            {activeTab === 'books' && (
                <>
                    {loadingBooks && <div className="loading-message">Carregando livros...</div>}
                    {errorBooks && <div className="error-message" style={{ color: 'red' }}>Erro: {errorBooks}</div>}

                    {!loadingBooks && !errorBooks && (
                        <>
                            {bookPage === BookPageEnum.list && (
                                <>
                                    <button 
                                        onClick={() => setBookPage(BookPageEnum.add)} className="add-button"> Adicionar Livro 
                                    </button>
                                    <BookList
                                    generosDisponiveis={generosDisponiveis}
                                    employees={employeeList}
                                    list={bookList} 
                                    onDeleteClickHnd={deleteBook}
                                    onEdit={editBookData}
                                    />
                                </>
                            )}
                            {bookPage === BookPageEnum.add && (
                                <AddBook 
                                    generosDisponiveis={generosDisponiveis}
                                    onBackBtnClickHnd={() => setBookPage(BookPageEnum.list)}
                                    onSubmitClickHnd={addBook}
                                />
                            )}
                            {bookPage === BookPageEnum.edit && dataToEditBook && (
                                <EditBook
                                    generosDisponiveis={generosDisponiveis}
                                    data={dataToEditBook}
                                    onBackBtnClickHnd={() => setBookPage(BookPageEnum.list)}
                                    onUpdateClickHnd={updateBookData}
                                />
                            )}
                        </>
                    )}
                </>
            )}

            {activeTab === 'users' && (
                <>
                    {showUserPage === UserPageEnum.list && (
                        <button 
                            onClick={() => setShowUserPage(UserPageEnum.add)} 
                            className="add-button"
                        > 
                            Adicionar Usuário 
                        </button>
                    )}

                    {loadingUsers && <div>Carregando Usuários...</div>}
                    {errorUsers && <div className="error-message">Erro: {errorUsers}</div>}

                    {!loadingUsers && !errorUsers && (
                        <>
                            {showUserPage === UserPageEnum.list && (
                                <UserList 
                                    list={userList}
                                    onDeleteClickHnd={deleteUser}
                                    onEdit={editUserData}
                                />
                            )}
                            {showUserPage === UserPageEnum.add && (
                                <AddUser 
                                    onBackBtnClickHnd={() => setShowUserPage(UserPageEnum.list)}
                                    onSubmitClickHnd={addUser}
                                />
                            )}
                            {showUserPage === UserPageEnum.edit && userToEdit && (
                                <EditUser 
                                    data={userToEdit}
                                    onBackBtnClickHnd={() => setShowUserPage(UserPageEnum.list)} 
                                    onUpdateClickHnd={updateUserData}
                                />
                            )}
                        </>
                    )}
                </>
            )}

            {activeTab === 'loans' && (
                <>
                    {loanPage === LoanPageEnum.list && (
                        <>
                            <button onClick={() => setLoanPage(LoanPageEnum.add)} className="add-button"
                                disabled={bookList.filter(b => b.disponivel).length === 0 || userList.length === 0 || employeeList.length === 0}> Registrar Empréstimo
                            </button>
                            {bookList.filter(b => b.disponivel).length === 0 && (
                                <p className="warning">Nenhum livro disponível para empréstimo</p>
                            )}
                            {userList.length === 0 && (
                                <p className="warning">Nenhum usuário cadastrado</p>
                            )}
                            {employeeList.length === 0 && (
                                <p className="warning">Nenhum funcionário cadastrado</p>
                            )}
                            <LoanList 
                                list={loanList}
                                onDeleteClickHnd={deleteLoan}
                                onEdit={editLoanData}
                                onReturn={returnLoan}                       
                            />
                        </>
                    )}
                    {loanPage === LoanPageEnum.add && (
                        <AddLoan 
                            books={bookList.filter(b => b.disponivel)}
                            users={userList}
                            employees={employeeList}
                            onBackBtnClickHnd={() => setLoanPage(LoanPageEnum.list)}
                            onSubmitClickHnd={addLoan}/>
                    )}
                    {loanPage === LoanPageEnum.edit && dataToEditLoan && (
                        <EditLoan 
                                data={dataToEditLoan}
                                onBackBtnClickHnd={() => setLoanPage(LoanPageEnum.list)}
                                onUpdateClickHnd={updateLoanData}
                                books={bookList}
                                users={userList}
                                employees={employeeList}
                        />
                    )}
                </>
            )}

            {activeTab === 'employees' && (
                <>
                    {employeePage === EmployeePageEnum.list && (
                        <>
                            <button 
                                onClick={() => setEmployeePage(EmployeePageEnum.add)} className="add-button"> Adicionar Funcionário
                            </button>
                            <EmployeeList 
                                list={employeeList}
                                onDeleteClickHnd={deleteEmployee}
                                onEdit={editEmployeeData}
                            />
                        </>
                    )}
                    {employeePage === EmployeePageEnum.add && (
                        <AddEmployee 
                            onBackBtnClickHnd={() => setEmployeePage(EmployeePageEnum.list)}
                            onSubmitClickHnd={addEmployee}
                        />
                    )}
                    {employeePage === EmployeePageEnum.edit && dataToEditEmployee && (
                        <EditEmployee
                            data={dataToEditEmployee}
                            onBackBtnClickHnd={() => setEmployeePage(EmployeePageEnum.list)}
                            onUpdateClickHnd={updateEmployeeData}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default Home;