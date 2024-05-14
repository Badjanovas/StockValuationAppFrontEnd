import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import { LoadingService } from '../service/loading.service';
import { Router } from '@angular/router';
import { User } from '../user';




@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  user: User = { 
    userName: '',
    password: '',
    email: '' 
  };

  showModal: boolean = true;
  errorMessage: string | undefined;
  repeatPassword!: string;

  constructor(
    private appService: AppServiceService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  logIn(form: NgForm): void {
    if(!this.missingLogInFieldError(form)){
      return
    }
    this.loadingService.loadingOn();
    this.appService.logInUser(this.user).subscribe({
      next: () => {
        this.resetModal();
        this.router.navigate(['/grahamsFormula']);
        this.loadingService.loadingOff(); 
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loadingService.loadingOff();
      }
    });
  }

  register(form: NgForm): void {
    if (!this.validateRegistrationForm(form)) {
      return;
    }
    this.loadingService.loadingOn();
    this.appService.registerUser(this.user).subscribe({
      next: () => {
        this.resetModal();
        this.loadingService.loadingOff();
        window.location.reload();
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loadingService.loadingOff();
      }
    });
  }

  resetModal(): void {
    this.errorMessage = "";
    this.repeatPassword = "";
    this.user = { userName: '', password: '', email: '' };
  }

  validatePassword(): boolean {
    if (this.user.password !== this.repeatPassword) {
      this.errorMessage = "Passwords do not match.";
      return false;
    }
    return true;
  }

  missingRegisterFieldError(form: NgForm): boolean {
    if (!form.controls['userName'].value) {
      this.errorMessage = "User name field is empty.";
      return false;
    } else if (!form.controls['email'].value) {
      this.errorMessage = "Email field is missing.";
      return false;
    } else if (!form.controls['password'].value) {
      this.errorMessage = "Password field is empty.";
      return false;
    } else if (!this.repeatPassword) {
      this.errorMessage = "Repeat password field is missing.";
      return false;
    } else{
      return true;
    }
  }

  missingLogInFieldError(form: NgForm): boolean {
    if (!form.controls['userName'].value) {
      this.errorMessage = "User name field is empty.";
      return false;
    } else if (!form.controls['password'].value) {
      this.errorMessage = "Password field is empty.";
      return false;
  }
  return true;
}

  passwordLengthValidator(): boolean {
    if (this.user.password.length < 6) {
      this.errorMessage = "Password has to be longer than 6 characters.";
      return false;
    }
    return true;
  }

  validateRegistrationForm(form: NgForm): boolean {
    if (!form.valid) {
      this.missingRegisterFieldError(form);
      return false;
    }
    if (!this.passwordLengthValidator()) {
      return false;
    }
    if (!this.validatePassword()) {
      return false;
    }
    return true; 
  }
}
