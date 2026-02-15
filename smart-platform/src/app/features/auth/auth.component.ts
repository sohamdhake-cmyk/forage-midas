import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from '../../core/app-state.service';

type AuthTab = 'login' | 'register';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  activeTab: AuthTab = 'login';
  successMessage = '';

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
    private readonly appState: AppStateService
  ) {}

  setTab(tab: AuthTab): void {
    this.activeTab = tab;
    this.successMessage = '';
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.appState.updateUser({
      fullName: 'Returning User',
      email: this.loginForm.controls.email.value
    });

    this.successMessage = 'Login successful. Redirecting to dashboard...';
    window.setTimeout(() => {
      void this.router.navigate(['/dashboard']);
    }, 900);
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

    this.appState.updateUser({
      fullName: payload.fullName,
      email: payload.email
    });

    this.successMessage = 'Account created successfully. Redirecting to dashboard...';
    window.setTimeout(() => {
      void this.router.navigate(['/dashboard']);
    }, 900);
  }
}
