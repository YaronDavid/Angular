import { Component } from '@angular/core';
import { UtilService } from './services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-2023';
  isLogged = false;

  constructor(private utilSVC: UtilService, private router: Router){
    this.isLogged = Boolean(utilSVC.getToken());
    this.utilSVC.isLogged.subscribe({
      next: (val) => {
        this.isLogged = val;
      }
    })
  }

  logout(){
    this.utilSVC.deleteToken();
    this.router.navigate(["login"]);
  }


}
