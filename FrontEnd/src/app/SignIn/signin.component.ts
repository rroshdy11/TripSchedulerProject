import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../AdminService/admin.service';
import { Access } from '../AuthService/Access';

import { Admin } from './Admin';

@Component({

  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],

})
export class SignInPage implements CanActivate{
  isSignIn:boolean=false;

  errorMsg:string='';
   constructor(private adminService: AdminService,private router: Router){}
  admin:Admin={
    userName:'',
    password:'',
    email:'',
    adminId:0
  };
  canActivate():boolean{
    if(this.isSignIn){
      return true;
    }
    else{
      this.router.navigate(['HomePage']);
      return false;
    }
  }

  completeInput:boolean=true;
  valid:boolean=true;
  onSubmit():void{
    if(this.admin.userName.length==0 || this.admin.password.length==0){
      this.completeInput=false;
    }
    else{
     
      this.completeInput=true;
      this.adminService.SignIn(this.admin).subscribe(
        {
          next:valid=>{
            Access.isNextStep=valid;
            this.isSignIn=valid;
            this.valid=valid;
            if(valid){
              this.router.navigate(['/MainPage/Stations']);
            }
          },
          error:error=>this.errorMsg=error
        }
      )
    }
  }

  
}
