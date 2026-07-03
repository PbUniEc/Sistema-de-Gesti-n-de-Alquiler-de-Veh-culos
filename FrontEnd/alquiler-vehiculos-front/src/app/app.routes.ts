import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Vehiculos } from './pages/vehiculos/vehiculos';
import { Clientes } from './pages/clientes/clientes';
import { Alquileres } from './pages/alquileres/alquileres';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'vehiculos', component: Vehiculos },
  { path: 'clientes', component: Clientes },
  { path: 'alquileres', component: Alquileres }
];