
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})



export class ArticulosInventarioService {


  urlArticulos: String = `${environment.apiUrl}/getArticulos`

  constructor(private http: HttpClient , private loginServices: LoginService) {}

  getArticulo(){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlArticulos}` , {headers} )
  }



}
