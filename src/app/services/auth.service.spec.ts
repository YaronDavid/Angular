import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  let utilSpySVC = jasmine.createSpyObj<UtilService>('UtilService',['getToken'])
  let routerSpy: jasmine.SpyObj<Router>
  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router',['navigate'])

    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule.withRoutes([{
          path: 'login',
          redirectTo: ''
        }])
      ],
      providers:[
        {provide: UtilService, useValue: utilSpySVC},
        {provide: Router, useValue: routerSpy}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should can activate user logged in', () =>{
    utilSpySVC.getToken.and.returnValue('token')
    expect(service.canActivate()).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should can activate user not logged in', () =>{
    utilSpySVC.getToken.and.returnValue(null)
    expect(service.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login'])
  });
});
