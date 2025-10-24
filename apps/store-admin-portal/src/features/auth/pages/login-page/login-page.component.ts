import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <app-login-form (loginSubmit)="onLoginSubmit($event)"></app-login-form>
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
export class LoginPageComponent {
  onLoginSubmit(data: LoginRequest): void {
    console.log(data);
  }
}
