import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GrahamsFormulaComponent } from './grahams-formula/grahams-formula.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DividendDiscountModelComponent } from './dividend-discount-model/dividend-discount-model.component';
import { SearchBarComponent } from './search-bar/search-bar.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoadingComponent,
    GrahamsFormulaComponent,
    NavbarComponent,
    FooterComponent,
    DividendDiscountModelComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
