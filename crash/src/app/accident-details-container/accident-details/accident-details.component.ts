import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component ,Input,OnInit, input } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe,CurrencyPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder,FormGroup,FormControl, ReactiveFormsModule ,Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CrashService } from '../../crash.service';
import { ActivatedRoute } from '@angular/router';
import { Guid } from "guid-typescript";
import { DomSanitizer } from '@angular/platform-browser';
//import { NgImageSliderModule } from 'ng-image-slider';
import { SearchMapComponent } from "../../view-accidents-container/view-map-accidents/search-map.component";
import {AccidentMapComponent} from '../accident-mapdetails/accidentmap.component'
import { delay } from 'rxjs/operators'; // For simulating an API delay
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { IPartyDetails } from '../../../shared/iparty-details';
 
@Component({
  selector: 'crash-accident-details',

  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule,
    MatFormFieldModule, MatDatepickerModule, AccidentMapComponent, SearchMapComponent, MatTableModule],
    providers: [CrashService,CurrencyPipe ],
  templateUrl: './accident-details.component.html',
  styleUrl: './accident-details.component.scss'
})
export class AccidentDetailsComponent implements OnInit {
  accidentId: Guid = Guid.createEmpty();
  thumbnail: any;
  imagesa: Array<object> = [];
  imagengx: Array<string> = [];
  displayedColumns: string[] = ['partyNo','lastName', 'firstName', 'address', 'phone', 'license', 'remarks','insuranceProvider','insuranceNumber']; 
  dataSource1!: MatTableDataSource<IPartyDetails>;

  form : FormGroup = new FormGroup({
    DateIncident: new FormControl(new Date()),
    TimeIncident: new FormControl(),
    Party : new FormControl(),
    Location  : new FormControl(),
    WeatherConditions: new FormControl(),
    EstimateCost: new FormControl(),
    NumPartiesInvolved:new FormControl(),
    Daylight:new FormControl(),
    Longitude:new FormControl(),
    Latitude:new FormControl(),
    image1:new FormControl()
});
 center!: google.maps.LatLngLiteral;
 
WeatherIcon:string ='';
constructor (private http:HttpClient,private accidentservice : CrashService,private activatedRoute: ActivatedRoute,
  private sanitizer:DomSanitizer,private currencyPipe: CurrencyPipe, private cdr: ChangeDetectorRef)  {  
}

ngOnInit() :void{
  const params = this.activatedRoute.snapshot.queryParams;
  this.accidentId =  params['id'];
  //alert('parameter...'+this.accidentId);
  

  this.accidentservice.getAccidentsById(this.accidentId)
      .subscribe(data => {     
        var obj = (JSON.stringify(data));
        var parsed = JSON.parse(obj);  
        const [date, time] = parsed.accidentDate.split("T");
         this.form.controls['DateIncident'].setValue(date ) ;
         this.form.controls['TimeIncident'].setValue(this.formatTime(parsed.accidentDate) ) ;
         this.dataSource1 = new MatTableDataSource(<IPartyDetails[]> parsed.parties);
         this.form.controls['NumPartiesInvolved'].setValue(parsed.numberOfParties ) ;
         this.form.controls['Location'].setValue(parsed.location) ;
         this.form.controls['WeatherConditions'].setValue(parsed.weather ) ;
         this.form.controls['EstimateCost'].setValue( this.currencyPipe.transform(parsed.estimatedCost,"USD") );
         this.form.controls['Daylight'].setValue( parsed.daylight ) ;
         this.form.controls['Longitude'].setValue( parsed.longitude) ;
         this.form.controls['Latitude'].setValue( parsed.latitude) ;
         this.center= {
          lat:parsed.latitude,
          lng:parsed.longitude
        }
        this.cdr.detectChanges();
     } );

     this.accidentservice.getImagesByAccidentsId (this.accidentId)    
     .subscribe(data => {     
      if (data!=null){
        var obj = (JSON.stringify(data));
        var imgs = JSON.parse(obj).imageList;
         for (var i = 0; i < imgs.length; i++) {
           const blob = new  Blob([imgs[i]], { type: 'image/png' }); // or 'image/png'
           const imageUrl = URL.createObjectURL(blob);
           let objectURL = 'data:image/jpeg;base64,' + imgs[i];
           this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
           this.imagesa.push ({image:objectURL,thumbnail:this.thumbnail,title:'image'+(i+1)});
           this.imagengx.push (objectURL);
         }   
      }
       
      } 

      );    


  } 


createGmapLATLANG(LAT:any, LNG:any){
    this.center= {
        lat:LAT,
        lng:LNG
    }

    console.log("createGmapLATLANG"  )
    //console.log(  this.center)
}
formatTime(time: string) {
  return new Date(time).toLocaleTimeString();
}

}
