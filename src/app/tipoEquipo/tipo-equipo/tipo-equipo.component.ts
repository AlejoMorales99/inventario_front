import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import {TipoEquipoService} from 'src/app/services/tipoEquipo/tipo-equipo.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-equipo',
  templateUrl: './tipo-equipo.component.html',
  styleUrls: ['./tipo-equipo.component.css']
})
export class TipoEquipoComponent implements OnInit {

  constructor( private loginServices: LoginService,private rout: Router, private TipoEquipoService:TipoEquipoService ){}

tipoEquipoText: string = "";
tipoDeEquipo:any;

//variable para que el registro en la tabla lo muestre desde la pagina 1
page: number = 1;
//---------------------------------------------------------------------

//variable para hacer posible la busqyeda de los registros
public buscarActivos: any;
//------------------------------------------------------


//variable para cambiar la cantidad de registros a mostrar
itemsPerPage: number = 5; // Valor predeterminado
//---------------------------------------------------------------//


 //variable para los shorts de la tabla
 config = {
  sortKey: 'ID',  // Columna por defecto para ordenar (puedes cambiarla según tus necesidades)
  sortReverse: false,  // Orden ascendente por defecto (puedes cambiarlo según tus necesidades)
  sortOrder: '',  // Orden actual: '' (ninguno), 'asc' (ascendente), 'desc' (descendente)
};
//-----------------------------------------------------------------//


ngOnInit(): void {

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

    } else {

      this.TipoEquipoService.getTipoDeEquipo().subscribe(res=>{

        this.tipoDeEquipo = res


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

limpiar() {
  this.tipoEquipoText = "";
}


registrarEquipo(){

  if (this.tipoEquipoText == "") {



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

  } else if (this.tipoEquipoText.length >= 20) {


    Swal.fire({
      title: 'ERROR',
      text: 'POR FAVOR INGRESE UN PROVEEDOR CON UNA LONGITUD MENOR O IGUAL A 15 CARACTERES',
      icon: 'error',
      customClass: {
        popup: 'bg-dark',
        title: 'text-white',
        htmlContainer: 'text-white'
      }
    });

  } else {

    this.TipoEquipoService.registrarEquipo(this.tipoEquipoText).subscribe(res => {

      this.tipoEquipoText = "";

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

    });

  }


}


}
