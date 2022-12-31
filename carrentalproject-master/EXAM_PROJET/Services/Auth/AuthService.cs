using EXAM_PROJET.Helpers;
using EXAM_PROJET.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EXAM_PROJET.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;
        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt)
        {
            this._userManager = userManager;
            _roleManager = roleManager;
            _jwt = jwt.Value;
        }

        public  async Task<AuthModel> RegisterAsync(RegisterModel model)
        {
            if (await _userManager.FindByEmailAsync(model.Email) is not null)
                return new AuthModel { Message = "Email is already registered !" };
            if (await _userManager.FindByNameAsync(model.UserName) is not null)
                return new AuthModel { Message = "User is already registered !" };
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                Nom = model.Nom,
                Prenom = model.Prenom,
                Ville = model.Ville,
                Adresse=model.Adresse,
                PhoneNumber = model.Telephone,
                IsAdmin = false,
                isAgence=model.isAgence
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                var errors = String.Empty;
                foreach (var error in result.Errors)
                {
                    errors += $"{error.Description},";
                }
                return new AuthModel { Message = errors };
            }
           
           
            await _userManager.AddToRoleAsync(user, "Locataire");
            var jwtSecurityToken = await CreateJwtToken(user);
            return new AuthModel
            {
                Email = user.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { "Locataire" },
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                UserName = user.UserName,
                UserId = user.Id
            };

        }
        //login
        public async Task<AuthModel> GetTokenAsync(LoginModel model)
        {
            var authModel = new AuthModel();
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                authModel.Message = "Email or Password is incorrect!";

                return authModel;
            }
            var jwtSecurityToken = await CreateJwtToken(user);
            var rolesList = await _userManager.GetRolesAsync(user);

            authModel.IsAuthenticated = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            authModel.Email = user.Email;
            authModel.UserName = user.UserName;
            authModel.ExpiresOn = jwtSecurityToken.ValidTo;
            authModel.Roles = rolesList.ToList();
            authModel.UserId = user.Id;
            return authModel;
        }

        public async Task<string> AddRoleAsync(ManageRoleModel model)
        {
            
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user is null)
            {
                return "invalid user Id";
            }

            if (!await _roleManager.RoleExistsAsync(model.Role))
                return "role is invalid";
            if (await _userManager.IsInRoleAsync(user, model.Role))
                return " user already assigned to this role ";

            if (await _userManager.IsInRoleAsync(user, "Admin") && model.Role.Equals("BlackListed"))
                return "admin can be blacklisted";

            var result = await _userManager.AddToRoleAsync(user, model.Role);
            if (result.Succeeded)
                return String.Empty;
            else
                return "Something went wrong";

        }

        public async Task<string> RemoveRoleAsync(ManageRoleModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user is null)
            {
                return "invalid user Id";
            }
            if (model.Role.Equals("Admin"))
                return "can't remove admin role";
            if (model.Role.Equals("Locataire"))
                return "can't remove Locataire role";

            if (!await _roleManager.RoleExistsAsync(model.Role))
                return "role is invalid";
            if ( ! await _userManager.IsInRoleAsync(user, model.Role))
                return " user is not assigned to this role ";

            var result = await _userManager.RemoveFromRoleAsync(user, model.Role);
            if (result.Succeeded)
                return String.Empty;
            else
                return "Something went wrong";

        }




        //create token
        private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(_jwt.DurationInDays),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
    }
}
