import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-reassginstaff',
  templateUrl: './reassginstaff.component.html',
  styleUrls: ['./reassginstaff.component.css']
})
export class ReassginstaffComponent implements OnInit {
  @ViewChild('myModal') myModal: any;
  public Staffs:any = []; 
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.getStaffs()
    .subscribe(res=>{
      this.Staffs = res;
      console.log(res, "staff details");
    })
  }
  
}
