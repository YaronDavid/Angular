import { Component } from '@angular/core';
import { ComputerService } from '../services/computer.service';
import { Computer } from '../model/computer.model';
import { MatTableDataSource } from "@angular/material/table";
import { Router } from '@angular/router';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent {

  computers = new MatTableDataSource<Computer>();
  displayedColumns = ['id', 'brand', 'model', 'actions']

  constructor(private computerSVC: ComputerService){
    this.loadData()
  }

  loadData(){
    this.computerSVC.getComputers().subscribe({
      next:(list) => {
        this.computers.data = list;
      },
      error: (err) => {
        alert("Lo sentimos, hubo un error")
      }
    })
  }

  deleteComputer(item: Computer){
    this.computerSVC.deleteComputer(item.id).subscribe({
      next:()=>{
        this.loadData();
      },
      error:()=>{
        alert("Lo sentimos algo no salio bien")
      }
    })
  }
}
