import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent {
  @Output() cerrarVentana: EventEmitter<void> = new EventEmitter<void>();
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

}
