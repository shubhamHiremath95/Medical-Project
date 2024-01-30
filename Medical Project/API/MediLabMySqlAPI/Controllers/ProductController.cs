using MediLabMySqlAPI.Entities;
using MediLabMySqlAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MediLabMySqlAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly MedilabdbContext DBContext;
        public ProductController(MedilabdbContext DBContext)
        {
            this.DBContext = DBContext;
        }

        [Route("GetProducts")]
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return DBContext.Product;
        }


        // GET api/<ProductController>/5
        [HttpGet("GetProductById/{productId}")]
        public Product Get(int productId)
        {
            return DBContext.Product.FirstOrDefault(s => s.product_Id == productId);
        }



        // POST api/<ProductController>
        [Route("SaveProduct")]
        [HttpPost]
        public Response Post([FromBody] Product value)
        {
            try
            {
                var log = DBContext.Distributor.Where(x => x.Id.ToString().Equals(value.product_DId)).FirstOrDefault();
                if(log != null)
                {
                    value.Department = log.Name.ToString();
                }
                DBContext.Product.Add(value);
                DBContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Product added successfully" };

            }
            catch(Exception ex)
            {
                return new Models.Response { Status = "Error", Message = "Something went wrong" };
            }
        }

        // PUT api/<EmployeeController>/5
        [Route("UpdateProduct")]
        [HttpPost]
        public Response Put([FromBody] Product value)
        {
            var product = DBContext.Product.FirstOrDefault(s => s.product_Id == value.product_Id);
            if (product != null)
            {
                DBContext.Entry<Product>(product).CurrentValues.SetValues(value);
                DBContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Product updated successfully" };
            }
            else
                return new Models.Response { Status = "Error", Message = "Product Id Not found" };
        }

        // DELETE api/<EmployeeController>/5
        [Route("DeleteProduct")]
        [HttpPost]
        public Response Delete(int productId)
        {
            var product = DBContext.Product.FirstOrDefault(s => s.product_Id == productId);
            if (product != null)
            {
                DBContext.Product.Remove(product);
                DBContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Product deleted successfully" };
            }
            else
                return new Models.Response { Status = "Error", Message = "Product Id Not found" };
        }

        // GET api/<ProductController>/5
        [HttpGet("GetProductByDid/{Did}")]
        public IEnumerable<Product> GetProduct(int Did)
        {
            return DBContext.Product.Where(s => s.product_DId == Did.ToString());
        }
    }
}
