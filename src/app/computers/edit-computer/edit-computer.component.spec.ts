import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComputerComponent } from './edit-computer.component';
import { ComputerService } from 'src/app/services/computer.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';
import { Computer } from 'src/app/model/computer.model';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;

  let compuertSvcSpy = jasmine.createSpyObj<ComputerService>('ComputerService',[
    'editComputer',
    'getComputerById'
  ])

  let activatedRouterSpy = jasmine.createSpyObj<ActivatedRoute>(
    'ActivatedRouter',
    ['params']
  )

  let routerSpy = jasmine.createSpyObj<Router>(
    'Router', ['navigate']
  )
  
    activatedRouterSpy.params = NEVER;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComputerComponent ],
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
         {provide: ComputerService, useValue: compuertSvcSpy},
         {provide: ActivatedRoute, useValue: activatedRouterSpy},
         {provide: Router, useValue: routerSpy}
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with params', () => {
    activatedRouterSpy.params = of({ id: 1 });

    const computer: Computer = { id: 1, brand: 'Asus', model: 'A7' };

    compuertSvcSpy.getComputerById.and.returnValue(of(computer));

    component.formComputer?.patchValue(computer);

    expect(component.formComputer?.value.brand).toEqual(computer.brand);
    expect(component.formComputer?.value.model).toEqual(computer.model);
    expect(component.formComputer).toBeTruthy();
  });

  it('edit computer ok', ()=>{
    let data = {
      id:1,
      model:'HP',
      brand:'Lenovo'
    }
    compuertSvcSpy.editComputer.and.returnValue(of(data));
    component.editComputer()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  })

  it('edit computer ok', ()=>{
    spyOn(window,'alert');
    compuertSvcSpy.editComputer.and.returnValue(throwError(()=>{'Error'}));
    component.editComputer()
    expect(window.alert).toHaveBeenCalledWith('Lo sentimos, hubo un error');
  })

});
