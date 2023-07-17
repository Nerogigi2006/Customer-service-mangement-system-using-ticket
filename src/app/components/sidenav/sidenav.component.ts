import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { StaffsService } from 'src/app/service/staffs.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSidenav) sideNav!: MatSidenav

  public fullName : string = "";
  public image : string = "";
  public role! : string
  constructor(private observer: BreakpointObserver, private cd : ChangeDetectorRef, private tickets: StaffsService, private userStore: UserStoreService ){

  }
  ngOnInit(): void {
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken = this.tickets.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
    this.userStore.getImageFromStore()
    .subscribe(val=>{
      let imageFromToken = this.tickets.getImageFromToken();
      this.image = val || imageFromToken;
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.tickets.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }
  ngAfterViewInit(): void {
      this.sideNav.opened = true;
      this.observer.observe(['(max-width:800px)'])
      .subscribe((res)=>{
        if(res?.matches){
          this.sideNav.mode="over";
          this.sideNav.close();
        }else{
          this.sideNav.mode="side"
          this.sideNav.open();
        }
      })
      this.cd.detectChanges();

  }

  logout(){
    this.tickets.signout();
  }

}
