import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
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
export class PartydialogComponent implements OnInit{
  form! : FormGroup; 

ngOnInit() {
  this.form = new FormGroup({
    PartyLastName: new FormControl('',[Validators.required]),
    PartyFirstName: new FormControl('',[Validators.required]),
    PartyAddress  : new FormControl('',[Validators.required]),
    PartyPhone: new FormControl(),
    PartyLicense: new FormControl('',[Validators.required]),
    PartyRemarks: new FormControl('',[Validators.required]) 
});
}
onSubmit() {
// code to save the party dialog
this.dialogRef.close();
}


constructor( private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PartydialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) 
{
 

}

    onNoClick(): void {
      this.dialogRef.close();
    }
    
}
