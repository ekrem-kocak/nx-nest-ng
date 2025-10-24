import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatIconModule],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
    >
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="flex items-center justify-center mb-4">
            <mat-icon class="text-4xl text-indigo-600 mr-2">store</mat-icon>
            <h1 class="text-3xl font-bold text-gray-800">Store Admin</h1>
          </div>
          <p class="text-gray-600">Welcome to the admin panel</p>
        </div>

        <mat-card class="shadow-xl border-0">
          <mat-card-content class="p-8">
            <router-outlet></router-outlet>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class AuthLayoutComponent {}
