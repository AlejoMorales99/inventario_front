import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from '../../../../dotenv';


@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  urlEstados: String = environment.apiUrl

  constructor(private http: HttpClient , private loginServices: LoginService) { }


  postEstado(estado:string){
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      estado:estado
    }

    return this.http.post(`${this.urlEstados}/postEstados` , data , {headers} )


  }

  getEstados(){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlEstados}/getEstados` , {headers} )
  }

  getOneEstados(idEstado:string){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlEstados}/getOneEstados/${idEstado}` , {headers} )
  }


  putEstados(idEstados:string,estado:string){
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      idEstados:idEstados,
      estado:estado
    }

    return this.http.put(`${this.urlEstados}/putEstados` , data , {headers} )


  }



}
