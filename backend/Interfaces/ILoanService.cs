using EmprestimoLivrosAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmprestimoLivrosAPI.Interfaces
{
    public interface ILoanService
    {
        Task<IEnumerable<Loan>> GetAllLoansAsync();
        Task<Loan?> GetLoanByIdAsync(int id);
        Task<Loan?> CreateLoanAsync(Loan loan);
        Task<bool> UpdateLoanAsync(int id, Loan loan);
        Task<bool> DeleteLoanAsync(int id);
    }
}