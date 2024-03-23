import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WifiService } from 'src/app/services/wifi/wifi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-wifi',
  templateUrl: './editar-wifi.component.html',
  styleUrls: ['./editar-wifi.component.css']
})
export class EditarWifiComponent {

  constructor(private rutaActiva: ActivatedRoute, private WifiService:WifiService,private rout: Router ){}


  idParametro: string = this.rutaActiva.snapshot.paramMap.get('id')!;
  wifi:string = "";

  ngOnInit(){

    this.WifiService.getOneWifi(this.idParametro).subscribe( (res:any)=>{
      console.log(res)
      this.wifi = res[0].nombre;
    })

  }


  putWifi(){

    if(this.wifi==""){
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
    }else if(this.wifi.length>=15){
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
      this.WifiService.putWifi(this.idParametro,this.wifi).subscribe(res=>{

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

        this.rout.navigate(['/wifi']);

      })
    }

  }


}
