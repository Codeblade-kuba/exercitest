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
  @Input('input') input: FormControl<boolean | null> | null = null;
  @Input() name = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  checked: boolean = false;
  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(event: boolean) {
    this.checked = event;

    this.onChange(event);
    this.onTouched()
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
