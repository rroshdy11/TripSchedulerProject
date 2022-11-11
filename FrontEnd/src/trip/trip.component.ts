import { Component, OnInit } from '@angular/core';
import { Station } from '../Station/Station';
import { StationService } from '../StationService/station.service';
import { TripService } from '../TripService/trip.service';
import { Trip } from './Trip';

@Component({
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
  providers:[TripService]
})
export class TripComponent implements OnInit {
  errorMsg:string='';
  trips: Trip[] =[];
  editables: boolean[] = [];
  stations:Station[]=[];
  disableDelete:boolean=false;
  constructor(private tripService:TripService,  private stationService:StationService) { }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next:trips=>{
        this.trips=trips;
      this.editables.push(false);},
      error:error=>this.errorMsg=error
    });
    this.stationService.getStations().subscribe({
      next:stations=>this.stations=stations,
      error:error=>this.errorMsg=error
    });
  }
  
  makeEditable(trip:Trip):void{
    this.editables[this.trips.indexOf(trip)]=true;
    this.disableDelete=!this.disableDelete;
  }
  
  updateTrip(trip:Trip):void{
    this.tripService.updateTrip(trip).subscribe();
    this.editables[this.trips.indexOf(trip)]=false;
    this.disableDelete=!this.disableDelete;
  }

  deleteTrip(trip:Trip):void{
    this.trips=this.trips.filter(t=>t!==trip);
    this.tripService.deleteTrip(trip.id).subscribe();
  }

   
  onSelectToStation(trip:Trip,event : any){
    trip.toStation=this.stations[event.target.value];
    console.log(trip.toStation);
}
onSelectFromStation(trip:Trip,event : any){
    trip.fromStation=this.stations[event.target.value];
    console.log(trip.fromStation);
}
  
  

}
