import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import {  ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(private servicioLogin: LoginService ,  private rout: Router){}
  usuario:any;

  tecnicos:any;

  operacionesRol:boolean = true;
  operacionValidarActa:boolean = true;






  ngOnInit(){


    this.usuario = this.servicioLogin.getUser();

    if(this.usuario.data.idusuario == "32" || this.usuario.data.idusuario== "165"){
      this.operacionesRol = true;
    }else if(this.usuario.data.idusuario == "43"){
      this.operacionValidarActa = false;
      this.operacionesRol = false;
    }else{
      this.operacionesRol = false;
    }



  }


  cerrarSession(){

    Swal.fire({
      title: '¿Estas seguro de cerrar su session ' + this.usuario.data.nombres + " ? " ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      customClass: {
        popup: 'bg-dark',
        title: 'text-white'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioLogin.clearUser();
        this.rout.navigate(['']);
      }
    })



  }


}
