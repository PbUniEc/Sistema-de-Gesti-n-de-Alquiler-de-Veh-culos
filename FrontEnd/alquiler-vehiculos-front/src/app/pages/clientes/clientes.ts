import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {

  clientes: Cliente[] = [];

  cliente: Cliente = {
    clienteId: 0,
    nombre: '',
    apellido: '',
    licencia: '',
    telefono: ''
  };

  modoEditar: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        alert('No se pudieron cargar los clientes. Verifique que el backend esté encendido.');
      }
    });
  }

  guardarCliente(): void {
    if (
      this.cliente.nombre.trim() === '' ||
      this.cliente.apellido.trim() === '' ||
      this.cliente.licencia.trim() === '' ||
      this.cliente.telefono.trim() === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.modoEditar) {
      this.clienteService.actualizarCliente(this.cliente.clienteId, this.cliente).subscribe({
        next: () => {
          alert('Cliente actualizado correctamente');
          this.limpiarFormulario();
          this.cargarClientes();
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
          alert('No se pudo actualizar el cliente. Revise que la licencia no esté repetida.');
        }
      });
    } else {
      this.clienteService.crearCliente(this.cliente).subscribe({
        next: () => {
          alert('Cliente registrado correctamente');
          this.limpiarFormulario();
          this.cargarClientes();
        },
        error: (error) => {
          console.error('Error al guardar cliente:', error);
          alert('No se pudo guardar el cliente. Puede que la licencia ya exista.');
        }
      });
    }
  }

  editarCliente(clienteSeleccionado: Cliente): void {
    this.cliente = {
      clienteId: clienteSeleccionado.clienteId,
      nombre: clienteSeleccionado.nombre,
      apellido: clienteSeleccionado.apellido,
      licencia: clienteSeleccionado.licencia,
      telefono: clienteSeleccionado.telefono
    };

    this.modoEditar = true;
    this.cdr.detectChanges();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  eliminarCliente(id: number): void {
    const confirmar = confirm('¿Está seguro de eliminar este cliente?');

    if (!confirmar) {
      return;
    }

    this.clienteService.eliminarCliente(id).subscribe({
      next: () => {
        alert('Cliente eliminado correctamente');
        this.cargarClientes();
      },
      error: (error) => {
        console.error('Error al eliminar cliente:', error);
        alert('No se puede eliminar el cliente porque puede tener alquileres registrados.');
      }
    });
  }

  limpiarFormulario(): void {
    this.cliente = {
      clienteId: 0,
      nombre: '',
      apellido: '',
      licencia: '',
      telefono: ''
    };

    this.modoEditar = false;
    this.cdr.detectChanges();
  }
}