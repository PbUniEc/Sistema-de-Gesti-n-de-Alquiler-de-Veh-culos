import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from '../models/alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  private apiUrl = 'http://localhost:5271/api/Alquileres';

  constructor(private http: HttpClient) { }

  obtenerAlquileres(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.apiUrl);
  }

  obtenerAlquiler(id: number): Observable<Alquiler> {
    return this.http.get<Alquiler>(`${this.apiUrl}/${id}`);
  }

  crearAlquiler(alquiler: Alquiler): Observable<Alquiler> {
    return this.http.post<Alquiler>(this.apiUrl, alquiler);
  }

  actualizarAlquiler(id: number, alquiler: Alquiler): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, alquiler);
  }

  finalizarAlquiler(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Finalizar/${id}`, {});
  }

  eliminarAlquiler(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}