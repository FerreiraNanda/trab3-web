import { useState } from "react";
import { IEmployee } from "./Employee.type";
import "../styles/shared.css";
import { VisibilityIcon, EditIcon, CloseIcon } from "../icons";
import EmployeeModal from "./EmployeeModal";

type Props = {
    list: IEmployee[];
    onDeleteClickHnd: (data: IEmployee) => void;
    onEdit: (data: IEmployee) => void;
};

const EmployeeList = (props: Props) => {
    const { list, onDeleteClickHnd, onEdit } = props;
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState<IEmployee | null>(null);

    const viewEmployee = (data: IEmployee) => {
        setDataToShow(data);
        setShowModal(true);
    };

    const onCloseModal = () => setShowModal(false);

return (
    <div>
        <article>
            <h3 className="list-header">Funcionários Ativos</h3>
        </article>
         <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Matrícula</th>
                    <th>Cargo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {list.map((employee) => {
                    return (
                        <tr key={employee.id}>
                            <td data-label="Nome">{employee.name}</td>
                            <td data-label="Matrícula">{employee.registrationNumber}</td>
                            <td data-label="Cargo">{employee.position}</td>

                            <td data-label="Ações">
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button onClick={() => viewEmployee(employee)}  style={{ background: "none"}} title="Visualizar">
                                    <VisibilityIcon />
                                    </button>
                                    <button aria-label="Editar" onClick={() => onEdit(employee)} style={{ background: "none" }} title="Editar">
                                    <EditIcon />
                                    </button>
                                    <button aria-label="Excluir" onClick={() => onDeleteClickHnd(employee)} style={{ background: "none" }} title="Excluir">
                                    <CloseIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
            {showModal && dataToShow !== null && (
            <EmployeeModal onClose={onCloseModal} data={dataToShow} />
            )}
    </div>
    );
};

export default EmployeeList;