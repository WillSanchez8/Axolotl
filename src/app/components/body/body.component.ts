import { Component , HostListener, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() fotos: any[] = [];
  isDialogOpen = false;
  constructor(public dialog: MatDialog) { }

  verImagen(index: number) {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: { url: this.fotos[index].src.large, index, images: this.fotos },
    });
    this.isDialogOpen = true;
    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }  

   /* contenedor: HTMLElement | null=null;
    @HostListener('window:scroll')
    onWindowScroll() {
      if (this.contenedor) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.contenedor.style.top = (10 + scrollTop) + 'px'; // Ajusta la posición verticalmente según tus necesidades
      }
    }
  
    ngAfterViewInit() {
      this.contenedor = document.querySelector('.contenedor-grecas');
    }*/
}