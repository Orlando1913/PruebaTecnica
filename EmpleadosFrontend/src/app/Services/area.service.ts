import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Area } from "../Interfaces/area";

@Injectable({
  providedIn: 'root'
})
export class AreaService {

    private endpoint:string = environment.baseUrl;
    private apiUrl:string = this.endpoint + "Area/";

  constructor(private http:HttpClient) { }

  getList():Observable<Area[]>{
    return this.http.get<Area[]>(`${this.apiUrl}Lista`);
  }
}
