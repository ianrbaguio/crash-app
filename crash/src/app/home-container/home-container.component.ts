import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AccidentReportComponent } from "../accident-report-container/accident-report.component";

@Component({
    selector: 'crash-home-container',
    standalone: true,
    templateUrl: './home-container.component.html',
    styleUrl: './home-container.component.scss',
    imports: [HomeComponent, AccidentReportComponent]
})
export class HomeContainerComponent {}
