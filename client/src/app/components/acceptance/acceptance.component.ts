import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcceptanceComponent),
      multi: true,
    },
  ],
})
export class AcceptanceComponent implements ControlValueAccessor {
  // TODO: Fix default checked state
  notice = ''
  @Input('input') input: FormControl<boolean | null> | null = null;
  @Input() name = '';
  @Input('value') value = false;

  getValue() {
    return this.value;
  }

  setValue(value: boolean) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  change() {
    this.setValue(!this.value)
    console.log(`touched: ${this.input?.touched}\nerrors: ${this.input?.errors}`)
  }

  getError() {
    if (!this.input?.errors) return '';

    let error = ''
    switch (true) {
      case this.input.errors.hasOwnProperty('required'):
        error = 'This acceptance is required'
        break;
      default:
        error = 'Value is invalid'
        break;
    }
    return error;
  }
}
