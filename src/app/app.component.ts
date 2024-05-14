import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { AppServiceService } from './service/app-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stockValuationAppFront';


}
