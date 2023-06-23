import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  fotos: any[] = [];
  notFound: boolean = false;

  actualizarFotos(fotos: any[]) {
    this.fotos = fotos;
  }
  capturarNotFound(notFound: boolean) {
    this.notFound = notFound;
  }
}
