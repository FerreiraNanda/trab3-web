import { useState } from "react";
import "../styles/shared.css";
import { IEmployee } from "./Employee.type";

type Props = {
    onBackBtnClickHnd: () => void;
    onSubmitClickHnd: (data: IEmployee) => void;
};

const AddEmployee = (props: Props) => {
    const [name, setName] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [position, setPosition] = useState("");

    const { onBackBtnClickHnd, onSubmitClickHnd } = props;

    const onSubmitBtnClickHnd = (e: React.FormEvent) => {
        e.preventDefault();
        const data: IEmployee = {
            id: 0,
            name: name,
            registrationNumber: registrationNumber,
            position: position
        };
        onSubmitClickHnd(data);
        onBackBtnClickHnd();
    };

return (
    <div className="form-container">
        <div>
            <h3>Adicionar Funcionário</h3>
        </div>
        <form onSubmit={onSubmitBtnClickHnd}>
            <div className="form-group"> 
                <label>Nome: </label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
            </div>
            <div className="form-group">
                <label>Matrícula: </label>
                <input 
                    type="text" 
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Cargo: </label>
                <input 
                    type="text" 
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
            </div>
            <div className="button-group">
                <button type="button" onClick={onBackBtnClickHnd} className="cancel-button">Cancelar</button>
                <button type="submit" className="submit-button">Salvar</button>
            </div>
        </form>
    </div>
    );
};

export default AddEmployee;