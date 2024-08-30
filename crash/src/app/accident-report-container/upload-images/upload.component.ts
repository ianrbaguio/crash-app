import { Component,ElementRef,EventEmitter,OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule  } from '@angular/common';
@Component({
  selector: 'crash-upload-images',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit{
  @ViewChild('previewRef', { static: false }) previewRef!: ElementRef;
  currentFile?: File;
  message = '';
 
  @Output() m_image =new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {}
  selectFile(event: any): void {
    this.message = '';
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);
  
      if (file) {
 
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewRef.nativeElement.src = reader.result as string;
        };
        this.m_image.emit(file);
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
clearImage() {
    // Clear the image by setting its source to an empty string
    this.previewRef.nativeElement.src = '';
  }
}
