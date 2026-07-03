using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlquilerVehiculosAPI.Models
{
    public class Alquiler
    {
        [Key]
        [Column("alquiler_id")]
        public int AlquilerId { get; set; }

        [Column("vehiculo_id")]
        public int VehiculoId { get; set; }

        [Column("cliente_id")]
        public int ClienteId { get; set; }

        [Column("fecha_inicio")]
        public DateTime FechaInicio { get; set; }

        [Column("fecha_fin")]
        public DateTime FechaFin { get; set; }

        [Column("precio_total")]
        public decimal PrecioTotal { get; set; }

        public string Estado { get; set; } = "Activo";

        public Vehiculo? Vehiculo { get; set; }

        public Cliente? Cliente { get; set; }
    }
}