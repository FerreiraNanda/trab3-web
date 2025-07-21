using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using EmprestimoLivrosAPI.Models;

namespace EmprestimoLivrosAPI.Models
{
   public class Loan
{
    public int Id { get; set; }

    [Required]
    public int BookId { get; set; }
    public Livro? Book { get; set; }

    [Required]
    public int UserId { get; set; }
    public User? User { get; set; } 
    
    [Required]
    public int EmployeeId { get; set; }
    public Employee? Employee { get; set; }

    [Required]
    public DateTime LoanDate { get; set; }

    [Required] 
    public DateTime ReturnDate { get; set; }

    public bool Returned { get; set; }
}
}