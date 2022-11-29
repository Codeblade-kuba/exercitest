import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.css'],
})
export class AcceptanceComponent {
  @Input() name = '';
}
