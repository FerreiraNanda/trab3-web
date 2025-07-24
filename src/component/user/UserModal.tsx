import { IUser } from "./User.type";
import "../styles/shared.css";
import {CloseIcon} from "../icons";
type Props = {
    onClose: () => void;
    data: IUser;
};

const UserModal = (props: Props) => {
    const { onClose, data } = props;

 return(
    
        <div className="modal-overlay">
            <div className="modal-content">
                    <div className="modal-header">
                        <h2>Detalhes do Usuário</h2>
                        <button className="touch-button  close-btn" onClick={onClose} style={{ background: "none"}}><CloseIcon/></button>
                    </div>
             <div className="detail-grid">
                    <div className="detail-item">
                            <span className="detail-label">Nome:</span>
                            <span className="detail-value">{data.name}</span>
                    </div>
                    <div className="detail-item"> 
                            <span className="detail-label">E-mail:</span>
                            <span className="detail-value">{data.email}</span>
                    </div>
                    <div className="detail-item"> 
                            <span className="detail-label">Telefone:</span>
                            <span className="detail-value">{data.telefone}</span>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default UserModal;