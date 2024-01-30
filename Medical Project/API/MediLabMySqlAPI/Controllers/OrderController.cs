using MediLabMySqlAPI.Entities;
using MediLabMySqlAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Utilities;
using System.Collections.Generic;

namespace MediLabMySqlAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly MedilabdbContext DBContext;
        public OrderController(MedilabdbContext DBContext)
        {
            this.DBContext = DBContext;
        }

        // POST api/<ProductController>
        [Route("SaveOrder")]
        [HttpPost]
        public Response Post([FromBody] OrderRequest value)
        {
            try
            {
                Orders objorders = new Orders();
                objorders.order_date = value.order_date;
                objorders.distributor_id = value.distributor_id;
                objorders.order_status = value.order_status;

                var log = DBContext.Distributor.Where(x => x.Id.ToString().Equals(value.distributor_id)).FirstOrDefault();
                if (log != null)
                {
                    objorders.distributor_name = log.Name.ToString();
                }
                Random rnd = new Random();
                int num = rnd.Next();
                string orderId = "order" + num.ToString();
                objorders.order_id = orderId;
                int cnt = 1;
                foreach (var orderDetails in value.orderDetails)
                {
                    var objOrderDetails = new OrderDetails
                    {
                        id = orderId + "_" + cnt.ToString(),
                        product_id = orderDetails.product_id,
                        product_name = orderDetails.product_name,
                        quantity = orderDetails.quantity,
                        total_price = orderDetails.total_price,
                        order_id = orderId
                    };
                    cnt++;

                    DBContext.OrderDetails.Add(objOrderDetails);
                    DBContext.SaveChanges();
                }

                DBContext.Orders.Add(objorders);
                DBContext.SaveChanges();
                return new Models.Response { Status = "Success", Message = "Orders added successfully" };

            }
            catch (Exception ex)
            {
                return new Models.Response { Status = "Error", Message = "Something went wrong" };
            }
        }

        [Route("GetOrders")]
        [HttpGet]
        public IEnumerable<Orders> Get()
        {
            return DBContext.Orders;
        }

        // GET api/<ProductController>/5
        [HttpGet("GetOrdersById/{distId}")]
        public IEnumerable<Orders> Get(int distId)
        {
            return DBContext.Orders.Where(s => s.distributor_id == distId.ToString());
        }

        // GET api/<ProductController>/5
        [HttpGet("GetOrdersDetails/{distId}")]
        public IEnumerable<OrderDetails> GetOrderDetails(string distId)
        {
            return DBContext.OrderDetails.Where(s => s.order_id == distId);
        }

        [Route("updateOrder")]
        [HttpPost]
        public Response UpdateOrder(string id)
        {
            try
            {
                var order = DBContext.Orders.FirstOrDefault(s => s.order_id == id);
                if (order != null)
                {
                   
                    var objOrderDetails = DBContext.OrderDetails.Where(s => s.order_id == id).ToList();

                    foreach (var item in objOrderDetails)
                    {
                        Product objPrd = DBContext.Product.FirstOrDefault(s => s.product_Id == item.product_id);

                        int totalQuantity = Convert.ToInt32(objPrd.quantity) + Convert.ToInt32(item.quantity);
                        objPrd.quantity = totalQuantity.ToString();
                        DBContext.Entry<Product>(objPrd).CurrentValues.SetValues(objPrd);
                        DBContext.SaveChanges();
                    }

                    order.order_status = "Complete";
                    DBContext.Entry<Orders>(order).CurrentValues.SetValues(order);
                    DBContext.SaveChanges();

                    return new Models.Response { Status = "Success", Message = "Order updated successfully" };
                }
                else
                    return new Models.Response { Status = "Error", Message = "Order Id Not found" };

            }
            catch (Exception ex)
            {
                return new Models.Response { Status = "Error", Message = "Something went wrong" };
            }
        }

        [Route("rejectOrder")]
        [HttpPost]
        public Response rejectOrder(string id)
        {
            try
            {
                var order = DBContext.Orders.FirstOrDefault(s => s.order_id == id);
                if (order != null)
                {
                    order.order_status = "Reject";
                    DBContext.Entry<Orders>(order).CurrentValues.SetValues(order);
                    DBContext.SaveChanges();

                    return new Models.Response { Status = "Success", Message = "Order updated successfully" };
                }
                else
                    return new Models.Response { Status = "Error", Message = "Order Id Not found" };

            }
            catch (Exception ex)
            {
                return new Models.Response { Status = "Error", Message = "Something went wrong" };
            }
        }
    }
}
