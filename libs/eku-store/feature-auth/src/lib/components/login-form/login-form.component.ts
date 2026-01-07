import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import {
  EkuErrorStateMatcher,
  ValidationErrorsPipe,
} from '@nx-nest-ng/ui-common';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'eku-store-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ValidationErrorsPipe,
  ],
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
        <p class="text-gray-600">Sign in to your account</p>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-2">
        <mat-form-field>
          <mat-label>Email</mat-label>
          <input
            matInput
            type="email"
            formControlName="email"
            autocomplete="email"
            [errorStateMatcher]="matcher()"
          />
          <mat-icon matSuffix>email</mat-icon>
          <mat-error>{{
            loginForm.get('email')?.errors | validationErrors
          }}</mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Password</mat-label>
          <input
            matInput
            type="password"
            formControlName="password"
            autocomplete="current-password"
            [errorStateMatcher]="matcher()"
          />
          <mat-icon matSuffix>lock</mat-icon>
          <mat-error>{{
            loginForm.get('password')?.errors | validationErrors
          }}</mat-error>
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          class="w-full"
          [disabled]="loginForm.invalid || loginForm.pending"
        >
          <span>Sign In</span>
        </button>
      </form>

      <div class="text-center">
        <p class="text-gray-600">
          Don't have an account?
          <a
            routerLink="/auth/register"
            class="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      mat-form-field {
        @apply w-full;
      }
    `,
  ],
})
export class LoginFormComponent {
  matcher = signal(new EkuErrorStateMatcher());
  loginSubmit = output<LoginRequest>();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    this.loginSubmit.emit(this.loginForm.value);
  }
}
