import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NounPexelsService } from 'src/services/noun-pexels.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent {
  myControl = new FormControl('');
  fotos: any[] = [];

  constructor(private nounPexelsService: NounPexelsService) {}

  obtenerImagenes() {
    const query = this.myControl.value;
    if (query) {
      this.nounPexelsService.getImages(query).subscribe(
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
