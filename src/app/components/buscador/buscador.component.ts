import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PexelsServiceService } from '../../services/pexels-service.service';
import { Etiqueta } from 'src/app/interfaces/etiquetas';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent {

  //myControl permite obtener el valor del input
  myControl = new FormControl('');

  //etiquetas es un array que almacena las etiquetas que se muestran en el buscador
  etiquetas: Etiqueta[] = [];

  //fotos es un array que almacena las fotos que se obtienen de la API
  fotos: any[] = [];

  constructor(private pexelsService: PexelsServiceService) { }

  obtenerImagenes() {
    const query = this.myControl.value;
    if (query) {
      this.pexelsService.getImages(query).subscribe(
        (data: any) => {
          this.fotos = data.photos;
          this.etiquetas = data.labels.map((label: any) => ({
            ingles: label.ingles,
            espanol: label.espanol,
          }));
          console.log(this.fotos);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  
  buscarConIA() {
    const query = this.myControl.value;
    const etiquetasSeleccionadas = this.etiquetas
      .filter((etiqueta) => etiqueta.seleccionada)
      .map((etiqueta) => etiqueta.ingles);
    if (query) {
      this.pexelsService
        .getImagesWithLabels(query, etiquetasSeleccionadas)
        .subscribe(
          (data: any) => {
            this.fotos = data.photos;
            console.log(this.fotos);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

}
