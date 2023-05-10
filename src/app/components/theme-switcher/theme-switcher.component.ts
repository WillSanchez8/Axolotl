import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent {
  isDarkThemeActive: boolean = false;//almacena el valor del toggle

  onChange(newValue: boolean): void{
    console.log(newValue);
  }
}
