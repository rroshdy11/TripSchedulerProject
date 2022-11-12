import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Station } from '../Station/Station';
import { StationService } from '../StationService/station.service';
import { Trip } from '../trip/Trip';
import { TripService } from '../TripService/trip.service';

@Component({
  templateUrl: './addTrip.component.html',
  styleUrls: ['./addTrip.component.css'],
})
export class addTrip implements OnInit {
  fromStation: Station = {
    stationName: '',
    stationId: 0,
  };
  toStation: Station = {
    stationName: '',
    stationId: 0,
  };

  trip: Trip = {
    id: 0,
    startTime: '',
    endTime: '',
    fromStation: this.fromStation,
    toStation: this.toStation,
  };
  //array of stations
  stations: Station[] = [];
  errorMsg: string = '';
  valid: boolean = true;
  addedSuccesfuly: boolean = false;
  //constructor with TripService
  constructor(
    private tripService: TripService,
    private router: Router,
    private stationService: StationService
  ) {}
  //ngOnInit method
  ngOnInit(): void {
    this.stationService.getStations().subscribe({
      next: (stations) => (this.stations = stations),
      error: (error) => (this.errorMsg = error),
    });
  }
  //addTrip method
  addTrip(): void {
    if (
      this.compare(this.trip.fromStation, this.trip.toStation) ||
      this.trip.startTime.length == 0 ||
      this.trip.endTime.length == 0 ||
      this.trip.fromStation.stationName.length == 0 ||
      this.trip.toStation.stationName.length == 0 ||
      !this.compresTime(this.trip.startTime,this.trip.endTime)
    ) {
      this.valid = false;
    } else {
      console.log(this.trip);
      this.tripService.addTrip(this.trip).subscribe({
        next: (trip) => {
          this.trip = trip;
          this.router.navigate(['/MainPage/Trips']);
        },
        error: (err) => (this.errorMsg = err),
      });
    }
  }

  //compare method
  compare(station1: Station, station2: Station): boolean {
    return station1 && station2 && station1.stationId === station2.stationId;
  }
  compresTime(time1:string,time2:string):boolean{ 
    const event = new Date(time1);
    const event2 = new Date(time2);
    return event<event2;
  }

  onSelectToStation(event: any) {
    this.trip.toStation = this.stations[event.target.value];
    console.log(this.trip.toStation);
  }
  onSelectFromStation(event: any) {
    this.trip.fromStation = this.stations[event.target.value];
    console.log(this.trip.fromStation);
  }
}
