import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'eku-store-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <eku-store-login-form
      (loginSubmit)="onLoginSubmit($event)"
    ></eku-store-login-form>
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
