import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const ERROR_MESSAGES: { [key: string]: (err: ValidationErrors) => string } = {
  required: () => `This field is required`,
  email: () => `Please enter a valid email address`,
  minlength: (err) =>
    `You must enter at least ${err['requiredLength']} characters`,
  maxlength: (err) =>
    `You can enter at most ${err['requiredLength']} characters`,
};

@Pipe({
  name: 'validationErrors',
  standalone: true,
})
export class ValidationErrorsPipe implements PipeTransform {
  transform(errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }

    const errorKey = Object.keys(errors)[0];

    if (ERROR_MESSAGES[errorKey]) {
      return ERROR_MESSAGES[errorKey](errors[errorKey]);
    }
    return 'Invalid value';
  }
}
