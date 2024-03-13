import { Component } from '@angular/core';
import { ViewAccidentsComponent } from './view-accidents/view-accidents.component';

@Component({
  selector: 'crash-view-accidents-container',
  standalone: true,
  imports: [ViewAccidentsComponent],
  templateUrl: './view-accidents-container.component.html',
  styleUrl: './view-accidents-container.component.scss'
})
export class ViewAccidentsContainerComponent {

}
