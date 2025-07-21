import { IEmployee } from "./Employee.type";
import "../styles/shared.css";
import {CloseIcon} from "../icons";
type Props = {
    onClose: () => void;
    data: IEmployee;
};

const EmployeeModal = (props: Props) => {
    const { onClose, data } = props;
return (
        <div className="modal-overlay">
            <div className="modal-content">
            <button className="close-btn" onClick={onClose} style={{ background: "none"}}><CloseIcon/></button>
            <h3>Detalhes do Funcionário</h3>

            <div className="detail-row">
                <span className="detail-label">Nome:</span>
                <span className="detail-value">{data.name}</span>
            </div>

            <div className="detail-row">
                <span className="detail-label">Matrícula:</span>
                <span className="detail-value">{data.registrationNumber}</span>
            </div>

            <div className="detail-row">
                <span className="detail-label">Cargo:</span>
                <span className="detail-value">{data.position}</span>
            </div>
            </div>
        </div>
    );

};


export default EmployeeModal;