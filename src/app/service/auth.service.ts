import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: string | null = localStorage.getItem('currentUserId');
  private token: string | null = localStorage.getItem('token');


  public getAuthHeaders(): HttpHeaders | null {
    if (!this.token) {
      console.error('Authentication token missing.');
      return null;
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  public isAuthenticated(): boolean {
    return this.userId !== null && this.token !== null;
  }

  public getHeaders(): Observable<HttpHeaders>{
    if (!this.isAuthenticated()) {
      return throwError(() => new Error("User not logged in or token missing."));
    }
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error("User not logged in or token missing."));
    }
    return of(headers);
  }

  public getUserId(): string | null {
    return this.userId;
  }
}
