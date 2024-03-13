import { Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewaccidentsService, IAccidentModel } from '../../viewaccidents.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'crash-view-accidents',
  standalone: true,
  imports: [MatTableModule, HttpClientModule, MatPaginator, MatSortModule],
  providers: [ViewaccidentsService],
  templateUrl: './view-accidents.component.html',
  styleUrl: './view-accidents.component.scss'
})
export class ViewAccidentsComponent {
  displayedColumns: string[] = ['Location', 'Date', 'Parties']; 
  dataSource1!: MatTableDataSource<IAccidentModel>;
  @ViewChild(MatPaginator, {static: false}) paginator!:MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!:MatSort;
  
  constructor(private accidentservice : ViewaccidentsService, private cdr:ChangeDetectorRef){

  }
  ngOnInit(): void {

    this.accidentservice.getAccidentsList()
      .subscribe(data => {
        this.dataSource1 = new MatTableDataSource(data);
      });
   
   
  }

  dataSortAndPagination(){
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

}
