import { Component,ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('counterAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition(':enter', [
        animate('2s ease', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ]),
    trigger('counterAnimation1', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition(':enter', [
        animate('2s ease', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ]),
    trigger('counterAnimation2', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition(':enter', [
        animate('2s ease', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate('0.5s ease-in-out')),
    ])
  ]
})
export class HomeComponent {
  counter: number = 0;
  counter1: number = 0;
  counter2: number = 0;
  lastScrollPosition = 0;
  showAnimation = false;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @ViewChild('counterElement') counterElement!: ElementRef;
  @ViewChild('counterElement1') counterElement1!: ElementRef;
  @ViewChild('counterElement2') counterElement2!: ElementRef;


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

  constructor(private renderer: Renderer2, private router: Router) {
  }

  scrollDown() {
    const yOffset = window.innerHeight;
    this.renderer.setProperty(document.documentElement, 'scrollTop', yOffset);
    this.counterElement.nativeElement.classList.add('animated', 'fadeInDownBig');
    interval(200)
      .subscribe(() => {
        if (this.counter < 73) {
          this.counter++;
        }
      });

    this.counterElement1.nativeElement.classList.add('animated', 'fadeInDownBig');

    interval(200)
      .subscribe(() => {
        if (this.counter1 < 61) {
          this.counter1++;
        }
      });

      this.counterElement2.nativeElement.classList.add('animated', 'fadeInDownBig');

    interval(200)
      .subscribe(() => {
        if (this.counter2 < 52) {
          this.counter2++;
        }
      });
  }

  explore(){
    this.router.navigate(['explore']);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.lastScrollPosition = window.scrollY;
    this.counterElement.nativeElement.classList.add('animated', 'fadeInDownBig');
    interval(200)
      .subscribe(() => {
        if (this.counter < 73) {
          this.counter++;
        }
      });
      this.counterElement1.nativeElement.classList.add('animated', 'fadeInDownBig');

      interval(200)
        .subscribe(() => {
          if (this.counter1 < 61) {
            this.counter1++;
          }
        });


      this.counterElement2.nativeElement.classList.add('animated', 'fadeInDownBig');

      interval(200)
        .subscribe(() => {
          if (this.counter2 < 52) {
            this.counter2++;
          }
        });

        if ( this.lastScrollPosition == 650){
        const triggerPosition = 800; // Adjust the position as needed
        const yOffset = window.pageYOffset || document.documentElement.scrollTop;
        this.showAnimation = yOffset > triggerPosition;
        }
  }


}
