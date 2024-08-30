import { Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CrashService } from '../../crash.service';
import { Guid } from "guid-typescript";


export interface IAccidentModel{
  id: Guid;
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


}
