using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace UserAuthenticationPOC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            if (ValidateUserCredentials(login.UserName, login.Password))
            {
                var token = GenerateJwtToken(login);

                //var cookieOptions = new CookieOptions
                //{
                //    HttpOnly = true,
                //    Secure = true,
                //    SameSite = SameSiteMode.Strict,
                //    Expires = DateTime.UtcNow.AddMinutes(30)
                //};
                //Response.Cookies.Append("JWT", token, cookieOptions);
                //GenerateJwtToken(login);
                Response.Cookies.Append("JWT", token, new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    HttpOnly = false,
                    Secure = true,
                    SameSite = SameSiteMode.None
                });
                return Ok(new { message = "Login successful" });
            }
            return Unauthorized(new {message="Invalid Credentials"});
        }

        private bool ValidateUserCredentials(string username, string password)
        {
            // Hardcoded valid credentials
            const string validUsername = "Arpan";
            const string validPassword = "ab123";

            return username == validUsername && password == validPassword;
        }

        //public dynamic  GenerateJwtToken(LoginModel user)
        //{
        //    var tokenHandler= new JwtSecurityTokenHandler();
        //    var key=Encoding.UTF8.GetBytes("DemoToken");
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.UserName) }),
        //        Expires = DateTime.UtcNow.AddMinutes(30),
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    var encryptorToken= tokenHandler.WriteToken(token);
        //    Response.Cookies.Append("JWT", encryptorToken,
        //        new CookieOptions
        //        {
        //            Expires = DateTime.UtcNow.AddMinutes(30),
        //            HttpOnly = true,
        //            Secure = true,
        //            IsEssential = true,
        //            SameSite = SameSiteMode.None
        //        });
        //    return new { token = encryptorToken, username = user.UserName };
        //}

        private string GenerateJwtToken(LoginModel user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("YourVeryStrongSecretKeyThatIs32CharsLong");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.UserName) }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            Response.Cookies.Append("JWT", tokenString, new CookieOptions
            {
                Expires = DateTime.UtcNow.AddMinutes(30),
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return tokenString;
        }




    }
}

