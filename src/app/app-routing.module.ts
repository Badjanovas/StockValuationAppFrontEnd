import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GrahamsFormulaComponent } from './grahams-formula/grahams-formula.component';


const routes: Routes = [
{
  path: '',
  component: HomePageComponent
},
{
  path: 'grahamsFormula',
  component: GrahamsFormulaComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
