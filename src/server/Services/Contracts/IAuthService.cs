using Data.DbModels;
using Services.Dtos;

namespace Services.Contracts
{
    public interface IAuthService
    {
        Task<ResponseModel<User>> CreateUser(string username, string password, string name);

        Task<User> GetUserById(string id);
    }
}
