import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {


  urlProveedor: String = environment.ip_server_pruebas;

  constructor(private http: HttpClient , private loginServices: LoginService) { }

  postProveedores(proveedor:string){
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      proveedor:proveedor
    }

    return this.http.post(`${this.urlProveedor}/postProveedores` , data , {headers} )


  }


  getProveedor(){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlProveedor}/getProveedor` , {headers} )
  }


}
