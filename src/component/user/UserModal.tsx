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
           <button className="close-btn" onClick={onClose} style={{ background: "none"}}><CloseIcon/></button>
            <h2>Detalhes do Empréstimo</h2>

            <div className="detail-row">
                <span className="detail-label">Nome:</span>
                <span className="detail-value">{data.name}</span>
            </div>

            <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{data.email}</span>
            </div>

            <div className="detail-row">
                <span className="detail-label">Telefone:</span>
                <span className="detail-value">{data.telefone || "Não informado"}</span>
            </div>
            </div>
        </div>
    );

};

export default UserModal;