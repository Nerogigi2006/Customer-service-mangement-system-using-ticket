import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSidenav) sideNav!: MatSidenav
  pending: any=[];
  ongoing: any =[];
  resolved: any=[];
  Tickets: any=[];
  customerDetails: any;
  staffDetails: any;
  tableData: any;

  constructor( private api: ApiService  ){

  }
  requestedUser: any;
  length: any;
  ngOnInit(): void {

   

    this.api.getPendingTickets().subscribe(res=>{
      this.pending = res
      // console.log(res)
    })
    this.api.getOngoingTicket().subscribe(res=>{
      this.ongoing =res
      // console.log(res)
    })
    this.api.getResolvedTickets().subscribe(res=>{
      this.resolved = res;
    })

    this.api.getTickets().subscribe(res => {
      this.Tickets = res;
      console.log(this.Tickets, 'this.Tickets')
      this.length = res.length;
    
      this.Tickets.forEach((ticket: any) => {
        const requestedUser = ticket.customerId;
        console.log(requestedUser, 'CUSTOMER IDs--');
    
        this.api.getCustomerById(requestedUser).subscribe((res: any) => {
          this.customerDetails = res.lastName;
          console.log(this.customerDetails, 'CUSTOMER NAME');
        });
      });
    });
    
    
  }

}
