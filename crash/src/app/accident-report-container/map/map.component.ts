

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CrashService } from '../../crash.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'crash-map',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RouterOutlet, GoogleMapsModule,  MatExpansionModule, ReactiveFormsModule,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})


export class MapComponent implements OnInit {

  constructor(private crashservice: CrashService) { }

  loadAPIMapscript() {

    let loader = new Loader({
      apiKey: environment.GOOGLE_API_KEY,
      version: "weekly",
      libraries: ["places"]
    });

    loader
      .importLibrary('maps')
      /*  
      dynamic loading of map does not work
      .then(({Map}) => {
          new google.maps.Map(document.getElementById("map") as HTMLElement,this.options);
       })  */
      .catch((e) => {
        // do something
        console.log("error caught");
        console.log(e);
      });

  }

  ngOnInit() {
    // use googlemaps/js-api-loader to dynamically load google scripts, this is needed so that
    // we dont need to use google script url with exposed hardcoded API_Key in index.html
    // this.loadAPI();
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

  @Output() m_weather = new EventEmitter<string>()
  @Output() m_address = new EventEmitter<string>();
  @Output() m_weathericon = new EventEmitter<string>();


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

    this.getWeather();
    this.getInfoFromAddress(this.center);
    //this.searchNearLandmark(this.center); -- placesAPI is call spits cross-origin error
  }

  getInfoFromAddress(latlng: any) {

    let geocoder = new google.maps.Geocoder();
    let infowindow = new google.maps.InfoWindow();
    geocoder.geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {

          this.location = response.results[0].formatted_address;
          infowindow.setContent(response.results[0].formatted_address);
          this.m_address.emit(this.location);

        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));


  }
  //RoadAPI calls requires premium subscription
  getSpeedLimit(addresses: any) {
    let places = "placeID=";
    for (let i = 0; i < addresses.length; i++) {
      places += addresses[i].place_id + "&"
    }

  }
  searchNearLandmark(latlng: any) {
    this.crashservice.getNearbyPlaces(latlng.lat, latlng.lng)
      .subscribe(
        (res: any) => {
          console.log(res.results);

          /* this.spawnPlaces(res.results) */
        });

  }
    /*  private spawnPlaces(landmarks:any[]){
      console.log(landmarks.length)
      if (landmarks.length>0)
      for(let i=0; i<2; i++){
        this.crashservice.getPlacesDetail(landmarks[i].place_id).subscribe(
            (res1:any) => {
              let v=res1.result; 
            }
        ); 
      }  
    } */
  getWeather() {

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

        });


  }

}
