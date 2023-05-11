import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

//importar servicio noun-pexels.service.ts
import { NounPexelsService } from '../../noun-pexels.service';


/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})

//implementar servicio noun-pexels.service.ts


export class BuscadorComponent implements OnInit {

  //variabe para almacenar las imagenes
  fotos: any[] = [];

  constructor(private nounPexelsService: NounPexelsService) { }

  myControl = new FormControl('');
  options: string[] = ['Flor', 'Perro', 'Gato'];
  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    //this.obtenerImagenes();
  }

  obtenerImagenes() {
    const query = 'Flor';
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
