namespace MediLabMySqlAPI.Models
{
    public class SalesRequest
    {
        public string? bill_no { get; set; }
        public string? bill_date { get; set; }
        public string? paid_b { get; set; }
        public string? bill_amount { get; set; }
        public List<SalesDetails> orderDetails { get; set; }
    }
}
