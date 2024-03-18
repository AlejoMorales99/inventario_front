import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { MarcaService } from 'src/app/services/marca/marca.service';
import { NodoService } from 'src/app/services/nodo/nodo.service';
import { ReferenciasService } from 'src/app/services/referencias/referencias.service';
import { WifiService } from 'src/app/services/wifi/wifi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent implements OnInit {

  constructor(private referenciasServices: ReferenciasService , private marcaServices: MarcaService , private wifiServices: WifiService, private nodoServices: NodoService, private rout: Router,
    private loginServices: LoginService){}


  referencias:any;
  marcas:any;
  wifi:any;
  nodo:any;
  tipEquipos:any;


  referenciaText:string = "";
  marcaText:string = "";
  wifiText:string="";
  nodoText:string="";
  tipoEquipoText:string="";

//variable para que el registro en la tabla lo muestre desde la pagina 1
page: number = 1;
//---------------------------------------------------------------------

//variable para hacer posible la busqyeda de los registros
public buscarActivos: any;
//------------------------------------------------------


  //variable para los shorts de la tabla
  config = {
    sortKey: 'ID',  // Columna por defecto para ordenar (puedes cambiarla según tus necesidades)
    sortReverse: false,  // Orden ascendente por defecto (puedes cambiarlo según tus necesidades)
    sortOrder: '',  // Orden actual: '' (ninguno), 'asc' (ascendente), 'desc' (descendente)
  };

  //-----------------------------------------------------------------//

  //variable para cambiar la cantidad de registros a mostrar
  itemsPerPage: number = 5; // Valor predeterminado
  //---------------------------------------------------------------//

  operacionesRol:boolean = true;


  ngOnInit() {

    const usuario = this.loginServices.getUser();

    //valido que el usuario no quiere entrar a las rutas de la app de manera incorrecta sin haber iniciado sesion primero
    if (usuario == null) {

      //mensaje de error por si no loguea
      Swal.fire({
        title: 'ERROR',
        text: 'POR FAVOR INICIE SESION PRIMERO',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });

      this.rout.navigate(['']);


    }else{
      this.referenciasServices.getReferencias().subscribe(referencia=>{


        this.referencias = referencia

      })

      this.referenciasServices.getTiposEquipos().subscribe(res=>{
        this.tipEquipos = res
      })

      this.marcaServices.getMarca().subscribe(marca=>{
        this.marcas = marca
      })

      this.wifiServices.getWifi().subscribe(wifi=>{
        this.wifi = wifi;
      })

      this.nodoServices.getNodo().subscribe(nodo=>{
        this.nodo = nodo;
      })
    }




  }


  //funcion para implementar el short en la tabla
  cambiarOrden(columna: string) {
    if (this.config.sortKey === columna) {
      this.config.sortOrder = this.config.sortReverse ? 'asc' : 'desc';
      this.config.sortReverse = !this.config.sortReverse;
    } else {
      this.config.sortKey = columna;
      this.config.sortOrder = 'asc';
      this.config.sortReverse = false;
    }
  }


  actualizarPaginacion() {
    // Reiniciar la paginación a la primera página cuando se cambie la cantidad de registros por página
    this.page = 1;
  }


  registrarActivoFijo() {
    if (this.referenciaText=="" ||  this.marcaText == ""  || this.wifiText=="" || this.nodoText == "" || this.tipoEquipoText == "") {



      Swal.fire({
        title: 'ERROR',
        text: 'POR FAVOR LLENE TODOS LOS CAMPOS',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });

    } else if(this.referenciaText.length>=20) {


      Swal.fire({
        title: 'ERROR',
        text: 'POR FAVOR INGRESE UNA REFERENCIA CON UNA LONGITUD MENOR O IGUAL A 20 CARACTERES',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });


    } else {

      this.referenciasServices.postReferencias(this.referenciaText,this.marcaText,this.wifiText,this.nodoText,this.tipoEquipoText).subscribe(referencia=>{
        this.ngOnInit();


        Swal.fire({
          title: 'EXITO',
          text: 'Registro insertado con exito',
          icon: 'success',
          customClass: {
            popup: 'bg-dark',
            title: 'text-white',
            htmlContainer: 'text-white'
          }
        });

      })

    }
  }

  limpiar(){
    this.referenciaText = "";
    this.marcaText = "";
    this.wifiText = "";
    this.nodoText = "";
    this.tipoEquipoText = "";
  }

}
