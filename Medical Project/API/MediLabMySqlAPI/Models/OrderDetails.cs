using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MediLabMySqlAPI.Models
{
    [Table("tbl_orderdetails")]
    public class OrderDetails
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? id { get; set; }
        public int? product_id { get; set; }
        public string? product_name { get; set; }
        public string? quantity { get; set; }
        public string? total_price { get; set; }
        public string? order_id { get; set; }
    }
}
