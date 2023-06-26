import { Component, Input} from '@angular/core';
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
    }
    , 3000);
  }

  //Verificar la renderizacion de las imagenes
  revicionRenImagenes() {
    this.fotos.forEach((element: any) => {
      if (element.render == false) {
        this.render.listen(element, 'load', () => {
          element.render = true;
        });
      }
    });
  }
  //verificar si termino de cargar las imagenes
  verificarCargaImagenes() {
    let intervalo = setInterval(() => {
      if (this.fotos.length > 0) {
        this.revicionRenImagenes();
        clearInterval(intervalo);
      }
    }, 1000);
    console.log("imagenes renderizadas");
    this.closeDialog();
  }
  
}