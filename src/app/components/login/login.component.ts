import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { StaffsService } from 'src/app/service/staffs.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    type: string ="password"
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, private staff : StaffsService, private router : Router, private userStore: UserStoreService,    private snackbarService: SnackbarService){
    }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

    hideShowPass(){
      this.isText = !this.isText
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password"
    }

    onLogin(){
      if (this.loginForm.valid) {
        console.log(this.loginForm.value);
        //send obj to database 
        this.staff.login(this.loginForm.value)
        .subscribe({
          next:(res)=>{
            localStorage.setItem('StaffId', res.staff.id)
            console.log(res.staff.id);
            this.snackbarService.showSuccessMessage(res.message);
            this.loginForm.reset()
            this.staff.storeToken(res.token);
            const tokenPayload = this.staff.decodedToken();
            this.userStore.setRoleForStore(tokenPayload.role);
            this.userStore.setFullNameStore(tokenPayload.unique_name)
            this.userStore.setImageFromStore(tokenPayload.image)
            this.router.navigate(['/dashboard'])
          },
          error:(err)=>{
            this.snackbarService.showErrorMessage(err.error.message);
          }
        })
      }
      else{
        ValidateForm.validateAllFormFields(this.loginForm)
           this.snackbarService.showSuccessMessage('filling your details');
      }
    }
}
