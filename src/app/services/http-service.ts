import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  correctURL: string = "https://reqres.in/api/users";
  errorURL: string = "https://error.in/api/users";

  constructor(private httpclient: HttpClient) { }

  getData(url: string){
    return this.httpclient.get<any>(url).pipe(catchError(this.handleError));
  }

  postData(url: string, request: any){
    console.log(url + " " + request)
    console.log(JSON.parse(request));
    return this.httpclient.post<any>(url, JSON.parse(request)).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
