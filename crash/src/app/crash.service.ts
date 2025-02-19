import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrashService {

  constructor(private http: HttpClient) { }
  map: any;

  getNearbyPlaces(latitude: number, longitude: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("location", `${latitude},${longitude}`);
    queryParams = queryParams.append("keyword", "building");
    queryParams = queryParams.append("type", "business");
    queryParams = queryParams.append("radius", 150);
    queryParams = queryParams.append("key", environment.GOOGLE_API_KEY);

    let requestBody = {
      "includedTypes": ["school", "hospital", "church", "gym", "park", "market", "library", "store"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": latitude,
            "longitude": longitude
          },
          "radius": 100.0
        }
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': environment.GOOGLE_API_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.primaryType,places.types'
    });

    return this.http.post(`${environment.GOOGLE_NEARBY_PLACES_Endpoint}`, requestBody, { headers });
  }


  getNearbyPlacesV2(latitude: number, longitude: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("apiKey", "a6c6b4a57ff84b51a7fb9aba6e4e4a0f");
    queryParams = queryParams.append("categories", "education.school,office,man_made.bridge,railway,healthcare");
    queryParams = queryParams.append("filter", `circle:${longitude},${latitude},200`);
    queryParams = queryParams.append("limit", "10");

    return this.http.get(`${environment.Geoapify_API_Endpoint}v2/places?`, {params:queryParams});
  }

  getWeather(latitude: number, longitude: number, radius: number): any {
    return this.http.get(`${environment.WEATHER_Endpoint}&lat=${latitude}&lon=${longitude}&appid=${environment.WEATHER_API_KEY}`);
  }

  getSpeedLimit(addresses: google.maps.LatLngLiteral[]) {
    try {
      let requestBody = {
        "mode": "drive",
        "waypoints": [
          {
            "timestamp": new Date().toISOString(),
            "location": [
              addresses[0].lng,
              addresses[0].lat
            ]
          },
          {
            "timestamp": new Date().toISOString(),
            "location": [
              addresses[0].lng,
              addresses[0].lat
            ]
          }
        ]
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });

      return this.http.post(`${environment.Geoapify_API_Endpoint}v1/mapmatching?apiKey=${environment.Geoapify_API_KEY}`, requestBody, { responseType: 'text', headers: headers });
    } catch (error) {
        console.error('Error fetching speed limit:', error);
        throw error;
    }
  }


  addAccident(requestBody: any) {
    return this.http.post(`${environment.Crash_API_Endpoint}/api/Accidents`, requestBody, { responseType: 'text' });
  }

  uploadImages(images: FormData, accidentId: any) {
    return this.http.post(`${environment.Crash_API_Endpoint}/api/accidents/uploadimages`, images);
  }

  getAccidents() {
    return this.http.get(`${environment.Crash_API_Endpoint}/api/Accidents`);
  }

  getAccidentsWithinRectangle(north: any, south: any, east: any, west: any) {
    return this.http.get(`${environment.Crash_API_Endpoint}/api/Accidents/byRegion?north=${north}&south=${south}&east=${east}&west=${west}`);
  }

  getAccidentsById(id: any) {
    return this.http.get(`${environment.Crash_API_Endpoint}/api/Accidents/byId?id=${id}`);
  }

  getImagesByAccidentsId(accidentid: any) {
    return this.http.get(`${environment.Crash_API_Endpoint}/api/Accidents/images?accidentid=${accidentid}`);
  }

  getInfoFromAddress(latlng: any) {
    let geocoder = new google.maps.Geocoder();
    return geocoder.geocode({ location: latlng })
      

  }
  //Use client side SpeechSynthesis to speak text
  speakText(value: any): void {
    if ('speechSynthesis' in window) {
      const inputText = new SpeechSynthesisUtterance(value);
      speechSynthesis.speak(inputText);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  }
  getCarModelByVin(vin: any) {
    return this.http.get(`${environment.CarVIN_API_Endpoint}${vin}`);
  }

  getMergeAccidentStreeview(streetview: FormData, images: FormData, accidentId: any) {
    let requestBody = {
      accidentId: accidentId,
      streetview: streetview,
      images: images
    };
    return this.http.post(`${environment.Crash_API_Endpoint}/api/accidents/mergeimages`, requestBody);
  }
}
 


