import { useState } from "react";
import { IBook, BookPageEnum } from "../Book.type"; 
import BookList from "../BookList";
import AddBook from "../AddBook";
import EditBook from "../EditBook";
import { useData } from '../../../context/DataContext';
import { IEmployee } from "../../employee/Employee.type"; 

const BooksSection = () => {
    const { books, loading, errors, fetchBooks, employees } = useData();

    const [bookPage, setBookPage] = useState<BookPageEnum>(BookPageEnum.list);
    const [dataToEditBook, setDataToEditBook] = useState<IBook | null>(null);
    const generosDisponiveis = ["Ficção", "História", "Tecnologia", "Romance", "Terror", "Fantasia", "Biografia", "Autoajuda"];

    const addBook = async (data: IBook) => {
        try {
            const { id, ...bookToSend } = data;
            const response = await fetch("http://localhost:5103/api/Livros", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao adicionar livro: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            alert("Livro adicionado com sucesso!");
            await fetchBooks();
            setBookPage(BookPageEnum.list);
        } catch (error: any) {
            console.error("Erro ao adicionar livro via API:", error);
            alert(`Erro ao adicionar livro: ${error.message}`);
        }
    };

    const deleteBook = async (data: IBook) => {
        if (!window.confirm(`Tem certeza que deseja deletar o livro "${data.titulo}"?`)) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5103/api/Livros/${data.id}`, { method: "DELETE" });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ao deletar livro: ${response.status} - ${errorText}`);
            }
            alert("Livro deletado com sucesso!");
            await fetchBooks();
        } catch (error: any) {
            console.error("Erro ao deletar livro via API:", error);
            alert(`Erro ao deletar livro: ${error.message}`);
        }
    };

    const editBookData = (data: IBook) => {
        setDataToEditBook(data);
        setBookPage(BookPageEnum.edit);
    };

    const updateBookData = async (data: IBook) => {
        try {
            const response = await fetch(`http://localhost:5103/api/Livros/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao atualizar livro: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            alert("Livro atualizado com sucesso!");
            await fetchBooks(); 
            setBookPage(BookPageEnum.list);
        } catch (error: any) {
            console.error("Erro ao atualizar livro via API:", error);
            alert(`Erro ao atualizar livro: ${error.message}`);
        }
    };

    return (
        <>
            {loading.books && <div className="loading-message">Carregando livros...</div>}
            {errors.books && <div className="error-message" style={{ color: 'red' }}>Erro: {errors.books}</div>}

            {!loading.books && !errors.books && (
                <>
                    {bookPage === BookPageEnum.list && (
                        <>
                            <button 
                                onClick={() => setBookPage(BookPageEnum.add)} className="add-button"> Adicionar Livro 
                            </button>
                            <BookList
                                generosDisponiveis={generosDisponiveis}
                                employees={employees}
                                list={books} 
                                onDeleteClickHnd={deleteBook}
                                onEdit={editBookData}
                            />
                        </>
                    )}
                    {bookPage === BookPageEnum.add && (
                        <AddBook 
                            generosDisponiveis={generosDisponiveis}
                            onBackBtnClickHnd={() => setBookPage(BookPageEnum.list)}
                            onSubmitClickHnd={addBook}
                        />
                    )}
                    {bookPage === BookPageEnum.edit && dataToEditBook && (
                        <EditBook
                            generosDisponiveis={generosDisponiveis}
                            data={dataToEditBook}
                            onBackBtnClickHnd={() => setBookPage(BookPageEnum.list)}
                            onUpdateClickHnd={updateBookData}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default BooksSection;