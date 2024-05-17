import { Component } from '@angular/core';
import { DividendDiscountMethodService } from '../service/dividend-discount-method.service';
import { LoadingService } from '../service/loading.service';
import { DividendDiscountRequest } from '../dto/dividend-discount-request';
import { DividendDiscountResponse } from '../dto/dividend-discount-response';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dividend-discount-model',
  templateUrl: './dividend-discount-model.component.html',
  styleUrl: './dividend-discount-model.component.css'
})
export class DividendDiscountModelComponent {

  constructor(
    private dividendDiscountService: DividendDiscountMethodService,
    private loadingService: LoadingService
  ){}

  dividendDiscountRequest: DividendDiscountRequest = {
    companyName: "",
    companyTicker: "",
    currentYearsDiv: 0,
    wacc: 0,
    expectedGrowthRate: 0
  }

  dividendDiscountResponse: DividendDiscountResponse = {
    creationDate: new Date(),
    companyName: "",
    companyTicker: "",
    currentYearsDiv: 0,
    valueOfNextYearsDiv: 0,
    wacc: 0,
    expectedGrowthRate: 0,
    intrinsicValue: 0,
  }

  dividendDiscountCalculations: DividendDiscountResponse[] = [];
  showAllCalculations: boolean = false;
  startDate!: string;
  endDate!: string;
  searchType!: string;
  searchBar: string = "";

  deleteCalculation(calculationId: number): void {

  }

  getAllCalculationsByTicker(): void{
    if (this.searchBar.trim()){
      this.loadingService.loadingOn();
      this.dividendDiscountService.getDividendDiscountValuationsByTicker(this.searchBar).subscribe({
        next: (response) => {
          this.dividendDiscountCalculations = response;
          this.resetSearchBar();
          this.showAllCalculations = true;
          this.loadingService.loadingOff();
        },
        error: (err) => {
          console.error('Failed to load valuations:', err);
          this.loadingService.loadingOff();
        }
      })
    }
  }

  getAllCalculationsByCompanyName(): void{
    if (this.searchBar.trim()){
      this.loadingService.loadingOn();
      this.dividendDiscountService.getDividendDiscountValuationsByCompanyName(this.searchBar).subscribe({
        next: (response) => {
          this.dividendDiscountCalculations = response;
          this.resetSearchBar();
          this.showAllCalculations = true;
          this.loadingService.loadingOff();
        },
        error: (err) => {
          console.error('Failed to load valuations:', err);
          this.loadingService.loadingOff();
        }
      })
    }
  }

  getCalculationsByDate(startDate: string, endDate: string): void{   
    this.loadingService.loadingOn();
    this.dividendDiscountService.getDividendDiscountValuationsByDate(startDate, endDate).subscribe({
      next: (response) => {
        this.dividendDiscountCalculations = response;
        this.showAllCalculations = true;
        this.loadingService.loadingOff();
      },
      error: (err) => {
        console.error('Failed to load valuations:', err);
        this.loadingService.loadingOff();
      }
    });
  }

  calculateDividendDiscountValuation(form: NgForm): void {
    this.loadingService.loadingOn();    
    if(form.valid){
      this.dividendDiscountService.sendDividendDiscountRequest(this.dividendDiscountRequest).subscribe({
        next: (response) => {
          this.dividendDiscountResponse = response;
          this.dividendDiscountCalculations.push(response);
          this.showAllCalculations = false;
          this.resetModal();
          this.loadingService.loadingOff();
          console.log(response);
          
        },
        error: (err) => { 
          console.error('Failed to calculate dividend discount valuation:', err);
          this.loadingService.loadingOff();
        }
      });
    } else {
      this.loadingService.loadingOff();
    }
  }

  resetModal(): void{
    this.dividendDiscountRequest = { 
    companyName: "",
    companyTicker: "",
    currentYearsDiv: 0,
    wacc: 0,
    expectedGrowthRate: 0
    }
  }

  hasData(): boolean {
    return this.dividendDiscountResponse.companyName.trim() !== "" && this.dividendDiscountResponse.companyName.trim() !== "";
  }

  resetSearchBar(): void {
    this.searchBar = "";
  }

  performSearch(event: { searchType: string, searchValue: string, startDate?: string, endDate?: string }): void {
    if (event.searchType === "ticker") {
      this.searchBar = event.searchValue;
      this.getAllCalculationsByTicker();
    } else if (event.searchType === "companyName"){
      this.searchBar = event.searchValue;
      this.getAllCalculationsByCompanyName();
    } else if (event.searchType === "date" && event.startDate && event.endDate) {
      this.getCalculationsByDate(event.startDate, event.endDate);
    }
  }

}
