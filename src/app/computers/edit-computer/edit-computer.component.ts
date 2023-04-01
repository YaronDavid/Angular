import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css']
})
export class EditComputerComponent {
  
  computerId: number = 0;
  formComputer ?: FormGroup

  constructor(private fb: FormBuilder, private computerSVC: ComputerService, private router:Router, private route: ActivatedRoute){
    this.formComputer = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
    });
    this.route.params.subscribe({
      next:(params)=>{
        this.computerId = params['id'];
        this.computerSVC.getComputerById(params['id']).subscribe({
          next:(data)=>{
            this.formComputer?.patchValue({
              brand: data.brand,
              model: data.model
            })
          }
        })
      }
    });
    
  }

  editComputer(){
    let data = this.formComputer?.value as Computer
    this.computerSVC.editComputer(this.computerId, data).subscribe({
      next:() => {
        this.router.navigate(["/computers"]);
      },
      error:()=>{
        alert("Lo sentimos, hubo un error");
      }
    })
  }

}
