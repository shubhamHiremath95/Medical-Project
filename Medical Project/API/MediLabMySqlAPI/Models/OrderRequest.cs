namespace MediLabMySqlAPI.Models
{
    public class OrderRequest
    {
        public string? order_id { get; set; }
        public string? order_date { get; set; }
        public string? distributor_id { get; set; }
        public string? distributor_name { get; set; }
        public string? order_status { get; set; }

        public List<OrderDetails> orderDetails { get; set; }
    }
}
