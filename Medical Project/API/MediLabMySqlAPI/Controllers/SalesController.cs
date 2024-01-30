using MediLabMySqlAPI.Entities;
using MediLabMySqlAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Utilities;
using System.Collections.Generic;
namespace MediLabMySqlAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : Controller
    {
        private readonly MedilabdbContext DBContext;
        public SalesController(MedilabdbContext DBContext)
        {
            this.DBContext = DBContext;
        }

        // GET api/<ProductController>/5
        [HttpGet("GetProductById/{productId}")]
        public Product Get(int productId)
        {
            return DBContext.Product.FirstOrDefault(s => s.product_Id == productId && s.quantity != "0");
        }

        [Route("GetOrders")]
        [HttpGet]
        public IEnumerable<Sales> Get()
        {
            return DBContext.Sales;
        }

        // POST api/<ProductController>
        [Route("SaveOrder")]
        [HttpPost]
        public Response Post([FromBody] SalesRequest value)
        {
            try
            {
                Sales objSales = new Sales();
                objSales.bill_date = value.bill_date;
                objSales.bill_amount = value.bill_amount;

                Random rnd = new Random();
                int num = rnd.Next();
                string orderId = "bill" + num.ToString();
                objSales.bill_no = orderId;
                int cnt = 1;
                foreach (var orderDetails in value.orderDetails)
                {
                    var objOrderDetails = new SalesDetails
                    {
                        id = orderId + "_" + cnt.ToString(),
                        product_id = orderDetails.product_id,
                        product_name = orderDetails.product_name,
                        quantity = orderDetails.quantity,
                        total_price = orderDetails.total_price,
                        bill_no = orderId
                    };
                    cnt++;

                    DBContext.SalesDetails.Add(objOrderDetails);
                    DBContext.SaveChanges();
                }

                DBContext.Sales.Add(objSales);
                DBContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Bill Generated successfully" };

            }
            catch (Exception ex)
            {
                return new Models.Response { Status = "Error", Message = "Something went wrong" };
            }
        }

    }
}
