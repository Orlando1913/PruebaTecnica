import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Empleado } from "../Interfaces/empleado";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private endpoint:string = environment.baseUrl;
  private apiUrl:string = this.endpoint + "Empleado/";
  constructor(private http:HttpClient) { }

  getList():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.apiUrl}Lista`);
  }

  add(modelo:Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(`${this.apiUrl}Guardar`,modelo);
  }


  update(IdEmpleado:number,modelo:Empleado):Observable<Empleado>{
    return this.http.put<Empleado>(`${this.apiUrl}Actualizar/${IdEmpleado}`,modelo);
  }

  delete(IdEmpleado:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}Eliminar/${IdEmpleado}`);
  }
}
