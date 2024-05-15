
import { Component ,OnInit, ChangeDetectorRef, QueryList, ViewChildren} from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder,FormGroup,FormControl, ReactiveFormsModule ,Validators, FormArray} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';  
import {MapComponent} from '../map/map.component'
import {UploadComponent } from '../upload-images/upload.component'; 
import {BreakpointObserver } from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CrashService} from '../../crash.service';
import { catchError, map } from 'rxjs';
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
  @ViewChildren(UploadComponent) UploadComponents!: QueryList<UploadComponent>;

  form : FormGroup = new FormGroup({
    DateIncident: new FormControl(new Date(),[Validators.required]),
    TimeIncident: new FormControl('',[Validators.required]),
    Location  : new FormControl('',[Validators.required]),
    WeatherConditions: new FormControl(),
    EstimateCost: new FormControl('',[Validators.required]),
    NumPartiesInvolved:new FormControl(),
    dynamicParties: this.formBuilder.array([])
      
});

PartyFieldsGenerated: boolean = false;
PartyFields: {name: string, value: string }[] = [];
WeatherIcon:string =''
Image1: any;
Image2: any;
Image3: any;
latitude:any;
longitude: any;
location: string='';
weatherconditions: string='';

submitted = false;
smallscreen: boolean =false;
 

  constructor(
        private observer : BreakpointObserver,
        private cdf: ChangeDetectorRef, 
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar, 
        private crashservice : CrashService
    ) {
      
  }
   
  


ngOnInit() {
    this.setDefaultInputs();
    this.generatePartyFields();
 
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
setDefaultInputs(){
  var datePipe = new DatePipe('en-US');
  this.form.controls["DateIncident"].setValue(new Date());
  this.form.controls["TimeIncident"].setValue(datePipe.transform(new Date(),'h:mm a'));
  this.form.controls['NumPartiesInvolved'].setValue(1);
  
}

generatePartyFields() {
  let numberOfInputs:number = 0;
   numberOfInputs=this.form.controls['NumPartiesInvolved'].value
   this.PartyFieldsGenerated = numberOfInputs>0;
 
   if  (numberOfInputs==1 && this.dynamicParties.length==0) 
       this.dynamicParties.push(this.formBuilder.control('', Validators.required));
    else
      {
        const diff = numberOfInputs - this.dynamicParties.length     
        if (diff  > 0) {     
           this.dynamicParties.push(this.formBuilder.control('', Validators.required));
       } else if (diff  < 0) {
         for (let i = 0; i < Math.abs(diff); i++) {
              this.dynamicParties.removeAt(this.dynamicParties.length - 1);       
         }
      }
  }
  
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
  this.Image1=img
}
setImage2(img:any){
  this.Image2=img;
}
setImage3(img:any){
  this.Image3=img;
}
setLatlng(latlng:any){
   this.longitude=latlng.lng;
   this.latitude=latlng.lat;
}
getImages(){
  let  images:any[]=[];
  if (this.Image1!=null) images.push(this.Image1);
  if (this.Image2!=null) images.push(this.Image2);
  if (this.Image3!=null) images.push(this.Image3);
  return images;
}
getAccidents(){
  this.crashservice.getAccidents().pipe(
    map((response) => {     
      }),
     catchError((error) => {
      throw error;
   })).subscribe();

}

get dynamicParties() {
  return this.form.get('dynamicParties') as FormArray;
}

onSubmit(): void{
  if (this.form.invalid) {  
    return;
  }
  this.submitted = true;
    const day:string =   this.form.controls["TimeIncident"].value 
     const requestBody = {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        accidentId: 0,
        location: this.form.controls["Location"].value,
        accidentDate:this.form.controls["DateIncident"].value,
        daylight: day.substring(day.lastIndexOf(' ')+1),
        weather: this.form.controls["WeatherConditions"].value,
        estimatedCost: this.form.controls["EstimateCost"].value,
        numberOfParties: 1,
        latitude: this.latitude,
        longitude: this.longitude,
        parties: this.dynamicParties.value
      }; 
   
      
      this.crashservice.addAccident(requestBody)
      .subscribe(
        (res:any) =>{
          let accident_id= res.id
          if (this.getImages().length>0)
              this.uploadImages(accident_id);
          this.showMessage()
          this.clearForm()
        }
      );
    
  
}
uploadImages(accident_id: string): void {
    const formData = new FormData();
    this.getImages().forEach(element => {
      formData.append('Images',element );
    });  
    formData.append('AccidentId', accident_id);
    this.crashservice.uploadImages(formData, accident_id).pipe(
        map((response) => {
          console.log('Upload successful:', response);   
          }),
         catchError((error) => {
          console.error('Error:', error);
          throw error;
       })).subscribe();  
  }

  showMessage(): void {
    this._snackBar.open('Save or Submit successful', 'Close', {
      duration: 3000, // Duration in milliseconds (3 seconds in this case)
      horizontalPosition: 'center', // Positioning the message horizontally
      verticalPosition: 'bottom', // Positioning the message vertically
    });
  }

  clearForm() {
    // Clear all form inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type !== 'submit') { // Exclude submit button
        input.value = '';
      }
    });
    this.setDefaultInputs();
    this.UploadComponents.forEach((uc) => {
          uc.clearImage();
    }); 
  }
}
