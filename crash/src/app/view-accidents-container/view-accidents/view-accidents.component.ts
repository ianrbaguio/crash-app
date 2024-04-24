import { Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CrashService } from '../../crash.service';

export interface IAccidentModel{
  location: string;
  accidentDate : string;
  parties: string[];
  
}
@Component({
  selector: 'crash-view-accidents',
  standalone: true,
  imports: [MatTableModule,  MatPaginator, MatSortModule],
  providers: [CrashService ],
  templateUrl: './view-accidents.component.html',
  styleUrl: './view-accidents.component.scss'
})
export class ViewAccidentsComponent {
  displayedColumns: string[] = ['location', 'accidentDate', 'parties']; 
  dataSource1!: MatTableDataSource<IAccidentModel>;
  @ViewChild(MatPaginator, {static: false}) paginator!:MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!:MatSort;
  
  constructor(private accidentservice : CrashService, private cdr:ChangeDetectorRef){

  }
  ngOnInit(): void {
    this.accidentservice.getAccidents()
      .subscribe(data => {     
        this.dataSource1 = new MatTableDataSource(<IAccidentModel[]>data);
      });
   
  }

  dataSortAndPagination(){
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

}
