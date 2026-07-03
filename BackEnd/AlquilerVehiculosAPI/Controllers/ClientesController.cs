using AlquilerVehiculosAPI.Data;
using AlquilerVehiculosAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlquilerVehiculosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            return await _context.Clientes.ToListAsync();
        }

        // GET: api/Clientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
            {
                return NotFound(new { mensaje = "Cliente no encontrado" });
            }

            return cliente;
        }

        // POST: api/Clientes
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            bool licenciaExiste = await _context.Clientes
                .AnyAsync(c => c.Licencia == cliente.Licencia);

            if (licenciaExiste)
            {
                return BadRequest(new { mensaje = "Ya existe un cliente con esa licencia" });
            }

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCliente), new { id = cliente.ClienteId }, cliente);
        }

        // PUT: api/Clientes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(int id, Cliente cliente)
        {
            if (id != cliente.ClienteId)
            {
                return BadRequest(new { mensaje = "El ID del cliente no coincide" });
            }

            bool licenciaExiste = await _context.Clientes
                .AnyAsync(c => c.Licencia == cliente.Licencia && c.ClienteId != id);

            if (licenciaExiste)
            {
                return BadRequest(new { mensaje = "Ya existe otro cliente con esa licencia" });
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExiste(id))
                {
                    return NotFound(new { mensaje = "Cliente no encontrado" });
                }

                throw;
            }

            return NoContent();
        }

        // DELETE: api/Clientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
            {
                return NotFound(new { mensaje = "Cliente no encontrado" });
            }

            _context.Clientes.Remove(cliente);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest(new
                {
                    mensaje = "No se puede eliminar el cliente porque tiene alquileres registrados"
                });
            }

            return NoContent();
        }

        private bool ClienteExiste(int id)
        {
            return _context.Clientes.Any(e => e.ClienteId == id);
        }
    }
}