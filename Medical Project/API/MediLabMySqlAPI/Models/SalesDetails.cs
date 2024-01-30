using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediLabMySqlAPI.Models
{
    [Table("tbl_salesdetails")]
    public class SalesDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? id { get; set; }
        public string? product_id { get; set; }
        public string? product_name { get; set; }
        public string? quantity { get; set; }
        public string? total_price { get; set; }
        public string? bill_no { get; set; }
    }


}
