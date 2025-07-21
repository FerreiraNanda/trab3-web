import { ILoan } from "./Loan.type";
import "../styles/shared.css";
import {CloseIcon} from "../icons";

type Props = {
    data: ILoan;
    onClose: () => void;
};

const LoanModal = ({ data, onClose }: Props) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

return (
    <div className="modal-overlay">
        <div className="modal-content">
                <button className="close-btn" onClick={onClose}
                style={{ background: "none"}}><CloseIcon/></button>
                <h2>Detalhes do Empréstimo</h2>
                
                <div className="detail-row">
                    <span className="detail-label">Livro:</span>
                    <span>{data.book.titulo} - {data.book.autor}</span>
                </div>
                
                <div className="detail-row">
                    <span className="detail-label">Usuário:</span>
                    <span>{data.user.name}</span>
                </div>
                
                <div className="detail-row">
                    <span className="detail-label">Funcionário:</span>
                    <span>{data.employee.name} ({data.employee.position})</span>
                </div>
                
                <div className="detail-row">
                    <span className="detail-label">Data Empréstimo:</span>
                    <span>{formatDate(data.loanDate)}</span>
                </div>
                
                <div className="detail-row">
                    <span className="detail-label">Data Devolução:</span>
                    <span>{formatDate(data.returnDate)}</span>
                </div>
                
                <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`status ${data.returned ? 'returned' : 'pending'}`}>
                        {data.returned ? 'Devolvido' : 'Pendente'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoanModal;