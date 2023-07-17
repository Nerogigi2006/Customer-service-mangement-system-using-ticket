import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { StaffsService } from 'src/app/service/staffs.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit{
  ticketForm!:FormGroup
  @ViewChild('myModal') myModal: any;
  openModal() {
    this.myModal.nativeElement.showModal();
  }

  constructor(private auth: StaffsService,private fb : FormBuilder,private http: HttpClient,private snackbar:SnackbarService){

  }
  customerTickets: any;
  ngOnInit(){
    let customerId = localStorage.getItem('UserId')
    const fullName =  `${localStorage.getItem('CustomerFName')}` + '' + `${localStorage.getItem('CustomerLName')}`
    console.log(fullName, 'FULL')
    this.auth.getTicketByCustomerId(customerId).subscribe((res: any) =>{
    this.customerTickets = res;
    console.log(this.customerTickets, 'this.customerTickets')
    })
    this.ticketForm = this.fb.group({
      subject:['',Validators.required],
      description:['',Validators.required],
      customerName:['',Validators.required],
      staffName:['',Validators.required],
      customerId:['',Validators.required]
    })
  }

  createTicket(){
    const fullName =  `${localStorage.getItem('CustomerFName')}` + ' ' + `${localStorage.getItem('CustomerLName')}`
    console.log(fullName, 'FULL')
    this.ticketForm.value.createdAt = new Date();
    this.ticketForm.value.customerId = localStorage.getItem('UserId');
    this.ticketForm.value.customerName = fullName;

    console.log(this.ticketForm.value, 'FTHI')
    if(this.ticketForm){
      this.auth.createTicket(this.ticketForm.value)
      .subscribe({
        next:(res=>{
          console.log(res, 'TICKET RES')
          // this.ticketForm.reset()
          this.ngOnInit();
          this.snackbar.showSuccessMessage(res.message);
        }),
          error: (err=>{ 
          alert(err?.error.message);
        })
      })
    }
  }
}
