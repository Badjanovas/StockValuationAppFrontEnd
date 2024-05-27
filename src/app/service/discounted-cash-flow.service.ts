import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DcfRequest } from '../dto/dcf-request';
import { DcfResponse } from '../dto/dcf-response';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountedCashFlowService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private url = 'http://localhost:8080/api/discountedCashFlow';

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error.message || 'Server error';
    console.error('Failed to fetch valuations:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  public sendDiscountedCashFlowRequest(dcfRequest: DcfRequest): Observable<DcfResponse>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers => 
        this.http.post<DcfResponse>(`${this.url}/${this.authService.getUserId()}`, dcfRequest, { headers })
          .pipe(catchError(this.handleError))
      )
    );
  }

  public getDiscountedCashFlowValuationsByTicker(ticker: string): Observable<DcfResponse[]>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers => 
        this.http.get<DcfResponse[]>(`${this.url}/ticker/${ticker}/${this.authService.getUserId()}`, { headers })
          .pipe(catchError(this.handleError))
      )
    );
  }

  public getDiscountedCashFlowValuationsByName(companyName: string): Observable<DcfResponse[]>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers => 
        this.http.get<DcfResponse[]>(`${this.url}/companyName/${companyName}/${this.authService.getUserId()}`, { headers })
          .pipe(catchError(this.handleError))
      )
    );
  }

  public getDiscountedCashFlowValuationsByDate(startDate: string, endDate: string): Observable<DcfResponse[]>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers =>
        this.http.get<DcfResponse[]>(`${this.url}/date/${startDate}/${endDate}/${this.authService.getUserId()}`, { headers })
        .pipe(catchError(this.handleError))
      )
    );
  }

  public deleteDiscountedCashFlowValuation(calculationId: number): Observable<any>{
    return this.authService.getHeaders().pipe(
      mergeMap(headers => 
        this.http.delete(`${this.url}/${calculationId}/${this.authService.getUserId()}`, { headers })
          .pipe(catchError(this.handleError))
      )
    );
  }
 

}
