import { Component } from '@angular/core';
import { DiscountedCashFlowService } from '../service/discounted-cash-flow.service';
import { LoadingService } from '../service/loading.service';
import { DcfRequest } from '../dto/dcf-request';
import { DcfResponse } from '../dto/dcf-response';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-discounted-cash-flow',
  templateUrl: './discounted-cash-flow.component.html',
  styleUrl: './discounted-cash-flow.component.css'
})
export class DiscountedCashFlowComponent {

  constructor(
    private dcfService: DiscountedCashFlowService,
    private loadingService: LoadingService
  ){}

  dcfRequest: DcfRequest = {
    companyName: "",
    companyTicker: "",
    sumOfFCF: 0,
    cashAndCashEquivalents: 0,
    totalDebt: 0,
    sharesOutstanding: 0,
    wacc: 0,
    growthRate: 0
  }

  dcfResponse: DcfResponse = {
    companyName: "",
    companyTicker: "",
    sumOfFCF: 0,
    cashAndCashEquivalents: 0,
    totalDebt: 0,
    equityValue: 0,
    sharesOutstanding: 0,
    intrinsicValue: 0,
    creationDate: new Date()
  }

  dcfCalculations: DcfResponse[] = [];
  showAllCalculations: boolean = false;
  startDate!: string;
  endDate!: string;
  searchType!: string;
  searchBar: string = "";

  calculateDcfValuation(form: NgForm): void {
    this.loadingService.loadingOn();    
    if(form.valid){
      this.dcfService.sendDiscountedCashFlowRequest(this.dcfRequest).subscribe({
        next: (response) => {
          this.dcfResponse = response;
          this.dcfCalculations.push(response);
          this.showAllCalculations = false;
          this.resetModal();
          this.loadingService.loadingOff();
          console.log(response);
        },
        error: (err) => { 
          console.error('Failed to calculate dcf valuation:', err);
          this.loadingService.loadingOff();
        }
      });
    } else {
      this.loadingService.loadingOff();
    }
  }

  getCalculationsByTicker(): void{
    if (this.searchBar.trim()){
      this.loadingService.loadingOn();
      this.dcfService.getDiscountedCashFlowValuationsByTicker(this.searchBar).subscribe({
        next: (response) => {
          this.dcfCalculations = response;
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

  getCalculationsByCompanyName(): void{
    if (this.searchBar.trim()){
      this.loadingService.loadingOn();
      this.dcfService.getDiscountedCashFlowValuationsByName(this.searchBar).subscribe({
        next: (response) => {
          this.dcfCalculations = response;
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
    this.dcfService.getDiscountedCashFlowValuationsByDate(startDate, endDate).subscribe({
      next: (response) => {
        this.dcfCalculations = response;
        this.showAllCalculations = true;
        this.loadingService.loadingOff();
      },
      error: (err) => {
        console.error('Failed to load valuations:', err);
        this.loadingService.loadingOff();
      }
    });
  }

  deleteCalculation(calculationId: number): void{
    this.loadingService.loadingOn();
      this.dcfService.deleteDiscountedCashFlowValuation(calculationId).subscribe({
        next: () => {
          this.dcfCalculations = this.dcfCalculations.filter(item => item.id !== calculationId);
          this.resetDcfRequest();
          this.loadingService.loadingOff();
        },
      error: (err) => {
          console.error('Failed to delete dividend discount valuation:', err);
          this.loadingService.loadingOff();
      }
    });
  }

  performSearch(event: { searchType: string, searchValue: string, startDate?: string, endDate?: string }): void {
    if (event.searchType === "ticker") {
      this.searchBar = event.searchValue;
      this.getCalculationsByTicker();
    } else if (event.searchType === "companyName"){
      this.searchBar = event.searchValue;
      this.getCalculationsByCompanyName();
    } else if (event.searchType === "date" && event.startDate && event.endDate) {
      this.getCalculationsByDate(event.startDate, event.endDate);
    }
  }

  resetModal(): void {
    this.dcfRequest = { 
      companyName: "",
      companyTicker: "",
      sumOfFCF: 0,
      cashAndCashEquivalents: 0,
      totalDebt: 0,
      sharesOutstanding: 0,
      wacc: 0,
      growthRate: 0
    }
  }

  resetDcfRequest(): void {
    this.dcfResponse = {
      companyName: "",
      companyTicker: "",
      sumOfFCF: 0,
      cashAndCashEquivalents: 0,
      totalDebt: 0,
      equityValue: 0,
      sharesOutstanding: 0,
      intrinsicValue: 0,
      creationDate: new Date()
    }
  }

  hasData(): boolean {
    return this.dcfResponse.companyName.trim() !== "" && this.dcfResponse.companyTicker.trim() !== "";
  }

  resetSearchBar(): void {
    this.searchBar = "";
  }

}
