import { useState } from "react";
import { IBook } from "./Book.type";
import "../styles/shared.css";

type Props = {
    generosDisponiveis: string[];
    onBackBtnClickHnd: () => void;
    onSubmitClickHnd: (data: IBook) => void;
};

const AddBook = ({ generosDisponiveis, onBackBtnClickHnd, onSubmitClickHnd }: Props) => {
    const [formData, setFormData] = useState<Omit<IBook, 'id' | 'disponivel' | 'registeredBy'>>({
        titulo: '',
        autor: '',
        isbn: '',
        genero: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.titulo || !formData.autor || !formData.isbn || !formData.genero) {
            alert("Preencha todos os campos!");
            return;
        }
        
        const newBook: IBook = {
            id: 0,
            ...formData,
            disponivel: true,
            registeredBy: "current-user-id" 
        };
        
        onSubmitClickHnd(newBook);
        onBackBtnClickHnd();
    };

return (
    <div className="form-container">
        <h2>Adicionar Novo Livro</h2>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Título:</label>
                <input 
                    type="text" 
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
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
                />
            </div> 
            <div className="form-group">
                <label>Gênero:</label>
                <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required>
                    <option value="">Selecione...</option>
                    {generosDisponiveis.map(genero => (
                        <option key={genero} value={genero}>{genero}</option>
                    ))}
            </select>
            </div>
                
            <div className="button-group">
                <button type="button" onClick={onBackBtnClickHnd} className="cancel-button">Cancelar</button>
                <button type="submit" className="submit-button">Salvar</button>
            </div>
        </form>
    </div>
    );
};

export default AddBook;