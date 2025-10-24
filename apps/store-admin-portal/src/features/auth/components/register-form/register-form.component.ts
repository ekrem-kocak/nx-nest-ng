import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
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
import { RegisterRequest } from '../../models/auth.model';

@Component({
  selector: 'app-register-form',
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
        class="space-y-4"
      >
        <mat-form-field>
          <mat-label>Full Name</mat-label>
          <input matInput type="text" formControlName="name" />
          <mat-icon matSuffix>person</mat-icon>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Email</mat-label>
          <input
            matInput
            type="email"
            formControlName="email"
            autocomplete="email"
          />
          <mat-icon matSuffix>email</mat-icon>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Password</mat-label>
          <input
            matInput
            type="password"
            formControlName="password"
            autocomplete="new-password"
          />
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          class="w-full h-12 text-lg font-medium"
          [disabled]="registerForm.invalid"
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
      :host {
        display: block;
        width: 100%;

        mat-form-field {
          width: 100%;
        }
      }
    `,
  ],
})
export class RegisterFormComponent {
  registerSubmit = output<RegisterRequest>();

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
