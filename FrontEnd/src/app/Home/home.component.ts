import { Component } from "@angular/core";


@Component({
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']})

export class Home{
    noha:string="./bluecar.jpg"
    SignIn():void{
        location.href='/SignIn';
    }
    SignUp():void{
        location.href='/Signup';
    }
}