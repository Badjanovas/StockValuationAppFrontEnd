import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../service/user.service';
import { LoadingService } from '../service/loading.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = { 
    userName: '',
    password: '',
    email: '' 
  };

  showModal: boolean = true;
  errorMessage: string | undefined;
  repeatPassword!: string;

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router,
  ) {}

  logIn(form: NgForm): void {
    if(!this.missingLogInFieldError(form)){
      return
    }
    this.loadingService.loadingOn();
    this.userService.logInUser(this.user).subscribe({
      next: () => {
        this.resetModal();
        this.router.navigate(['/homePageComponent']).then(() => {
          this.loadingService.loadingOff();
        });      
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
    this.userService.registerUser(this.user).subscribe({
      next: () => {
        this.resetModal();
        this.loadingService.loadingOff();
        window.location.reload();
        alert('Account created successfully.')
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
