using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlquilerVehiculosAPI.Models
{
    public class Vehiculo
    {
        [Key]
        [Column("vehiculo_id")]
        public int VehiculoId { get; set; }

        [Required]
        [StringLength(100)]
        public string Marca { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Modelo { get; set; } = string.Empty;

        [Column("anio")]
        public int Anio { get; set; }

        public bool Disponible { get; set; } = true;

        public ICollection<Alquiler> Alquileres { get; set; } = new List<Alquiler>();
    }
}