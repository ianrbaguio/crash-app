

import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CrashService } from '../../crash.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../environments/environment';
import { ViewChild } from '@angular/core';
import { MapDialogComponent } from '../../view-accidents-container/view-map-detail/mapdialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'accident-map',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RouterOutlet, GoogleMapsModule,  MatExpansionModule, ReactiveFormsModule,
  ],
  templateUrl: './accidentmap.component.html',
  styleUrl: './accidentmap.component.scss'
})


export class AccidentMapComponent implements OnInit, AfterViewInit, OnChanges  {
  public map!:any
  @ViewChild(GoogleMap, { static: false }) dmap!: google.maps.Map 
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow
  @ViewChild(MapAdvancedMarker) marker!: MapAdvancedMarker
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  markerPositions: google.maps.LatLngLiteral[] = [];// default to downtown edmonton
  zoom = 12;
  display: any;
  @Input() center!: google.maps.LatLngLiteral ;
  carImg!: any
  panelOpenState = true;
  constructor(private crashservice: CrashService,private dialog: MatDialog) { }
  
  ngAfterViewInit(): void {
    this.carImg = document.createElement('img');
    this.carImg.src = '/assets/images/crash.png';
    

    this.marker.advancedMarker.addListener('click', () => {
      this.openMapDialog(this.center.lat,this.center.lng)
        });
  }
  openMapDialog(_mlat:any, m_lng:any): void {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: '600px', 
      height: '400px', 
      data: {
        lat: _mlat,
        lng: m_lng
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Map dialog closed');
    });
  }
  loadAPIMapscript() {
    let loader = new Loader({
      apiKey: environment.GOOGLE_API_KEY,
      version: "weekly",
      libraries: ["places"]
    })

    loader
      .importLibrary('maps')
  }

  ngOnInit() {
    // use googlemaps/js-api-loader to dynamically load google scripts, this is needed so that
    // we dont need to use google script url with exposed hardcoded API_Key in index.html
    // this.loadAPI();
    this.loadAPIMapscript()
   
  }
  ngOnChanges(changes: SimpleChanges): void {}
  moveMap(event: google.maps.MapMouseEvent) {}

  zoomIn() {
    if (this.options.maxZoom != null)
      if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.options.minZoom != null)
      if (this.zoom > this.options.minZoom) this.zoom--;
  }
 

}
