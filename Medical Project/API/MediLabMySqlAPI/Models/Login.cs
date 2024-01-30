using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediLabMySqlAPI.Models
{
    [Table("tbl_login")]
    public class Login
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public string? username { get; set; }

        public string? password { get; set; }
        public string? role { get; set; }
    }
}
