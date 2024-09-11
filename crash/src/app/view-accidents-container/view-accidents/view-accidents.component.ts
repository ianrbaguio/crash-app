import { Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CrashService } from '../../crash.service';
import { Guid } from "guid-typescript";
import {MatFormFieldModule} from '@angular/material/form-field';
import * as XLSX from 'xlsx';


export interface IAccidentModel{
  id: Guid;
  location: string;
  accidentDate: string;
  estimatedCost: number,
  numberOfParties: number; //parties: string[];  
}
@Component({
  selector: 'crash-view-accidents',
  standalone: true,
  imports: [MatTableModule,  MatPaginator, MatSortModule,MatFormFieldModule],
  providers: [CrashService ],
  templateUrl: './view-accidents.component.html',
  styleUrl: './view-accidents.component.scss'
})
export class ViewAccidentsComponent {
  fileName= 'ExcelSheet.xlsx';
  displayedColumns: string[] = ['Location', 'AccidentDate', 'EstimatedCost', 'NumberOfParties']; 
  dataSource1!: MatTableDataSource<IAccidentModel>;
  @ViewChild(MatPaginator, {static: false}) paginator!:MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!:MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  constructor(private accidentservice : CrashService, private cdr:ChangeDetectorRef,private router: Router ){

  }
  ngOnInit(): void {
    this.accidentservice.getAccidents()
      .subscribe(data => {     
        this.dataSource1 = new MatTableDataSource(<IAccidentModel[]>data);
        this.dataSource1.paginator = this.paginator;
      });
   
  }

  dataSortAndPagination(){
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  getAccident(accident:number) {
     //this.router.navigate (['/viewaccidentdetails']); 
  
    this.router.navigate(
      ['viewaccidentdetails'],
      { queryParams: { id: accident} }
    );
  }
  formatDateTime(date: string):string{
    return new Date(date).toLocaleString();
  }

  
  GetPartiesAsString(parties: any[]){
    if (parties == null || parties.length === 0) {
      return "";
    }
    return parties.map(party => `${party.lastName} ${party.firstName}`).join(', ');
  }

  
  exportexcel() {
    //let { sheetName, fileName } = getFileName(name);
    let dataToExport = this.dataSource1.filteredData
    .map(x => ({
      AccidentId:x.id,
      AccidentDate: this.formatDateTime(x.accidentDate),
      Location: x.location,
      EstmatedCost: x.estimatedCost,
      NumberOfParties: x.numberOfParties
    }));
  
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Data.xlsx');
  }
}
