import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DividendDiscountRequest } from '../dto/dividend-discount-request';
import { Observable, catchError, throwError } from 'rxjs';
import { DividendDiscountResponse } from '../dto/dividend-discount-response';
import { GrahamsFormulaResponse } from '../dto/grahams-formula-response';

@Injectable({
  providedIn: 'root'
})
export class DividendDiscountMethodService {

  constructor(private http: HttpClient) { }

  public sendDividendDiscountRequest(dividendDisountRequest: DividendDiscountRequest): Observable<DividendDiscountResponse>{
    const currentUserId = localStorage.getItem('currentUserId'); 
    const token = localStorage.getItem('token');

    if (!currentUserId || !token){
      console.error('Authentication details missing.');
      return throwError(() => new Error("User not logged in or token missing."));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<DividendDiscountResponse>(`http://localhost:8080/api/dividendDiscount/${currentUserId}`, dividendDisountRequest,{
      headers: headers,
      responseType: 'json'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message || 'Server error';
        return throwError(() => new Error(message));
      })
    );
  }

  public getDividendDiscountValuationsByTicker(ticker: string): Observable<DividendDiscountResponse[]>{
    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      return throwError(() => new Error("User not logged in or token missing."));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<DividendDiscountResponse[]>(`http://localhost:8080/api/dividendDiscount/ticker/${ticker}/${userId}`, {
      headers: headers
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message || 'Server error';
        console.error('Failed to fetch valuations:', message);
        return throwError(() => new Error(message));
      })
    );
  }

  public getDividendDiscountValuationsByCompanyName(companyName: string): Observable<DividendDiscountResponse[]>{
    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      return throwError(() => new Error("User not logged in or token missing."));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<DividendDiscountResponse[]>(`http://localhost:8080/api/dividendDiscount/companyName/${companyName}/${userId}`, {
      headers: headers
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = error.error.message || 'Server error';
        console.error('Failed to fetch valuations:', message);
        return throwError(() => new Error(message));
      })
    );
  }

  public getDividendDiscountValuationsByDate(startDate: string, endDate: string): Observable<DividendDiscountResponse[]>{

    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('token');
    
    if (!userId || !token) {
      return throwError(() => new Error("User not logged in or token missing."));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<DividendDiscountResponse[]>(`http://localhost:8080/api/dividendDiscount/date/${startDate}/${endDate}/${userId}`, {
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
