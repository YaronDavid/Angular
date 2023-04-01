import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { LoginService } from '../services/login.service';
import { LoginRequest } from '../model/login.model';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin?: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginSVC: LoginService, private router: Router,
    private utilSVC: UtilService) {

    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginClick(){
    this.isLoading = true;
    const req = this.formLogin?.value as LoginRequest;
    this.loginSVC.login(req).subscribe({
      next: (response) => {

        this.utilSVC.saveToken(response.token)
        this.router.navigate(["home"])
      },
      error: (err) => {

        this.isLoading = false;
        
      },
      complete: () => {

        this.isLoading = false;
        
      }
    });

  }
}
