import { Component, OnInit } from '@angular/core';
import { StationService } from '../StationService/station.service';
import { Station } from './Station';

@Component({
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css'],
  providers:[StationService]
})
export class StationComponent implements OnInit {
  errorMsg:string='';
  stations: Station[] = [];
  editables: boolean[] = [];
  disableDelete:boolean=true;
  constructor(private sationService:StationService) { }

  ngOnInit(): void {
    this.sationService.getStations().subscribe({
      next: stations=>{
      this.stations=stations,
      this.editables.push(false);
      },
      error:err=>this.errorMsg=err
  });
  }
  deleteStation(station:Station):void{
    this.stations=this.stations.filter(s=>s!==station);
    this.sationService.deleteStation(station.stationId).subscribe();
  }
  makeEditable(station:Station):void{
    //just to make sure that the user can't edit more than one station at a time
    this.editables[this.stations.indexOf(station)]=true;
    //disable the delete button
    this.disableDelete=!this.disableDelete;
  }
  
  updateStation(station:Station):void{
    this.sationService.updateStation(station).subscribe();
    this.editables[this.stations.indexOf(station)]=false;
    this.disableDelete=!this.disableDelete;
  }




}
