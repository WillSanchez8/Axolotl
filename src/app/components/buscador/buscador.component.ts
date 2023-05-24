import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PexelsServiceService } from '../../services/pexels-service.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent {

  //myControl permite obtener el valor del input
  myControl = new FormControl('');

  //fotos es un array que almacena las fotos que se obtienen de la API
  fotos: any[] = [];

  constructor(private pexelsService: PexelsServiceService) { }

  obtenerImagenes() {
    const query = this.myControl.value;
    if (query) {
      this.pexelsService.getImages(query).subscribe(
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
