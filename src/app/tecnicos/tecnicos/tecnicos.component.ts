import { ActivosFijosService } from './../../services/activosFijos/activos-fijos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {

  config = {
    sortKey: 'ID',  // Columna por defecto para ordenar (puedes cambiarla según tus necesidades)
    sortReverse: false,  // Orden ascendente por defecto (puedes cambiarlo según tus necesidades)
    sortOrder: '',  // Orden actual: '' (ninguno), 'asc' (ascendente), 'desc' (descendente)
  };



  constructor(private loginService:LoginService,private route: ActivatedRoute,  private rout: Router, private activosFijos: ActivosFijosService){}

  usuario:any;

  ocultarNombreCompletoTecnico: boolean = false;
  nombreTecnicoCompleto:any;
  validarTotalOnts:boolean = false;
  totalOnts:any;
  inventarioTecnicos:any;
  activosFijosTecnicos:any;
  filtroTecnico:string = "Seleciona al tecnico"

  crearNuevoTecnico:string = "";

  public buscarActivos: any;
  itemsPerPage: number = 10;
  page: number = 1;

  ngOnInit() {

    //al iniciar la pagina llamo a la funcion getUser la cual me trae la informacion del usuario que se logue
    this.usuario = this.loginService.getUser();

    if (this.usuario == null) {

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

      this.loginService.getTecnicos().subscribe(tecnicos=>{
        this.inventarioTecnicos = tecnicos;



      })

    }


  }


  listarInventarioTecnicos(evento:any){

    const servicio = evento.idservicio;
    const selectedIndex = evento.numeroTercero;


    this.activosFijos.getActivosFijosTecnicosInventario(selectedIndex).subscribe(inventarioTecnico=>{

      this.activosFijosTecnicos = inventarioTecnico;

    })

    this.validarTotalOnts = true;

    this.activosFijos.totalActivosFijosTecnicos(selectedIndex).subscribe(total=>{
      this.totalOnts = total;
    })

    this.activosFijos.cedulaTecnico(servicio).subscribe((cedula:any)=>{

      this.activosFijos.nombreTecnicoCompleto(cedula[0].cedula).subscribe(nomTecnico=>{

        this.nombreTecnicoCompleto = nomTecnico

        if(this.nombreTecnicoCompleto.code == 401){
          this.ocultarNombreCompletoTecnico = false
        }else{
          this.ocultarNombreCompletoTecnico = true
        }

      })



    })


  }


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


  registrarTecnicoNuevo(){

    if(this.crearNuevoTecnico == ""){
      Swal.fire({
        title: 'ERROR',
        text: `EL CAMPO NO PUEDE ESTAR VACIO`,
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });
    }else{

      this.activosFijos.registrarTecnicoNuevo(this.crearNuevoTecnico).subscribe(tecnicoNuevo=>{

        this.ngOnInit();


        Swal.fire({
          title: 'EXITO',
          text: `TECNICO CREADO CON EXITO`,
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


}
