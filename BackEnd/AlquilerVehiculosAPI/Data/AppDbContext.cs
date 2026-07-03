using AlquilerVehiculosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AlquilerVehiculosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Vehiculo> Vehiculos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Alquiler> Alquileres { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Vehiculo>().ToTable("Vehiculos");
            modelBuilder.Entity<Cliente>().ToTable("Clientes");
            modelBuilder.Entity<Alquiler>().ToTable("Alquileres");

            modelBuilder.Entity<Cliente>()
                .HasIndex(c => c.Licencia)
                .IsUnique();

            modelBuilder.Entity<Alquiler>()
                .HasOne(a => a.Vehiculo)
                .WithMany(v => v.Alquileres)
                .HasForeignKey(a => a.VehiculoId);

            modelBuilder.Entity<Alquiler>()
                .HasOne(a => a.Cliente)
                .WithMany(c => c.Alquileres)
                .HasForeignKey(a => a.ClienteId);

            modelBuilder.Entity<Alquiler>()
                .Property(a => a.PrecioTotal)
                .HasPrecision(10, 2);
        }
    }
}