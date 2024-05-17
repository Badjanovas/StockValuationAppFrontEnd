import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrahamsFormulaRequest } from '../dto/grahams-formula-request';
import { Observable, catchError, throwError } from 'rxjs';
import { GrahamsFormulaResponse } from '../dto/grahams-formula-response';

@Injectable({
  providedIn: 'root'
})
export class GrahamsFormulaService {

  constructor(private http: HttpClient) { }

  
  public sendGrahamsRequest(grahamsFormula: GrahamsFormulaRequest): Observable<GrahamsFormulaResponse>{
    const currentUserId = localStorage.getItem('currentUserId'); 
    const token = localStorage.getItem('token'); 

    if (!currentUserId || !token) {
      console.error('Authentication details missing.');
      return throwError(() => new Error("User not logged in or token missing."));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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

  public getGrahamsValuationsByDate(startDate: string, endDate: string): Observable<GrahamsFormulaResponse[]>{
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

  public deleteGrahamsValuation(calculationId: number): Observable<any>{
    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      return throwError(() => new Error("User not logged in or token missing."));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`http://localhost:8080/api/grahams/${calculationId}/${userId}`, {
      headers: headers
    } ).pipe(
      catchError(this.handleError) 
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
