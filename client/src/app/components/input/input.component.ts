import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

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
  notice = '';
  @Input() input: FormControl | null= null;
  @Input() name = '';
  @Input() label = '';
  @Input() type = '';
  @Input('value') value: string = '';

  getValue() {
    return this.value;
  }

  setValue(newValue: string) {
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }

  onChange: (val?: string) => void = () => {};

  onTouched: () => void = () => {};

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(value: string) {
    if (value) {
      this.setValue(value);
    }
  }

  change(e: Event) {
    this.setValue((e.target as HTMLInputElement).value)

    const errors = this.input?.errors;
    if (errors) {
      this.handleErrors(this.input, errors)
    } else {
      this.clearNotice()
    }
  }

  handleErrors(input: any, error: ValidationErrors) {
    switch (true) {
      case error.hasOwnProperty('email'):
        this.setNotice('Email is invalid')
        break;
      case error.hasOwnProperty('required'):
        this.setNotice('Field is required')
        break;
      case error.hasOwnProperty('minlength'):
        this.setNotice('Value is too short')
        break;
      case error.hasOwnProperty('maxlength'):
        this.setNotice('Value is too long')
        break;
      case error.hasOwnProperty('passwordpattern'):
        this.setNotice('Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number')
        break;
      case error.hasOwnProperty('passwordconfirmed'):
        this.setNotice("Passwords don't match")
        break;
      default:
        this.setNotice('Value is invalid')
        break;
    }
  }

  setNotice(notice: string) {
    this.notice = notice;
  }
  
  clearNotice() {
    this.setNotice('')
  }

  getNotice() {
    return this.notice;
  }
}
