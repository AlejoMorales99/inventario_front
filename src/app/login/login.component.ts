
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import {  Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {


  showLoginForm = false;
  username: string = ""
  password: string = ""
  rol: number = 0;
  idUsuario:number = 0;



  constructor(private loginServicio:LoginService , private rout: Router){}

  ngOnInit() {



    this.loginServicio.clearUser();
    setTimeout(() => {
      this.showLoginForm = true;
    }, 1000);
  }


  submitLogin() {

    if(this.username == "" || this.password == "" ){

      Swal.fire({
        title: 'Oops...',
        text: 'por favor llene los campos',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });


    }else{

      this.loginServicio.getUsuario(this.username, this.password).subscribe(res => {

         if (res.code == 200) {

          this.loginServicio.loginUsuario(res.data.nombres.toLowerCase().trim(),res.data.numerotercero).subscribe( (nombreUsuario:any)=>{

            if(nombreUsuario.error == false){

              this.loginServicio.postLoginUsuario(res.data.nombres.toLowerCase().trim(),res.data.numerotercero,this.password).subscribe(newUsuario=>{
              })

              this.loginServicio.setToken(res.data.token);
              this.loginServicio.setUser(res)

              this.rout.navigate(['/inicio']);

            }else{

              this.loginServicio.setToken(res.data.token);
              this.loginServicio.setUser(res)

              this.rout.navigate(['/inicio']);

            }

          })

        } else {

          Swal.fire({
            title: 'Oops...',
            text: 'Contraseña o Usuario incorrectos',
            icon: 'error',
            customClass: {
              popup: 'bg-dark',
              title: 'text-white',
              htmlContainer: 'text-white'
            }
          });

        }
      });

    }

  }



}
