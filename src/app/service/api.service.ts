import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cusUrl: string = 'https://localhost:7138/api/Customer/customer/'
  private Url : string = 'https://localhost:7138/api/Ticket/tickets';
  private baseUrl: string = 'https://localhost:7138/api/Staff/';
  private pendingUrl: string ='https://localhost:7138/api/Ticket/pendingtickets';
  private ongoingUrl: string = 'https://localhost:7138/api/Ticket/ongoingtickets';
  private resolvedUrl: string='https://localhost:7138/api/Ticket/resolvedtickets'
  constructor(private http: HttpClient) { }

  getStaffs() {
    return this.http.get<any>(this.baseUrl)
  }

  getTickets(){
    return this.http.get<any>(this.Url)
  }

  getCustomerById(id: any){
    return this.http.get<any>(this.cusUrl + id)
  }
  getStaffById(id: any){
    // https://localhost:7138/api/Staff/staff/8
    return this.http.get<any>(`${this.baseUrl}staff/`+ id)
  }
  getPendingTickets(){
    return this.http.get<any>(this.pendingUrl)
  }
  getOngoingTicket(){
    return this.http.get<any>(this.ongoingUrl)
  }
  getResolvedTickets(){
    return this.http.get<any>(this.resolvedUrl)
  }
}
