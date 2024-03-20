import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  urlActivosFijos: String = environment.apiUrl

  url: String = "http://localhost:4001/getBodegas"
  urlServicios:string = "http://104.131.8.122:8000/login"

  private storageKey = 'userData';
  private token = 'bitwan';

  //funcion que guarda el usuario que inicia sesion
  setUser(user: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  //funcion que guarda el token cuando se inicia sesion
  setToken(token: any) {
    localStorage.setItem(this.token, JSON.stringify(token));
  }

  //funcion que retorna la informacion del usuario que inicio sesion
  getUser(): any {
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  //funcion que retorna el token cuando se inicia sesion
  getToken(): any {
    const token = localStorage.getItem(this.token);
    return token ? JSON.parse(token) : null;
  }


  //funcion que limpia tanto el token y la infomacion del usuario una vez se cierra sesion
  clearUser() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.token);
  }

  //funcion que se usa para pasar el encabezado con el token en las solicitudes http
  getAuthHeaders(): HttpHeaders {
    // Crea y devuelve los encabezados de autenticación con el token
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  }

  getTokenTecnico(): HttpHeaders {
    // Crea y devuelve los encabezados de autenticación con el token
    return new HttpHeaders().set('Authorization', `${this.getToken()}`);
  }

   //funcion que se usa para pasar el encabezado con el token en las solicitudes http
   getAuthHeadersLogin(): HttpHeaders {
    // Crea y devuelve los encabezados de autenticación con el token
    return new HttpHeaders().set('Content-Type', `application/x-www-form-urlencoded`);
  }

  constructor(private http: HttpClient) { }

  //funcion que sirve para iniciar sesion y obtener el usuario
  getUsuario(username:String, password:String){

    const header = this.getAuthHeadersLogin();

    const body = new URLSearchParams();
    body.set('json', JSON.stringify({"alias":username,"password":password}));

    return this.http.post<any>("login", body.toString() , {headers:header})
  }

  loginUsuario(nombreUsuario:string,numTercero:string){

    return this.http.get(`${this.urlActivosFijos}/loginUsuario/${nombreUsuario}/${numTercero}`)
  }

  postLoginUsuario(newUsuario:string,numTercero:string,password:string){
    return this.http.get(`${this.urlActivosFijos}/postLoginUsuario/${newUsuario}/${numTercero}/${password}`)
  }

  getTecnicos(){
    const headers = this.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getTecnicos`, {headers} )
  }


}
