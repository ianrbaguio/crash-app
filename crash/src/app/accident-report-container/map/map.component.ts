

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule} from '@angular/common';
import { CrashService } from '../../crash.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'crash-map',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, GoogleMapsModule,  MatExpansionModule, ReactiveFormsModule,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})


export class MapComponent implements OnInit {
  constructor(private crashservice: CrashService, private http: HttpClient) { }
 

  loadAPIMapscript() {

    let loader = new Loader({
      apiKey: environment.GOOGLE_API_KEY,
      version: "weekly",
      libraries: ["places"]
    });

    loader
      .importLibrary('maps')
      .catch((e) => {  
      });

  }

  ngOnInit() {
    // use googlemaps/js-api-loader to dynamically load google scripts, this is needed so that
    // we dont need to use google script url with exposed hardcoded API_Key in index.html
  
    this.loadAPIMapscript()
  }
 
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  markerPositions: google.maps.LatLngLiteral[] = [{ lat: 53.540235028, lng: -113.49818175 }];// default to downtown edmonton
  zoom = 11;
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 53.540235028,
    lng: -113.49818175
  };
  icon!: google.maps.Icon;
  panelOpenState = false;
  public map!: GoogleMap;
  WeatherData!: any;
  AddressData!: any;
  public weathericon: string = '';
  public location: string = '';
  public weatherconditions: string = '';
  public eventData: string='';

  @Output() m_weather = new EventEmitter<string>()
  @Output() m_address = new EventEmitter<string>();
  @Output() m_weathericon = new EventEmitter<string>();
  @Output() m_latng = new EventEmitter<google.maps.LatLngLiteral>();
  @Output() m_eventdata = new EventEmitter<string | null>();
  @Output() m_streetview = new EventEmitter<any | null>();
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = (event.latLng.toJSON());
    if (event.latLng != null)
      this.center.lat = event.latLng.lat();

  }

  zoomIn() {
    if (this.options.maxZoom != null)
      if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.options.minZoom != null)
      if (this.zoom > this.options.minZoom) this.zoom--;
  }
  click(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
    if (event.latLng != null)
      this.center.lng = event.latLng.lng();

    this.markerPositions = [{ lat: this.center.lat, lng: this.center.lng }];
  }

  public getIcon(): google.maps.Icon {
    let ret: google.maps.Icon = {
      url: ''
    }
    return ret;
  }
  collectInformation() {

    this.setWeather();
    this.setInfoFromAddress(this.center);
    this.searchNearLandmark(this.center); 
    this.getSpeedLimit();  
  }

  setInfoFromAddress(latlng: any) {
    let infowindow = new google.maps.InfoWindow();
    this.crashservice.getInfoFromAddress(latlng)
      .then((response) => {
        if (response.results[0]) {
  
          this.location = response.results[0].formatted_address;
          infowindow.setContent(response.results[0].formatted_address);
          this.m_address.emit(this.location);
          this.getStreetViewImage(latlng);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));


  }
  getView(url: string) {
    return "";
  }
  getStreetViewImage(latlng: any) {
    const streetViewService = new google.maps.StreetViewService();
    const STREETVIEW_MAX_DISTANCE = 50;

    streetViewService.getPanorama({ location: latlng, radius: STREETVIEW_MAX_DISTANCE }, (data, status) => {
      if (status === google.maps.StreetViewStatus.OK) {
        if (data && data.location) {
          const panorama = data.location.pano;
          const streetViewImageUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&pano=${panorama}&key=${environment.GOOGLE_API_KEY}`;
          this.fetchAndStoreImage(streetViewImageUrl)     
        } else {
          window.alert("Street View data not available.");
        }
      } else {
        window.alert("Street View not available at this location.");
        this.m_streetview.emit(null);
      }
    });
  }
 
// save the streetview as default image
private fetchAndStoreImage(url: string) {
  this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
    this.m_streetview.emit(blob);
  });
}

  getSpeedLimit() {
    let addresses:google.maps.LatLngLiteral[]=[];
    addresses.push(this.center);
    this.crashservice.getSpeedLimit(addresses).subscribe(
      (res: any) => {
        this.eventData = res;
        this.m_eventdata.emit(this.eventData);
      },
      (error: any) => {
          console.error('Error 400: Bad Request', error);
          this.m_eventdata.emit(null);     
      }
    );

  }
  searchNearLandmark(latlng: any) {
    this.crashservice.getNearbyPlacesV2(latlng.lat, latlng.lng)
      .subscribe(
        (res: any) => {       
           
        });

  }
  
  setWeather() {

    const radius = 1000;
    this.crashservice.getWeather(this.center.lat, this.center.lng, radius)
      .subscribe(
        (res: any) => {
          this.WeatherData = res;
            this.weatherconditions = this.WeatherData.name + ": " +
            this.WeatherData.weather[0].description + " Temp: " +
            this.WeatherData.main.temp + " C Wind Speed: " +
            this.WeatherData.wind.speed + " kph Gust: " +
            this.WeatherData.wind.gust + " kph Visibility: " +
             this.WeatherData.visibility;
            this.weathericon = this.WeatherData.weather[0].icon;
             this.m_weather.emit(this.weatherconditions);
            this.m_weathericon.emit(this.WeatherData.weather[0].icon)
            this.m_latng.emit(this.center);
      
        });


  }

}
