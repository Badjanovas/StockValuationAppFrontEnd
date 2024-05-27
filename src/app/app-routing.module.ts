import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrahamsFormulaComponent } from './grahams-formula/grahams-formula.component';
import { DividendDiscountModelComponent } from './dividend-discount-model/dividend-discount-model.component';
import { DiscountedCashFlowComponent } from './discounted-cash-flow/discounted-cash-flow.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
{
  path: '',
  component: LoginComponent
},
{
  path: 'grahamsFormula',
  component: GrahamsFormulaComponent
},
{
  path: 'dividendDiscountModel',
  component: DividendDiscountModelComponent
},
{
  path: 'discountedCashFlow',
  component: DiscountedCashFlowComponent
},
{
  path: 'homePageComponent',
  component: HomePageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
