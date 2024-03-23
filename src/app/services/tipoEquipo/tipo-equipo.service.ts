import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipoService {

  constructor(private http: HttpClient, private loginServices: LoginService) { }


  urlActivosFijos: String = environment.apiUrl

  getTipoDeEquipo(){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getTipoDeEquipo`, {headers} )
  }

  getOneTipoDeEquipo(idTipoDeEquipo:string){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getOneTipoDeEquipo/${idTipoDeEquipo}`, {headers} )
  }

  registrarEquipo(equipo:string){
    const headers = this.loginServices.getAuthHeaders();

    const equipojson = {
      equipo:equipo
    }


    return this.http.post(`${this.urlActivosFijos}/registrarEquipos`, equipojson, {headers:headers} )

  }


  putTipoDeEquipo(idEquipo:string,equipo:string){
    const headers = this.loginServices.getAuthHeaders();

    const equipojson = {
      idEquipo:idEquipo,
      equipo:equipo
    }


    return this.http.put(`${this.urlActivosFijos}/putTipoDeEquipo`, equipojson, {headers:headers} )

  }


}
