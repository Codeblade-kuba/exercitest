import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() input: FormControl | null = null;
  @Input() name = '';
  @Input() label = '';
  @Input() type = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  value: string = '';
  writeValue(value: string) {
    this.value = value;
  }

  onModelChange(event: string) {
    this.value = event;

    this.onChange(event);
    this.onTouched();
  }

  getError() {
    if (!this.input?.errors) return '';

    let error = '';
    switch (true) {
      case this.input.errors.hasOwnProperty('email'):
        error = 'Email is invalid';
        break;
      case this.input.errors.hasOwnProperty('required'):
        error = 'Field is required';
        break;
      case this.input.errors.hasOwnProperty('minlength'):
        error = 'Value is too short';
        break;
      case this.input.errors.hasOwnProperty('maxlength'):
        error = 'Value is too long';
        break;
      case this.input.errors.hasOwnProperty('passwordpattern'):
        error =
          'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
        break;
      case this.input.errors.hasOwnProperty('passwordconfirmed'):
        error = "Passwords don't match";
        break;
      default:
        error = 'Value is invalid';
        break;
    }
    return error;
  }
}
