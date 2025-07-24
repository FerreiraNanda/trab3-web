import { useState } from "react";
import { IBook } from "./Book.type";
import "../styles/shared.css";
import BookModal from "./BookModal";
import { VisibilityIcon, EditIcon, CloseIcon } from "../icons";
import { IEmployee } from "../employee/Employee.type";

type Props = {
    generosDisponiveis: string[];
    employees: IEmployee[];
    list: IBook[];
    onDeleteClickHnd: (data: IBook) => void;
    onEdit: (data: IBook) => void;
};

const BookList = ({ list, onDeleteClickHnd, onEdit }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState<IBook | null>(null);

    const viewBook = (data: IBook) => {
        setDataToShow(data);
        setShowModal(true);
    };

    const onCloseModal = () => setShowModal(false);

    return (
        <div className="table-container">
            <article>
                <h3 className="list-header">Lista de Livros</h3>
            </article>
            <table className="compact-table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Gênero</th>
                        <th>ISBN</th>
                        <th>Disponível</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((book) => (
                        <tr key={book.id}>
                            <td data-label="Título">{book.titulo}</td>
                            <td data-label="Autor">{book.autor}</td>
                            <td data-label="Gênero">{book.genero}</td>
                            <td data-label="ISBN">{book.isbn}</td>
                            <td data-label="Disponível">{book.disponivel ? "Sim" : "Não"}</td>
                            <td data-label="Ações">
                                <div  style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button aria-label="Visualizar" onClick={() => viewBook(book)} title="Visualizar" style={{ background: "none"}}>
                                        <VisibilityIcon />
                                    </button>
                                    <button aria-label="Editar" onClick={() => onEdit(book)} title="Editar" style={{ background: "none"}}>
                                        <EditIcon />
                                    </button>
                                    <button aria-label="Excluir"  onClick={() => onDeleteClickHnd(book)} title="Excluir" style={{ background: "none"}}>
                                        <CloseIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {showModal && dataToShow && (
                <BookModal 
                    data={dataToShow}
                    onClose={onCloseModal}
                />
            )}
        </div>
    );
};

export default BookList;