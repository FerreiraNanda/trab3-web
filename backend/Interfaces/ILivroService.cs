using EmprestimoLivrosAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmprestimoLivrosAPI.Interfaces
{
    public interface ILivroService
    {
        Task<IEnumerable<Livro>> GetAllLivrosAsync();
        Task<Livro?> GetLivroByIdAsync(int id);
        Task<Livro> CreateLivroAsync(Livro livro);
        Task<bool> UpdateLivroAsync(int id, Livro livro);
        Task<bool> DeleteLivroAsync(int id);
    }
}