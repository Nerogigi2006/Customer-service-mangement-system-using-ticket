import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignStaffService {
  private apiUrl = 'https://localhost:7138/api/Ticket'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }


  
  updateTicket(ticketId: string, ticketData: any): Observable<any> {
    const url = `${this.apiUrl}/updateticket/${ticketId}`;
    return this.http.put<any>(url, ticketData);
  }

}
