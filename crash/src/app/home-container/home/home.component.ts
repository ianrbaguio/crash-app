
import { Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'crash-home',
  standalone: true,
  imports: [MatButtonModule,MatGridListModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

}
