using EXAM_PROJET.Models.User;

namespace EXAM_PROJET.Services.Auth
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(RegisterModel model);
        Task<AuthModel> GetTokenAsync(LoginModel model);
        Task<string> AddRoleAsync(ManageRoleModel model);
        Task<string> RemoveRoleAsync(ManageRoleModel model);
    }
}
