import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule  } from '@angular/common';
@Component({
  selector: 'crash-upload-images',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit{
  currentFile?: File;
  message = '';
  preview = '';

  imageInfos?: Observable<any>;
 @Output() m_image =new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {

  }
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    const selectedFiles = event.target.files;
  
    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };
        this.m_image.emit(file);
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

}
