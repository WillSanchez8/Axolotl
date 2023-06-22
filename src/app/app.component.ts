import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Axolotl';

  desactivarBlur() {
    const mainBlurElement = document.querySelector('.main-blur') as HTMLElement;
    if (mainBlurElement) {
      mainBlurElement.style.filter = 'none';
    }
  }
}
