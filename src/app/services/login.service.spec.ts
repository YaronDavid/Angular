import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { LoginRequest, LoginResponse } from '../model/login.model';
import { Observable } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http post ok ', inject(
    [HttpTestingController], 
    (httpMock: HttpTestingController)=>{
      const req = {
        email: 'correo@ejemplo',
        password: 'pass1234'
      } as LoginRequest
      const obs = service.login(req);
      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        next: (response) =>{
          expect(response).toBeDefined();
          expect(response.token).toBe('token1234')
        }
      });
      const request = httpMock.expectOne('https://reqres.in/api/login');
      expect(request.request.body).toEqual(req);
      expect(request.request.method).toBe('POST');
      const resToken = {
        token: 'token1234'
      } as LoginResponse;
      request.flush(resToken);


    }
    ));
    it('should return error ', inject(
      [HttpTestingController], 
      (httpMock: HttpTestingController)=>{
        const req = {
          email: 'correo_invalido@ejemplo',
          password: 'pass1234'
        } as LoginRequest
        const obs = service.login(req);
        expect(obs instanceof Observable).toBeTrue();
        obs.subscribe({
          error:(err)=>{
            expect(err.error.type).toBe('user not found');
          }
        });
        const request = httpMock.expectOne('https://reqres.in/api/login');
        expect(request.request.body).toEqual(req);
        expect(request.request.method).toBe('POST');
        request.error(new ErrorEvent('user not found'));  
      }
      ));
});
