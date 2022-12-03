import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trip } from '../trip/Trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private TripUrl=environment.apiUrl+'/api/admin/trip';
  constructor(private http:HttpClient ){}

  getTrips():Observable<Trip[]>{
    return this.http.get<Trip[]>(this.TripUrl+'/showAllTrips/').pipe(
      tap(data =>console.log('All: ' ,JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  //delete Trip
  deleteTrip(tripId:number):Observable<Trip>{
    return this.http.delete<Trip>(this.TripUrl+'/deleteTrip/'+tripId).pipe(
      tap(data =>console.log('All: ' ,JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

 //add Trip
  addTrip(trip:Trip):Observable<Trip>{
    return this.http.post<Trip>(this.TripUrl+'/createTrip',trip).pipe(
      tap(data =>console.log('All: ' ,JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //update Trip
  updateTrip(trip:Trip):Observable<Trip>{
    return this.http.put<Trip>(this.TripUrl+'/updateTrip/'+trip.id+"?toStation="+trip.toStation.stationId+"&fromStation="+trip.fromStation.stationId+"&startTime="+trip.startTime+"&endTime="+trip.endTime,trip).pipe(
      tap(data =>console.log('All: ' ,JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  private handleError(err:HttpErrorResponse){
    //log errors to console
    let errormsg='';
    if(err.error instanceof ErrorEvent){
      errormsg=`An Error Ocuured : ${err.error.message}`;
    }
    else{
      errormsg=`Server returned code : ${err.status}, error message is : ${err.message}`
    }
    console.log(errormsg);
    return throwError(()=>errormsg);
  }
}
