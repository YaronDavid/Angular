import { TestBed, inject } from '@angular/core/testing';

import { ComputerService } from './computer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputerService', () => {
  let service: ComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ComputerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http get ok computers', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const obs = service.getComputers();
    expect(obs instanceof Observable). toBeTrue();

    obs.subscribe({
      next:(val)=>{
        expect(val).toBeDefined();
        expect(val.length).toBe(1);
        const first = val[0];
        expect(first.id).toBe(1)
        expect(first.brand).toBe('HP')
        expect(first.model).toBe('Pavilon')
      }
    });

    const request = httpMock.expectOne('http://localhost:3000/computers');
    expect(request.request.method).toBe('GET');
    request.flush([{
      id:1,
      brand: 'HP',
      model: 'Pavilon'
    }])
  }
  ));

  it('should http get error computers', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const obs = service.getComputers();
    expect(obs instanceof Observable). toBeTrue();

    obs.subscribe({
      error: (err) => {
          expect(err.error.type).toBe('computers not found');
      },
    });

    const request = httpMock.expectOne('http://localhost:3000/computers');
    expect(request.request.method).toBe('GET');
    request.error(new ErrorEvent('computers not found'));
  }
  ));

  it('should http post ok save computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const comp = {
      brand: "HP",
      model: "Pavilon"
    } as Computer
    const obs = service.saveComputers(comp);
    expect(obs instanceof Observable). toBeTrue();

    obs.subscribe({
      next:(val)=>{
        expect(val).toBeDefined();
      }
    });

    const request = httpMock.expectOne('http://localhost:3000/computers');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(comp)
    request.flush({})
  }
  ));

  it('should http post error', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const comp = {
      brand: "HP",
      model: "Pavilon"
    } as Computer
    const obs = service.saveComputers(comp);
    expect(obs instanceof Observable). toBeTrue();

    obs.subscribe({
      error:(err)=>{
        expect(err.error.type).toBe('error saving computer');
      }
    });

    const request = httpMock.expectOne('http://localhost:3000/computers');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(comp);
    request.error(new ErrorEvent('error saving computer'));
  }
  ));

  it('should http patch ok update computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const comp = {
      id: 1,
      brand: "Acer",
      model: "M2H12J"
    } as Computer
    const obs = service.editComputer(comp.id,comp);
    expect(obs instanceof Observable). toBeTrue();

    obs.subscribe({
      next:(val)=>{
        expect(val).toBeDefined();
      }
    });

    const request = httpMock.expectOne('http://localhost:3000/computers/'+comp.id);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual(comp)
    request.flush({})
  }
  ));

  it('should http patch error', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const comp = {
      id:1,
      brand: "HP",
      model: "Pavilon"
    } as Computer
    const obs = service.editComputer(comp.id,comp);
    expect(obs instanceof Observable). toBeTrue();

    obs.subscribe({
      error:(err)=>{
        expect(err.error.type).toBe('error updating computer');
      }
    });

    const request = httpMock.expectOne('http://localhost:3000/computers/'+comp.id);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual(comp);
    request.error(new ErrorEvent('error updating computer'));
  }
  ));

  it('should http get ok single computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const id:number = 1;
    const obs = service.getComputerById(id);
    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({
      next:(val)=>{
        expect(val).toBeDefined();
      }
    });

    const request = httpMock.expectOne('http://localhost:3000/computers/'+id);
    expect(request.request.method).toBe('GET');
    request.flush([{
      id:1,
      brand: 'HP',
      model: 'Pavilon'
    }])
  }
  ));

  it('should http get error single computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const id:number = 1;
    const obs = service.getComputerById(id);
    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({
      error:(err)=>{
        expect(err.error.type).toBe('Error getting one computer')
      }
    });

    const request = httpMock.expectOne('http://localhost:3000/computers/'+id);
    expect(request.request.method).toBe('GET');
    request.error(new ErrorEvent('Error getting one computer'))
  }
  ));

  it('should http delete ok computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const id:number = 1;
    const obs = service.deleteComputer(id);
    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({
      next:(val)=>{
        expect(val).toBeDefined();
      }
    });

    const request = httpMock.expectOne('http://localhost:3000/computers/'+id);
    expect(request.request.method).toBe('DELETE');
    request.flush([{
      id:1,
      brand: 'HP',
      model: 'Pavilon'
    }])
  }
  ));

  it('should http get error single computer', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const id:number = 1;
    const obs = service.deleteComputer(id);
    expect(obs instanceof Observable).toBeTrue();

    obs.subscribe({
      error:(err)=>{
        expect(err.error.type).toBe('Error deletting computer')
      }
    });

    const request = httpMock.expectOne('http://localhost:3000/computers/'+id);
    expect(request.request.method).toBe('DELETE');
    request.error(new ErrorEvent('Error deletting computer'))
  }
  ));

});
