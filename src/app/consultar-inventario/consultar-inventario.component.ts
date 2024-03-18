import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivosFijosService } from '../services/activosFijos/activos-fijos.service';
import { ArticulosInventarioService } from '../services/articulos/articulos-inventario.service';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { CategoriasService } from '../services/categorias/categorias.service';
import { WifiService } from '../services/wifi/wifi.service';
import { MarcaService } from '../services/marca/marca.service';
import { NodoService } from '../services/nodo/nodo.service';
import { ProveedorService } from '../services/proveedor/proveedor.service';
import { ReferenciasService } from '../services/referencias/referencias.service';
import * as XLSX from 'xlsx';




@Component({
  selector: 'app-consultar-inventario',
  templateUrl: './consultar-inventario.component.html',
  styleUrls: ['./consultar-inventario.component.css']
})



export class ConsultarInventarioComponent implements OnInit {

  contador:number = 0;

  @ViewChild('macEscanear') miInputRef!: ElementRef;
  @ViewChild('referenciaValidar') newReferencia!: ElementRef;

  @ViewChild('serial', { static: false }) miInput!: ElementRef;

  validacionSerial: boolean = true;
  validarMac: boolean = true;
  validarTotalOnts:boolean = false;

  colTecnicosMostrar:boolean = false;

  //variable para que el registro en la tabla lo muestre desde la pagina 1
  page: number = 1;
  //---------------------------------------------------------------------

  //variable para hacer posible la busqyeda de los registros
  filtroSerialMAC: string = '';
  public buscarActivos: any = "";
  //------------------------------------------------------

  //variables para insertar un usuario
  Serial: string = "";
  mac: string = "";
  textArea: string = "";
  bodega: string = "";
  proveedor: string = "";
  categoria: string = "";
  referenciaText: string = "";
  tipoEquipo:string = "";
  fechaReporte:boolean = false;
  fechaInicio: string = "";
  fechaFin: string = "";

  selectedColumn: string = "" // Columna seleccionada para la búsqueda (mac, serial o proveedor)
  searchValue: string = "" // Valor ingresado para buscar

  //------------------------------------

  //variable para los shorts de la tabla
  config = {
    sortKey: 'ID',  // Columna por defecto para ordenar (puedes cambiarla según tus necesidades)
    sortReverse: false,  // Orden ascendente por defecto (puedes cambiarlo según tus necesidades)
    sortOrder: '',  // Orden actual: '' (ninguno), 'asc' (ascendente), 'desc' (descendente)
  };

  //-----------------------------------------------------------------//

  //variable para cambiar la cantidad de registros a mostrar
  itemsPerPage: number = 10; // Valor predeterminado
  //---------------------------------------------------------------//


  //variables para mover un activo fijo
  tipoMovimiento: string = ""
  bodegaSelecionada: string = ""
  codigoServicio: string = ""
  descripcionAdicional: string = ""
  //----------------------------------


  //variable para obtener el valor del select
  textoDelSelectExcel: string = ""
  //----------------------------------------//

  //variables de tipo modelo de los valores que traera el backend
  activosFijosInventario: any
  categoriasInventario: any;
  wifiInventario: any;
  marcaInventario: any;
  nodoInventario: any;
  prooveedorInventario: any;
  articulosInventario: any;
  referenciaInventario: any;
  originalActivosFijos: any;
  totalOnts:any;
  //-----------------------------------------------------------------//

  operacionesRol: boolean = true;
  variableError: any;



  public isScannerVisible: boolean = false;
  public isAnotherCondition: boolean = false;

  action:any;


  //aqui hago todas las instancias que necesito
  constructor(
    private categoriaServices: CategoriasService,
    private wifiService: WifiService,
    private marcaServices: MarcaService,
    private nodoServices: NodoService,
    private proveedorServices: ProveedorService,
    private rout: Router,
    private loginServices: LoginService,
    private servicioActivosFijos: ActivosFijosService,
    private servicioArticulos: ArticulosInventarioService,
    private referenciasServices: ReferenciasService) { }

  //funcion que se ejecuta apenas empieze se inicie la pagina
  ngOnInit(): void {
    //obtengo elo usuario que alla iniciao sesion
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
      console.log("");
      this.rout.navigate(['']);


    } else {

      this.categoriasInventario = [];
      this.prooveedorInventario = [];


      if (usuario.data.nombres == "KAROL YISETH" || usuario.data.nombres== 'MARI LUZ') {

        this.servicioActivosFijos.getActivosFijos().subscribe(activosFijos => {
          this.activosFijosInventario = activosFijos;

          if(this.activosFijosInventario.length>0){
            this.originalActivosFijos = [...this.activosFijosInventario];
          }else{
            this.originalActivosFijos = "";
          }


        });



        this.operacionesRol = true;
      } else {

        this.colTecnicosMostrar = true;
        this.servicioActivosFijos.getActivosFijosTecnicos().subscribe(activosFijos => {
          this.activosFijosInventario = activosFijos;

          if(this.activosFijosInventario.length>0){
            this.originalActivosFijos = [...this.activosFijosInventario];
          }else{
            this.originalActivosFijos = "";

          }
        });

        this.validarTotalOnts = true;

        this.servicioActivosFijos.totalActivosFijosTecnicos(usuario.data.numerotercero).subscribe(total=>{
          this.totalOnts = total;
        })

        this.operacionesRol = false;
      }




      //funcion que trae todas las categorias de la empresa por medio de una api en node.js
      this.categoriaServices.getCategorias().subscribe(categorias => {
        this.categoriasInventario = categorias;

      })

      //funcion que trae todos los wifis de la empresa por medio de una api en node.js
      this.wifiService.getWifi().subscribe(wifi => {
        this.wifiInventario = wifi;

      })

      //funcion que trae las marcas de las onts de la empresa por medio de una api en node.js
      this.marcaServices.getMarca().subscribe(marca => {
        this.marcaInventario = marca;

      })


      //funcion que trae todos los tipos de nodos de la empresa por medio de una api en node.js
      this.nodoServices.getNodo().subscribe(nodo => {
        this.nodoInventario = nodo;

      })

      //funcion que trae todos los proveedores de la empresa por medio de una api en node.js
      this.proveedorServices.getProveedor().subscribe(proveedor => {
        this.prooveedorInventario = proveedor;

      })

      this.referenciasServices.getReferencias().subscribe(referencia => {
        this.referenciaInventario = referencia;

      })
    }
  }

  buscarRegistro(){

    if(this.buscarActivos!= "" && this.selectedColumn== "mostrarTodo" ){

      Swal.fire({
        title: 'ERROR',
        text: 'DEBE SELECIONAR UN FILTRO PRIMERO',
        icon: 'error',
        customClass: {
          popup: 'bg-dark',
          title: 'text-white',
          htmlContainer: 'text-white'
        }
      });

    }else if(this.buscarActivos== "" && this.selectedColumn== "fechabodega" ){


      if(this.fechaInicio == "" || this.fechaFin == ""){
        Swal.fire({
          title: 'ERROR',
          text: 'SELECIONE UNA FECHA PRIMERO',
          icon: 'error',
          customClass: {
            popup: 'bg-dark',
            title: 'text-white',
            htmlContainer: 'text-white'
          }
        });
      }else{
        this.servicioActivosFijos.buscarRegistrosPorFechaAndServicio(this.buscarActivos,this.selectedColumn,this.fechaInicio,this.fechaFin).subscribe(registros=>{

          if(registros == ""){
            Swal.fire({
              title: 'ERROR',
              text: `NO SE ENCONTRO EL REGISTRO ${this.buscarActivos} de la columna ${this.selectedColumn}`,
              icon: 'error',
              customClass: {
                popup: 'bg-dark',
                title: 'text-white',
                htmlContainer: 'text-white'
              }
            });
          }else{
            this.buscarActivos = ""
            this.activosFijosInventario = registros
          }

        })
      }

    } else if(this.buscarActivos == "" || this.selectedColumn == ""){
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
    }else if(this.selectedColumn == "fecha"){

        const fechaValida = /^\d{4}-\d{2}-\d{2}$/.test(this.buscarActivos);

        if (!fechaValida) {
          Swal.fire({
            title: 'ERROR',
            text: 'El formato de la fecha es incorrecto. Debe ser YYYY-MM-DD',
            icon: 'error',
            customClass: {
              popup: 'bg-dark',
              title: 'text-white',
              htmlContainer: 'text-white'
            }
          });
        } else {
          this.servicioActivosFijos.buscarRegistros(this.buscarActivos, this.selectedColumn).subscribe(registros => {
            if (registros == "") {
              Swal.fire({
                title: 'ERROR',
                text: `NO SE ENCONTRÓ EL REGISTRO ${this.buscarActivos} de la columna ${this.selectedColumn}`,
                icon: 'error',
                customClass: {
                  popup: 'bg-dark',
                  title: 'text-white',
                  htmlContainer: 'text-white'
                }
              });
            } else {
              this.buscarActivos = "";
              this.activosFijosInventario = registros;
            }
          });
        }
      }else if(this.selectedColumn == "fechabodega" && this.buscarActivos !=""){

        if(this.fechaInicio == "" || this.fechaFin == ""){

          Swal.fire({
            title: 'ERROR',
            text: 'SELECIONE UNA FECHA PRIMERO',
            icon: 'error',
            customClass: {
              popup: 'bg-dark',
              title: 'text-white',
              htmlContainer: 'text-white'
            }
          });

        }else{
          this.servicioActivosFijos.buscarRegistrosPorFechaAndServicio(this.buscarActivos,this.selectedColumn,this.fechaInicio,this.fechaFin).subscribe(registros=>{

            if(registros == ""){
              Swal.fire({
                title: 'ERROR',
                text: `NO SE ENCONTRO EL REGISTRO ${this.buscarActivos} de la columna ${this.selectedColumn}`,
                icon: 'error',
                customClass: {
                  popup: 'bg-dark',
                  title: 'text-white',
                  htmlContainer: 'text-white'
                }
              });
            }else{
              this.activosFijosInventario = registros
            }

          })
        }

      }else{
        this.servicioActivosFijos.buscarRegistros(this.buscarActivos,this.selectedColumn).subscribe(registros=>{

          if(registros == ""){
            Swal.fire({
              title: 'ERROR',
              text: `NO SE ENCONTRO EL REGISTRO ${this.buscarActivos} de la columna ${this.selectedColumn}`,
              icon: 'error',
              customClass: {
                popup: 'bg-dark',
                title: 'text-white',
                htmlContainer: 'text-white'
              }
            });
          }else{
            this.activosFijosInventario = registros
          }

        })
     }


  }

  filterData(): void {
    if (!this.searchValue || this.searchValue.trim() === '') {
      // Si el input está vacío, restablecemos los datos originales sin aplicar filtro
      this.activosFijosInventario = [...this.originalActivosFijos]; // Restaurar datos originales
    } else {
      // Si hay un valor en el input, aplicamos el filtro según la columna seleccionada
      const filteredData = this.originalActivosFijos.filter((activo: any) => {
        if (this.selectedColumn === 'mac') {
          return activo.MAC.toLowerCase().includes(this.searchValue.toLowerCase());
        } else if (this.selectedColumn === 'serial') {
          return activo.serial.toLowerCase().includes(this.searchValue.toLowerCase());
        } else if (this.selectedColumn === 'proveedor') {
          return activo.proveedor.toLowerCase().includes(this.searchValue.toLowerCase());
        }
      });

      this.activosFijosInventario = filteredData;
    }
  }




  //funcion para implementar el short en la tabla
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
  //------------------------------------------------//

  actualizarPaginacion() {
    // Reiniciar la paginación a la primera página cuando se cambie la cantidad de registros por página
    this.page = 1;
  }


  onSelectChange(event: any) {
    this.textoDelSelectExcel = event.target.options[event.target.selectedIndex].text;
  }

  //funcion paraa registrar un activo fijo
  registrarActivoFijo() {
    if (this.Serial == "" || this.mac == "" || this.bodega == "" || this.proveedor == "" || this.categoria == "" || this.referenciaText == "") {


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

    } else if (this.Serial.length > 30) {



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


    } else if (this.mac.length > 30) {


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

    } else if (this.textArea.length > 45) {

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

    } else {
      this.miInput.nativeElement.focus();
      this.servicioActivosFijos.postActivosFijos(this.Serial, this.mac , this.textArea, this.bodega, this.proveedor, this.categoria, this.referenciaText).subscribe(nuevoRegistro => {
        this.miInput.nativeElement.focus();
        this.miInput.nativeElement.disabled = false;
        this.ngOnInit();
        this.miInput.nativeElement.disabled = false;
        this.miInput.nativeElement.focus();

        Swal.fire({
          title: 'EXITO',
          text: 'Registro insertado con exito',
          icon: 'success',
          customClass: {
            popup: 'bg-dark',
            title: 'text-white',
            htmlContainer: 'text-white'
          }
        });

        this.miInput.nativeElement.focus();

        this.miInputRef.nativeElement.disabled = false
        this.mac = "";
        this.Serial = "";

      });

    }
  }

  escanear() {



    setTimeout(() => {
      this.miInputRef.nativeElement.disabled = false;

      this.miInputRef.nativeElement.focus();
      this.miInput.nativeElement.disabled = true;
      this.isScannerVisible = false;


    }, 800);

  }

  escanearMac() {

    setTimeout(() => {

      this.servicioActivosFijos.getCopyMac(this.mac).subscribe(mac => {

        if (mac == "") {
          console.log("no existe");
        } else {


          Swal.fire({
            title: `La mac ${this.mac} ya existe en la tabla, esta seguro de continuar?`,
            showDenyButton: true,
            confirmButtonText: 'SI',
            customClass: {
              popup: 'bg-dark',
              title: 'text-white',
              htmlContainer: 'text-white'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.validarMac = false;
            } else if (result.isDenied) {
              this.validarMac = false;
              this.mac = "";
            }
          });



        }

      })

    }, 800);

  }

  validarSerial() {

    if (this.validacionSerial && this.contador == 0) {

      this.servicioActivosFijos.getCopySerial(this.Serial).subscribe(serial => {

        if (serial == "") {

        } else {

          Swal.fire({
            title: `El serial ${this.Serial} ya existe en la tabla, ¿está seguro de continuar?`,
            showDenyButton: true,
            confirmButtonText: 'SI',
            customClass: {
              popup: 'bg-dark',
              title: 'text-white',
              htmlContainer: 'text-white'
            }
          }).then((result) => {
            if (result.isConfirmed) {

              this.validacionSerial = true;
              this.contador = this.contador+1;

            } else if (result.isDenied) {
              this.Serial = "";
              this.miInputRef.nativeElement.disabled = true;
              this.miInput.nativeElement.disabled = false;
              this.miInput.nativeElement.focus();
              this.validacionSerial = true;


            }
          });



        }

      })
    }


  }





  limpiar() {
    this.contador = 0;
    this.Serial = "";
    this.miInput.nativeElement.disabled = false;
    this.miInput.nativeElement.focus();

  }

  limpiarMac() {
    this.mac = "";
    this.miInputRef.nativeElement.disabled = false;
    this.miInputRef.nativeElement.focus();
  }

  focusSerialInicio(){
    this.miInput.nativeElement.focus();
  }

  vaciar() {
    this.mac = "";
    this.Serial = "";
    this.referenciaText = "";
    this.categoria = "";
    this.categoria = "";
    this.bodega = "";
    this.textArea = "";
  }

  filtroLimpiar(evento: any){

    const selectedIndex = evento.options[evento.selectedIndex].text;

    if(selectedIndex == "Filtrar todo"){

      this.ngOnInit();

      this.buscarActivos = ""
      this.fechaReporte = false;

    }else if(selectedIndex == "fecha/bodega"){
      this.fechaReporte = true;
    }else{
      this.fechaReporte = false;
    }



  }


  generateExcelReport() {

    Swal.fire({
      title: 'Generar Informe',
      text: '¿Estas seguro de generar un informe?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'bg-dark',
        title: 'text-white',
        htmlContainer: 'text-white'
      }
    }).then((result) => {

      if (result.isConfirmed) {


        const datosReporte:any[] = this.activosFijosInventario;

        const datosReporteSinIdActivoFijo = datosReporte.map(item => {
          // Copia el objeto para evitar modificar el objeto original
          const newItem = { ...item };
          // Elimina la propiedad idactivoFijo si existe
          delete newItem.idactivoFijo;
          delete newItem.servicio_Cliente;
          return newItem;
        });

        // Obtén la hoja de cálculo generada
        /* const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tableOntsActivosFijos')); */

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosReporteSinIdActivoFijo);

        // Define un estilo para las columnas (ancho y espacio)
        const columnStyles = [
        // Primera columna (A), ancho 20 (en unidades por defecto, aproximadamente 8.43 caracteres)
        { width: 20 , color: 'red'},
        // Segunda columna (B), ancho 30
        { width: 15 },
        // Tercera columna (C), ancho 40
        { width: 15 },

        { width: 20 },

        { width: 20 },

        { width: 20 },

        { width: 20 },

        { width: 20 },

        { width: 20 },

        { width: 20 },

        { width: 20 },

        { width: 30 },

        { width: 30 },
        ];

        const colInfo = { wch: 20 }; // Esto define el ancho de la columna en unidades de caracteres (20 caracteres en este caso)

        // Aplica los estilos de ancho de columna a la hoja
        columnStyles.forEach((style, columnIndex) => {
        const col = XLSX.utils.encode_col(columnIndex); // Convierte el índice a la letra de la columna
        if (!ws['!cols']) {
          ws['!cols'] = [];
        }
         ws['!cols'].push({ ...colInfo, ...style });
        });

        // Crea un libro de Excel y agrega la hoja con los estilos
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'InformeInventarioActivosFijos');

        // Guarda el archivo Excel
        XLSX.writeFile(wb, 'InformeInventarioActivosFijos.xlsx');
      }


    })

  }








}
