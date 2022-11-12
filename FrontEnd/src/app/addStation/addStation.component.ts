import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Station } from "../Station/Station";
import { StationService } from "../StationService/station.service";

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

    constructor(private stationService:StationService,private router:Router){}
    


    addStation():void{
        if(this.station.stationName.length==0){
            this.valid=false;  
        }
        else{
            this.stationService.addStation(this.station).subscribe({
                next:station=>{this.station=station;
                    this.router.navigate(['/MainPage/Stations']);
                },
                error:err=>this.errorMsg=err
             }); 
             
        }
    }
  
}