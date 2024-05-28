using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace UserAuthenticationPOC.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        public List<string> stateList = new List<string>() { "West Bengal", "Karnataka", "Delhi" };
        [HttpGet("getStateList")]
        public List<string> GetStateList()
        {
            try
            {
                return stateList;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            var userName = User.FindFirst(ClaimTypes.Name)?.Value;
            return Ok(new { UserName = userName, message = "This is a protected endpoint" });
        }
    }
}
