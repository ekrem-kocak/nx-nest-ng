import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { RegisterRequest } from '../../models/auth.model';

@Component({
  selector: 'eku-store-register-page',
  standalone: true,
  imports: [RegisterFormComponent],
  template: `
    <eku-store-register-form
      (registerSubmit)="onRegisterSubmit($event)"
    ></eku-store-register-form>
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
