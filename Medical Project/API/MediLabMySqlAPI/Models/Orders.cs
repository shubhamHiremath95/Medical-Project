using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediLabMySqlAPI.Models
{
    [Table("tbl_order")]
    public class Orders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string? order_date { get; set; }
        public string? distributor_id { get; set; }
        public string? distributor_name { get; set; }
        public string? order_status { get; set; }
        public string? order_id { get; set; }
    }
}
