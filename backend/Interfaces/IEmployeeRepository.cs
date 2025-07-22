using EmprestimoLivrosAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmprestimoLivrosAPI.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee?> GetEmployeeByIdAsync(int id);
        Task AddEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(Employee employee);
        Task<bool> EmployeeExistsAsync(int id);
    }
}