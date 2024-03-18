import { tecnicos } from './../../models/tecnicos';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../../../dotenv';


@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  constructor(private http: HttpClient) { }


  urlTecnicos: String = environment.apiUrl

  getTecnicos(){
    return this.http.get<tecnicos[]>(`${this.urlTecnicos}`)
  }


}
