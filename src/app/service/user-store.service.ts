import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private fullName$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("")
private image$ = new BehaviorSubject<string>("")
  constructor() {   }
    public getRoleFromStore(){
      return this.role$.asObservable();
    }

    public setRoleForStore(role:string){
      this.role$.next(role)
    }

    public getFullNameFromStore(){
      return this.fullName$.asObservable();
    }

    public setFullNameStore(fullname:string){
      this.fullName$.next(fullname)
    }

    public getImageFromStore(){
      return this.image$.asObservable();
    }

    public setImageFromStore(image:string){
      this.image$.next(image)
    }

}
