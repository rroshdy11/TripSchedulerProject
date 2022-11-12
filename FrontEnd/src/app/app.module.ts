import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPage } from './SignIn/signin.component';
import { SignupComponent } from './SignUp/signup.component';
import { FormsModule } from '@angular/forms';
import { StationComponent } from './Station/station.component';
import { TripComponent } from './trip/trip.component';
import { PageComponent } from './page/page.component';
import {HttpClientModule} from '@angular/common/http';
import { addStation } from './addStation/addStation.component';
import { Home } from './Home/home.component';
import { addTrip } from './addTrip/addTrip.component';
import { AuthGuard } from './AuthService/AuthGuard';
@NgModule({
  declarations: [
    AppComponent,
    SignInPage,
    SignupComponent,
    StationComponent,
    TripComponent,
    PageComponent,
    addStation,
    Home,
    addTrip,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'Signup',component:SignupComponent},
      {path:'HomePage',component:Home},
      {path:'SignIn',component:SignInPage},
      {path:'MainPage',component:PageComponent,
       children:[
         {path:'Stations',component:StationComponent},
         {path:'Trips',component:TripComponent},
         {path:'AddStation',component:addStation},
         {path:'AddTrip',component:addTrip}
        ],
        //canActivate property
        canActivate:[AuthGuard]

    },
      {path:'',redirectTo:'HomePage',pathMatch:'full'},
    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
