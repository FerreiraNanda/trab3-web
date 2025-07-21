import { useState } from "react";
import { IEmployee } from "./Employee.type";
import "../styles/shared.css";

type Props = {
    data: IEmployee;
    onBackBtnClickHnd: () => void;
    onUpdateClickHnd: (data: IEmployee) => void;
};

const EditEmployee = (props: Props) => {
    const { data, onBackBtnClickHnd, onUpdateClickHnd } = props;

    const [name, setName] = useState(data.name);
    const [registrationNumber, setRegistrationNumber] = useState(data.registrationNumber);
    const [position, setPosition] = useState(data.position);

    const onSubmitBtnClickHnd = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData: IEmployee = {
            id: data.id,
            name: name,
            registrationNumber: registrationNumber,
            position: position
        };
        onUpdateClickHnd(updatedData);
        onBackBtnClickHnd();
    };

return (
    <div className="form-container">
        <div>
            <h3>Editar Funcionário</h3>
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
                <div className="form-actions">
                    <button type="button" onClick={onBackBtnClickHnd} className="button secondary">
                        Voltar
                    </button>
                    <button type="submit" className="button primary">
                            Atualizar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployee;