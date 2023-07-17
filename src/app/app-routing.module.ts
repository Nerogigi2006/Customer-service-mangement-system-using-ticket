import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import{SidenavComponent} from './components/sidenav/sidenav.component';
import {AddstaffComponent} from './components/addstaff/addstaff.component'
import { ticketsGuard } from './guard/tickets.guard';
import { ReassginstaffComponent } from './components/reassginstaff/reassginstaff.component';
import { LogincustomerComponent } from './components/logincustomer/logincustomer.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { ViewticketComponent } from './components/viewticket/viewticket.component';
import { UpdatestatusComponent } from './components/updatestatus/updatestatus.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'logincustomer', component: LogincustomerComponent},
    {path:'signup', component: SignupComponent},
    {path:'userdashboard', component: UserdashboardComponent},
    {path:'viewticket', component: ViewticketComponent},
    {path:'updatestatus', component:UpdatestatusComponent},
    { path:'dashboard', component: DashboardComponent,canActivate:[ticketsGuard]},
    { path:'sidenav', component: SidenavComponent,canActivate:[ticketsGuard]},
    { path:'addstaff', component:  AddstaffComponent, canActivate:[ticketsGuard]},
    {path:'viewstaff', component: ReassginstaffComponent, canActivate:[ticketsGuard]}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }