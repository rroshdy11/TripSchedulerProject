import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPage } from './SignIn/signin.component';

import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { addStation } from './addStation/addStation.component';
import { Home } from './Home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPage,

    addStation,
    Home,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'HomePage',component:Home},
      {path:'SignIn',component:SignInPage},
      {path:'AddStation',component:addStation},
      {path:'',redirectTo:'HomePage',pathMatch:'full'},
    
  ]),
],
  bootstrap: [AppComponent]
})
export class AppModule { }
