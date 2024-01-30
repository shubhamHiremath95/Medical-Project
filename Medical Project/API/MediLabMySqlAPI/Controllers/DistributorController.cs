using Google.Protobuf.WellKnownTypes;
using MediLabMySqlAPI.Entities;
using MediLabMySqlAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MediLabMySqlAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DistributorController : Controller
    {
        private readonly MedilabdbContext DBContext;

        public DistributorController(MedilabdbContext DBContext)
        {
            this.DBContext = DBContext;
        }

        [Route("Login")]
        [HttpPost]
        public Models.Response Login([FromBody] Request login)
        {
            var log = DBContext.Distributor.Where(x => x.EmailId.Equals(login.Email) &&
                      x.Password.Equals(login.Password) && x.Status=="Active").FirstOrDefault();

            if (log == null)
            {
                return new Models.Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
                return new Models.Response { Status = "Success", Message = log.Id.ToString() };
        }

        // GET api/<ProductController>/5
        [HttpGet("GetDistById/{distId}")]
        public Distributor Get(int distId)
        {
            return DBContext.Distributor.FirstOrDefault(s => s.Id.ToString() == distId.ToString());
        }

        [Route("GetDistributors")]
        [HttpGet]
        public IEnumerable<Distributor> Get()
        {
            return DBContext.Distributor;
        }

        [Route("Register")]
        [HttpPost]
        public Models.Response Post([FromBody] Distributor value)
        {
            var log = DBContext.Distributor.Where(x => x.EmailId.Equals(value.EmailId)).FirstOrDefault();

            if (log == null)
            {
                DBContext.Distributor.Add(value);
                DBContext.SaveChanges();
                return new Models.Response { Status = "Succuss", Message = "User registered successfully" };
            }
            else
                return new Models.Response { Status = "Exist", Message = "User is already exist" };

        }

        [Route("UpdateDistributor")]
        [HttpPost]
        public Response Put([FromBody] Distributor value)
        {
            var distributor = DBContext.Distributor.FirstOrDefault(s => s.Id.ToString() == value.Id.ToString());
            if (distributor != null)
            {
                DBContext.Entry<Distributor>(distributor).CurrentValues.SetValues(value);
                DBContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Distributor updated successfully" };
            }
            else
                return new Models.Response { Status = "Error", Message = "Distributor Id Not found" };
        }

        [Route("DeleteDistributor")]
        [HttpPost]
        public Response Delete(int distId)
        {
            var distributor = DBContext.Distributor.FirstOrDefault(s => s.Id == distId);
            if (distributor != null)
            {
                distributor.Status = "Inactive";
                DBContext.Entry<Distributor>(distributor).CurrentValues.SetValues(distributor);
                DBContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Distributor deleted successfully" };
            }
            else
                return new Models.Response { Status = "Error", Message = "Distributor Id Not found" };
        }
    }
}
