import { Component } from '@angular/core';
import { MarcaService } from '../services/marca/marca.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent {

  constructor(private marcasServices: MarcaService, private rout: Router,
    private loginServices: LoginService,) { }

  marcaText: string = "";
  marca: any;

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

  operacionesRol: boolean = true;

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

    } else {
      this.marcasServices.getMarca().subscribe(marca => {
        this.marca = marca;
        console.log(this.marca);
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


  registrarActivoFijo() {
    if (this.marcaText == "") {

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

    } else if (this.marcaText.length >= 15) {

      Swal.fire({
        title: 'ERROR',
        text: 'POR FAVOR INGRESE UNA MARCA CON UNA LONGITUD MENOR O IGUAL A 15 CARACTERES',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });



    } else {

      this.marcasServices.postMarca(this.marcaText).subscribe(nuevoRegistro => {
        this.ngOnInit();


        Swal.fire({
          title: 'ERROR',
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

  limpiar() {
    this.marcaText = "";
  }


}
