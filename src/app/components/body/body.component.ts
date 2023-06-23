import { Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() fotos: any[] = [];
  @Input() noFound: boolean = false;
  isDialogOpen = false;
  constructor(public dialog: MatDialog) { }


  verImagen(index: number) {
    const dialogRef = this.dialog.open(ImageDialogComponent, { data: { url: this.fotos[index].src.large, index, images: this.fotos }, });
    this.isDialogOpen = true;
    dialogRef.afterClosed().subscribe(() => this.isDialogOpen = false );
  } 
}