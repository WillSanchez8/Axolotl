import { Component, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { CargaComponent } from '../carga/carga.component';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() fotos: any[] = [];
  @Input() noFound: boolean = false;
  @Output() isLoading = new EventEmitter<boolean>();
  isDialogOpen = false;
  constructor(public dialog: MatDialog, private carga: MatDialog, private render: Renderer2) { }


  verImagen(index: number) {
    const dialogRef = this.dialog.open(ImageDialogComponent, { data: { url: this.fotos[index].src.large, index, images: this.fotos }, });
    this.isDialogOpen = true;
    dialogRef.afterClosed().subscribe(() => this.isDialogOpen = false );
  } 

  //pantalla de carga
  openDialog() {
    this.isDialogOpen = true;
    const dialogRef = this.carga.open(CargaComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }
  //cerrar pantalla de carga
  closeDialog() {
    this.isDialogOpen = false;
    setTimeout(() => {
      this.carga.closeAll();
      this.isLoading.emit(false);
    }
    , 2000);
  }


  //vericar la descarga de las imagenes
  onImageLoad(index: number) {
    console.log(`Imagen ${index + 1} cargada correctamente.`);
    if (index + 1 === this.fotos.length) {
      console.log('Todas las imagenes han sido cargadas correctamente.');
      this.closeDialog();
    }
  }
}