import { Component } from '@angular/core';
import {IntakeComponent} from './intake/intake.component'

@Component({
    selector: 'crash-accident-report',
    standalone: true,
    templateUrl: './accident-report.component.html',
    imports: [IntakeComponent]
})
export class AccidentReportComponent {

}
