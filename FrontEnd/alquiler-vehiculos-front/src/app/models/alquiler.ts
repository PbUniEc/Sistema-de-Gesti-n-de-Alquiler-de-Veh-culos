import { Cliente } from './cliente';
import { Vehiculo } from './vehiculo';

export interface Alquiler {
  alquilerId: number;
  vehiculoId: number;
  clienteId: number;
  fechaInicio: string;
  fechaFin: string;
  precioTotal: number;
  estado: string;
  vehiculo?: Vehiculo;
  cliente?: Cliente;
}