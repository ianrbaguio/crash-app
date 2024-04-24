import { Component, Input, OnInit, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Loader } from '@googlemaps/js-api-loader';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-google-map-dialog',
  template: `
    <div id="mapd" style="height: 800px;" >
  `,
  styles: [
    `.ui-button {
    background-color: #fff;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
    margin: 10px;
    padding: 0 0.5em;
    font: 400 18px Roboto, Arial, sans-serif;
    overflow: hidden;
    height: 40px;
    cursor: pointer;
  } 
   `] 
})


export class MapDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<MapDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

 
  public map!: any;
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
    this.drawMarker()
   
  }
  drawMarker(){
    let center:google.maps.LatLngLiteral  = {
        lat: this.data.lat,
        lng: this.data.lng
    };
    const carImg = document.createElement('img');
    carImg.width=23;
    carImg.height=23;
    carImg.src = '/assets/images/crash.png';
    var marker = new google.maps.marker.AdvancedMarkerElement({
        position:  center ,
        map: this.map,
        title: 'markers',
        content:  carImg ,
  
      });
  }
  async initMap()  {
    const map = new google.maps.Map(
      document.getElementById("mapd") as HTMLElement,
      {
        center: {
            lat: this.data.lat,
            lng: this.data.lng
        },
        zoom: 18,
        heading: 320,
        tilt: 47.5,
        mapId: "90f87356969d889c",
      }
    );
   this.map=map;
    const buttons: [string, string, number, google.maps.ControlPosition][] = [
      ["Rotate Left", "rotate", 20, google.maps.ControlPosition.LEFT_CENTER],
      ["Rotate Right", "rotate", -20, google.maps.ControlPosition.RIGHT_CENTER],
      ["Tilt Down", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
      ["Tilt Up", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
    ];
  
    buttons.forEach(([text, mode, amount, position]) => {
      const controlDiv = document.createElement("div");
      const controlUI = document.createElement("button");
  
      controlUI.classList.add("ui-button");
      controlUI.innerHTML = `<span class="text-3xl font-bold  text-blue-700">${text}</span>`;
      controlUI.addEventListener("click", () => {
        adjustMap(mode, amount);
      });
      controlDiv.appendChild(controlUI);
      map.controls[position].push(controlDiv);
    });
  
    const adjustMap = function (mode: string, amount: number) {
      switch (mode) {
        case "tilt":
          map.setTilt(map.getTilt()! + amount);
          break;
        case "rotate":
          map.setHeading(map.getHeading()! + amount);
          break;
        default:
          break;
      }
    };
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}