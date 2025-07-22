import { useState } from "react";
import { IEmployee, EmployeePageEnum } from "../Employee.type";
import EmployeeList from "../EmployeeList";
import AddEmployee from "../AddEmployee";
import EditEmployee from "../EditEmployee";
import { useData } from '../../../context/DataContext';

const EmployeesSection = () => {
 
    const { employees, loading, errors, fetchEmployees } = useData();

    const [employeePage, setEmployeePage] = useState<EmployeePageEnum>(EmployeePageEnum.list);
    const [dataToEditEmployee, setDataToEditEmployee] = useState<IEmployee | null>(null);

    const addEmployee = async (data: IEmployee) => { 
        try {
            const { id, ...employeeToSend } = data; 
            const response = await fetch("http://localhost:5103/api/Employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao adicionar funcionário: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            alert("Funcionário adicionado com sucesso!");
            await fetchEmployees();
            setEmployeePage(EmployeePageEnum.list);
        } catch (error: any) {
            console.error("Erro ao adicionar funcionário via API:", error);
            alert(`Erro ao adicionar funcionário: ${error.message}`);
        }
    };

    const deleteEmployee = async (data: IEmployee) => {
        if (!window.confirm(`Tem certeza que deseja deletar o funcionário ${data.name}?`)) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5103/api/Employees/${data.id}`, { method: "DELETE" });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Falha ao deletar funcionário: ${response.status} - ${errorText}`);
            }
            alert("Funcionário deletado com sucesso!");
            await fetchEmployees();
        } catch (error: any) {
            console.error("Erro ao deletar funcionário via API:", error);
            alert(`Erro ao deletar funcionário: ${error.message}`);
        }
    };

    const editEmployeeData = (data: IEmployee) => {
        setDataToEditEmployee(data);
        setEmployeePage(EmployeePageEnum.edit);
    };

    const updateEmployeeData = async (data: IEmployee) => {
        try {
            const response = await fetch(`http://localhost:5103/api/Employees/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao atualizar funcionário: ${response.status} - ${errorData.title || JSON.stringify(errorData)}`);
            }
            alert("Funcionário atualizado com sucesso!");
            await fetchEmployees();
            setEmployeePage(EmployeePageEnum.list);
        } catch (error: any) {
            console.error("Erro ao atualizar funcionário via API:", error);
            alert(`Erro ao atualizar funcionário: ${error.message}`);
        }
    };

    return (
        <>
            {employeePage === EmployeePageEnum.list && (
                <>
                    <button 
                        onClick={() => setEmployeePage(EmployeePageEnum.add)} className="add-button"> Adicionar Funcionário
                    </button>
                    {loading.employees && <div>Carregando Funcionários...</div>}
                    {errors.employees && <div className="error-message">Erro: {errors.employees}</div>}
                    {!loading.employees && !errors.employees && (
                        <EmployeeList 
                            list={employees}
                            onDeleteClickHnd={deleteEmployee}
                            onEdit={editEmployeeData}
                        />
                    )}
                </>
            )}
            {employeePage === EmployeePageEnum.add && (
                <AddEmployee 
                    onBackBtnClickHnd={() => setEmployeePage(EmployeePageEnum.list)}
                    onSubmitClickHnd={addEmployee}
                />
            )}
            {employeePage === EmployeePageEnum.edit && dataToEditEmployee && (
                <EditEmployee
                    data={dataToEditEmployee}
                    onBackBtnClickHnd={() => setEmployeePage(EmployeePageEnum.list)}
                    onUpdateClickHnd={updateEmployeeData}
                />
            )}
        </>
    );
};

export default EmployeesSection;