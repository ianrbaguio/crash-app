
import { Component ,OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder,FormGroup,FormControl, ReactiveFormsModule ,Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';  
import { MapComponent} from '../map/map.component'
import { UploadComponent } from '../upload-images/upload.component'; 
import {BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'crash-intake',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [CommonModule, RouterOutlet,  ReactiveFormsModule,
    MatFormFieldModule,MatDatepickerModule,
    NgxMatTimepickerModule , MapComponent, UploadComponent
  ],
  templateUrl: './intake.component.html',
  styleUrl: './intake.component.scss'
})


export class IntakeComponent  implements OnInit  {

  form : FormGroup = new FormGroup({
    DateIncident: new FormControl(new Date(),[Validators.required]),
    TimeIncident: new FormControl('',[Validators.required]),
    Party : new FormControl('',[Validators.required]),
    Location  : new FormControl('',[Validators.required]),
    WeatherConditions: new FormControl(),
    EstimateCost: new FormControl('',[Validators.required]),
    NumPartiesInvolved:new FormControl(),
      
});
WeatherIcon:string =''
Image1: any;
Image2: any;
Image3: any;
smallscreen: boolean =false;
  selectedFile: File | null = null;

  constructor(private observer : BreakpointObserver,private cdf: ChangeDetectorRef, private formBuilder: FormBuilder ) {
      
  }
   
  public location: string='';
  public weatherconditions: string='';
  submitted = false;
  ngOnInit() {
    var datePipe = new DatePipe('en-US');
    this.form.controls["TimeIncident"].setValue(datePipe.transform(new Date(),'h:mm a'));
 
  }
  ngAfterViewInit(): void {
    // if small screen is in use dont use 'flex justify-center ...' div class name so that the controls will fit
    this.observer.observe(['(max-width:787px)']).subscribe(
      (res)=>{
          this.smallscreen=res?.matches
      }
    );
    this.cdf.detectChanges(); 
}
 
setAddress(thelocation : any){
    this.form.controls["Location"].setValue(thelocation);
   
}
 
setWeather(theweather:any){
    this.form.controls["WeatherConditions"].setValue(theweather);
   }
setWeatherIcon(theweathericon:any){
      this.WeatherIcon=theweathericon; 
   }

 
setImage1(img:any){
  this.Image1=img;
}
setImage2(img:any){
  this.Image2=img;
}
setImage3(img:any){
  this.Image3=img;
}



onSubmit(): void{
  this.submitted = true;
  if (this.form.invalid) {
    return;
  }


 
}

}
