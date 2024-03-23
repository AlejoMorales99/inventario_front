import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})
export class NodoService {


  urlNodo: String = environment.apiUrl;

  constructor(private http: HttpClient , private loginServices: LoginService) { }


  postNodo(nodo:string){
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      nodo:nodo
    }

    return this.http.post(`${this.urlNodo}/postNodo` , data , {headers} )


  }


  getNodo(){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlNodo}/getNodo` , {headers} )
  }


  getOneNodo(idNodo:string){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlNodo}/getOneNodo/${idNodo}` , {headers} )
  }



  putNodo(idNodo:string,nodo:string){
    const headers = this.loginServices.getAuthHeaders();


    const objectNodo = {
      idNodo:idNodo,
      nodo:nodo
    }

    return this.http.put(`${this.urlNodo}/putNodo` , objectNodo ,{headers} )
  }


}
