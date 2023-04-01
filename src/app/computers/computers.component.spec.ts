import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersComponent } from './computers.component';
import { ComputerService } from '../services/computer.service';
import { MatTableModule } from '@angular/material/table';
import { Observable, of, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { Computer } from '../model/computer.model';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>('ComputerService', [
    'getComputers',
    'deleteComputer'
  ])

  computerSvcSpy.getComputers.and.returnValue(of([]))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputersComponent ],
      imports:[
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ComputerService, useValue: computerSvcSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load data ok', () =>{
    const mockResponse: Computer[] = [
      {
        id:1,
        brand:"HP",
        model:"Palomo"
      },
      {
        id:2,
        brand:"Lenovo",
        model:"Pamino"
      }
    ]
    computerSvcSpy.getComputers.and.returnValue(of(mockResponse));
    component.loadData();
    expect(component.computers.data.length).toBe(2);
    expect(component.computers.data[0].brand).toBe('HP');
    expect(component.computers.data[1].brand).toBe('Lenovo');
  })
  it('load data error', () =>{
    const mockResponse: Computer[] = [
      {
        id:1,
        brand:"HP",
        model:"Palomo"
      },
      {
        id:2,
        brand:"Lenovo",
        model:"Pamino"
      }
    ]
    spyOn(window, 'alert')
    computerSvcSpy.getComputers.and.returnValue(throwError(()=>{'Error'}));
    component.loadData();
    expect(window.alert).toHaveBeenCalledWith('Lo sentimos, hubo un error');
  });

  it('delete computer ok', ()=>{
    const loadDataSpy = spyOn(component, 'loadData');
    let data = {
      id: 1, brand: 'HP', model: 'Pavilion'
    };
    computerSvcSpy.deleteComputer.and.returnValue(of({}));
    component.deleteComputer(data);
    expect(computerSvcSpy.deleteComputer).toHaveBeenCalledWith(1);
    expect(loadDataSpy).toHaveBeenCalled();
  })

  it('delete computer ok', ()=>{
    const loadDataSpy = spyOn(component, 'loadData');
    let data = {
      id: 1, brand: 'HP', model: 'Pavilion'
    };
    computerSvcSpy.deleteComputer.and.returnValue(of({}));
    component.deleteComputer(data);
    expect(computerSvcSpy.deleteComputer).toHaveBeenCalledWith(1);
    expect(loadDataSpy).toHaveBeenCalled();
  })

  it('delete computer error', ()=>{
    spyOn(window,'alert')
    const loadDataSpy = spyOn(component, 'loadData');
    let data = {
      id: 1, brand: 'HP', model: 'Pavilion'
    };
    computerSvcSpy.deleteComputer.and.returnValue(throwError(()=>{'Error'}));
    component.deleteComputer(data);
    expect(computerSvcSpy.deleteComputer).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalled();
  })

});
