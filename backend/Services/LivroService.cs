using EmprestimoLivrosAPI.Models;
using EmprestimoLivrosAPI.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmprestimoLivrosAPI.Services
{
    public class LivroService : ILivroService
    {
        private readonly ILivroRepository _livroRepository;

        public LivroService(ILivroRepository livroRepository)
        {
            _livroRepository = livroRepository;
        }

        public async Task<IEnumerable<Livro>> GetAllLivrosAsync()
        {
            return await _livroRepository.GetAllLivrosAsync();
        }

        public async Task<Livro?> GetLivroByIdAsync(int id)
        {
            return await _livroRepository.GetLivroByIdAsync(id);
        }

        public async Task<Livro> CreateLivroAsync(Livro livro)
        {
            await _livroRepository.AddLivroAsync(livro);
            return livro;
        }

        public async Task<bool> UpdateLivroAsync(int id, Livro livro)
        {
            if (id != livro.Id)
            {
                return false;
            }

            var existingLivro = await _livroRepository.GetLivroByIdAsync(id);
            if (existingLivro == null)
            {
                return false;
            }
            existingLivro.Titulo = livro.Titulo;
            existingLivro.Autor = livro.Autor;
            existingLivro.Genero = livro.Genero;
            existingLivro.Isbn = livro.Isbn;
            existingLivro.Disponivel = livro.Disponivel;

            await _livroRepository.UpdateLivroAsync(existingLivro);
            return true;
        }

        public async Task<bool> DeleteLivroAsync(int id)
        {
            var livro = await _livroRepository.GetLivroByIdAsync(id);
            if (livro == null)
            {
                return false;
            }

            await _livroRepository.DeleteLivroAsync(livro);
            return true;
        }
    }
}