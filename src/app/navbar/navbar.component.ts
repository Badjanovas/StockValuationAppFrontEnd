import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ){}

  navigateToDividendDiscountPage(): void{
    this.loadingService.loadingOn();
    this.router.navigate(['/dividendDiscountModel']).then(() => {
      this.loadingService.loadingOff();
    });
  }

  navigateToGrahamsPage(): void{
    this.loadingService.loadingOn();
    this.router.navigate(['/grahamsFormula']).then(() => {
      this.loadingService.loadingOff();
    });
  }

  navigateToHomePage(): void{
    this.loadingService.loadingOn();
    this.router.navigate(['/homePageComponent']).then(() => {
      this.loadingService.loadingOff();
    })
  }

  navigateToDiscountedCashFlowPage(): void{
    this.loadingService.loadingOn();
    this.router.navigate(['discountedCashFlow']).then(() => {
      this.loadingService.loadingOff();
    });  
  }

}
