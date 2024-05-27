import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrahamsFormulaRequest } from '../dto/grahams-formula-request';
import { Observable, catchError, mergeMap, of, throwError } from 'rxjs';
import { GrahamsFormulaResponse } from '../dto/grahams-formula-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GrahamsFormulaService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private url = 'http://ec2-13-40-57-109.eu-west-2.compute.amazonaws.com/api/grahams';

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error.message || 'Server error';
    console.error('Failed to fetch valuations:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  
  // mergeMap is used to ensure that the authentication headers are retrieved before making the HTTP request.
  // pipe function in RxJS (Reactive Extensions for JavaScript) is a way to combine multiple operations (called operators) on an observable in a readable and organized manner.
  public sendGrahamsRequest(grahamsFormula: GrahamsFormulaRequest): Observable<GrahamsFormulaResponse> {
    return this.authService.getHeaders().pipe(
      mergeMap(headers => 
        this.http.post<GrahamsFormulaResponse>(`${this.url}/${this.authService.getUserId()}`, grahamsFormula, { headers })
          .pipe(catchError(this.handleError))
      )
    );
  }

  public getGrahamsValuationsByTicker(ticker: string): Observable<GrahamsFormulaResponse[]> {
    return this.authService.getHeaders().pipe(
      mergeMap(headers => 
        this.http.get<GrahamsFormulaResponse[]>(`${this.url}/ticker/${ticker}/${this.authService.getUserId()}`, { headers })
          .pipe(catchError(this.handleError))
      )
    );
  }

  public getGrahamsValuationsByCompanyName(companyName: string): Observable<GrahamsFormulaResponse[]> {
    return this.authService.getHeaders().pipe(
      mergeMap(headers => 
        this.http.get<GrahamsFormulaResponse[]>(`${this.url}/companyName/${companyName}/${this.authService.getUserId()}`, { headers })
          .pipe(catchError(this.handleError))
      )
    );
  }

  public getGrahamsValuationsByDate(startDate: string, endDate: string): Observable<GrahamsFormulaResponse[]> {
    return this.authService.getHeaders().pipe(
      mergeMap(headers =>
        this.http.get<GrahamsFormulaResponse[]>(`${this.url}/date/${startDate}/${endDate}/${this.authService.getUserId()}`, { headers })
        .pipe(catchError(this.handleError))
      )
    );
  }

  public deleteGrahamsValuation(calculationId: number): Observable<any> {
    return this.authService.getHeaders().pipe(
      mergeMap(headers => 
        this.http.delete(`${this.url}/${calculationId}/${this.authService.getUserId()}`, { headers })
          .pipe(catchError(this.handleError))
      )
    );
  }
 
}
