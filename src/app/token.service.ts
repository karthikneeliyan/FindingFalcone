import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) {}
  getToken(){
    const headers = {
      'Accept': 'application/json'
    };

   return this.http
        .post<any>(`https://findfalcone.herokuapp.com/token`,{},{headers:headers})
        .pipe(catchError(this.handleError));
    }
  
    private handleError(res: HttpErrorResponse) {
      console.error(res.error);
      return observableThrowError(res.error || 'Server error');
    }
  
}
