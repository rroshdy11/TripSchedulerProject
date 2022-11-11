import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../AdminService/admin.service';
import { Admin } from '../SignIn/Admin';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMsg:string='';
  admin:Admin={
    userName:'',
    password:'',
    email:'',
    adminId:0
  };
  passwordConfirm:string='';
  valid:boolean=true;
  completeFields:boolean=true;
  passmatch:boolean=true;

  constructor(private adminService: AdminService,private router: Router){}

  ngOnInit(): void {
  }

  //When Clicking on the Register Button
  onSubmit():void{
    //check if the user entered all fields
    if(this.admin.userName.length==0 ||this.admin.password.length==0 ||this.admin.email.length==0 ||this.passwordConfirm.length==0){
      this.completeFields=false;
    }
    else{
      //if he entered all fields 
      this.completeFields=true;
      //check if the two passwords match
       if(this.passwordConfirm==this.admin.password){
        this.passmatch=true
        this.adminService.SignUp(this.admin).subscribe(
          {
            next:admin=>{
              this.admin=admin;
              this.valid=true;
              if(this.valid){
                this.router.navigate(['/SignIn']);
              }
            },
            error:error=>{
              this.errorMsg=error
              this.valid=false;
            }
          }
        )
      }
       else{
        this.passmatch=false
       }
    }
  }

}
