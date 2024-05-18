import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { AuthenticationResponse } from '../dto/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

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
}
