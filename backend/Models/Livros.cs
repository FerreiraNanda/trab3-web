namespace EmprestimoLivrosAPI.Models
{
    public class Livro
    {
        public int Id { get; set; }
        public required string Titulo { get; set; } 
        public required string Autor { get; set; } 
        public required string Genero { get; set; }
        public required string Isbn { get; set; }
        public bool Disponivel { get; set; }
    }
}