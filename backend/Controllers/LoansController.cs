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
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoans()
        {
            return await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .Include(l => l.Employee)
                .Where(l => l.Book != null && l.User != null && l.Employee != null)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Loan>> GetLoan(int id)
        {
            var loan = await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .Include(l => l.Employee)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (loan?.Book == null || loan?.User == null || loan?.Employee == null)
            {
                return NotFound();
            }

            return loan;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoan(int id, Loan loan)
        {
            if (id != loan.Id)
            {
                return BadRequest();
            }

            var existingLoan = await _context.Loans
                .Include(l => l.Book)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (existingLoan?.Book == null)
            {
                return NotFound();
            }

            _context.Entry(existingLoan).CurrentValues.SetValues(loan);

            if (!existingLoan.Returned && loan.Returned)
            {
                existingLoan.Book.Disponivel = true;
            }
            else if (existingLoan.Returned && !loan.Returned)
            {
                existingLoan.Book.Disponivel = false;
            }
            else if (existingLoan.BookId != loan.BookId)
            {
                var oldLivro = await _context.Livros.FindAsync(existingLoan.BookId);
                if (oldLivro != null)
                {
                    oldLivro.Disponivel = true;
                }

                var newLivro = await _context.Livros.FindAsync(loan.BookId);
                if (newLivro == null)
                {
                    return BadRequest("Livro não encontrado.");
                }

                if (!newLivro.Disponivel && !loan.Returned)
                {
                    return BadRequest("Livro não disponível.");
                }
                newLivro.Disponivel = !loan.Returned;
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
                throw;
            }

            return NoContent();
        }

        [HttpPut("{id}/devolver")]
            public async Task<IActionResult> DevolverLivro(int id)
            {
                var loan = await _context.Loans
                    .Include(l => l.Book)
                    .FirstOrDefaultAsync(l => l.Id == id);

                if (loan?.Book == null) return NotFound();

                loan.Returned = true;
                loan.Book.Disponivel = true;

                _context.Entry(loan.Book).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                    return Ok(new { success = true, bookId = loan.BookId });
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Conflict();
                }
            }

        [HttpPost]
        public async Task<ActionResult<Loan>> PostLoan(Loan loan)
        {
            var livro = await _context.Livros.FindAsync(loan.BookId);
            if (livro == null)
            {
                return BadRequest("Livro não encontrado.");
            }

            if (!livro.Disponivel)
            {
                return BadRequest("Livro não disponível.");
            }
            
            livro.Disponivel = false;
            _context.Loans.Add(loan);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLoan), new { id = loan.Id }, loan);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(int id)
        {
            var loan = await _context.Loans
                .Include(l => l.Book)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (loan == null)
            {
                return NotFound();
            }

            if (!loan.Returned && loan.Book != null)
            {
                loan.Book.Disponivel = true;
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