

import { Component, OnInit, } from '@angular/core';
import { GoogleMapsModule} from '@angular/google-maps';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../environments/environment';
import { CrashService } from '../../crash.service';
import {MapDialogComponent} from '../view-map-detail/mapdialog.component'
import { MatDialog } from '@angular/material/dialog';


interface IAccident {
  address: string
  description: string,
  position:  google.maps.LatLngLiteral,
  accidentDate: Date,
  estimatedCost: number
}

@Component({
  selector: 'crash-map-accident',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RouterOutlet, GoogleMapsModule, MatExpansionModule, ReactiveFormsModule,
  ],
  templateUrl: './search-map.component.html',
  styleUrl: './search-map.component.scss',
})

export class SearchMapComponent  implements OnInit {

  markers: google.maps.marker.AdvancedMarkerElement[] = [];
  public map!: any;
  center: google.maps.LatLngLiteral = {
    lat: 53.540235028,
    lng: -113.49818175
  };
 rectangle!: google.maps.Rectangle
 crashsites: IAccident[]  = []
 rectangleArea!: any
 boundaryAddress1:string =""
 boundaryAddress2:string =""
 constructor(private crashservice:CrashService,private dialog: MatDialog ) { }

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
  infowindow! : google.maps.InfoWindow ; 
  ngOnInit() {
    // use googlemaps/js-api-loader to dynamically load google scripts, this is needed so that
    // we dont need to use google script url with exposed hardcoded API_Key in index.html
    this.loadAPIMapscript();
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
      this.rectangle= rectangle;
      this.defineDocumentElements(rectangle);
      this.getAreaBoundaryAddress()
    }
    catch (e) { }

  }


  haversine(lat1: any, lon1: any, lat2: any, lon2: any): number {
    const toRadians = (degrees: number) => degrees * Math.PI / 180;
    let R = 6371;
    const dlat = toRadians(lat2 - lat1);
    const dlon = toRadians(lon2 - lon1);

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return  R * c;
  }


  private calculateArea(north: any, south: any, east: any, west: any): number {
    const length = this.haversine(north, west, south, west);
    const averageLat = (north + south) / 2;
    const width = this.haversine(averageLat, west, averageLat, east);

    return length * width;
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
        if (eventName.toString()=="bounds_changed"){     
          this.getAreaBoundaryAddress()
        }
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
      .addEventListener("click", (event) =>  this.processMarkers() 
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
          this.markers[i].map= null
        }
        this.markers = [];
       this.infowindow?.close()
  }
  processMarkers(){
   
    this.getAccidentsWithinRectangle() 
  }

  getAreaBoundaryAddress(){

    let northwest:google.maps.LatLngLiteral =   {
      lat: this.rectangle.getBounds()?.toJSON().north!,
      lng:this.rectangle.getBounds()?.toJSON().west!
    }

    let southeast:google.maps.LatLngLiteral =   {
      lat: this.rectangle.getBounds()?.toJSON().south!,
      lng:this.rectangle.getBounds()?.toJSON().east!
    }
     this.crashservice.getInfoFromAddress(northwest).then((response) => {   
      if (response.results[0]) {
        this.boundaryAddress1=response.results[0].formatted_address;
        
      } else {
        window.alert("No results found");
     
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
   
    this.crashservice.getInfoFromAddress(southeast).then((response) => {
      if (response.results[0]) {
        this.boundaryAddress2= response.results[0].formatted_address;
       
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e)); 
   
  }

  getContentInfo(){
    let startDate:Date = this.crashsites.reduce((min, site) => 
        (site.accidentDate < min? site.accidentDate : min), this.crashsites[0]?.accidentDate);
    let EndDate:Date =this.crashsites.reduce((max, site) => 
        (site.accidentDate > max ? site.accidentDate : max), this.crashsites[0]?.accidentDate);
    let lowestAmount:number = this.crashsites.reduce((min, site) => 
        (site.estimatedCost < min? site.estimatedCost : min), this.crashsites[0]?.estimatedCost);
    let maxAmount:number =this.crashsites.reduce((max, site) => 
        (site.estimatedCost > max ? site.estimatedCost  : max), this.crashsites[0]?.estimatedCost );;
    let totalEstimatedCost=this.crashsites.reduce((total, site) => 
        total + site.estimatedCost, 0);
    let incidence=this.crashsites.length/this.rectangleArea 
    let rating: string = incidence<0.5?
           '<span style="background-color:MediumSeaGreen;">Low incidence </span>':   
           incidence<1?
            '<span style="background-color:yellow;" >Average incidence </span>'  :
            '<span style="background-color:red; display: inline-flex; align-items: center;"><img src="https://media.tenor.com/Ph2cKlohzRIAAAAi/health-warning.gif" style="width:50px;height:50px;">High incidence&nbsp;&nbsp; &nbsp;  </span>'  

   // let areaCovered: number = this.crashsites.reduce()
    var datePipe = new DatePipe('en-US');
      
      return (
          `<h3 class="font-bold bg-gray-500 text-white " align="center">&nbsp;Coverage Information</h3>
            <p class="font-semibold ..."> Region bound in quadrant</p>
              <p>NorthWest at  ${this.boundaryAddress1} </p>
              <p>SouthEast at ${this.boundaryAddress2} </p>
            <table>
            <thead>
                <tr>
                    <th><hr></th>
                    <th><hr></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Accident Count</td>
                    <td class="font-semibold ...">  
                     ${this.crashsites.length}</td>
                </tr>
               
                <tr>
                    <td>Period</td>
                    <td class="font-semibold ...">  
                    ${ datePipe.transform(startDate,"yyyy-MM-dd")} to ${datePipe.transform(EndDate,"yyyy-MM-dd")}  </td>
                </tr>
                <tr>
                <td>Range Damage</td>
                <td class="font-semibold ...">  
                ${(new CurrencyPipe('en-US')).transform(lowestAmount, '')} - ${(new CurrencyPipe('en-US')).transform(maxAmount, '')}  </td>
            </tr>
                <tr>
                    <td>Total Estimated Damage</td>
                    <td class="font-semibold ..."> 
                    ${(new CurrencyPipe('en-US')).transform(totalEstimatedCost, '')}</td>
                </tr>
                <tr>
                    <td>Area Covered (SqKm)</td>
                    <td class="font-semibold ..."> 
                    ${(new DecimalPipe('en-US')).transform(this.rectangleArea, '1.2-2')} </td>
                </tr>
                <tr>
                    <td>Incident Occurrence (per SqKm)</td>
                    <td class="font-semibold ..."> 
                    ${(new DecimalPipe('en-US')).transform(this.crashsites.length/this.rectangleArea, '1.2-2')}      </td>
                </tr>
                <tr>
                    <td>Rating</td>
                    <td class="font-semibold ...">  ${rating} </td>
                </tr>
            </tbody>
        </table>

             `
      )
    }

    
  putMarkers() {
  
      const carImg = document.createElement('img');
      carImg.src = '/assets/images/crash.png';
      this.clearMarkers()

      for (const crashsite of this.crashsites) {
            const AdvancedMarkerElement = this.createMarker(crashsite.position, crashsite)    
            this.markers.push(AdvancedMarkerElement)

      }

      let MapEdge:google.maps.LatLngLiteral =   {
        lat: this.rectangle.getBounds()?.toJSON().north!,
        lng:this.rectangle.getBounds()?.toJSON().west!
      }
        
 

      this.infowindow?.close()     
      this.infowindow = new google.maps.InfoWindow({
            content: this.getContentInfo(),
            position:MapEdge
        });  
        this.infowindow.open(this.map);
     
    }
  

  createMarker(position: google.maps.LatLng | google.maps.LatLngLiteral,   content?:any): google.maps.marker.AdvancedMarkerElement {
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
    marker.addListener('click', () => {
      this.openMapDialog(position.lat,position.lng)
        });
   marker.gmpClickable=true;
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
  getAccidentsWithinRectangle(){ 
    this.crashsites=[];
    this.rectangleArea = this.calculateArea(
      this.rectangle.getBounds()?.toJSON().north,
      this.rectangle.getBounds()?.toJSON().south,
      this.rectangle.getBounds()?.toJSON().east,
      this.rectangle.getBounds()?.toJSON().west,
     );


    this.crashservice.getAccidentsWithinRectangle(
          this.rectangle.getBounds()?.toJSON().north,
          this.rectangle.getBounds()?.toJSON().south,
          this.rectangle.getBounds()?.toJSON().east,
          this.rectangle.getBounds()?.toJSON().west,
      ).subscribe(
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
                },
                accidentDate: element.accidentDate,
                estimatedCost: element.estimatedCost
             });
         
         
          });
        this.putMarkers()
      }

  )
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
      
    });
  }
}
