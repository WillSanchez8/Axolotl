import { Component, AfterViewInit,ElementRef } from '@angular/core';
import 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  

  
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