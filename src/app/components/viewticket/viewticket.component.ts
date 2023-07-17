import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { AssignStaffService } from 'src/app/service/assign-staff.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.css'],
  providers: [DatePipe]
})
export class ViewticketComponent implements OnInit{
  @ViewChild('myModal') myModal: any;
  @ViewChild('staffSelect') staffSelect:any;
  Status = ["Pending", 'Ongoing', "Resolved"]
  ticketForm!: FormGroup;
  customerDetails: any;
  staffdes: any=[];
  constructor(private api : ApiService, private fb: FormBuilder, private dataePipe: DatePipe, private ticketService: AssignStaffService, private snackbar: SnackbarService){
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

  public staffs: any;
  staffDetails: any;
  public Tickets:any = []; 
  assignStaff(ticket: any){
    this.myModal.nativeElement.showModal();
    
    this.api.getStaffs().subscribe(res =>{
      this.staffs = res
    })

    this.api.getCustomerById(ticket.customerId).subscribe((res: any) =>{
      this.customerDetails = res; 
    })
    this.ticketForm.patchValue({
      ticketId: ticket.ticketId,
      // createdAt: ticket.createdAt,
      createdAt: this.dataePipe.transform(ticket.createdAt),
      customerId: ticket.customerId,
      customerName: ticket.customerName,
      description: ticket.description,
      id: ticket.id,
      staffId: ticket.staffId,
      staffName: ticket.staffName,
      status: ticket.status,
      subject: ticket.subject
    });
  
  console.log(this.ticketForm.value, 'TICKETS DETAILS FORM,')
  console.log(ticket, 'TICKETS DETAILS')
 }

 selectedStaff: any;
 customer: any;
 selectedCustomer: any;

sendStaffToLocalStorage(staff: any){
  this.api.getStaffById(staff).subscribe((data: any) =>{

    const staffName = data[0].firstName + ' ' + data[0].lastName;
    if(staff){
      localStorage.setItem('selectedStaff', staffName )
    }else{
      localStorage.removeItem('selectedStaff')
    }

    console.log(data[0].firstName, 'STAFFDET')
console.log(staff, 'STAFF')
console.log(this.selectedStaff, 'STAFF')
  })

}

 // Assuming this array contains staff objects with properties firstName, lastName, and id


 
 ngOnInit(): void {
  this.api.getStaffs().subscribe(res =>{
    this.staffs = res;
    console.log(this.staffs, 'STAFFS')
  })
  this.api.getTickets()
  .subscribe(res =>{
    this.Tickets= res;
  })
}
staffName: any;




ticketRes: any;
updateTicket(){
  {

    
    this.ticketForm.value.createdAt = new Date(this.ticketForm.value.createdAt)
    this.ticketForm.value.staffName = localStorage.getItem('selectedStaff')
    this.ticketService.updateTicket(this.ticketForm.value.ticketId, this.ticketForm.value).subscribe((data: any) =>{
  this.ticketRes = data;
  console.log(this.ticketRes,'UPDATE' )
  this.ngOnInit()
  this.snackbar.showSuccessMessage(data.message);
    })
  }
}
}
function staffIdExists(staffId: any, number: any) {
  throw new Error('Function not implemented.');
}

