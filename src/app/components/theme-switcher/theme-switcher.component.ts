import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  isDarkThemeActive: boolean = false;//almacena el valor del toggle

  constructor(@Inject(DOCUMENT)private document:Document) { }

  onChange(newValue: boolean): void{
    if(newValue){
      this.document.body.classList.add('dark-mode');
    }else{
      this.document.body.classList.remove('dark-mode');
    } 
  }
}
