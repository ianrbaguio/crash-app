import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IAccidentModel{
  Location: string;
  Date : string;
  Parties: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewaccidentsService {
   dataURL : string = "http://localhost:3000/accidents";
   
   constructor(private http:HttpClient) {

   }

   getAccidentsList(): Observable<IAccidentModel[]>{
      return this.http.get<IAccidentModel[]>(this.dataURL);
   }


}
