using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmprestimoLivrosAPI.Data;
using EmprestimoLivrosAPI.Models;

namespace EmprestimoLivrosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LoansController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmprestimoLivrosAPI.Models.Loan>>> GetLoans()
        {
            return await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .Include(l => l.Employee)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmprestimoLivrosAPI.Models.Loan>> GetLoan(int id)
        {
            var loan = await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .Include(l => l.Employee)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (loan == null)
            {
                return NotFound();
            }

            return loan;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoan(int id, [FromBody] EmprestimoLivrosAPI.Models.Loan loan)
        {
            if (id != loan.Id)
            {
                return BadRequest();
            }

            var existingLoan = await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .Include(l => l.Employee)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (existingLoan == null)
            {
                return NotFound();
            }

            _context.Entry(existingLoan).CurrentValues.SetValues(loan);

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
                        return BadRequest("O novo livro selecionado não está disponível para empréstimo.");
                    }
                    newLivro.Disponivel = loan.Returned;
                }
            }
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            
            var updatedAndLoadedLoan = await _context.Loans
                                            .Include(l => l.Book)
                                            .Include(l => l.User)
                                            .Include(l => l.Employee)
                                            .FirstOrDefaultAsync(l => l.Id == id);
            
            return Ok(updatedAndLoadedLoan);
        }

        [HttpPost]
        public async Task<ActionResult<EmprestimoLivrosAPI.Models.Loan>> PostLoan([FromBody] EmprestimoLivrosAPI.Models.Loan loan)
        {
            var livro = await _context.Livros.FindAsync(loan.BookId);
            if (livro == null)
            {
                return BadRequest("Livro não encontrado.");
            }

            if (!livro.Disponivel)
            {
                return BadRequest("Este livro não está disponível para empréstimo.");
            }
            
            livro.Disponivel = loan.Returned;

            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();

            var createdLoan = await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .Include(l => l.Employee)
                .FirstOrDefaultAsync(l => l.Id == loan.Id);

           return CreatedAtAction("GetLoan", new { id = createdLoan!.Id }, createdLoan);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(int id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null)
            {
                return NotFound();
            }

            if (!loan.Returned)
            {
                var livro = await _context.Livros.FindAsync(loan.BookId);
                if (livro != null)
                {
                    livro.Disponivel = true;
                }
            }

            _context.Loans.Remove(loan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoanExists(int id)
        {
            return _context.Loans.Any(e => e.Id == id);
        }
    }
}