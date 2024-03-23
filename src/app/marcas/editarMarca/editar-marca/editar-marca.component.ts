import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from 'src/app/services/marca/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-marca',
  templateUrl: './editar-marca.component.html',
  styleUrls: ['./editar-marca.component.css']
})
export class EditarMarcaComponent {


idMarca: string = this.rutaActiva.snapshot.paramMap.get('id')!;

constructor(private marcaServices:MarcaService, private rutaActiva: ActivatedRoute,private rout: Router){}

marca:string = ""

ngOnInit(){

  this.marcaServices.getOneMarca(this.idMarca).subscribe((res:any)=>{
    this.marca = res[0].marcacol;
  })


}

putMarca(){

  if(this.marca==""){
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
  }else if(this.marca.length>=15){
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

    this.marcaServices.putMarca(this.idMarca,this.marca).subscribe(res=>{

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

      this.rout.navigate(['/marca']);



    })



  }

}

}
