
import { useState, useEffect } from "react";
import { IBook } from "./Book.type";
import "../styles/shared.css";

type Props = {
    generosDisponiveis: string[];
    data: IBook;
    onBackBtnClickHnd: () => void;
    onUpdateClickHnd: (data: IBook) => void;
};

const EditBook = ({ generosDisponiveis, data, onBackBtnClickHnd, onUpdateClickHnd }: Props) => {
    const [formData, setFormData] = useState<IBook>(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateClickHnd(formData);
        onBackBtnClickHnd();
    };

return (
    <div className="form-container">
        <div className="form-header">
            <h2>Editar Livro</h2>
        </div>   
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Título:</label>
                    <input 
                        type="text" 
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>  
                <div className="form-group">
                    <label>Autor:</label>
                    <input 
                        type="text" 
                        name="autor"
                        value={formData.autor}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>   
                <div className="form-group">
                    <label>ISBN:</label>
                    <input 
                        type="text" 
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>     
                <div className="form-group">
                    <label>Gênero:</label>
                    <select
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                        required
                        className="form-select"
                    >
                        <option value="">Selecione um gênero</option>
                        {generosDisponiveis.map((genero) => (
                            <option key={genero} value={genero}>
                                {genero}
                            </option>
                        ))}
                    </select>
                </div>  
                <div className="form-group">
                    <label>Disponibilidade:</label>
                    <input 
                        type="text" 
                        value={formData.disponivel ? "Disponível" : "Emprestado"} 
                        readOnly
                        className="form-input readonly"
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

export default EditBook;