

import { Component, OnInit, } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../environments/environment';
import { CrashService } from '../../crash.service';



@Component({
  selector: 'crash-map-accident',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RouterOutlet, GoogleMapsModule, MatExpansionModule, ReactiveFormsModule,
  ],
  templateUrl: './search-map.component.html',
  styleUrl: './search-map.component.scss',
})


export class SearchMapComponent implements OnInit {
  markers: google.maps.marker.AdvancedMarkerElement[] = [];
  public map!: any;
  center: google.maps.LatLngLiteral = {
    lat: 53.540235028,
    lng: -113.49818175
  };

  crashsites = [{
    address: 'NW Edmonton',
    description: 'Incident 03/21/2024',
    position: {
      lat: 53.550235028,
      lng: -113.58818175,
    }
  }]
  

  constructor(private crashservice:CrashService) { }

  loadAPIMapscript() {

    let loader = new Loader({
      apiKey: environment.GOOGLE_API_KEY,
      version: "weekly",
      libraries: ["places"]
    });

    loader
      .importLibrary('maps').then(() => {
        this.initMap();
      })
      .catch((e) => {
      });
    loader
      .importLibrary('marker')
      .catch((e) => {
      });

  }

  ngOnInit() {
    // use googlemaps/js-api-loader to dynamically load google scripts, this is needed so that
    // we dont need to use google script url with exposed hardcoded API_Key in index.html
    this.loadAPIMapscript();
    this.getAccidents();
  }

  async initMap() {
    try {
      const map = await new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: {
            lat: 53.540235028,
            lng: -113.49818175
          },
          zoom: 12,
          mapId: "C4504f8b37365c3d0"
        }
      );

      this.map = map 
      const rectangle = this.defineMapRectangle();
      this.defineDocumentElements(rectangle)
    }
    catch (e) { }

  }
  private defineMapRectangle(): google.maps.Rectangle {
    //let map: any = this.map;
    const bounds = {
      south: 53.523896306239294, west: -113.50921751660157, north: 53.53513824916531, east: -113.48581633251953
    };

    // Define a rectangle and set its editable property to true.
    const rectangle = new google.maps.Rectangle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.15,
      bounds: bounds,
      editable: true,
      draggable: true,
    });

    rectangle.setMap(this.map);

    // listen to changes
    ["bounds_changed", "dragstart", "drag", "dragend",].forEach((eventName) => {
      rectangle.addListener(eventName, () => {
      
      });
    });
    return rectangle;
  }
  private defineDocumentElements(rectangle: google.maps.Rectangle) {
    let map: any = this.map;
    document
      .getElementById("delete-markers")!
      .addEventListener("click", (event) => this.clearMarkers());
    document
      .getElementById("put-markers")!
      .addEventListener("click", (event) =>  this.putMarkers(rectangle)
      );

      this.map.addListener("zoom_changed", () => {
        // Get the current bounds, which reflect the bounds before the zoom.
        rectangle.setOptions({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.15,
          map,
          bounds: rectangle.getBounds() as google.maps.LatLngBounds,
        });
      });
  
  }
  drop(): void {
    this.clearMarkers();
  
    for (let i = 0; i < this.crashsites.length; i++) {
      this.addMarkerWithTimeout(this.crashsites[i].position, i * 200);
    }
  }
  addMarkerWithTimeout(
    position: google.maps.LatLngLiteral,
    timeout: number
  ): void {
    let map=this.map
    window.setTimeout(() => {
      this.markers.push(
        new google.maps.marker.AdvancedMarkerElement({
          position: position,
          map,
        
        })
      );
    }, timeout);
  }
  clearMarkers(){    
        // Delete markers   
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].map = null
        }
        this.markers = [];
  }
  putMarkers(rectangle: google.maps.Rectangle) {
    {
      const carImg = document.createElement('img');
      carImg.src = '/assets/images/crash.png';
      this.clearMarkers()
      const isBetween= (num1: any, num2: any, value: any) => value >= num1 && value <= num2;
      
     //console.log(rectangle.getBounds()?.toJSON());

      for (const crashsite of this.crashsites) {
       // console.log(isBetween(rectangle.getBounds()?.toJSON().south, rectangle.getBounds()?.toJSON().north, crashsite.position.lat))
      //  console.log(isBetween(rectangle.getBounds()?.toJSON().west, rectangle.getBounds()?.toJSON().east, crashsite.position.lng));
      let valid = isBetween(rectangle.getBounds()?.toJSON().south, rectangle.getBounds()?.toJSON().north, crashsite.position.lat) &&
                  isBetween(rectangle.getBounds()?.toJSON().west,  rectangle.getBounds()?.toJSON().east, crashsite.position.lng)
         if (valid) 
          {        
            const AdvancedMarkerElement = this.createMarker(crashsite.position, crashsite)
           
            this.markers.push(AdvancedMarkerElement)
          }

      }
     
    }
  }
 
  createMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, content?:any): google.maps.marker.AdvancedMarkerElement {
    const carImg = document.createElement('img');
    carImg.src = '/assets/images/crash.png';
    carImg.width=23;
    carImg.height=23;
    const thecontent=this.buildContent(content)
    
    var marker = new google.maps.marker.AdvancedMarkerElement({
      position: position,
      map: this.map,
      title: 'markers',
      content: content!=null? carImg : thecontent ,
    });
   // marker.content?.parentElement?.classList.add("bounce")
   return marker
 
  }

  private buildContent(crashsite: any) {
    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
      <div class="icon">
         <img src='/assets/images/crash.png' width="72%" height="72%">
         <p>{crashsite.description}</p>
      </div>
      `;
    return content;
  }
  getAccidents(){
    this.crashservice.getAccidents().subscribe(
        (res)=>{

          const dataArray: any[] = Array.isArray(res) ? res : [res]; 
          dataArray.forEach(element => {
              this.crashsites.push(
                {
                  address: element.location,
                  description: '',
                  position: {
                    lat: element.latitude,
                    lng: element.longitude 
                  }
               });
           
           
            });
            
        }

    )
  
  }

}
