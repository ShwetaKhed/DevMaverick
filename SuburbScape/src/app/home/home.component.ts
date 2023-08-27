import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  ngOnInit(): void {
    this.doHero();
  }
  doHero(): void {
    window.addEventListener('scroll', () => {
      const heroElement = document.querySelector('.hero') as HTMLElement;
      if (heroElement) {
        const opacity = 1 - (window.scrollY / heroElement.clientHeight);
        heroElement.style.opacity = String(opacity);
      }
    });
  }

  constructor(private renderer: Renderer2) {}

  scrollDown() {
    const yOffset = window.innerHeight;
    this.renderer.setProperty(document.documentElement, 'scrollTop', yOffset);
  }


}
