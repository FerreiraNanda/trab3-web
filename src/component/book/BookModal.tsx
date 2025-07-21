import { IBook } from "./Book.type";
import "../styles/shared.css";
import {CloseIcon} from "../icons";
type Props = {
    data: IBook;
    onClose: () => void;
};

const BookModal = ({ data, onClose }: Props) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose} style={{ background: "none"}}><CloseIcon/></button>
                <h2>Detalhes do Livro</h2>
                
                <div className="detail-row">
                    <span className="detail-label">Título:</span>
                    <span>{data.titulo}</span>
                </div>
                
                <div className="detail-row">
                    <span className="detail-label">Autor:</span>
                    <span>{data.autor}</span>
                </div>
                
                <div className="detail-row">
                    <span className="detail-label">Gênero:</span>
                    <span>{data.genero}</span>
                </div>
                
                <div className="detail-row">
                    <span className="detail-label">ISBN:</span>
                    <span>{data.isbn}</span>
                </div>
                
                <div className="detail-row">
                    <span className="detail-label">Disponibilidade:</span>
                    <span className={data.disponivel ? "available" : "unavailable"}>
                        {data.disponivel ? "Disponível" : "Emprestado"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BookModal;