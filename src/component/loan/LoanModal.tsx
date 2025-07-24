import { ILoan } from "./Loan.type";
import "../styles/shared.css";
import { CloseIcon } from "../icons";

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
                    <div className="modal-header">
                        <h2>Detalhes do Empréstimo</h2>
                        <button className="touch-button  close-btn" style={{ background:"white" }} onClick={onClose} aria-label="Fechar modal">
                        <CloseIcon/>
                    </button>   
                    </div>   
                        <div className="modal-body">
                            <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Livro</span>
                                <span className="detail-value">
                                    {data.book.titulo} - {data.book.autor}
                                </span>
                            </div>
                            
                            <div className="detail-item">
                                <span className="detail-label">Usuário</span>
                                <span className="detail-value">{data.user.name}</span>
                            </div>
                            
                            <div className="detail-item">
                                <span className="detail-label">Funcionário</span>
                                <span className="detail-value">
                                    {data.employee.name} ({data.employee.position})
                                </span>
                            </div>
                            
                            <div className="detail-item">
                                <span className="detail-label">Data Empréstimo:</span>
                                <span className="detail-value">{formatDate(data.loanDate)}</span>
                            </div>
                            
                            <div className="detail-item">
                                <span className="detail-label">Data Devolução</span>
                                <span className="detail-value">{formatDate(data.returnDate)}</span>
                            </div>
                            
                            <div className="detail-item">
                                <span className="detail-label">Status</span>
                                <span className={`status ${data.returned ? 'returned' : 'pending'}`}>
                                    {data.returned ? 'Devolvido' : 'Pendente'}
                                </span>
                            </div>
                        </div>
                    </div>                            
                </div>
            </div>
    );
};

export default LoanModal;