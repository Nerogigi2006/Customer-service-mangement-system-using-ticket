import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddstaffComponent } from './components/addstaff/addstaff.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { ReassginstaffComponent } from './components/reassginstaff/reassginstaff.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { LogincustomerComponent } from './components/logincustomer/logincustomer.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { ViewticketComponent } from './components/viewticket/viewticket.component';
import { UpdatestatusComponent } from './components/updatestatus/updatestatus.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidenavComponent,
    AddstaffComponent,
    ReassginstaffComponent,
    LogincustomerComponent,
    SignupComponent,
    UserdashboardComponent,
    ViewticketComponent,
    UpdatestatusComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatSnackBarModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
     multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
