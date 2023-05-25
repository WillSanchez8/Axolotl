import { Component , HostListener} from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
   /* contenedor: HTMLElement | null=null;
    @HostListener('window:scroll')
    onWindowScroll() {
      if (this.contenedor) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.contenedor.style.top = (10 + scrollTop) + 'px'; // Ajusta la posición verticalmente según tus necesidades
      }
    }
  
    ngAfterViewInit() {
      this.contenedor = document.querySelector('.contenedor-grecas');
    }*/
  }