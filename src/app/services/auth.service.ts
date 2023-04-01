import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private utilSVC: UtilService, private router: Router) { }

  canActivate() {

    const isLogged = Boolean(this.utilSVC.getToken());
    if(!isLogged){
      this.router.navigate(["login"]);
    }
    return isLogged;
  }
}
