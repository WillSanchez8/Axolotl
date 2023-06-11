import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PexelsServiceService } from '../../services/pexels-service.service';
import { Etiqueta } from 'src/app/interfaces/etiquetas';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  //myControl permite obtener el valor del input
  myControl = new FormControl('');

  //etiquetas es un array que almacena las etiquetas que se muestran en el buscador
  etiquetas: Etiqueta[] = [];

  //fotos es un array que almacena las fotos que se obtienen de la API
  fotos: any[] = [];

  isDialogOpen = false;

  palabras: string[] = [
    'naturaleza',
    'ciudad',
    'animales',
    'comida',
    'viajes',
    'deportes',
  ];
  filteredOptions!: Observable<string[]>;

  generarTerminoAleatorio(): string {
    const index = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[index];
  }

  constructor(
    private pexelsService: PexelsServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.obtenerImagenes(this.generarTerminoAleatorio());
    this.pexelsService.getQueries().subscribe((queries) => {
      const queriesUnicas = queries.filter((valor, indice) => {
        return queries.indexOf(valor) === indice;
      });
      this.palabras = [...this.palabras, ...queriesUnicas];
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
  }  
  
  private _filter(value: string): string[] {
    if (!value) {
      return this.palabras;
    }
    const filterValue = value.toLowerCase();
    return this.palabras.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  selectFirstOption(event: Event) {
    event.preventDefault();
    this.filteredOptions.subscribe((options) => {
      const inputValue = this.myControl.value;
      if (inputValue) {
        const bestMatch = options.find((option) =>
          option.startsWith(inputValue)
        );
        if (bestMatch) {
          this.myControl.setValue(bestMatch);
        }
      }
    });
  }

  obtenerImagenes(query: string | null = this.myControl.value) {
    if (query) {
      this.pexelsService.getImages(query).subscribe(
        (data: any) => {
          this.fotos = data.photos;
          this.etiquetas = data.labels[0].map((label: string) => ({
            ingles: '',
            espanol: label,
            seleccionada: false,
          }));
          console.log(this.fotos);
          if (!this.palabras.includes(query)) {
            this.palabras.push(query);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }  

  buscarPorEtiqueta(etiqueta: string) {
    this.pexelsService.getImages(etiqueta).subscribe(
      (data: any) => {
        this.fotos = data.photos;
        this.etiquetas = data.labels[0].map((label: string) => ({
          ingles: '',
          espanol: label,
          seleccionada: false,
        }));
        console.log(this.fotos);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  verImagen(index: number) {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: { url: this.fotos[index].src.large, index, images: this.fotos },
    });
    this.isDialogOpen = true;
    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }
}
