import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UtilService } from './services/util.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';

@Component({
  selector: 'login',
  template: '<span>Login</span>'
})
class MockLoginComponent{}

describe('AppComponent', () => {
  let routerSpy = jasmine.createSpyObj<Router>('Router',['navigate']);
  let utilSVCSpy = jasmine.createSpyObj<UtilService>('UtilService',[
    'getToken',
    'deleteToken',
    'isLogged'
  ]);
  utilSVCSpy.isLogged = new Subject<boolean>()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login', 
            component: MockLoginComponent
          }
      ]),
        MatToolbarModule,
        MatIconModule,

      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: UtilService, useValue: utilSVCSpy },
        { provide: Router, useValue: routerSpy}
      ]
    }).compileComponents();

    
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-2023'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-2023');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('Curso Angular 2023');
  });

  it('should create app with user logged in', () => {
    utilSVCSpy.getToken.and.returnValue('token');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBeTrue()
  });

  it('should create app with user not logged in', () => {
    utilSVCSpy.getToken.and.returnValue(null);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBeFalse()
  });

  it('should recieve isLogged from UtilSvc true', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    utilSVCSpy.isLogged.next(true)
  });

  it('should logout', () =>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(utilSVCSpy.deleteToken).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login'])
  })
  
});
