import { useState } from "react";
import { ILoan } from "./Loan.type";
import "../styles/shared.css";
import LoanModal from "./LoanModal";
import { VisibilityIcon, EditIcon, CloseIcon, ReturnIcon } from "../icons";

type Props = {
    list: ILoan[];
    onDeleteClickHnd: (data: ILoan) => void;
    onEdit: (data: ILoan) => void;
    onReturn: (data: ILoan) => void;
};

const LoanList = ({ list, onDeleteClickHnd, onEdit, onReturn }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState<ILoan | null>(null);

    const viewLoan = (data: ILoan) => {
        setDataToShow(data);
        setShowModal(true);
    };

    const onCloseModal = () => setShowModal(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getStatus = (loan: ILoan) => {
        if (loan.returned) return "Devolvido";
        if (new Date(loan.returnDate) < new Date()) return "Atrasado";
        return "Em andamento";
    };

return (
    <div>
        <article>
            <h3 className="list-header">Empréstimo Registrados</h3>
        </article>
        <table>
            <thead>
                <tr>
                    <th>Livro</th>
                    <th>Usuário</th>
                    <th>Data Empréstimo</th>
                    <th>Data Devolução</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {list.map((loan) => (
                    <tr key={loan.id}>
                        <td data-label="Livro">{loan.book?.titulo || "-"}</td>
                        <td data-label="Usuário">{loan.user?.name || "-"}</td>
                        <td data-label="Data Empréstimo">{formatDate(loan.loanDate)}</td>
                        <td data-label="Data Devolução">{formatDate(loan.returnDate)}</td>
                        <td data-label="Status">{getStatus(loan)}</td>

                        <td data-label="Ações">

                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                aria-label="Visualizar"
                                onClick={() => viewLoan(loan)}
                                title="Visualizar"
                                style={{ background: "none"}}>
                                <VisibilityIcon />
                                </button>
                                {!loan.returned && (
                                <>
                                    <button
                                    aria-label="Editar"
                                    onClick={() => onEdit(loan)}
                                    title="Editar"
                                    style={{ background: "none"}}>
                                    <EditIcon />
                                    </button>
                                    <button aria-label="Devolver" onClick={() => onReturn(loan)} title="Devolver" style={{ background: "none"}}>
                                    <ReturnIcon />
                                    </button>
                                </>
                                )}
                                <button aria-label="Excluir" onClick={() => onDeleteClickHnd(loan)} title="Excluir" style={{ background: "none", border: "none", cursor: "pointer" }}>
                                <CloseIcon />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {showModal && dataToShow && (
            <LoanModal data={dataToShow} onClose={onCloseModal}/>
        )}
    </div>
    );
};

export default LoanList;