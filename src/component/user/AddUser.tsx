import { useState } from "react";
import { IUser } from "./User.type";
import "../styles/shared.css";

type Props = {
    onBackBtnClickHnd: () => void;
    onSubmitClickHnd: (data: IUser) => void;
};

const AddUser = (props: Props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const { onBackBtnClickHnd, onSubmitClickHnd } = props;

    const onSubmitBtnClickHnd = (e: React.FormEvent) => {
        e.preventDefault();
        const data: IUser = {
            id: 0,
            name: name,
            email: email,
            telefone: telefone
        };
        onSubmitClickHnd(data);
        onBackBtnClickHnd();
    };

    return (
        <div className="form-container">
            <div>
                <h3>Adicionar Usuário</h3>
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
                    <label>Email: </label>
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
                        type="tel" 
                        value={telefone} 
                        onChange={(e) => setTelefone(e.target.value)} 
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

export default AddUser;