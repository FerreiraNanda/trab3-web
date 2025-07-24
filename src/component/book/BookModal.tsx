import { IBook } from "./Book.type";
import "../styles/shared.css";
import { CloseIcon } from "../icons";

type Props = {
    data: IBook;
    onClose: () => void;
};

const BookModal = ({ data, onClose }: Props) => {
    return (
        <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header"> 
                        <h2 >Detalhes do Livro</h2>
                            <button className="touch-button close-btn" onClick={onClose} aria-label="Fechar modal"style={{background:"white"}}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <span className="detail-label">Título:</span>
                            <span className="detail-value">{data.titulo}</span>
                        </div>
                        
                        <div className="detail-item">
                            <span className="detail-label">Autor:</span>
                            <span className="detail-value">{data.autor}</span>
                        </div>
                        
                        <div className="detail-item">
                            <span className="detail-label">Gênero:</span>
                            <span className="detail-value">{data.genero}</span>
                        </div>
                        
                        <div className="detail-item">
                            <span className="detail-label">ISBN:</span>
                            <span className="detail-value">{data.isbn}</span>
                        </div>
                        
                        <div className="detail-item">
                            <span className="detail-label">Disponibilidade:</span>
                            <span className={`status ${data.disponivel ? "available" : "unavailable"}`}>
                                {data.disponivel ? "Disponível" : "Emprestado"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default BookModal;