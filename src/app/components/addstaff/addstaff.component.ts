import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { StaffsService } from 'src/app/service/staffs.service';

@Component({
  selector: 'app-login',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.css']
})
export class AddstaffComponent implements OnInit {
    type: string ="password"
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";
    AddstaffForm!: FormGroup;

    constructor(private fb: FormBuilder, private staff:StaffsService, private snackbarService: SnackbarService){
    }
  ngOnInit(): void {
    this.AddstaffForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      username:['',Validators.required],
      email:['',Validators.required],
      profilePicturePath:['',Validators.required],
      password:['',Validators.required],
      role:[''],
      token:[''],
    })
  }

    hideShowPass(){
      this.isText = !this.isText
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password"
    }

    onAddstaff() {
      if (this.AddstaffForm.valid) {
        console.log(this.AddstaffForm.value);
    
   
this.AddstaffForm.value.profilePicturePath = this.AddstaffForm.value.profilePicturePath
.slice(this.AddstaffForm.value.profilePicturePath.indexOf('fakepath'))
.replace('fakepath\\', 'assets/images/');
        // Send obj to the database
        this.staff.onAddstaff(this.AddstaffForm.value).subscribe({
          next: (res) => {
            this.snackbarService.showSuccessMessage(res.message);
            this.AddstaffForm.reset()
          },
          error: (err) => {
            console.log(err);
            this.snackbarService.showErrorMessage(err.error.message);
            
          }
        });
      } else {
        ValidateForm.validateAllFormFields(this.AddstaffForm);
        this.snackbarService.showErrorMessage('fill in your details');
      }
    }
}