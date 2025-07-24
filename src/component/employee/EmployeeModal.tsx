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
                <div className="modal-header">
                    <h2>Detalhes do Funcionário</h2>
                    <button className="touch-button  close-btn" onClick={onClose} style={{ background: "white"}}>
                        <CloseIcon/>
                        </button>
                </div>
                <div className="detail-grid">
                    <div className="detail-item">
                            <span className="detail-label">Nome:</span>
                            <span className="detail-value">{data.name}</span>
                    </div>
                    <div className="detail-item"> 
                            <span className="detail-label">Matrícula:</span>
                            <span className="detail-value">{data.registrationNumber}</span>
                    </div>
                    <div className="detail-item">
                            <span className="detail-label">Cargo:</span>
                            <span className="detail-value">{data.position}</span>
                    </div>
                </div>
            </div>
        </div>
    );

};


export default EmployeeModal;