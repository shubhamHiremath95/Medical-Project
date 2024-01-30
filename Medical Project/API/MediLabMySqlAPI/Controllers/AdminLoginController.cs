using MediLabMySqlAPI.Entities;
using MediLabMySqlAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace MediLabMySqlAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminLoginController : Controller
    {
        private readonly MedilabdbContext DBContext;

        public AdminLoginController(MedilabdbContext DBContext)
        {
            this.DBContext = DBContext;
        }

        [Route("Login")]
        [HttpPost]
        public Models.Response Login([FromBody] Login login)
        {
            var log = DBContext.Login.Where(x => x.username.Equals(login.username) &&
                      x.password.Equals(login.password)).FirstOrDefault();

            if (log == null)
            {
                return new Models.Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
                return new Models.Response { Status = "Success", Message = log.role.ToString() };
        }
    }
}
