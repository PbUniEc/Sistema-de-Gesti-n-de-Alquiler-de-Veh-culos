import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Alquiler } from '../../models/alquiler';
import { Cliente } from '../../models/cliente';
import { Vehiculo } from '../../models/vehiculo';

import { AlquilerService } from '../../services/alquiler';
import { ClienteService } from '../../services/cliente';
import { VehiculoService } from '../../services/vehiculo';

@Component({
  selector: 'app-alquileres',
  imports: [CommonModule, FormsModule],
  templateUrl: './alquileres.html',
  styleUrl: './alquileres.css'
})
export class Alquileres implements OnInit {

  alquileres: Alquiler[] = [];
  clientes: Cliente[] = [];
  vehiculos: Vehiculo[] = [];

  alquiler: Alquiler = {
    alquilerId: 0,
    vehiculoId: 0,
    clienteId: 0,
    fechaInicio: '',
    fechaFin: '',
    precioTotal: 0,
    estado: 'Activo'
  };

  modoEditar: boolean = false;

  constructor(
    private alquilerService: AlquilerService,
    private clienteService: ClienteService,
    private vehiculoService: VehiculoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargarAlquileres();
    this.cargarClientes();
    this.cargarVehiculos();
  }

  cargarAlquileres(): void {
    this.alquilerService.obtenerAlquileres().subscribe({
      next: (data) => {
        this.alquileres = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar alquileres:', error);
        alert('No se pudieron cargar los alquileres. Verifique que el backend esté encendido.');
      }
    });
  }

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }

  cargarVehiculos(): void {
    this.vehiculoService.obtenerVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
      }
    });
  }

  guardarAlquiler(): void {
    if (
      this.alquiler.clienteId === 0 ||
      this.alquiler.vehiculoId === 0 ||
      this.alquiler.fechaInicio === '' ||
      this.alquiler.fechaFin === '' ||
      this.alquiler.precioTotal <= 0
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.alquiler.fechaFin < this.alquiler.fechaInicio) {
      alert('La fecha final no puede ser menor que la fecha inicial');
      return;
    }

    if (this.modoEditar) {
      const alquilerActualizado: Alquiler = {
        alquilerId: this.alquiler.alquilerId,
        clienteId: this.alquiler.clienteId,
        vehiculoId: this.alquiler.vehiculoId,
        fechaInicio: this.alquiler.fechaInicio,
        fechaFin: this.alquiler.fechaFin,
        precioTotal: this.alquiler.precioTotal,
        estado: this.alquiler.estado
      };

      this.alquilerService.actualizarAlquiler(this.alquiler.alquilerId, alquilerActualizado).subscribe({
        next: () => {
          alert('Alquiler actualizado correctamente');
          this.limpiarFormulario();
          this.cargarDatos();
        },
        error: (error) => {
          console.error('Error al actualizar alquiler:', error);
          alert('No se pudo actualizar el alquiler');
        }
      });

    } else {
      const nuevoAlquiler: Alquiler = {
        alquilerId: 0,
        clienteId: this.alquiler.clienteId,
        vehiculoId: this.alquiler.vehiculoId,
        fechaInicio: this.alquiler.fechaInicio,
        fechaFin: this.alquiler.fechaFin,
        precioTotal: this.alquiler.precioTotal,
        estado: 'Activo'
      };

      this.alquilerService.crearAlquiler(nuevoAlquiler).subscribe({
        next: () => {
          alert('Alquiler registrado correctamente');
          this.limpiarFormulario();
          this.cargarDatos();
        },
        error: (error) => {
          console.error('Error al registrar alquiler:', error);
          alert('No se pudo registrar el alquiler. Verifique que el vehículo esté disponible.');
        }
      });
    }
  }

  editarAlquiler(alquilerSeleccionado: Alquiler): void {
    this.alquiler = {
      alquilerId: alquilerSeleccionado.alquilerId,
      clienteId: alquilerSeleccionado.clienteId,
      vehiculoId: alquilerSeleccionado.vehiculoId,
      fechaInicio: this.formatearFecha(alquilerSeleccionado.fechaInicio),
      fechaFin: this.formatearFecha(alquilerSeleccionado.fechaFin),
      precioTotal: alquilerSeleccionado.precioTotal,
      estado: alquilerSeleccionado.estado
    };

    this.modoEditar = true;
    this.cdr.detectChanges();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  finalizarAlquiler(id: number): void {
    const confirmar = confirm('¿Desea finalizar este alquiler?');

    if (!confirmar) {
      return;
    }

    this.alquilerService.finalizarAlquiler(id).subscribe({
      next: () => {
        alert('Alquiler finalizado correctamente');
        this.limpiarFormulario();
        this.cargarDatos();
      },
      error: (error) => {
        console.error('Error al finalizar alquiler:', error);
        alert('No se pudo finalizar el alquiler');
      }
    });
  }

  eliminarAlquiler(id: number): void {
    const confirmar = confirm('¿Está seguro de eliminar este alquiler?');

    if (!confirmar) {
      return;
    }

    this.alquilerService.eliminarAlquiler(id).subscribe({
      next: () => {
        alert('Alquiler eliminado correctamente');
        this.limpiarFormulario();
        this.cargarDatos();
      },
      error: (error) => {
        console.error('Error al eliminar alquiler:', error);
        alert('No se pudo eliminar el alquiler');
      }
    });
  }

  limpiarFormulario(): void {
    this.alquiler = {
      alquilerId: 0,
      vehiculoId: 0,
      clienteId: 0,
      fechaInicio: '',
      fechaFin: '',
      precioTotal: 0,
      estado: 'Activo'
    };

    this.modoEditar = false;
    this.cdr.detectChanges();
  }

  formatearFecha(fecha: string): string {
    if (!fecha) {
      return '';
    }

    return fecha.substring(0, 10);
  }
}