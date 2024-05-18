import { Component, OnInit} from '@angular/core';
import { GrahamsFormulaRequest } from '../dto/grahams-formula-request';
import { GrahamsFormulaResponse } from '../dto/grahams-formula-response';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../service/loading.service';
import { GrahamsFormulaService } from '../service/grahams-formula.service';



@Component({
  selector: 'app-grahams-formula',
  templateUrl: './grahams-formula.component.html',
  styleUrl: './grahams-formula.component.css'
})
export class GrahamsFormulaComponent  {

  constructor(
    private grahamsService: GrahamsFormulaService,
    private loadingService: LoadingService
  ){}

  grahamsFormulaRequest: GrahamsFormulaRequest = {
    companyName: "",
    companyTicker: "",
    eps: 0,
    growthRate: 0,
    currentYieldOfBonds: 0
  }; 

  grahamsFormulaResponse: GrahamsFormulaResponse = {
    creationDate: new Date(),
    companyName: "",
    companyTicker: "",
    eps: 0,
    growthRate: 0,
    currentYieldOfBonds: 0,
    intrinsicValue: 0
  }

  grahamsCalculations: GrahamsFormulaResponse[] = [];
  showAllCalculations: boolean = false;
  startDate!: string;
  endDate!: string;
  searchType!: string;
  searchBar: string = "";


  deleteCalculation(calculationId: number): void{
      this.loadingService.loadingOn();
      this.grahamsService.deleteGrahamsValuation(calculationId).subscribe({
        next: () => {
          this.grahamsCalculations = this.grahamsCalculations.filter(item => item.id !== calculationId);
          this.resetGrahamsFormulaResponse();
          this.loadingService.loadingOff();
        },
        error: (err) => {
          console.error('Failed to delete Graham\'s valuation:', err);
          this.loadingService.loadingOff();
      }
    });
  }

  getAllCalculationsByTicker(): void{
    if (this.searchBar.trim()){
      this.loadingService.loadingOn();
      this.grahamsService.getGrahamsValuationsByTicker(this.searchBar).subscribe({
        next: (response) => {
          this.grahamsCalculations = response;
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
      this.grahamsService.getGrahamsValuationsByCompanyName(this.searchBar).subscribe({
        next: (response) => {
          this.grahamsCalculations = response;
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

  getCalculationsByDate(startDate: string, endDate: string): void {
    this.loadingService.loadingOn();
    this.grahamsService.getGrahamsValuationsByDate(startDate, endDate).subscribe({
      next: (response) => {
        this.grahamsCalculations = response;
        this.showAllCalculations = true;
        this.loadingService.loadingOff();
      },
      error: (err) => {
        console.error('Failed to load valuations:', err);
        this.loadingService.loadingOff();
      }
    });
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

  calculateGrahamsValuation(form: NgForm): void {
    this.loadingService.loadingOn();
    if(form.valid){
        this.grahamsService.sendGrahamsRequest(this.grahamsFormulaRequest).subscribe({
          next: (response) => {
            this.grahamsFormulaResponse = response;
            this.grahamsCalculations.push(response);
            this.showAllCalculations = false;
            this.resetModal();
            this.loadingService.loadingOff();
          },
          error: (err) => { 
            console.error('Failed to calculate Graham\'s valuation:', err);
            this.loadingService.loadingOff();
          }
        });
      } else{
      this.loadingService.loadingOff();
      }
  }

  resetModal(): void{
    this.grahamsFormulaRequest = { 
      companyName: "",
      companyTicker: "",
      eps: 0,
      growthRate: 0,
      currentYieldOfBonds: 0
    }
  }

  resetGrahamsFormulaResponse(): void{
   this.grahamsFormulaResponse = {
    creationDate: new Date(),
    companyName: "",
    companyTicker: "",
    eps: 0,
    growthRate: 0,
    currentYieldOfBonds: 0,
    intrinsicValue: 0
   }
  }

  resetSearchBar(): void {
    this.searchBar = "";
  }

  hasData(): boolean {
    return this.grahamsFormulaResponse.companyName.trim() !== "" && this.grahamsFormulaResponse.companyTicker.trim() !== "";
  }
  
}
