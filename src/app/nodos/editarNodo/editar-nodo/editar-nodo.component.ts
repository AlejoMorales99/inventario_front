import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodoService } from 'src/app/services/nodo/nodo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-nodo',
  templateUrl: './editar-nodo.component.html',
  styleUrls: ['./editar-nodo.component.css']
})
export class EditarNodoComponent {

  idNodo: string = this.rutaActiva.snapshot.paramMap.get('id')!;

  constructor(private rutaActiva: ActivatedRoute,private rout: Router, private nodoService:NodoService){
  }

  nodo:string = ""

  ngOnInit(){

    this.nodoService.getOneNodo(this.idNodo).subscribe( (res:any)=>{

      this.nodo = res[0].nombre

    })


  }

  putNodo(){

    if(this.nodo==""){
      Swal.fire({
        title: 'ERROR',
        text: 'POR FAVOR LLENE EL CAMPO',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });
    }else if(this.nodo.length>=15){
      Swal.fire({
        title: 'ERROR',
        text: 'POR FAVOR INGRESE UN VALOR CON UNA LONGITUD MENOR A 15 CARACTERES',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });
    }else{

      this.nodoService.putNodo(this.idNodo,this.nodo).subscribe(res=>{

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

        this.rout.navigate(['/Nodos']);


      })



    }

  }

}
