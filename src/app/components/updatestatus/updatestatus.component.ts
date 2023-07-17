import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { AssignStaffService } from 'src/app/service/assign-staff.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { StaffsService } from 'src/app/service/staffs.service';

@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.component.html',
  styleUrls: ['./updatestatus.component.css'],
  providers:[DatePipe]
})
export class UpdatestatusComponent implements OnInit {
  @ViewChild('myModal') myModal: any;
  Status = ["Pending", 'Ongoing', "Resolved"]
  ticketForm!:any;
  staffDetails: any;
  customerDetails: any;
  ticketRes: any;
  constructor(private staff : StaffsService, private dataePipe: DatePipe, private fb:FormBuilder,private ticketService:AssignStaffService, private api:ApiService, private snackbar: SnackbarService){
    this.ticketForm = this.fb.group({
      ticketId: [''],
      createdAt: [''],
      customerId: [''],
      customerName:[''],
      description: [''],
      id: [''],
      staffId: [''],
      staffName:[''],
      status: [''],
      subject: [''],
    })
  }
  staffTickets:any;
  ngOnInit(): void {
    let staffId = localStorage.getItem('StaffId')
    this.staff.getTicketByStaffId(staffId).subscribe(res=>{
      this.staffTickets= res;
      console.log(this.staffTickets, 'this.Tickets')
    })
  }
  updatestatus(staffticket: any){
    this.myModal.nativeElement.showModal();
    console.log(staffticket)
    this.api.getStaffById(staffticket.staffId).subscribe((res: any) =>{
      this.staffDetails = res;
      console.log(this.staffDetails, 'STAFF DETAILS')
    })
    this.api.getCustomerById(staffticket.customerId).subscribe((res: any) =>{
      this.customerDetails = res; 
    })
    this.ticketForm.patchValue({
      ticketId: staffticket.ticketId,
      createdAt: this.dataePipe.transform(staffticket.createdAt),
      customerId: staffticket.customerId,
      customerName: staffticket.customerName,
      description: staffticket.description,
      id: staffticket.id,
      staffId: staffticket.staffId,
      staffName: staffticket.staffName,
      status: staffticket.status,
      subject: staffticket.subject
    });
    console.log(this.ticketForm.value, 'TICKETS DETAILS FORM,')
    console.log(staffticket, 'TICKETS DETAILS')
  };
  updateTicket(){
    {
      console.log(this.ticketForm.value)
      this.ticketForm.value.createdAt = new Date(this.ticketForm.value.createdAt)
      this.ticketService.updateTicket(this.ticketForm.value.ticketId, this.ticketForm.value).subscribe((data: any) =>{
    this.ticketRes = data;
    console.log(this.ticketRes,'UPDATE' )
    this.ngOnInit()
    this.snackbar.showSuccessMessage(data.message);
      })
    }
  }
 

}
