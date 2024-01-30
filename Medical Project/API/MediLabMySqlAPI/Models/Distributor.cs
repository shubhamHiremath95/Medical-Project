using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediLabMySqlAPI.Models
{
    [Table("tbl_Distributor")]
    public class Distributor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? EmailId { get; set; }

        public string? Distributor_Addr { get; set; }

        public string? GST_No { get; set; }

        public string? Telephone { get; set; }

        public string? Web_Addr { get; set; }

        public string? Contact_Person { get; set; }

        public string? Password { get; set; }

        public string? Status { get; set; }
    }
}
