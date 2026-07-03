using AlquilerVehiculosAPI.Data;
using AlquilerVehiculosAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlquilerVehiculosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlquileresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AlquileresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Alquileres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alquiler>>> GetAlquileres()
        {
            return await _context.Alquileres
                .Include(a => a.Cliente)
                .Include(a => a.Vehiculo)
                .ToListAsync();
        }

        // GET: api/Alquileres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Alquiler>> GetAlquiler(int id)
        {
            var alquiler = await _context.Alquileres
                .Include(a => a.Cliente)
                .Include(a => a.Vehiculo)
                .FirstOrDefaultAsync(a => a.AlquilerId == id);

            if (alquiler == null)
            {
                return NotFound(new { mensaje = "Alquiler no encontrado" });
            }

            return alquiler;
        }

        // POST: api/Alquileres
        [HttpPost]
        public async Task<ActionResult<Alquiler>> PostAlquiler(Alquiler alquiler)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(alquiler.VehiculoId);

            if (vehiculo == null)
            {
                return NotFound(new { mensaje = "Vehículo no encontrado" });
            }

            var cliente = await _context.Clientes.FindAsync(alquiler.ClienteId);

            if (cliente == null)
            {
                return NotFound(new { mensaje = "Cliente no encontrado" });
            }

            if (!vehiculo.Disponible)
            {
                return BadRequest(new { mensaje = "El vehículo no está disponible" });
            }

            if (alquiler.FechaFin < alquiler.FechaInicio)
            {
                return BadRequest(new { mensaje = "La fecha final no puede ser menor que la fecha inicial" });
            }

            alquiler.Estado = "Activo";
            vehiculo.Disponible = false;

            _context.Alquileres.Add(alquiler);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAlquiler), new { id = alquiler.AlquilerId }, alquiler);
        }

        // PUT: api/Alquileres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlquiler(int id, Alquiler alquiler)
        {
            if (id != alquiler.AlquilerId)
            {
                return BadRequest(new { mensaje = "El ID del alquiler no coincide" });
            }

            if (alquiler.FechaFin < alquiler.FechaInicio)
            {
                return BadRequest(new { mensaje = "La fecha final no puede ser menor que la fecha inicial" });
            }

            _context.Entry(alquiler).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlquilerExiste(id))
                {
                    return NotFound(new { mensaje = "Alquiler no encontrado" });
                }

                throw;
            }

            return NoContent();
        }

        // PUT: api/Alquileres/Finalizar/5
        [HttpPut("Finalizar/{id}")]
        public async Task<IActionResult> FinalizarAlquiler(int id)
        {
            var alquiler = await _context.Alquileres.FindAsync(id);

            if (alquiler == null)
            {
                return NotFound(new { mensaje = "Alquiler no encontrado" });
            }

            if (alquiler.Estado == "Finalizado")
            {
                return BadRequest(new { mensaje = "El alquiler ya está finalizado" });
            }

            var vehiculo = await _context.Vehiculos.FindAsync(alquiler.VehiculoId);

            if (vehiculo != null)
            {
                vehiculo.Disponible = true;
            }

            alquiler.Estado = "Finalizado";

            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Alquiler finalizado correctamente" });
        }

        // DELETE: api/Alquileres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlquiler(int id)
        {
            var alquiler = await _context.Alquileres.FindAsync(id);

            if (alquiler == null)
            {
                return NotFound(new { mensaje = "Alquiler no encontrado" });
            }

            var vehiculo = await _context.Vehiculos.FindAsync(alquiler.VehiculoId);

            if (vehiculo != null && alquiler.Estado == "Activo")
            {
                vehiculo.Disponible = true;
            }

            _context.Alquileres.Remove(alquiler);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlquilerExiste(int id)
        {
            return _context.Alquileres.Any(e => e.AlquilerId == id);
        }
    }
}