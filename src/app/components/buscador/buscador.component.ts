import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PexelsServiceService } from '../../services/pexels-service.service';
import { Etiqueta } from 'src/app/interfaces/etiquetas';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
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

  //variable de confirmacion de coneccion y tiempo de la misma
  conec: boolean = true;
  conexionInternetIntervalo: any;

  iniciarVerificacionConeccion(){
    this.conexionInternetIntervalo = setInterval (() => {this.verificarConexionInternet();}, 5000);
  }

  verificarConexionInternet () {
    navigator.onLine? this.conec=true : this.conec=false;
  }


  //CODIGO REDUCIDO
  generarTerminoAleatorio(): string {
    const index = Math.floor(Math.random() * this.palabras.length);
    const palabraAleatoria = this.palabras.splice(index, 1)[0];
    return palabraAleatoria;
  }

  constructor( private readonly pexelsService: PexelsServiceService, ) { this.iniciarVerificacionConeccion(); }

  ngOnInit() {
    //this.obtenerImagenesAleatorias();
    this.obtenerConsultas();
    this.actualizarOpcionesAutocompletado();
  }
  
  actualizarOpcionesAutocompletado() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value || ''))
    );
  }
    
  
  obtenerImagenesAleatorias() {
    this.obtenerImagenes2(this.generarTerminoAleatorio());
    //this.obtenerImagenes(this.generarTerminoAleatorio());
  }

  //Codigo reducido
  obtenerConsultas() {
    this.pexelsService.getQueries().subscribe((queries) => {
      const queriesUnicas = [...new Set(queries)];
      this.palabras = [...this.palabras, ...queriesUnicas];
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
  }

  //Codigo reducido
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.palabras.filter((option, index) =>
      option.toLowerCase().includes(filterValue) && this.palabras.indexOf(option) === index
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.myControl.setValue(event.option.value);
  }    
  
  onTabPress(event: Event) {
    event.preventDefault();
    // Aquí puedes agregar cualquier otra lógica que quieras ejecutar cuando se presione la tecla Tab
  }
  
  /*
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
  */

  //Codigo reducido
  
  obtenerImagenes2 (query : string | null = this.myControl.value){
    !this.conec? alert('No hay conexión a internet') : !query? null: this.pexelsService.getImages(query).subscribe(
      (data: any) => { 
        this.fotos = data.photos;
        this.etiquetas = this.crearEtiquetas(data.labels[0]);
        console.log(this.fotos);
        this.pushToPalabras(query);
        this.actualizarFotos.emit(this.fotos);
      },
      (error) => {
        console.log(error);
        error.status === 404? alert('No se encontraron resultados') : alert('Error en el servidor');
      }
    );
  }
  buscarPorEtiqueta2(etiqueta: string) {
    !this.conec? alert ('No hay coneccion a internet') : this.pexelsService.getImages(etiqueta).subscribe(
      (data: any) => {
        this.fotos = data.photos;
        this.etiquetas = this.crearEtiquetas(data.labels[0]);
        console.log(this.fotos);
        this.actualizarFotos.emit(this.fotos);
      },
      (error) => {
        console.log(error);
        error.status === 404? alert('No se encontraron resultados') : alert('Error en el servidor');
      }
    );
  }
  //Nuevos metodos
 crearEtiquetas(labels: string[]): any[]{
    return labels.map((label: string) => ({
      ingles: '',
      espanol: label,
      seleccionada: false,
    }));
  }
 pushToPalabras(query: string) {
    !this.palabras.push(query)? this.palabras.push(query) : null;
  }
  
}
