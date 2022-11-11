import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Station } from "./Staion";


@Component({
    templateUrl:'./addStation.component.html',
    styleUrls:['./addStation.component.css']})

export class addStation{
    //variables
    station:Station={
        stationName:'',
        stationId:0,
    }
    errorMsg:string='';
    valid:boolean=true;
    addedSuccesfuly:boolean=false;

   
    

    
  
}