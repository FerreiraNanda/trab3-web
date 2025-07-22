using EmprestimoLivrosAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmprestimoLivrosAPI.Interfaces
{
    public interface ILivroRepository
    {
        Task<IEnumerable<Livro>> GetAllLivrosAsync();
        Task<Livro?> GetLivroByIdAsync(int id);
        Task AddLivroAsync(Livro livro);
        Task UpdateLivroAsync(Livro livro);
        Task DeleteLivroAsync(Livro livro);
        Task<bool> LivroExistsAsync(int id);
    }
}