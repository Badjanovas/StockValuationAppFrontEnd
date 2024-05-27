import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GrahamsFormulaComponent } from './grahams-formula/grahams-formula.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DividendDiscountModelComponent } from './dividend-discount-model/dividend-discount-model.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DiscountedCashFlowComponent } from './discounted-cash-flow/discounted-cash-flow.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from './chart/chart.component';
import { LoginComponent } from './login/login.component';
import { AppfooterComponent } from './appfooter/appfooter.component';





@NgModule({ 
    declarations: [
        AppComponent,
        HomePageComponent,
        LoadingComponent,
        GrahamsFormulaComponent,
        NavbarComponent,
        DividendDiscountModelComponent,
        SearchBarComponent,
        DiscountedCashFlowComponent,
        ChartComponent,
        LoginComponent,
        AppfooterComponent
    ],
    bootstrap: [
        AppComponent
    ],
     imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatProgressSpinnerModule,
        NgApexchartsModule
    ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] 
})
export class AppModule { }
