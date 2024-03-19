import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';


import { environment } from '../../../../dotenv';

@Injectable({
  providedIn: 'root'
})
export class ActivosFijosService {

  urlActivosFijos: String = environment.ip_server_pruebas
  bodegaExcel:String = "";

  constructor(private http: HttpClient, private loginServices: LoginService) {}

  buscarRegistros(buscarActivos:string,selectedColumn:string){

    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();

    if(usuario.data.nombres == "KAROL YISETH" || usuario.data.nombres == "MARI LUZ"){
      usuario.data.nombres = "alcala1";

    }

    return this.http.get(`${this.urlActivosFijos}/buscarRegistros/${buscarActivos}/${selectedColumn}/${usuario.data.nombres.trim()}/${usuario.data.idusuario}` , {headers} )
  }

  buscarRegistrosPorFechaAndServicio(servicio:string,columna:string,fechaInicio:string,fechaFin:string){
    if(servicio== "" || servicio == undefined){
      servicio = "vacio"
    }
    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();

    if(usuario.data.nombres == "KAROL YISETH" || usuario.data.nombres == "MARI LUZ"){
      usuario.data.nombres = "alcala1";
    }

    return this.http.get(`${this.urlActivosFijos}/buscarRegistrosPorFechaAndServicio/${servicio}/${columna}/${fechaInicio}/${fechaFin}/${usuario.data.nombres.trim()}/${usuario.data.idusuario}` , {headers} )

  }

  getActivosFijos(){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getActivosFijos` , {headers} )
  }

  getActivosFijosTecnicos(){

    const usuario = this.loginServices.getUser();
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getActivosFijosTecnicos/${usuario.data.numerotercero}` , {headers} )
  }

  totalActivosFijosTecnicos(numTercero:string){
    const usuario = this.loginServices.getUser();
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/totalActivosFijosTecnicos/${numTercero}` , {headers} )
  }

  getActivosFijosTecnicosInventario(nombre:string){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getActivosFijosTecnicos/${nombre}` , {headers} )
  }

  getOneActivosFijos(id:string){
    const headers = this.loginServices.getAuthHeaders();
    return this.http.get(`${this.urlActivosFijos}/getOneActivoFijo/${id}`, {headers} )
  }

  postActivosFijos(serial:string, mac:string, textArea:string, bodega:string, proveedor:string,  categoria:string, referencia:string){
    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();

    const objectoActivosFijos = {
      serial:serial,
      mac:mac,
      textArea:textArea,
      bodega:bodega,
      proveedor:proveedor,
      categoria:categoria,
      referencia:referencia,
      usuarioNombre: usuario.data.nombres
    }

       return this.http.post(`${this.urlActivosFijos}/postActivosFijos`, objectoActivosFijos , {headers} )
  }

  actualizarActivoFijo(serial:string, mac:string, descripcion: string,  categoria:string, estado: string, proveedor: string,id:string,referencia:string){

    const usuario = this.loginServices.getUser();
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      serial:serial,
      macSerial:mac,
      descripcion:descripcion,
      categoria:categoria,
      estado:estado,
      proveedor:proveedor,
      id:id,
      idUsuario: usuario.id,
      usuarioNombre: usuario.data.nombres,
      referencia:referencia
    }

    return this.http.put(`${this.urlActivosFijos}/putActivosFijos`,data , {headers} )

  }

  getCopySerial(serial:string){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getCopySerial/${serial}`, {headers} );

  }

  getCopyMac(mac:string){

    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getCopyMac/${mac}`, {headers} );

  }

//------------------------------------------------------------------------------------------------------------------//

buscarActivoFijoMover(buscar:string,razon:string){
  const usuario = this.loginServices.getUser();
  const headers = this.loginServices.getAuthHeaders();

  usuario.data.nombres = "alcala1"

  return this.http.get(`${this.urlActivosFijos}/buscarActivoFijoMover/${buscar}/${usuario.data.nombres}/${razon}`, {headers} );
}

buscarActivoFijoMoverTecnicos(buscar:string){
  const headers = this.loginServices.getAuthHeaders();
  const usuario = this.loginServices.getUser();

  return this.http.get(`${this.urlActivosFijos}/buscarActivoFijoMoverTecnicos/${buscar}/${usuario.data.nombres}/${usuario.data.numerotercero}`, {headers} );
}




  getRazonDeMovimiento(){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/razonDeMovimiento`, {headers} );
  }

  getRazonDeMovimientoTecnicos(){
    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();

    return this.http.get(`${this.urlActivosFijos}/getRazonDeMovimientoTecnicos`, {headers} );
  }

  getTipoDeEntrega(){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/tipoDeEntrega`, {headers} );
  }


  getBodegas(razon:string){
    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();
    if(usuario.data.nombres == 'KAROL YISETH' || usuario.data.nombres == 'MARI LUZ'){
      usuario.data.nombres = "alcala1"
    }

    return this.http.get(`${this.urlActivosFijos}/Bodegas/${usuario.data.nombres}/${razon}/${usuario.data.numerotercero}`, {headers} );
  }

  getBodegasTecnicos(){
    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();

    if(usuario.data.nombres == 'KAROL YISETH' ||  usuario.data.nombres == 'MARI LUZ'){
      usuario.data.nombres = "alcala1"
      usuario.data.numerotercero = 5065;
    }

    return this.http.get(`${this.urlActivosFijos}/getBodegasTecnicos/${usuario.data.nombres}/${usuario.data.numerotercero}`, {headers} );
  }

  getBodegaAjusteInventario(){
    const headers = this.loginServices.getAuthHeaders();


    return this.http.get(`${this.urlActivosFijos}/getBodegaAjusteInventario`, {headers} );
  }

  getBodegaAjusteInventarioIngreso(){
    const headers = this.loginServices.getAuthHeaders();


    return this.http.get(`${this.urlActivosFijos}/getBodegaAjusteInventarioIngreso`, {headers} );
  }




  postActaDeMovimiento(RazonMovimiento:string, TipoEntrega:string, BodegaEntra:string, BodegaSale:string, Descripcion:string, GuiaTrasportadora:string,  ImgGuia:string, idOnts:any,ServicioDelClienteEspecifico:string){
    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();
    console.log(ServicioDelClienteEspecifico);
    const form = new FormData();

    form.append('RazonMovimiento', RazonMovimiento);
    form.append('TipoEntrega', TipoEntrega);
    form.append('BodegaEntra', BodegaEntra);
    form.append('BodegaSale', BodegaSale);
    form.append('Descripcion', Descripcion);
    form.append('GuiaTrasportadora', GuiaTrasportadora);
    form.append('estadoActa', '1');
    form.append('nombre', usuario.data.nombres.trim());
    form.append('files',ImgGuia);
    form.append('idOnts', JSON.stringify(idOnts));
    form.append('ServicioDelClienteEspecifico',ServicioDelClienteEspecifico);
    form.append('numTercero',usuario.data.numerotercero)

    return this.http.post(`${this.urlActivosFijos}/postCrearActaDeMovimiento`, form , {headers} )
  }



  getAllMovimientos(){
    const headers = this.loginServices.getAuthHeaders();
    return this.http.get(`${this.urlActivosFijos}/getAllActaMovimientos`, {headers} )
  }


  getAllMovimientosTecnicos(){
    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();
    return this.http.get(`${this.urlActivosFijos}/getAllMovimientosTecnicos/${usuario.data.numerotercero}`, {headers} )
  }

  aceptarActa(idActa:string,servicio:string,servicioSale:string,numTercero:string,tipoMovimiento:string){
    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();

    return this.http.get(`${this.urlActivosFijos}/validarActa/${idActa}/${servicio}/${servicioSale}/${usuario.data.nombres}/${usuario.data.numerotercero}/${numTercero}/${tipoMovimiento}`, {headers} )
  }

  anularActa(idActa:string , servicio:string,anular:string,numTercero:string,tipoMovimiento:string){
    const headers = this.loginServices.getAuthHeaders();
    const usuario = this.loginServices.getUser();
    return this.http.get(`${this.urlActivosFijos}/anularActa/${idActa}/${servicio}/${anular}/${usuario.data.nombres}/${usuario.data.numerotercero}/${numTercero}/${tipoMovimiento}`, {headers} )
  }


  getAllActas(idacta:string){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/getAllActas/${idacta}`, {headers} )
  }



  postMovimiento(idActivo:string,idActa:string){
    const headers = this.loginServices.getAuthHeaders();

    const data = {
      idActivo:idActivo,
      idActa:idActa
    }

    return this.http.post(`${this.urlActivosFijos}/postMovimientos`, data,  {headers} )
  }


  buscarCliente(numServicio:string){

    const headers = this.loginServices.getAuthHeaders();

    const data = {
      numServicio:numServicio
    }

    return this.http.post(`${this.urlActivosFijos}/retirarCliente`, data,  {headers} )

  }

  buscarClienteEspecifico(idActivoFijo:string,servicioCliente:string){

    const headers = this.loginServices.getAuthHeaders();

    const data = {
      idActivoFijo:idActivoFijo,
      servicioCliente:servicioCliente
    }

    return this.http.post(`${this.urlActivosFijos}/retirarClienteEspecifico`, data,  {headers} )

  }


  registrarTecnicoNuevo(nombreTecnico:string){

    const headers = this.loginServices.getAuthHeaders();

    const data = {
      nombreTecnico:nombreTecnico
    }

    return this.http.post(`${this.urlActivosFijos}/registrarTecnicoNuevo`, data,  {headers} )

  }

  cedulaTecnico(cedula:string){
    const headers = this.loginServices.getAuthHeaders();

    return this.http.get(`${this.urlActivosFijos}/cedulaTecnico/${cedula}`, {headers} )
  }

  nombreTecnicoCompleto(cedula:string){

    const token = this.loginServices.getToken();
    const header = this.loginServices.getAuthHeadersLogin();

    const body = new URLSearchParams();

    body.set('json', JSON.stringify({"criteria":["identificacion"],"value":cedula,"onlyusers":false,"page":0,"limit":10}));
    body.set('authorization',token)

    return this.http.post("nomTecnico", body.toString() , {headers:header})

  }



}



