import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; 
import { CrashService } from '../../crash.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

export interface IPartyDetails {
  firstName: '';
  lastName: '';
  address: '';
  phone: '';
  license: '';
  remarks: '';
  insuranceProvider:'';
  insuranceNumber:'';
}
@Component({
  selector: 'crash-partydialog',
  template: ` <div id="mapd" style="height: 400px;"></div> `,

  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatIcon,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './partydialog.component.html',
  styleUrl: './partydialog.component.scss',
})
export class PartydialogComponent implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    licenseNumber: new FormControl('', [Validators.required]),
    remarks: new FormControl(''),
    insuranceProvider: new FormControl('', [Validators.required]),
    insuranceNumber: new FormControl('', [Validators.required])
  });
  result!: IPartyDetails;
  isOcrLoading: boolean = false;

  ngOnInit() {}

  onSubmit() {
    this.result = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      address: this.form.controls['address'].value,
      phone: this.form.controls['phone'].value,
      license: this.form.controls['licenseNumber'].value,
      remarks: this.form.controls['remarks'].value,
      insuranceProvider: this.form.controls['insuranceProvider'].value,
      insuranceNumber: this.form.controls['insuranceNumber'].value
    };

    this.dialogRef.close(this.result);
  }

  constructor( 
    public crashservice: CrashService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PartydialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: IPartyDetails,
    private cdf: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.cdf.detectChanges();
    this.setDefaultInputs();
  }
  setDefaultInputs() {
    this.form.controls['firstName'].setValue(this.data.firstName);
    this.form.controls['lastName'].setValue(this.data.lastName);
    this.form.controls['address'].setValue(this.data.address);
    this.form.controls['phone'].setValue(this.data.phone);
    this.form.controls['licenseNumber'].setValue(this.data.license);
    this.form.controls['remarks'].setValue(this.data.remarks);
    this.form.controls['insuranceProvider'].setValue(this.data.insuranceProvider);
    this.form.controls['insuranceNumber'].setValue(this.data.insuranceNumber);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }  

  onLicenseImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.isOcrLoading = true;

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5119/api/accidents/upload-license', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.first_name) {
          this.form.controls['firstName'].setValue(data.first_name);
        }
        if (data.last_name) {
          this.form.controls['lastName'].setValue(data.last_name);
        }
        if (data.driver_license) {
          this.form.controls['licenseNumber'].setValue(data.driver_license);
        }
        if (data.address) {
          this.form.controls['address'].setValue(data.address);
        }
        this.isOcrLoading = false;
      })
      .catch(error => {
        console.error('OCR upload failed', error);
        this.isOcrLoading = false;
      });
  }

}
