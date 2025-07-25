using Microsoft.EntityFrameworkCore;
using EmprestimoLivrosAPI.Models;

namespace EmprestimoLivrosAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Livro> Livros { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Loan> Loans { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Loan>(entity =>
            {
                entity.HasOne(l => l.Book)
                      .WithMany()
                      .HasForeignKey(l => l.BookId)
                      .OnDelete(DeleteBehavior.ClientCascade);
            });

            modelBuilder.Entity<Livro>(entity =>
            {
                entity.Property(l => l.Disponivel)
                      .IsRequired();

                entity.HasData(new Livro
                {
                    Id = 1,
                    Titulo = "Exemplo",
                    Autor = "Autor",
                    Genero = "Gênero",
                    Isbn = "0000000000",
                    Disponivel = true 
                });
            });
        }
    }
}