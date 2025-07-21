import { useState } from "react";
import { IUser } from "./User.type";
import "../styles/shared.css";
type Props = {
    data: IUser;
    onBackBtnClickHnd: () => void;
    onUpdateClickHnd: (data: IUser) => void;
};

const EditUser = (props: Props) => {
    const { data, onBackBtnClickHnd, onUpdateClickHnd } = props;

    const [name, setNome] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [telefone, setTelefone] = useState(data.telefone || "");

    const onSubmitBtnClickHnd = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedData: IUser = {
            id: data.id,
            name,
            email,
            telefone
        };

        onUpdateClickHnd(updatedData);
        onBackBtnClickHnd();
    };

    return (
        <div className="form-container">
            <div>
                <h3>Editar Usuário</h3>
            </div>
            <form onSubmit={onSubmitBtnClickHnd}>
                <div className="form-group">
                    <label>Nome: </label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setNome(e.target.value)} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label>E-mail: </label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Telefone: </label>
                    <input 
                        type="text" 
                        value={telefone} 
                        onChange={(e) => setTelefone(e.target.value)}
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

export default EditUser;