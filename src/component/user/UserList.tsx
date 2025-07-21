import { useState } from "react";
import { IUser } from "./User.type";
import "../styles/shared.css";
import UserModal from "./UserModal";
import { VisibilityIcon, EditIcon, CloseIcon } from "../icons";

type Props = {
    list: IUser[];
    onDeleteClickHnd: (data: IUser) => void;
    onEdit: (data: IUser) => void;
};

const UserList = (props: Props) => {
    const { list, onDeleteClickHnd, onEdit } = props;
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState(null as IUser | null);

    const viewUser = (data: IUser) => {
        setDataToShow(data);
        setShowModal(true);
    };

    const onCloseModal = () => setShowModal(false);

return (
    <div>
        <article>
            <h3 className="list-header">Lista de Usuários</h3>
        </article>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {list.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td data-label="Nome">{user.name}</td>
                            <td data-label="Email">{user.email}</td>
                            <td data-label="Telefone">{user.telefone || "-"}</td>
                            <td data-label="Ações">
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button aria-label="Visualizar" onClick={() => viewUser(user)} title="Visualizar" style={{ background: "none"}}>
                                    <VisibilityIcon/>
                                </button>
                                <button aria-label="Editar" onClick={() => onEdit(user)} title="Editar" style={{ background: "none"}}>
                                    <EditIcon/>
                                </button>
                                <button aria-label="Excluir" onClick={() => onDeleteClickHnd(user)} title="Excluir" style={{ background: "none", border: "none", cursor: "pointer" }}>
                                    <CloseIcon/>
                                </button>
                                </div>
                            </td>
                        </tr>
                        );
                })}
            </tbody>
        </table>
            {showModal && dataToShow !== null && (<UserModal onClose={onCloseModal} data={dataToShow} />)}
    </div>
    );
};

export default UserList;