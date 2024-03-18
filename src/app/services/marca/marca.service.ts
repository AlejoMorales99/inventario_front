import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  urlMarca: String = environment.apiUrl;

  constructor(private http: HttpClient , private loginServices: LoginService) { }


  postMarca(marca:string){
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      marca:marca
    }

    return this.http.post(`${this.urlMarca}/postMarca` , data , {headers} )


  }


  getMarca(){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlMarca}/getMarca` , {headers} )
  }



}
