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
  @Input('value') _value: string = '';

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
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
      this.value = value;
    }
  }

  change(e: Event) {
    this.value = (e.target as HTMLInputElement).value;

    const errors = this.input?.errors;
    if (errors) {
      this.handleErrors(errors)
    } else {
      this.clearNotice()
    }
  }

  handleErrors(error: ValidationErrors) {
    switch (true) {
      case error['email']:
        this.setNotice('Email is invalid')
        break;
      case error['required']:
        this.setNotice('Email is invalid')
        break;
      default:
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
