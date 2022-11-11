import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../AdminService/admin.service';

import { Admin } from './Admin';

@Component({

  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],

})
export class SignInPage {
  errorMsg:string='';
   constructor(private adminService: AdminService,private router: Router){}
  admin:Admin={
    userName:'',
    password:'',
    email:'',
    adminId:0
  };
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
