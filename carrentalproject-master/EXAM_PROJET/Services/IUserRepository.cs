using EXAM_PROJET.Models.User;

namespace EXAM_PROJET.Services
{
    public interface IUserRepository
    {
        public Task<ICollection<ApplicationUser>> GetAllUser();
        public Task<ApplicationUser> GetById(string  id);
        public Task<ICollection<ApplicationUser>> GetByNameOrRole(string name,string Role);
        
        public Task<bool> UpdateUser(EditUserModel model,string id);

    }
}
