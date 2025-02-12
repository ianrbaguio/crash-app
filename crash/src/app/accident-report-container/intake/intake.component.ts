import {
  Component,
  OnInit,
  ChangeDetectorRef,
  QueryList,
  ViewChildren,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MapComponent } from '../map/map.component';
import { UploadComponent } from '../upload-images/upload.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrashService } from '../../crash.service';
import { catchError, map } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { PartydialogComponent } from '../partydialog/partydialog.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IPartyDetails } from '../../../shared/iparty-details';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'crash-intake',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatExpansionModule,
    NgxMatTimepickerModule,
    MapComponent,
    UploadComponent,
    MatButtonModule,

  ],
  templateUrl: './intake.component.html',
  styleUrl: './intake.component.scss',
})
export class IntakeComponent implements OnInit, AfterViewInit {
  @ViewChildren(UploadComponent) UploadComponents!: QueryList<UploadComponent>;
  @ViewChild('previewRef', { static: false }) previewRef!: ElementRef;
  @ViewChild('previewRef2', { static: false }) previewRef2!: ElementRef;

  form: FormGroup = new FormGroup({
    DateIncident: new FormControl(new Date(), [Validators.required]),
    TimeIncident: new FormControl('', [Validators.required]),
    Location: new FormControl('', [Validators.required]),
    WeatherConditions: new FormControl(),
    EstimateCost: new FormControl('', [Validators.required]),
    NumPartiesInvolved: new FormControl(),
    dynamicParties: this.formBuilder.array([]),
  });

  PartyDetails: IPartyDetails = {
    FirstName: '',
    LastName: '',
    Address: '',
    Phone: '',
    License: '',
    Remarks: '',
  };

  PartyFieldsGenerated: boolean = false;
  PartyFields: { name: string; value: string; PartyDetails: IPartyDetails }[] =
    [];
  WeatherIcon: string = '';
  Image0: any;
  Image1: any;
  Image2: any;
  Image3: any;
  latitude: any;
  longitude: any;
  location: string = '';
  weatherconditions: string = '';
  eventData: string = '';
  streetview: any;
  submitted = false;
  smallscreen: boolean = false;

  constructor(
    private observer: BreakpointObserver,
    private cdf: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private crashservice: CrashService,
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.setDefaultInputs();
    this.generatePartyFields();
  }
  ngAfterViewInit(): void {
    // if small screen is in use dont use 'flex justify-center ...' div class name so that the controls will fit
    this.observer.observe(['(max-width:787px)']).subscribe((res) => {
      this.smallscreen = res?.matches;
    });
    this.cdf.detectChanges();
  }
  setDefaultInputs() {
    var datePipe = new DatePipe('en-US');
    this.form.controls['DateIncident'].setValue(new Date());
    this.form.controls['TimeIncident'].setValue(
      datePipe.transform(new Date(), 'h:mm a')
    );
    this.form.controls['NumPartiesInvolved'].setValue(1);
    this.Image0=null;
    this.Image1=null;
    this.Image2=null;
    this.Image3=null;
    this.streetview=null;
    
  }

  generatePartyFields() {
    let numberOfInputs: number = 0;
    numberOfInputs = this.form.controls['NumPartiesInvolved'].value;
    this.PartyFieldsGenerated = numberOfInputs > 0;
    if (numberOfInputs == 1 && this.dynamicParties.length == 0) {
      this.dynamicParties.push(
        this.formBuilder.control('')
      );
      this.PartyFields.push({
        name: '',
        value: '',
        PartyDetails: this.PartyDetails,
      });
    } else {
      const diff = numberOfInputs - this.dynamicParties.length;

      if (diff > 0) {
        {
          this.dynamicParties.push(
            this.formBuilder.control('')
          );
          this.PartyFields.push({
            name: '',
            value: '',
            PartyDetails: this.PartyDetails,
          });
        }
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) {
          this.dynamicParties.removeAt(this.dynamicParties.length - 1);
          this.PartyFields.pop();
        }
      }
    }
  }

  setAddress(thelocation: any) {
    this.form.controls['Location'].setValue(thelocation);
  }

  setWeather(theweather: any) {
    this.form.controls['WeatherConditions'].setValue(theweather);
  }
  setWeatherIcon(theweathericon: any) {
    this.WeatherIcon = theweathericon;
  }
  setEventData(data: any) {
    this.eventData = data;

  }
  setImage1(img: any) {
    this.Image1 = img;
    console.log(this.Image1);
  }
  setImage2(img: any) {
    this.Image2 = img;
  }
  setImage3(img: any) {
    this.Image3 = img;
  }
  setLatlng(latlng: any) {
    this.longitude = latlng.lng;
    this.latitude = latlng.lat;
  }
  setDefaultImages(view: any) {

    const reader = new FileReader();
    reader.readAsDataURL(view);
    reader.onload = () => {
      if (this.previewRef && this.previewRef.nativeElement) {
        this.previewRef.nativeElement.src = reader.result as string;
      }
    };
    const file = new File([view], 'default-image.png', {
      type: 'image/png',
      lastModified: Date.now()
    });
    this.streetview = file;
    this.previewRef2.nativeElement.src = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${this.longitude},${this.latitude}&zoom=18&marker=lonlat:${this.longitude},${this.latitude};type:awesome;color:%2319b8fc;size:large&scaleFactor=2&apiKey=${environment.Geoapify_API_KEY}`;

    this.http.get(this.previewRef2.nativeElement.src, { responseType: 'blob' })
    .subscribe({
      next: (blob: Blob) => {
        this.Image0 = new File([blob], 'file2.png', { type: 'image/png', lastModified: Date.now() });
      },
      error: error => {
        console.error('Error fetching image as blob:', error);
      }
    });
  

  }

  getImages() {
    let images: any[] = [];
    if (this.streetview != null) images.push(this.streetview);
    if (this.Image0 != null) images.push(this.Image0);
    if (this.Image1 != null) images.push(this.Image1);
    if (this.Image2 != null) images.push(this.Image2);
    if (this.Image3 != null) images.push(this.Image3);
    return images;
  }
  getAccidents() {
    this.crashservice
      .getAccidents()
      .pipe(
        map((response) => { }),
        catchError((error) => {
          throw error;
        })
      )
      .subscribe();
  }

  get dynamicParties() {
    return this.form.get('dynamicParties') as FormArray;
  }

  onSubmit(): void {
    console.log(this.form);
    if (this.form.invalid) {
      console.log('Form contains invalid data');
      return;
    }
    this.submitted = true;
    const day: string = this.form.controls['TimeIncident'].value;


    const requestBody = {

      accidentId: 0,
      location: this.form.controls['Location'].value,
      accidentDate: this.form.controls['DateIncident'].value,
      daylight: day.substring(day.lastIndexOf(' ') + 1),
      weather: this.form.controls['WeatherConditions'].value,
      estimatedCost: this.form.controls['EstimateCost'].value,
      numberOfParties: 1,
      latitude: this.latitude,
      longitude: this.longitude,
      parties: this.PartyFields.map(item => item.PartyDetails),
      eventData: this.eventData
    };

    this.crashservice.addAccident(requestBody).subscribe({
      next: (res: any) => {
        try {
          const jsonResponse = JSON.parse(res);

          let accident_id = jsonResponse.id;
          if (this.getImages().length > 0) this.uploadImages(accident_id);
          this.showMessage();
          this.clearForm();
        } catch (e) {
          console.log('Non-JSON response:');
        }
      },
      error: (error) => {
        console.error('Request failed', error);
      }
    });
  }


  uploadImages(accident_id: string): void {
    const formData = new FormData();
    this.getImages().forEach((element) => {
      formData.append('Images', element);
    });
    formData.append('AccidentId', accident_id);
    this.crashservice
      .uploadImages(formData, accident_id)
      .pipe(
        map((response) => {
          console.log('Upload successful:', response);
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      )
      .subscribe();
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
    inputs.forEach((input) => {
      if (input.type !== 'submit') {
        // Exclude submit button
        input.value = '';
      }
    });
    this.form.reset();
    this.setDefaultInputs();
    this.UploadComponents.forEach((uc) => {
      uc.clearImage();
    });
    this.previewRef.nativeElement.src = '';
    this.previewRef2.nativeElement.src = '';
    this.dynamicParties.clear()
    this.PartyFields = [];
    this.setDefaultInputs()
    this.generatePartyFields()
  }



  openPartyDialog(i: number, m_data: any): void {
    if (this.PartyFields[i]?.PartyDetails == null)
      this.PartyFields[i].PartyDetails = this.PartyDetails;
    m_data = this.PartyFields[i].PartyDetails;

    const dialogRef = this.dialog.open(PartydialogComponent, {
      width: '800px',
      height: '535px',
      data: m_data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.PartyFields[i].PartyDetails = <IPartyDetails>result;
      this.PartyFields[i].name = result.firstName + ' ' + result.lastName;
      this.PartyFields[i].value = result.firstName + result.lastName + i;

    });
  }
}

