import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})
export class ReferenciasService {


  urlActivosFijos: String = environment.ip_server_pruebas

  constructor(private http: HttpClient, private loginServices: LoginService) { }

  getReferencias(){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getReferencias` , {headers} )
  }

  getTiposEquipos(){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getTiposEquipos` , {headers} )
  }

  getOneReferencia(id:string){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getOneReferencia/${id}` , {headers} )
  }

  postReferencias(referenciaText:string,marcaText:string,wifiText:string,nodoText:string,tipoEquipo:string){
    const headers = this.loginServices.getAuthHeaders();
    console.log(tipoEquipo);
    const data = {
      referenciaText:referenciaText,
      marcaText:marcaText,
      wifiText:wifiText,
      nodoText:nodoText,
      tipoEquipo:tipoEquipo
    }

    return this.http.post(`${this.urlActivosFijos}/postReferencias` ,data , {headers} )
  }


  actualizarReferencia(idParametro:string,referencia:string,marca:string,wifi:string,nodo:string,tipoEquipoID:string){

    const headers = this.loginServices.getAuthHeaders();

    const data = {
      idParametro:idParametro,
      referencia:referencia,
      marca:marca,
      wifi:wifi,
      nodo:nodo,
      tipoEquipoID:tipoEquipoID
    }

    return this.http.put(`${this.urlActivosFijos}/putReferencias` ,data , {headers} )

  }


}
