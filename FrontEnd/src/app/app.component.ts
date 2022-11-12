import { Component } from '@angular/core';
import { Access } from './AuthService/Access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TripSchedulerFrontend';
  constructor(){
    Access.isNextStep=false;
  }
    
}
