import { Component, AfterViewInit,ElementRef } from '@angular/core';
import 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function(event) {
      // Obtén referencias a los elementos de la ventana emergente
      const popup = document.getElementById("popup");
      const closeBtn = document.querySelector(".close");
  
      // Verifica si los elementos existen antes de continuar
      if (popup && closeBtn) {
        // Agrega un evento de clic al botón de cierre para ocultar la ventana emergente
        closeBtn.addEventListener("click", function() {
          popup.style.display = "none";
        });
  
        // Muestra la ventana emergente cuando se cargue la página
        popup.style.display = "block";
      }
    });
  }

  
  

  
  //CODIGO REDUCIDO
  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('#logo').addEventListener('dragstart', (event: DragEvent) => {  event.preventDefault(); });
  }
  
  /*
  ngAfterViewInit() {
    const logo = this.elementRef.nativeElement.querySelector('#logo');
    if (logo) {
      logo.addEventListener('dragstart', (event: DragEvent) => {
        event.preventDefault();
      });
    }
  }
  */


  
}