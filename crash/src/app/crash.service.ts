import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CrashService {

constructor(private http: HttpClient) { }
  map: any;

getNearbyPlaces(latitude: number, longitude: number)  {
  let queryParams = new HttpParams();
  queryParams = queryParams.append("location",`${latitude},${longitude}`);
  queryParams = queryParams.append("keyword","building");
  queryParams = queryParams.append("type","business");
  queryParams = queryParams.append("rankby","distance");
  queryParams = queryParams.append("key",environment.GOOGLE_API_KEY);
  return this.http.get(environment.GOOGLE_NEARBY_Endpoint,{  params: queryParams }); 
}
  getRoadInfo(){

  }
  getPlacesDetail(placeID: string){

      let queryParams = new HttpParams();
      queryParams = queryParams.append("place_id",`${placeID}`);  
      queryParams = queryParams.append("key",environment.GOOGLE_API_KEY);
      return this.http.get(environment.PLACES_Endpoint,{params: queryParams,responseType : 'json'});
  }

  getWeather(latitude: number, longitude: number, radius: number): any{ 
      return this.http.get(`${environment.WEATHER_Endpoint}&lat=${latitude}&lon=${longitude}&appid=${environment.WEATHER_API_KEY}`);
    }

  addAccident(requestBody: any){
      return this.http.post(`${environment.Crash_API_Endpoint}/api/Accidents`,requestBody, { responseType: 'text' } );
  }
  uploadImages( images: FormData, accidentId:any){
      return this.http.post(`${environment.Crash_API_Endpoint}/api/accidents/uploadimages`,images);
  }
  getAccidents(){
      return this.http.get(`${environment.Crash_API_Endpoint}/api/Accidents`)
  }
  getAccidentsWithinRectangle(north:any, south:any, east:any, west:any){
    return this.http.get(`${environment.Crash_API_Endpoint}/api/Accidents/byRegion?north=${north}&south=${south}&east=${east}&west=${west}`)
  }
  getAccidentsById(id:any){
    return this.http.get(`${environment.Crash_API_Endpoint}/api/Accidents/byId?id=${id}`)
  }

  getImagesByAccidentsId(accidentid:any){
    return this.http.get(`${environment.Crash_API_Endpoint}/api/Accidents/images?accidentid=${accidentid}`)
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
  
}


