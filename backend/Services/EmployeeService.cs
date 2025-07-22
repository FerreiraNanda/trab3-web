using EmprestimoLivrosAPI.Models;
using EmprestimoLivrosAPI.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmprestimoLivrosAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return await _employeeRepository.GetAllEmployeesAsync();
        }

        public async Task<Employee?> GetEmployeeByIdAsync(int id)
        {
            return await _employeeRepository.GetEmployeeByIdAsync(id);
        }

        public async Task<Employee> CreateEmployeeAsync(Employee employee)
        {
            await _employeeRepository.AddEmployeeAsync(employee);
            return employee;
        }

        public async Task<bool> UpdateEmployeeAsync(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return false;
            }

            var existingEmployee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (existingEmployee == null)
            {
                return false;
            }
            
            existingEmployee.Name = employee.Name;
            existingEmployee.RegistrationNumber = employee.RegistrationNumber;
            existingEmployee.Position = employee.Position;

            await _employeeRepository.UpdateEmployeeAsync(existingEmployee);
            return true;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (employee == null)
            {
                return false;
            }

            // Adicione aqui lógica de negócio para verificar se o funcionário
            // tem empréstimos associados antes de permitir a exclusão, se necessário.

            await _employeeRepository.DeleteEmployeeAsync(employee);
            return true;
        }
    }
}