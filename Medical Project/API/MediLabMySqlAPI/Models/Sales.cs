using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace MediLabMySqlAPI.Models
{
    [Table("tbl_sales")]
    public class Sales
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string? bill_no { get; set; }
        public string? bill_date { get; set; }
        public string? bill_amount { get; set; }
        public string? paid_by { get; set; }
    }
}
