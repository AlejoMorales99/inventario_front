import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { MarcaService } from 'src/app/services/marca/marca.service';
import { NodoService } from 'src/app/services/nodo/nodo.service';
import { ReferenciasService } from 'src/app/services/referencias/referencias.service';
import { WifiService } from 'src/app/services/wifi/wifi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-referencia',
  templateUrl: './editar-referencia.component.html',
  styleUrls: ['./editar-referencia.component.css']
})
export class EditarReferenciaComponent implements OnInit {


  constructor(
    private marcaServices: MarcaService ,
    private wifiServices: WifiService,
    private nodoServices: NodoService,
    private loginServices: LoginService,
    private rout: Router,
    private rutaActiva: ActivatedRoute,
    private referenciasService:ReferenciasService){}

  idParametro: string = this.rutaActiva.snapshot.paramMap.get('id')!;

  marcas:any;
  wifis:any;
  nodos:any
  tipoEquipo:any

  getOneReferencia:any;

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


    }else{

      this.referenciasService.getOneReferencia(this.idParametro).subscribe(refe=>{

        this.getOneReferencia = refe;

      })

      this.referenciasService.getTiposEquipos().subscribe(tipoEquipo=>{
        this.tipoEquipo = tipoEquipo
      })

      this.marcaServices.getMarca().subscribe(marca=>{
        this.marcas = marca

      })

      this.wifiServices.getWifi().subscribe(wifi=>{
        this.wifis = wifi;
      })

      this.nodoServices.getNodo().subscribe(nodo=>{
        this.nodos = nodo;
      })
    }



  }




  actualizarReferencia(referencia:string,marca:string,wifi:string,nodo:string,tipoEquipoID:string){

    if(referencia==""){

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

    }else{

      this.referenciasService.actualizarReferencia(this.idParametro,referencia,marca,wifi,nodo,tipoEquipoID).subscribe(res=>{

        Swal.fire({
          title: 'EXITO',
          text: 'REGISTRO ACTUALIZADO CON EXITO',
          icon: 'success',
          customClass: {
            popup: 'bg-dark',
            title: 'text-white',
            htmlContainer: 'text-white'
          }
        });

        this.rout.navigate(['/referenciasActivosFijos']);

      })

    }

  }


}
