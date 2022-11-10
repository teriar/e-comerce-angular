import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { CoffeServiceService } from '../coffeService/coffe-service.service';
import { LoginService } from '../coffeService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

formulario:FormGroup = this.fb.group({
  correo:['',[Validators.required, ]],
  password:['',[Validators.required]]
})
invalid:string = "";
loginFalse:boolean=false
  constructor(private fb:FormBuilder, 
    private loginService:LoginService,
     private router:Router,
     private cooffeService:CoffeServiceService) { }

  enviar(){
    if(!this.formulario.valid){
      
          this.invalid = "ng-invalid ng-dirty";
        
          return;
    }
       
     this.loginService.loginBackend(this.formulario.value).subscribe(resp=>{
                     if(resp.token){
                      localStorage.setItem('token', resp.token);
                      localStorage.setItem('rol',resp.usuario.rol);
                      localStorage.setItem('id',resp.usuario.uid )
                      this.cooffeService.logeo=true;
                      this.router.navigate(['./listado']).then(() => {
                        window.location.reload();
                      });;
                     }
     }, err=>{
      
      this.loginFalse=true;
     })
      
     ;


  }

}
