using EmprestimoLivrosAPI.Models;
using EmprestimoLivrosAPI.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmprestimoLivrosAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            await _userRepository.AddUserAsync(user);
            return user;
        }

        public async Task<bool> UpdateUserAsync(int id, User user)
        {
            if (id != user.Id)
            {
                return false;
            }

            var existingUser = await _userRepository.GetUserByIdAsync(id);
            if (existingUser == null)
            {
                return false;
            }
            
            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            existingUser.Telefone = user.Telefone;

            await _userRepository.UpdateUserAsync(existingUser);
            return true;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return false;
            }

            // Você pode adicionar lógica de negócio aqui para verificar se o usuário
            // tem empréstimos ativos antes de permitir a exclusão.

            await _userRepository.DeleteUserAsync(user);
            return true;
        }
    }
}