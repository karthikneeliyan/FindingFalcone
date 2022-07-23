import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { BASE_URL } from './types/constants';

@Injectable({
  providedIn: 'root',
})
export class FalconeLocatorService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}
  find({planets,vehicles}:any) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const makePost = (token: string) => {
      let body = {
        token: token,
        planet_names: planets,
        vehicle_names: vehicles,
      };
      return this.http
        .post<any>(`${BASE_URL}/find`, body, {
          headers: headers,
        })
        .pipe(catchError(this.handleError));
    }
 
    return this.tokenService.getToken().pipe(mergeMap(({token}:{token:string}) => {
      return makePost(token)
    }
  ))
    
  }
getPlanets(){
return this.http.get(`${BASE_URL}/planets`);
}
getVehicles(){
  return this.http.get(`${BASE_URL}/vehicles`);

}
  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return observableThrowError(res.error || 'Server error');
  }
}
