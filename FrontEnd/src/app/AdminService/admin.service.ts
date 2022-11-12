import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Admin } from '../SignIn/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  private AdminUrl='http://localhost:8080/api/admin';
  constructor(private http:HttpClient ){}

  SignIn(admin :Admin):Observable<boolean>{
    return this.http.post<boolean>(this.AdminUrl+'/signin',admin).pipe(
      tap(data =>console.log('All: ' ,JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  SignUp(admin :Admin):Observable<Admin>{
    return this.http.post<Admin>(this.AdminUrl+'/signup',admin).pipe(
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
