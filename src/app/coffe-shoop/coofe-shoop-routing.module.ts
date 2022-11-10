import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListadoComponent } from './listado/listado.component';
import { LoginGuardGuard } from './login-guard.guard';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';


  const routes:Routes=[
    {
      path:'',
      component:HomeComponent,
      children:[
        {
          path:'listado',
          component:ListadoComponent
        },
        {
          path:'producto/:id',
          component:ProductoComponent,
          canLoad:[LoginGuardGuard],
          canActivate:[LoginGuardGuard]
        },
        {
           path:'NuevoProducto',
           component:ProductoComponent,
           canLoad:[LoginGuardGuard],
           canActivate:[LoginGuardGuard]
        },
        {
          path:'login',
          component:LoginComponent
        },
        {
          path:'**',
          redirectTo:''
        }
      ]
      
    }
  ]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class CoofeShoopRoutingModule { }
