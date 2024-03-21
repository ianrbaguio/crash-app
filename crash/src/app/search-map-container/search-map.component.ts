

import { Component, OnInit, } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../environments/environment';



@Component({
  selector: 'crash-map',
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
  }
    , {
    address: 'Central Edmonton',
    description: 'Incident 09/23/2023',
    position: {
      lat: 53.540235028,
      lng: -113.52818175,
    }
    
  }, {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.538557479452585,
      "lng": -113.45938628142795
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.52080311088136,
      "lng": -113.46007292693577
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.51234715013561,
      "lng": -113.50456237792969
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.501611863644136,
      "lng": -113.51637785857639
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.498957070894136,
      "lng": -113.49131529754123
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.48772341587622,
      "lng": -113.46796935027561
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.49364698666381,
      "lng": -113.44599669402561
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.50467487948142,
      "lng": -113.4562963766428
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.52223189864232,
      "lng": -113.56375639861545
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.54936971116056,
      "lng": -113.57062285369358
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.570374263130425,
      "lng": -113.54624693816623
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.52459478296653,
      "lng": -113.59691619873047
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.56584992012579,
      "lng": -113.61834103952043
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.54663160087723,
      "lng": -113.60275268554688
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.57400508882848,
      "lng": -113.60522459784988
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.51382374169849,
      "lng": -113.61518095771316
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.53668232931121,
      "lng": -113.62960051337723
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.48482458086941,
      "lng": -113.60728453437332
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.463164388873366,
      "lng": -113.54445647040848
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.46255120369068,
      "lng": -113.47647856513504
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.46847828947439,
      "lng": -113.44969939033035
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.50238982158629,
      "lng": -113.42978667060379
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.52811180454443,
      "lng": -113.43390654365066
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.54361910276119,
      "lng": -113.42326353827957
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.565238219072924,
      "lng": -113.42257689277176
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.595765008920814,
      "lng": -113.48052978515625
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.60391440806692,
      "lng": -113.455810546875
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.593337701580914,
      "lng": -113.54720305243973
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.60759893774412,
      "lng": -113.56093596259598
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.61594971169716,
      "lng": -113.53930662909988
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.60515449634367,
      "lng": -113.59046171943191
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.585797674433735,
      "lng": -113.44729613105301
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.46863476781458,
      "lng": -113.39447172522279
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.48702383508791,
      "lng": -113.35327299475404
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.50029987211198,
      "lng": -113.34915312170716
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.51438834855714,
      "lng": -113.33198698401185
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.53173728104374,
      "lng": -113.34949644446107
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.54703926259698,
      "lng": -113.35910948157044
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.54887512872583,
      "lng": -113.32546385168763
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.56417091634663,
      "lng": -113.33610685705872
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.571918671532295,
      "lng": -113.38142546057435
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.58831181519874,
      "lng": -113.37578620200784
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.60848226651237,
      "lng": -113.389862434918
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.62387379211019,
      "lng": -113.42216491699219
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.53439821196495,
      "lng": -113.65942268708773
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.55092307457697,
      "lng": -113.65461616853304
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.56377128594947,
      "lng": -113.6690357241971
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.52705175780542,
      "lng": -113.69032173493929
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.52011226976251,
      "lng": -113.6906650576932
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.51215086881547,
      "lng": -113.67933540681429
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.49683627763071,
      "lng": -113.66148262361116
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.46087630738359,
      "lng": -113.60586433747835
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.46087630738359,
      "lng": -113.55505256990023
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.49009610460605,
      "lng": -113.57256203034945
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.505413130341665,
      "lng": -113.59968452790804
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.581851347214474,
      "lng": -113.61540802745868
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.591837432039306,
      "lng": -113.61506470470478
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.46781761089611,
      "lng": -113.49597930908203
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.41529049983118,
      "lng": -113.49211947137513
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.40669542331633,
      "lng": -113.52233187371888
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.40853737164077,
      "lng": -113.54224459344545
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.423065501104446,
      "lng": -113.53675142938295
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.43022542882099,
      "lng": -113.4735800426642
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.428764764052936,
      "lng": -113.52893829345703
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.42367925644785,
      "lng": -113.4464575451056
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.44024730175298,
      "lng": -113.41693178826966
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.448017739425104,
      "lng": -113.4076620739142
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.44760880445397,
      "lng": -113.43444124871888
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.45476459807826,
      "lng": -113.43100802117982
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.459466320317006,
      "lng": -113.42002169305482
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.46621136032047,
      "lng": -113.40937868768373
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.45783099771566,
      "lng": -113.39942232782045
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.46314556589385,
      "lng": -113.43650118524232
    }
  },
  {
    "address": "",
    "description": "",
    "position": {
      "lat": 53.47826800367863,
      "lng": -113.43753115350404
    }
  }

  ];

  constructor() { }

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
        //console.log({ bounds: rectangle.getBounds()?.toJSON(), eventName });
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

    //  document.getElementById("drop")!.addEventListener("click", this.drop());
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
   marker.animate( null, google.maps.Animation.BOUNCE);
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


}
