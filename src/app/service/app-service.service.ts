import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { GrahamsFormulaRequest } from '../dto/grahams-formula-request';

import { GrahamsFormulaResponse } from '../dto/grahams-formula-response';
import { User } from '../user';
import { AuthenticationResponse } from '../dto/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  

  constructor(private http: HttpClient) { }

  public registerUser(user: User): Observable<User>{
    return this.http.post<User>('http://localhost:8080/api/user/register', user, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message || 'Server error'; 
        return throwError(() => new Error(message));
      })
    );
  }

  public logInUser(user: User): Observable<User>{
    return this.http.post<AuthenticationResponse>('http://localhost:8080/api/user/authenticate', user,{
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json'
    }).pipe(
      tap(response => {
        // Assuming the user's ID and the token are always present in the response
        console.log('User authenticated:', response.user.id);
        localStorage.setItem('currentUserId', response.user.id!.toString());
        localStorage.setItem('token', response.token);
      }),
      map(response => response.user),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message || 'Server error';
        return throwError(() => new Error(message));
      })
    );
  }

  public sendGrahamsRequest(grahamsFormula: GrahamsFormulaRequest): Observable<GrahamsFormulaResponse>{
    const currentUserId = localStorage.getItem('currentUserId'); // Retrieve the current user ID from localStorage
    const token = localStorage.getItem('token'); // Retrieve the authentication token from localStorage

    if (!currentUserId || !token) {
      console.error('Authentication details missing.');
      return throwError(() => new Error("User not logged in or token missing."));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
    });
    
    return this.http.post<GrahamsFormulaResponse>(`http://localhost:8080/api/grahams/${currentUserId}`, grahamsFormula, {
      headers: headers,
      responseType: 'json'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message || 'Server error';
        return throwError(() => new Error(message));
      })
    );
  }

  public getGrahamsValuationsByTicker(ticker: string): Observable<GrahamsFormulaResponse[]>{
    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      return throwError(() => new Error("User not logged in or token missing."));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<GrahamsFormulaResponse[]>(`http://localhost:8080/api/grahams/ticker/${ticker}/${userId}`, {
      headers: headers
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message || 'Server error';
        console.error('Failed to fetch valuations:', message);
        return throwError(() => new Error(message));
      })
    );
  }

  public getGrahamsValuationsByCompanyName(companyName: string): Observable<GrahamsFormulaResponse[]>{
    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      return throwError(() => new Error("User not logged in or token missing."));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<GrahamsFormulaResponse[]>(`http://localhost:8080/api/grahams/companyName/${companyName}/${userId}`, {
      headers: headers
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message || 'Server error';
        console.error('Failed to fetch valuations:', message);
        return throwError(() => new Error(message));
      })
    );
  }

  public getGrahamsValuationsByDate(startDate: string, endDate: string,): Observable<GrahamsFormulaResponse[]>{
    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      return throwError(() => new Error("User not logged in or token missing."));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<GrahamsFormulaResponse[]>(`http://localhost:8080/api/grahams/date/${startDate}/${endDate}/${userId}`, {
      headers: headers
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message || 'Server error';
        console.error('Failed to fetch valuations:', message);
        return throwError(() => new Error(message));
      })
    );
  }
}
