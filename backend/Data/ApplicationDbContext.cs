using System;
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
        
        }
    }
}