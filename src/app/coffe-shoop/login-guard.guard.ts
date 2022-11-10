import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './coffeService/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate, CanLoad {

 constructor(private loginService:LoginService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('dsa')
      if(!this.loginService.verificaAutenticacion()){
        return false;
      }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      console.log('dsa')
      if(!this.loginService.verificaAutenticacion()){
        return false;
      }


    return true;
  }
}
