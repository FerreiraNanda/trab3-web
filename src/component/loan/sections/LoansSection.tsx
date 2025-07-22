import { useState } from "react";
import { ILoan, LoanPageEnum } from "../Loan.type";
import AddLoan from "../AddLoan";
import EditLoan from "../EditLoan";
import LoanList from "../LoanList";
import { useData } from '../../../context/DataContext';

const LoansSection = () => {
    const { loans, users, books, employees, loading, errors, fetchLoans } = useData();

    const [loanPage, setLoanPage] = useState<LoanPageEnum>(LoanPageEnum.list);
    const [dataToEditLoan, setDataToEditLoan] = useState<ILoan | null>(null);

    const addLoan = async (data: ILoan) => {
        try {
            const loanToSend = {
                bookId: data.book?.id,
                userId: data.user?.id,
                employeeId: data.employee?.id,
                loanDate: data.loanDate,
                returnDate: data.returnDate,
                returned: data.returned
            };

            const response = await fetch("http://localhost:5103/api/Loans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loanToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao registrar empréstimo: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            alert("Empréstimo registrado com sucesso!");
            await fetchLoans();
            setLoanPage(LoanPageEnum.list);
        } catch (error: any) {
            console.error("Erro ao registrar empréstimo via API:", error);
            alert(`Erro ao registrar empréstimo: ${error.message}`);
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
            await fetchLoans();
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
            const loanToSend = {
                id: data.id,
                bookId: data.book?.id,       
                userId: data.user?.id,       
                employeeId: data.employee?.id, 
                loanDate: data.loanDate,
                returnDate: data.returnDate,
                returned: data.returned
            };

            const response = await fetch(`http://localhost:5103/api/Loans/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loanToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao atualizar empréstimo: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            alert("Empréstimo atualizado com sucesso!");
            await fetchLoans();
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

    return (
        <>
            {loanPage === LoanPageEnum.list && (
                <>
                    <button onClick={() => setLoanPage(LoanPageEnum.add)} className="add-button"
                        disabled={books.filter(b => b.disponivel).length === 0 || users.length === 0 || employees.length === 0}> 
                        Registrar Empréstimo
                    </button>
                    {books.filter(b => b.disponivel).length === 0 && (
                        <p className="warning">Nenhum livro disponível para empréstimo</p>
                    )}
                    {users.length === 0 && (
                        <p className="warning">Nenhum usuário cadastrado</p>
                    )}
                    {employees.length === 0 && (
                        <p className="warning">Nenhum funcionário cadastrado</p>
                    )}

                    {loading.loans && <div>Carregando Empréstimos...</div>}
                    {errors.loans && <div className="error-message">Erro: {errors.loans}</div>}

                    {!loading.loans && !errors.loans && (
                        <LoanList 
                            list={loans}
                            onDeleteClickHnd={deleteLoan}
                            onEdit={editLoanData}
                            onReturn={returnLoan}                       
                        />
                    )}
                </>
            )}
            {loanPage === LoanPageEnum.add && (
                <AddLoan 
                    books={books.filter(b => b.disponivel)}
                    users={users}
                    employees={employees}
                    onBackBtnClickHnd={() => setLoanPage(LoanPageEnum.list)}
                    onSubmitClickHnd={addLoan}
                />
            )}
            {loanPage === LoanPageEnum.edit && dataToEditLoan && (
                <EditLoan 
                    data={dataToEditLoan}
                    onBackBtnClickHnd={() => setLoanPage(LoanPageEnum.list)}
                    onUpdateClickHnd={updateLoanData}
                    books={books}
                    users={users}
                    employees={employees}
                />
            )}
        </>
    );
};

export default LoansSection;