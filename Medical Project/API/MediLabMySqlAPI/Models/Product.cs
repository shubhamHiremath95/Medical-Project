using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediLabMySqlAPI.Models
{
    [Table("tbl_product")]
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int product_Id { get; set; }

        public string? product_Name { get; set; }

        public string? product_Desc { get; set; }

        public string? product_Price { get; set; }

        public string product_DId { get; set; }

        public string? Department { get; set; }

        public string? quantity { get; set; }
    }
}
