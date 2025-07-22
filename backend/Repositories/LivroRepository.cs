using EmprestimoLivrosAPI.Data;
using EmprestimoLivrosAPI.Models;
using EmprestimoLivrosAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace EmprestimoLivrosAPI.Repositories
{
    public class LivroRepository : ILivroRepository
    {
        private readonly ApplicationDbContext _context;

        public LivroRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Livro>> GetAllLivrosAsync()
        {
            return await _context.Livros.ToListAsync();
        }

        public async Task<Livro?> GetLivroByIdAsync(int id)
        {
            return await _context.Livros.FindAsync(id);
        }

        public async Task AddLivroAsync(Livro livro)
        {
            _context.Livros.Add(livro);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLivroAsync(Livro livro)
        {
            _context.Entry(livro).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteLivroAsync(Livro livro)
        {
            _context.Livros.Remove(livro);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> LivroExistsAsync(int id)
        {
            return await _context.Livros.AnyAsync(e => e.Id == id);
        }
    }
}