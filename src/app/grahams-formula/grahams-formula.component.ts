import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GrahamsFormulaRequest } from '../dto/grahams-formula-request';
import { GrahamsFormulaResponse } from '../dto/grahams-formula-response';
import { NgForm } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import { LoadingService } from '../service/loading.service';

declare var bootstrap: any;

@Component({
  selector: 'app-grahams-formula',
  templateUrl: './grahams-formula.component.html',
  styleUrl: './grahams-formula.component.css'
})
export class GrahamsFormulaComponent implements OnInit {

  @ViewChild('dateRangeModal') dateRangeModal!: ElementRef;

  constructor(private appService: AppServiceService, private loadingService: LoadingService){}

  ngOnInit(): void {
    if (this.searchBar) {
      this.performSearch();
    }
  }

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
  searchBar: string = "";
  searchType: string = "companyName"
  placeholderText: string = "Search by company name";
  startDate!: string;
  endDate!: string;


  getAllCalculationsByTicker(){
    if (this.searchBar.trim()){
      this.loadingService.loadingOn();
      this.appService.getGrahamsValuationsByTicker(this.searchBar).subscribe({
        next: (response) => {
          this.grahamsCalculations = response;
          this.resetSearchBar();
          this.loadingService.loadingOff();
        },
        error: (err) => {
          console.error('Failed to load valuations:', err);
          this.loadingService.loadingOff();
        }
      })
    }
  }

  getAllCalculationsByCompanyName(){
    if (this.searchBar.trim()){
      this.loadingService.loadingOn();
      this.appService.getGrahamsValuationsByCompanyName(this.searchBar).subscribe({
        next: (response) => {
          this.grahamsCalculations = response;
          this.resetSearchBar();
          this.loadingService.loadingOff();
        },
        error: (err) => {
          console.error('Failed to load valuations:', err);
          this.loadingService.loadingOff();
        }
      })
    }
  }

  getCalculationsByDate(): void {
    if (this.startDate && this.endDate) {
      this.loadingService.loadingOn();
      this.appService.getGrahamsValuationsByDate(this.startDate, this.endDate).subscribe({
        next: (response) => {
          this.grahamsCalculations = response;
          this.loadingService.loadingOff();
        },
        error: (err) => {
          console.error('Failed to load valuations:', err);
          this.loadingService.loadingOff();
        }
      });
    }
  }

  handleSearchTypeChange(): void {
    if (this.searchType === 'date') {
      this.showModal();
    } else {
      this.updatePlaceholder();
    }
  }

  showModal(): void {
    const modalElement = this.dateRangeModal.nativeElement;
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }


  performSearch() {
    if (this.searchBar.trim()) {
      this.loadingService.loadingOn();
      if (this.searchType === "ticker") {
        this.getAllCalculationsByTicker();
      } else if (this.searchType === "companyName"){
        this.getAllCalculationsByCompanyName();
      } 
    }
  }

  updatePlaceholder(): void{
    this.placeholderText = this.searchType === "ticker" ? "Search by ticker" : "Search by company name"
    console.log("Updated placeholder to: ", this.placeholderText);
  }

  getPlaceholder(): string {
    return this.placeholderText;
  }

  calculateGrahamsValuation(form: NgForm): void {
    this.loadingService.loadingOn();
    if(form.valid){
        this.appService.sendGrahamsRequest(this.grahamsFormulaRequest).subscribe({
          next: (response) => {
            this.grahamsFormulaResponse = response;
            this.grahamsCalculations.push(response)
            this.resetModal();
            this.loadingService.loadingOff();
          }
        })
      }
      this.loadingService.loadingOff();
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

  resetSearchBar(): void {
    this.searchBar = "";
  }

  toggleDisplayMode(): void {
    this.showAllCalculations = !this.showAllCalculations;
  }
  
}
