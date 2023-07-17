import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { StaffsService } from 'src/app/service/staffs.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-logincustomer',
  templateUrl: './logincustomer.component.html',
  styleUrls: ['./logincustomer.component.css']
})
export class LogincustomerComponent implements OnInit {
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  logincustomerForm!: FormGroup;

    constructor(private fb : FormBuilder,
      private auth : StaffsService,
      private snackbarService: SnackbarService,
      private router: Router,
      private user: UserStoreService){
    }
    customerTickets: any;
  ngOnInit(): void {
    this.logincustomerForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
// let customerId = localStorage.getItem('UserId')
//     this.auth.getTicketByCustomerId(customerId).subscribe((res: any) =>{
// this.customerTickets = res;
//     })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }

  onLoginuser(){
    if(this.logincustomerForm.valid){
      this.auth.onLoginuser(this.logincustomerForm.value)
      .subscribe({
        next:(res=>{
          localStorage.setItem('UserId', res.customer.id)
          localStorage.setItem('CustomerFName', res.customer.firstName)
          localStorage.setItem('CustomerLName', res.customer.lastName)
          // localStorage.setItem('UserDetails', res.customer)
          console.log(res, 'RES')
          this.snackbarService.showSuccessMessage(res.message)
          this.logincustomerForm.reset()
          this.router.navigate(["userdashboard"])
        })
        
      })
    }
    else{

    }
  }


}
