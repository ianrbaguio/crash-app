import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators,  ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule ,} from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS,   MAT_DIALOG_DATA ,
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
 
export interface IPartyDetails {
  PartyLastName: any,
  PartyFirstName:  any,
  PartyAddress  :  any,
  PartyPhone: any,
  PartyLicense:  any,
  PartyRemarks: any 
} 
@Component({
  selector: 'crash-partydialog',
  template: `
    <div id="mapd" style="height: 400px;" >
  `,

   standalone: true, 
   imports: [MatDialogTitle, MatDialogContent, MatIcon, 
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,],
  templateUrl: './partydialog.component.html',
  styleUrl: './partydialog.component.scss' 
})
export class PartydialogComponent implements OnInit, AfterViewInit{
  form! : FormGroup; 
  result!:  IPartyDetails
ngOnInit() {
  this.form = new FormGroup({
    PartyLastName: new FormControl('',[Validators.required]),
    PartyFirstName: new FormControl('',[Validators.required]),
    PartyAddress  : new FormControl('',[Validators.required]),
    PartyPhone: new FormControl(''),
    PartyLicense: new FormControl('',[Validators.required]),
    PartyRemarks: new FormControl('',[Validators.required]) 
});


}
onSubmit() {

 this.result={ 
      PartyLastName: this.form.controls['PartyLastName'],
      PartyFirstName:  this.form.controls['PartyFirstName'],
      PartyAddress  :  this.form.controls['PartyAddress'],
      PartyPhone: this.form.controls['PartyPhone'],
      PartyLicense:  this.form.controls['PartyLicense'],
      PartyRemarks: this.form.controls['PartyRemarks'] 
}


console.log(this.result.PartyFirstName);
this.dialogRef.close(this.result);
}


constructor( private formBuilder: FormBuilder, 
        private dialogRef: MatDialogRef<PartydialogComponent>, @Inject(MAT_DIALOG_DATA) 
        public data: IPartyDetails,
        private cdf: ChangeDetectorRef ) 
{
 

}

ngAfterViewInit(): void {
 
  this.cdf.detectChanges(); 
  this.setDefaultInputs();
}
setDefaultInputs(){
 
  this.form.controls["PartyLastName"].setValue(this.data.PartyLastName);
  this.form.controls["PartyFirstName"].setValue(this.data.PartyFirstName);
  this.form.controls['PartyAddress'].setValue(this.data.PartyAddress);
  this.form.controls['PartyPhone'].setValue(this.data.PartyPhone);
  this.form.controls['PartyLicense'].setValue(this.data.PartyLicense);
  this.form.controls['PartyRemarks'].setValue(this.data.PartyRemarks);
  
}
onNoClick(): void {
      
  this.dialogRef.close();

    }
    
}
