import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})
export class WifiService {

  urlWifi: String = environment.apiUrl

  constructor(private http: HttpClient , private loginServices: LoginService) { }


  postWifi(wifi:string){
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      wifi:wifi
    }

    return this.http.post(`${this.urlWifi}/postWifi` , data , {headers} )


  }


  getWifi(){
    const headers = this.loginServices.getAuthHeaders();
    return this.http.get(`${this.urlWifi}/getWifi` , {headers} )
  }


  getOneWifi(id:string){
    const headers = this.loginServices.getAuthHeaders();
    return this.http.get(`${this.urlWifi}/getOneWifi/${id}` , {headers} )
  }



}
