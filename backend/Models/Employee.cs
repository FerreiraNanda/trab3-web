using System.ComponentModel.DataAnnotations;

namespace EmprestimoLivrosAPI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string RegistrationNumber { get; set; }
        [Required]
        public required string Position { get; set; }
    }
}