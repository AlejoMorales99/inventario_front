import { Component, OnInit } from '@angular/core';
import { WifiService } from '../services/wifi/wifi.service';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.css']
})
export class WifiComponent implements OnInit {

  constructor(private wifiServices: WifiService ,private rout: Router,
    private loginServices: LoginService,){}


  wifi:any;
  textWifi: string = "";


  //variable para que el registro en la tabla lo muestre desde la pagina 1
  page: number = 1;
  //---------------------------------------------------------------------

  //variable para hacer posible la busqyeda de los registros
  public buscarActivos: any;
  //------------------------------------------------------


   //variable para cambiar la cantidad de registros a mostrar
   itemsPerPage: number = 10; // Valor predeterminado
   //---------------------------------------------------------------//



  //variable para los shorts de la tabla
  config = {
    sortKey: 'ID',  // Columna por defecto para ordenar (puedes cambiarla según tus necesidades)
    sortReverse: false,  // Orden ascendente por defecto (puedes cambiarlo según tus necesidades)
    sortOrder: '',  // Orden actual: '' (ninguno), 'asc' (ascendente), 'desc' (descendente)
  };

  //-----------------------------------------------------------------//

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
      this.wifiServices.getWifi().subscribe(wifi=>{
        this.wifi = wifi;
        console.log(this.wifi);
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
  //------------------------------------------------//

  actualizarPaginacion() {
    // Reiniciar la paginación a la primera página cuando se cambie la cantidad de registros por página
    this.page = 1;
  }

//funcion paraa registrar un activo fijo
registrarActivoFijo() {
  if (this.textWifi == "") {



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

  } else if(this.textWifi.length>=15) {

    Swal.fire({
      title: 'ERROR',
      text: 'POR FAVOR INGRESE UN VALOR CON UNA LONGITUD MENOR O IGUAL A 15 CARACTERES',
      icon: 'error',
      customClass: {
        popup: 'bg-dark',
        title: 'text-white',
        htmlContainer: 'text-white'
      }
    });

  } else{

    this.wifiServices.postWifi(this.textWifi).subscribe(nuevoRegistro => {
      this.ngOnInit();
      Swal.fire(
        'EXITO',
        'Registro insertado con exito',
        'success'
      )

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

    });

  }
}

limpiar(){
  this.textWifi = "";
}


}
