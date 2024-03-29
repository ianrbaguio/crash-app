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

}
