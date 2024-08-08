import { Component } from '@angular/core';
import {AccidentDetailsComponent} from './accident-details/accident-details.component';

@Component({
  selector: 'crash-accident-details-container',
  standalone: true,
  imports: [AccidentDetailsComponent],
  templateUrl: './accident-details-container.component.html',
  styleUrl: './accident-details-container.component.scss'
})
export class AccidentDetailsContainerComponent {

}
