import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { RegisterRequest } from '../../models/auth.model';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterFormComponent],
  template: `
    <app-register-form
      (registerSubmit)="onRegisterSubmit($event)"
    ></app-register-form>
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
export class RegisterPageComponent {
  onRegisterSubmit(data: RegisterRequest): void {
    console.log(data);
  }
}
