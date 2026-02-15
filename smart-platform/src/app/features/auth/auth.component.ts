import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendApiService } from '../../core/backend-api.service';

type AuthTab = 'login' | 'register';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  activeTab: AuthTab = 'login';
  successMessage = '';
  errorMessage = '';

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  readonly registerForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly api: BackendApiService
  ) {}

  setTab(tab: AuthTab): void {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.api.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.successMessage = 'Login successful. Redirecting to dashboard...';
        window.setTimeout(() => {
          void this.router.navigate(['/dashboard']);
        }, 900);
      },
      error: () => {
        this.errorMessage = 'Backend unavailable. Please start Spring Boot server on port 8080.';
      }
    });
  }

  submitRegister(): void {
    this.registerForm.controls.confirmPassword.setErrors(null);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload = this.registerForm.getRawValue();
    if (payload.password !== payload.confirmPassword) {
      this.registerForm.controls.confirmPassword.setErrors({ mismatch: true });
      return;
    }

    this.errorMessage = '';
    this.api.register(payload).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully. Redirecting to dashboard...';
        window.setTimeout(() => {
          void this.router.navigate(['/dashboard']);
        }, 900);
      },
      error: () => {
        this.errorMessage = 'Backend unavailable. Please start Spring Boot server on port 8080.';
      }
    });
  }
}
