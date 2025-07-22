import { useEffect, useState } from "react";
import { IUser, UserPageEnum } from "../User.type";
import UserList from "../UserList";
import AddUser from "../AddUser";
import EditUser from "../EditUser";

const UsersSection = () => {
    const [userList, setUserList] = useState([] as IUser[]);
    const [showUserPage, setShowUserPage] = useState(UserPageEnum.list);
    const [userToEdit, setUserToEdit] = useState({} as IUser);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [errorUsers, setErrorUsers] = useState<string | null>(null);

    const fetchUsersFromApi = async () => {
        setLoadingUsers(true);
        setErrorUsers(null);
        try {
            const response = await fetch("http://localhost:5103/api/Users"); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: IUser[] = await response.json();
            setUserList(data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setErrorUsers(`Falha ao carregar usuários: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        fetchUsersFromApi();
    }, []);

    const addUser = async (data: IUser) => {
        try {
            const { id, ...userToSend } = data; 
            const response = await fetch("http://localhost:5103/api/Users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao adicionar usuário: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            await fetchUsersFromApi(); 
            setShowUserPage(UserPageEnum.list);
            alert("Usuário adicionado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao adicionar usuário via API:", error);
            alert(`Erro ao adicionar usuário: ${error.message}`); 
        }
    };

    const deleteUser = async (data: IUser) => {
        if (!window.confirm(`Tem certeza que deseja deletar o usuário ${data.name}?`)) {
            return; 
        }
        try {
            const response = await fetch(`http://localhost:5103/api/Users/${data.id}`, { method: "DELETE" });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ao deletar usuário: ${response.status} - ${errorText}`);
            }
            await fetchUsersFromApi();
            alert("Usuário deletado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao deletar usuário via API:", error);
            alert(`Erro ao deletar usuário: ${error.message}`);
        }
    };

    const editUserData = (data: IUser) => {
        setUserToEdit(data); 
        setShowUserPage(UserPageEnum.edit);
    };

    const updateUserData = async (data: IUser) => {
        try {
            const response = await fetch(`http://localhost:5103/api/Users/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao atualizar usuário: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            await fetchUsersFromApi(); 
            setShowUserPage(UserPageEnum.list);
            alert("Usuário atualizado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao atualizar usuário via API:", error);
            alert(`Erro ao atualizar usuário: ${error.message}`); 
        }
    };

    return (
        <>
            {showUserPage === UserPageEnum.list && (
                <button 
                    onClick={() => setShowUserPage(UserPageEnum.add)} 
                    className="add-button"
                > 
                    Adicionar Usuário 
                </button>
            )}

            {loadingUsers && <div>Carregando Usuários...</div>}
            {errorUsers && <div className="error-message">Erro: {errorUsers}</div>}

            {!loadingUsers && !errorUsers && (
                <>
                    {showUserPage === UserPageEnum.list && (
                        <UserList 
                            list={userList}
                            onDeleteClickHnd={deleteUser}
                            onEdit={editUserData}
                        />
                    )}
                    {showUserPage === UserPageEnum.add && (
                        <AddUser 
                            onBackBtnClickHnd={() => setShowUserPage(UserPageEnum.list)}
                            onSubmitClickHnd={addUser}
                        />
                    )}
                    {showUserPage === UserPageEnum.edit && userToEdit && (
                        <EditUser 
                            data={userToEdit}
                            onBackBtnClickHnd={() => setShowUserPage(UserPageEnum.list)} 
                            onUpdateClickHnd={updateUserData}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default UsersSection;