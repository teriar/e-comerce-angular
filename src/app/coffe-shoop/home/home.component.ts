import { Component, OnInit,SimpleChanges } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
 
  
  `]
})
export class HomeComponent implements OnInit {


 front:string[] = ['Angular','PrimeNG','PrimeFLex','Typescript'];
 backend:string[] = ['Nodejs', 'Cloudinary'];
 ciCD:string[]=['Git','Heroku'];
  display :boolean = false;
  carrito:boolean=false;
  items!:MenuItem[];
  actualizarCarro=0;
  login:boolean=true;
  administrador:boolean = false;
  constructor() { }

  ngOnInit(): void {
   
   if(localStorage.getItem('token')){
      this.login=false;
   }
    if( localStorage.getItem('rol') ==='ADMIN_ROLE'){
      this.administrador = true;
    }



    this.items=[
     {
        label:'Informacion',
        command:(click) =>{
          this.display=true;
        },
        icon:'pi pi-info-circle'
        
      },
      {
        label:'Productos',
        icon:'pi pi-shopping-bag',
        routerLink:'listado'
      },
      {
        label:'Carro de Compra',
        icon:'pi pi-shopping-cart',
        command:(click) =>{
          this.carrito=true;
          this.actualizarCarro = this.actualizarCarro + 1;
        }
      },
      {
        label:'Login',
        icon:'pi pi-user',
        routerLink:'login',
        visible:this.login
      },
      {
        label:'logout',
        icon:'pi pi-user-minus',
        visible:!this.login,
        command:(click)=>{
          localStorage.clear();
          location.reload();
        }
      },
      {
        label:'Nuevo Producto',
        visible:this.administrador,
        routerLink:'NuevoProducto'
      }


    ]


  }
  ngOnChanges(changes: SimpleChanges) {
    if(localStorage.getItem('token')){
      this.login=false;
   }
  }
}
