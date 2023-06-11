import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PexelsServiceService } from '../../services/pexels-service.service';
import { Etiqueta } from 'src/app/interfaces/etiquetas';
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

  @Output() actualizarFotos = new EventEmitter<any[]>();

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
    let palabraAleatoria = '';
    const palabrasGeneradas: string[] = [];
    do {
      const index = Math.floor(Math.random() * this.palabras.length);
      palabraAleatoria = this.palabras[index];
    } while (palabrasGeneradas.includes(palabraAleatoria));
    palabrasGeneradas.push(palabraAleatoria);
    return palabraAleatoria;
  }
  

  constructor(
    private pexelsService: PexelsServiceService,
  ) {}

  ngOnInit() {
    this.obtenerImagenesAleatorias();
    this.obtenerConsultas();
    this.actualizarOpcionesAutocompletado();
  }
  
  actualizarOpcionesAutocompletado() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value || ''))
    );
  }
    
  
  obtenerImagenesAleatorias() {
    this.obtenerImagenes(this.generarTerminoAleatorio());
  }
  
  obtenerConsultas() {
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
    return this.palabras.filter((option, index) =>
      option.toLowerCase().includes(filterValue) && this.palabras.indexOf(option) === index
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
          // Emitir evento con las nuevas imágenes
          this.actualizarFotos.emit(this.fotos);
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
        // Emitir evento con las nuevas imágenes
        this.actualizarFotos.emit(this.fotos);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
