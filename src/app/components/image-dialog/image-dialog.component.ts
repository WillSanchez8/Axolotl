import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {

  isPreviousClicked = false;
  isNextClicked = false;
  isCloseClicked = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { url: string, index: number, images: any[] },
    public dialogRef: MatDialogRef<ImageDialogComponent>
  ) {}

  onPrevious() {
    if (this.data.index > 0) {
      this.data.index--;
      this.data.url = this.data.images[this.data.index].src.large;
      this.isPreviousClicked = true;
      setTimeout(() => {
        this.isPreviousClicked = false;
      }, 100);
    }
  }

  onNext() {
    if (this.data.index < this.data.images.length - 1) {
      this.data.index++;
      this.data.url = this.data.images[this.data.index].src.large;
      this.isNextClicked = true;
      setTimeout(() => {
        this.isNextClicked = false;
      }, 100);
    }
  }

  onClose() {
    this.dialogRef.close();
    this.isCloseClicked = true;
    setTimeout(() => {
      this.isCloseClicked = false;
    }, 100);
  }
}
