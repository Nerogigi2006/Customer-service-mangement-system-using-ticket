import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class StaffsService {
  private reassignUrl: string ="https://localhost:7138/api/Ticket/"
  private baseUrl : string ="https://localhost:7138/api/Staff"
  private Url : string = "https://localhost:7138/api/Customer"
  private ticketUrl : string = "https://localhost:7138/api/Ticket"
  private userPayload:any;
  constructor(private http : HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
   }


   getTicketByCustomerId(customerId: any){
    return this.http.get('https://localhost:7138/api/Ticket/tickets/customer/' + customerId)
   }
   
   getTicketByStaffId(staffId: any){
    return this.http.get('https://localhost:7138/api/Ticket/tickets/staff/' + staffId)
   }
  onAddstaff(staffObj:any){
    return this.http.post<any>(`${this.baseUrl}/register`,staffObj)
  }
  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}/authenticate`,loginObj)
  }

  onSignup(userObj:any){
    return this.http.post<any>(`${this.Url}/signup`,userObj)
  }
  // createTicket(userObj:any){
  //   return this.http.post<any>(`${this.ticketUrl}/addtickets`,userObj)
  // }
  createTicket(ticketObj: any) {
    return this.http.post<any>(`${this.ticketUrl}/addtickets`, ticketObj);
  }
  
  onLoginuser(loginuserObj:any){
    return this.http.post<any>(`${this.Url}/authenticate`,loginuserObj)
  }

  signout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }

  getImageFromToken(){
    if(this.userPayload){
      return this.userPayload.image;
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }
}
