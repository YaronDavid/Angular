import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputerComponent } from './new-computer.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerService } from 'src/app/services/computer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewComputerComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;

   let routerSpy = jasmine.createSpyObj<Router>('Router',['navigate']);
   let compuertSvcSpy = jasmine.createSpyObj<ComputerService>('ComputerService',[
     'saveComputers'
   ])


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComputerComponent ],
      imports: [
        MatInputModule, MatButtonModule, ReactiveFormsModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'computers', 
            redirectTo: ''
          }
      ])
      ],
       providers: [
         {provide: ComputerService, useValue: compuertSvcSpy}
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not save computer', () =>{
    spyOn(window,'alert')
    component.formComputer?.patchValue({
      id:1,
      model:'HP',
      brand:'Lenovo'
    })
    const data:Object = {
      id:1,
      model:'HP',
      brand:'Lenovo'
    }
    compuertSvcSpy.saveComputers.and.returnValue(of(data))
    component.saveComputer();

  })

  it('should not save computer', () =>{
    spyOn(window,'alert')
    component.formComputer?.patchValue({
      id:1,
      model:'HP',
      brand:'Lenovo'
    })
    compuertSvcSpy.saveComputers.and.returnValue(throwError(()=>{'Error'}))
    component.saveComputer();
    expect(window.alert).toHaveBeenCalled();

  })
});