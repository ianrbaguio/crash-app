import { Component } from '@angular/core';
import { ViewAccidentsComponent } from './view-accidents/view-accidents.component';
import { SearchMapComponent } from "./view-map-accidents/search-map.component";
import {MatCheckboxModule} from '@angular/material/checkbox';
 
@Component({
    selector: 'crash-view-accidents-container',
    standalone: true,
    templateUrl: './view-accidents-container.component.html',
    styleUrl: './view-accidents-container.component.scss',
    imports: [ViewAccidentsComponent, SearchMapComponent,  MatCheckboxModule]
})
export class ViewAccidentsContainerComponent {
 
    viewMapCrashSites: boolean = false;
 
}
