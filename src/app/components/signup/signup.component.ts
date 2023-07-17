import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { StaffsService } from 'src/app/service/staffs.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: StaffsService, private router: Router, private snackbar: SnackbarService){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }
  onSignup(){
    if(this.signUpForm.valid){
      this.auth.onSignup(this.signUpForm.value)
      .subscribe({
        next: (res=>{
          this.snackbar.showSuccessMessage(res.message);
          console.log(res.message);
          this.signUpForm.reset();
          this.router.navigate(['logincustomer'])
        }),
        error: (err=>{ 
          this.snackbar.showErrorMessage(err?.error.message);
        })
      })
    } else{
      //logic for throwing error
      ValidateForm.validateAllFormFields(this.signUpForm)
    }
  }
}
