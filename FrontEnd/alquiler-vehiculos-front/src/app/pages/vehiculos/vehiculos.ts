import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo';

@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule, FormsModule],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.css'
})
export class Vehiculos implements OnInit {

  vehiculos: Vehiculo[] = [];

  vehiculo: Vehiculo = {
    vehiculoId: 0,
    marca: '',
    modelo: '',
    anio: new Date().getFullYear(),
    disponible: true
  };

  modoEditar: boolean = false;

  constructor(
    private vehiculoService: VehiculoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.vehiculoService.obtenerVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
        alert('No se pudieron cargar los vehículos. Verifique que el backend esté encendido.');
      }
    });
  }

  guardarVehiculo(): void {
    if (this.vehiculo.marca.trim() === '' || this.vehiculo.modelo.trim() === '') {
      alert('Marca y modelo son obligatorios');
      return;
    }

    if (this.vehiculo.anio <= 1900) {
      alert('Ingrese un año válido');
      return;
    }

    if (this.modoEditar) {
      this.vehiculoService.actualizarVehiculo(this.vehiculo.vehiculoId, this.vehiculo).subscribe({
        next: () => {
          alert('Vehículo actualizado correctamente');
          this.limpiarFormulario();
          this.cargarVehiculos();
        },
        error: (error) => {
          console.error('Error al actualizar vehículo:', error);
          alert('No se pudo actualizar el vehículo');
        }
      });
    } else {
      this.vehiculoService.crearVehiculo(this.vehiculo).subscribe({
        next: () => {
          alert('Vehículo registrado correctamente');
          this.limpiarFormulario();
          this.cargarVehiculos();
        },
        error: (error) => {
          console.error('Error al guardar vehículo:', error);
          alert('No se pudo guardar el vehículo');
        }
      });
    }
  }

  editarVehiculo(vehiculoSeleccionado: Vehiculo): void {
    this.vehiculo = {
      vehiculoId: vehiculoSeleccionado.vehiculoId,
      marca: vehiculoSeleccionado.marca,
      modelo: vehiculoSeleccionado.modelo,
      anio: vehiculoSeleccionado.anio,
      disponible: vehiculoSeleccionado.disponible
    };

    this.modoEditar = true;
    this.cdr.detectChanges();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  eliminarVehiculo(id: number): void {
    const confirmar = confirm('¿Está seguro de eliminar este vehículo?');

    if (!confirmar) {
      return;
    }

    this.vehiculoService.eliminarVehiculo(id).subscribe({
      next: () => {
        alert('Vehículo eliminado correctamente');
        this.cargarVehiculos();
      },
      error: (error) => {
        console.error('Error al eliminar vehículo:', error);
        alert('No se puede eliminar el vehículo porque puede tener alquileres registrados');
      }
    });
  }

  limpiarFormulario(): void {
    this.vehiculo = {
      vehiculoId: 0,
      marca: '',
      modelo: '',
      anio: new Date().getFullYear(),
      disponible: true
    };

    this.modoEditar = false;
    this.cdr.detectChanges();
  }
}