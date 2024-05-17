import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @ViewChild('dateRangeModal') dateRangeModal!: ElementRef;

  @Output() searchPerformed = new EventEmitter<{ 
    searchType: string, 
    searchValue: string, 
    startDate?: string, 
    endDate?: string 
  }>();

  placeholderText: string = "Search by company name";
  searchType: string = "companyName";
  searchBar: string = "";
  startDate: string = "";
  endDate: string = "";

  getPlaceholder(): string {
    return this.placeholderText;
  }

  handleSearchTypeChange(): void {
    if (this.searchType === 'date') {
      this.showModal();
    } else {
      this.updatePlaceholder();
    }
  }

  updatePlaceholder(): void{
    if (this.searchType === "ticker") {
      this.placeholderText = "Search by ticker";
    } else if (this.searchType === "companyName") {
      this.placeholderText = "Search by company name";
    }
  }

  showModal(): void {
    const modalElement = this.dateRangeModal.nativeElement;
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }
  
  performSearch(): void {
    if (this.searchType === 'date') {
      this.showModal();
    } else {
      this.searchPerformed.emit({ searchType: this.searchType, searchValue: this.searchBar });
    }
  }

  applyDateRange(): void {
    this.searchPerformed.emit({ searchType: 'date', searchValue: '', startDate: this.startDate, endDate: this.endDate });
  }
}
