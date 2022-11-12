import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Station } from '../Station/Station';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private StationUrl='http://localhost:8080/api/admin/station';

  constructor(private http:HttpClient){}

  getStations():Observable<Station[]>{
    return this.http.get<Station[]>(this.StationUrl+'/showAllStations').pipe(
      tap(data =>console.log('All: ' ,JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addStation(station:Station):Observable<Station>{
    return this.http.post<Station>(this.StationUrl+'/createStation',station).pipe(
      tap(data =>console.log('All: ' ,JSON.stringify(data))),
      catchError(this.handleError)
    ); 
  }
  
  
  updateStation(station:Station):Observable<Station>{
    return this.http.put<Station>(this.StationUrl+'/updateStation/'+station.stationId+'?stationName='+station.stationName,station).pipe(
      tap(data =>console.log('All: ' ,JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  
  deleteStation(stationId:number):Observable<Station>{
    return this.http.delete<Station>(this.StationUrl+'/deleteStation/'+stationId).pipe(
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
