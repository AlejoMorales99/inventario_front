import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConsultarInventarioComponent } from './consultar-inventario/consultar-inventario.component';


//Imports necesarios para el funcionamiento del sistema
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { EditarActivoFijoComponent } from './consultar-inventario/editarActivoFijo/editar-activo-fijo/editar-activo-fijo.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { ActivosFijosService } from './services/activosFijos/activos-fijos.service';
import { ArticulosInventarioService } from './services/articulos/articulos-inventario.service';
import { OrderModule } from 'ngx-order-pipe';
import { DataTablesModule } from "angular-datatables";
import { ReferenciasComponent } from './referencias/referencias/referencias.component';
import { WifiComponent } from './wifi/wifi.component';
import { NodosComponent } from './nodos/nodos.component';
import { MarcasComponent } from './marcas/marcas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EstadosComponent } from './estados/estados.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ActaMovimientoComponent } from './actaMovimiento/acta-movimiento/acta-movimiento.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));



import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TecnicosComponent } from './tecnicos/tecnicos/tecnicos.component';
import { EditarReferenciaComponent } from './referencias/editarReferencia/editar-referencia/editar-referencia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TipoEquipoComponent } from './tipoEquipo/tipo-equipo/tipo-equipo.component';


const appRoutes: Routes = [

  //ruta con la que se inicia la app (login)
  { path: '' , component: LoginComponent},

  //primera ruta a mostrar cuando el usuario inicia sesion
  { path: 'inicio' , component: InicioComponent},

  //ruta donde se muestra la vista de los activos fijos de la base de datos de mysql
  { path: 'inventarioActivosFijos' , component: ConsultarInventarioComponent},

  //referencias
  { path: 'referenciasActivosFijos' , component: ReferenciasComponent},

  { path: 'referenciasActivosFijosEditar/:id' , component: EditarReferenciaComponent},

  //wifi
  { path: 'wifi' , component: WifiComponent},

  //nodo
  { path: 'Nodos' , component: NodosComponent},

  //marca
  { path: 'marca' , component: MarcasComponent},

  //estados
  { path: 'estados' , component: EstadosComponent},

  //categorias
  { path: 'categorias' , component: CategoriasComponent},

  //categorias
  { path: 'proveedores' , component: ProveedoresComponent},

  //tipoEquipo
  { path: 'tipoEquipo' , component: TipoEquipoComponent},


  { path: 'editarActivoFijo/:id' , component: EditarActivoFijoComponent},


  { path: 'actasDeMovimiento' , component: ActaMovimientoComponent},

  { path: 'Tecnicos' , component: TecnicosComponent},


  { path: '**', redirectTo: '' } // Redirección a la ruta vacía para rutas no definidas

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConsultarInventarioComponent,
    InicioComponent,
    LoginComponent,
    EditarActivoFijoComponent,
    ReferenciasComponent,
    WifiComponent,
    NodosComponent,
    MarcasComponent,
    CategoriasComponent,
    EstadosComponent,
    ProveedoresComponent,
    ActaMovimientoComponent,
    TecnicosComponent,
    EditarReferenciaComponent,
    TipoEquipoComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxScannerQrcodeModule,
    NgxPaginationModule,
    OrderModule,
    DataTablesModule,
    NgSelectModule,
    HttpClientModule,
    FontAwesomeModule, // Agrega FontAwesomeModule aquí
    NgProgressModule.withConfig({
      color: "blue"
    }),

    NgProgressHttpModule,

    BrowserAnimationsModule
  ],
  providers: [ActivosFijosService,ArticulosInventarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
