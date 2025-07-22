using EmprestimoLivrosAPI.Models;
using EmprestimoLivrosAPI.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using EmprestimoLivrosAPI.Data;

namespace EmprestimoLivrosAPI.Services
{
    public class LoanService : ILoanService
    {
        private readonly ILoanRepository _loanRepository;
        private readonly ApplicationDbContext _context; 
        public LoanService(ILoanRepository loanRepository, ApplicationDbContext context)
        {
            _loanRepository = loanRepository;
            _context = context; 
        }

        public async Task<IEnumerable<Loan>> GetAllLoansAsync()
        {
            return await _loanRepository.GetAllLoansAsync();
        }

        public async Task<Loan?> GetLoanByIdAsync(int id)
        {
            return await _loanRepository.GetLoanByIdAsync(id);
        }

        public async Task<Loan?> CreateLoanAsync(Loan loan)
        {
            var livro = await _context.Livros.FindAsync(loan.BookId);
            if (livro == null || !livro.Disponivel)
            {
                return null; 
            }
            
            livro.Disponivel = loan.Returned; 
            
            await _loanRepository.AddLoanAsync(loan);
            return await _loanRepository.GetLoanByIdAsync(loan.Id);
        }

        public async Task<bool> UpdateLoanAsync(int id, Loan loan)
        {
            if (id != loan.Id)
            {
                return false;
            }

            var existingLoan = await _loanRepository.GetLoanByIdAsync(id);
            if (existingLoan == null)
            {
                return false;
            }
            if (existingLoan.Returned != loan.Returned)
            {
                var livro = await _context.Livros.FindAsync(loan.BookId);
                if (livro != null)
                {
                    livro.Disponivel = loan.Returned;
                }
            }
            else if (existingLoan.BookId != loan.BookId)
            {
                var oldLivro = await _context.Livros.FindAsync(existingLoan.BookId);
                if (oldLivro != null)
                {
                    oldLivro.Disponivel = true;
                }
                var newLivro = await _context.Livros.FindAsync(loan.BookId);
                if (newLivro != null)
                {
                    if (!newLivro.Disponivel && !loan.Returned)
                    {
                        return false; 
                    }
                    newLivro.Disponivel = loan.Returned;
                }
            }

            await _loanRepository.UpdateLoanAsync(loan);
            return true;
        }

        public async Task<bool> DeleteLoanAsync(int id)
        {
            var loan = await _loanRepository.GetLoanByIdAsync(id);
            if (loan == null)
            {
                return false;
            }
            if (!loan.Returned)
            {
                var livro = await _context.Livros.FindAsync(loan.BookId);
                if (livro != null)
                {
                    livro.Disponivel = true;
                }
            }

            await _loanRepository.DeleteLoanAsync(loan);
            return true;
        }
    }
}