import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import {
  EkuErrorStateMatcher,
  ValidationErrorsPipe,
} from '@nx-nest-ng/ui-common';
import { RegisterRequest } from '../../models/auth.model';

@Component({
  selector: 'eku-store-register-form',
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
    MatCheckboxModule,
    ValidationErrorsPipe,
  ],
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Sign Up</h2>
        <p class="text-gray-600">Create a new account</p>
      </div>

      <form
        [formGroup]="registerForm"
        (ngSubmit)="onSubmit()"
        class="space-y-2"
      >
        <mat-form-field>
          <mat-label>Full Name</mat-label>
          <input
            matInput
            type="text"
            formControlName="name"
            [errorStateMatcher]="matcher()"
          />
          <mat-icon matSuffix>person</mat-icon>
          <mat-error>{{
            registerForm.get('name')?.errors | validationErrors
          }}</mat-error>
        </mat-form-field>

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
            registerForm.get('email')?.errors | validationErrors
          }}</mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Password</mat-label>
          <input
            matInput
            type="password"
            formControlName="password"
            autocomplete="new-password"
            [errorStateMatcher]="matcher()"
          />
          <mat-icon matSuffix>lock</mat-icon>
          <mat-error>{{
            registerForm.get('password')?.errors | validationErrors
          }}</mat-error>
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          class="w-full"
          [disabled]="registerForm.invalid || registerForm.pending"
        >
          <span>Create Account</span>
        </button>
      </form>

      <div class="text-center">
        <p class="text-gray-600">
          Already have an account?
          <a
            routerLink="/auth/login"
            class="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer"
          >
            Sign in
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
export class RegisterFormComponent {
  matcher = signal(new EkuErrorStateMatcher());
  registerSubmit = output<RegisterRequest>();

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
    ]),
  });

  onSubmit(): void {
    this.registerSubmit.emit(this.registerForm.value);
  }
}
