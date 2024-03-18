import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivosFijosService } from 'src/app/services/activosFijos/activos-fijos.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { EstadosService } from 'src/app/services/estados/estados.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { ReferenciasService } from 'src/app/services/referencias/referencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-activo-fijo',
  templateUrl: './editar-activo-fijo.component.html',
  styleUrls: ['./editar-activo-fijo.component.css']
})
export class EditarActivoFijoComponent implements OnInit {

  articulos: any;
  editarActivoFijo: any;
  referenciasList:any;

  categoria: any;
  estados: any;
  proveedor: any;
  tipoEquipo:any;

  referenciaEdit:any;

  constructor(
    private loginServices: LoginService,
    private rutaActiva: ActivatedRoute,
    private rout: Router,
    private servicioActivosFijos: ActivosFijosService,
    private categoriasServices: CategoriasService,
    private estadoServices: EstadosService,
    private proveedores: ProveedorService,
    private referenciasServices: ReferenciasService) { }

  idParametro: string = this.rutaActiva.snapshot.paramMap.get('id')!;

  ngOnInit() {

    const usuario = this.loginServices.getUser();

    if (usuario == null) {

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

      this.servicioActivosFijos.getOneActivosFijos(this.idParametro).subscribe(editarActivoFijo => {
        this.editarActivoFijo = editarActivoFijo;

        this.referenciaEdit = this.editarActivoFijo[0].idreferencia

        console.log(this.editarActivoFijo);
      });

      this.categoriasServices.getCategorias().subscribe(categoria => {

        this.categoria = categoria;

      });

      this.estadoServices.getEstados().subscribe(estados => {
        this.estados = estados;


      })

      this.proveedores.getProveedor().subscribe(proveedores => {
        this.proveedor = proveedores;

      });

      this.referenciasServices.getReferencias().subscribe(res=>{
        this.referenciasList = res;
      })


    }
  }

  actualizarActivoFijo(serial: string, mac: string,  descripcion: string, categoria: string, estado: string, proveedor: string) {

     if (serial == ""  || categoria == "" || estado == "" || proveedor == ""  || this.referenciaEdit == undefined ) {

      Swal.fire({
        title: 'ERROR',
        text: 'EXISTEN CAMPOS REQUERIDOS VACIOS',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });

    } else if (serial.length > 25) {

      Swal.fire({
        title: 'ERROR',
        text: 'POR FAVOR INGRESE UN SERIAL CON UNA LONGITUD MENOR A 25 CARACTERES',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });


    } else if (mac.length > 25) {

      Swal.fire({
        title: 'ERROR',
        text: 'POR FAVOR INGRESE UNA MAC CON UNA LONGITUD MENOR A 25 CARACTERES',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });


    } else if(descripcion.length>45) {

      Swal.fire({
        title: 'ERROR',
        text: 'POR FAVOR INGRESE UNA DESCRIPCION CON UNA LONGITUD MENOR A 45 CARACTERES',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });

    }else{
      this.servicioActivosFijos.actualizarActivoFijo(serial, mac, descripcion, categoria, estado, proveedor, this.idParametro,this.referenciaEdit).subscribe(activoEditado => {


        Swal.fire({
          title: 'EXITO',
          text: 'ACTIVO FIJO ACTUALIZADO CON EXITO',
          icon: 'success',
          customClass: {
            popup: 'bg-dark',
            title: 'text-white',
            htmlContainer: 'text-white'
          }
        });


        this.rout.navigate(['/inventarioActivosFijos']);

      });

    }


  }
}
