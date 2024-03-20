
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../../../dotenv';


@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  constructor(private http: HttpClient) { }


  urlTecnicos: String = environment.ip_server_pruebas

  getTecnicos(){
    return this.http.get(`${this.urlTecnicos}`)
  }


}
