import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { login } from '../interfaces/login.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


baseUrl:string = environment.restcoffe;
 header = { 'content-type': 'application/json'};
  constructor(private http:HttpClient) { }


loginBackend(body:login):Observable<any>{


  
  const envio = JSON.stringify(body);
 
 return this.http.post(`${this.baseUrl}/api/auth/login`,envio,{headers:this.header})

}


verificaAutenticacion (){
  if(!localStorage.getItem('token') ){
    return false
  }
 const rol = localStorage.getItem('rol');
 if(rol != 'ADMIN_ROLE'){
  return false;
 }
  return true
}


}
