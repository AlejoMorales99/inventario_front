import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEquipoService } from 'src/app/services/tipoEquipo/tipo-equipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-de-equipo',
  templateUrl: './editar-tipo-de-equipo.component.html',
  styleUrls: ['./editar-tipo-de-equipo.component.css']
})
export class EditarTipoDeEquipoComponent {

idTipoDeEquipo: string = this.rutaActiva.snapshot.paramMap.get('id')!;

constructor(private rout: Router,private rutaActiva: ActivatedRoute, private tipoEquipoServices:TipoEquipoService){}

tipoEquipo:string = "";


ngOnInit(){

  this.tipoEquipoServices.getOneTipoDeEquipo(this.idTipoDeEquipo).subscribe((res:any)=>{

    this.tipoEquipo = res[0].nombreEquipo;

  })

}

putTipoEquipo(){

  if(this.tipoEquipo==""){
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
  }else if(this.tipoEquipo.length>=15){
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

    this.tipoEquipoServices.putTipoDeEquipo(this.idTipoDeEquipo,this.tipoEquipo).subscribe(res=>{

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

      this.rout.navigate(['/tipoEquipo']);


    })


  }

}


}
