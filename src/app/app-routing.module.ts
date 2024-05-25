import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GrahamsFormulaComponent } from './grahams-formula/grahams-formula.component';
import { DividendDiscountModelComponent } from './dividend-discount-model/dividend-discount-model.component';
import { DiscountedCashFlowComponent } from './discounted-cash-flow/discounted-cash-flow.component';


const routes: Routes = [
{
  path: 'home',
  component: HomePageComponent
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
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
