import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  urlCategorias: String = environment.apiUrl;

  constructor(private http: HttpClient , private loginServices: LoginService) { }


  postCategorias(categoria:string){
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      categoria:categoria
    }

    return this.http.post(`${this.urlCategorias}/postCategorias` , data , {headers} )


  }

  getCategorias(){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlCategorias}/getCategoria` , {headers} )
  }


  getOneCategoria(idCategoria:string){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlCategorias}/getOneCategoria/${idCategoria}` , {headers} )
  }


  putCategorias(idCategoria:string,categoria:string){
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      idCategoria:idCategoria,
      categoria:categoria
    }

    return this.http.put(`${this.urlCategorias}/putCategoria` , data , {headers} )


  }


}
