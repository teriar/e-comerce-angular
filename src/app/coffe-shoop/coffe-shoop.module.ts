import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { HomeComponent } from './home/home.component';
import { ListadoComponent } from './listado/listado.component';
import { ProductoComponent } from './producto/producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PagadoComponent } from './pagado/pagado.component';
import { CoofeShoopRoutingModule } from './coofe-shoop-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TarjetaComponent,
    HomeComponent,
    ListadoComponent,
    ProductoComponent,
    CarritoComponent,
    PagadoComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    CoofeShoopRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoffeShoopModule { }
