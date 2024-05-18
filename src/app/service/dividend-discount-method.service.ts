import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DividendDiscountRequest } from '../dto/dividend-discount-request';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';
import { DividendDiscountResponse } from '../dto/dividend-discount-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DividendDiscountMethodService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private url = 'http://localhost:8080/api/dividendDiscount';

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error.message || 'Server error';
    console.error('Failed to fetch valuations:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  public sendDividendDiscountRequest(dividendDisountRequest: DividendDiscountRequest): Observable<DividendDiscountResponse>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers =>
        this.http.post<DividendDiscountResponse>(`${this.url}/${this.authService.getUserId()}`, dividendDisountRequest, { headers })
        .pipe(catchError(this.handleError))
      )
    )
  }

  public getDividendDiscountValuationsByTicker(ticker: string): Observable<DividendDiscountResponse[]>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers =>
        this.http.get<DividendDiscountResponse[]>(`${this.url}/ticker/${ticker}/${this.authService.getUserId()}`, { headers })
        .pipe(catchError(this.handleError))
      )
    );
  }

  public getDividendDiscountValuationsByCompanyName(companyName: string): Observable<DividendDiscountResponse[]>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers =>
        this.http.get<DividendDiscountResponse[]>(`${this.url}/companyName/${companyName}/${this.authService.getUserId()}`, { headers })
        .pipe(catchError(this.handleError))
      )
    );
  }

  public getDividendDiscountValuationsByDate(startDate: string, endDate: string): Observable<DividendDiscountResponse[]>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers =>
        this.http.get<DividendDiscountResponse[]>(`${this.url}/date/${startDate}/${endDate}/${this.authService.getUserId()}`, { headers })
        .pipe(catchError(this.handleError))
      )
    )
  }
  

  public deleteDividendDiscountValuation(calculationId: number): Observable<any>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers => 
        this.http.delete(`${this.url}/${calculationId}/${this.authService.getUserId()}`, { headers })
          .pipe(catchError(this.handleError))
      )
    );
  }
}
