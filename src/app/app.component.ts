import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, RouterOutlet,Router } from '@angular/router';
import { FooterComponent } from './module/footer/footer.component';
import { NavigationComponent } from './module/navigation/navigation.component';
  import { Inject, PLATFORM_ID } from '@angular/core';
  import { isPlatformBrowser } from '@angular/common';
  import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'morseMonk';
  isNavBarVisible = true;
  private lastScrollTop = 0;
  constructor(private readonly router: Router,
     @Inject(PLATFORM_ID) private platformId: Object
  ) {
   router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    }
  });
  }
ngAfterViewInit() {
  if (isPlatformBrowser(this.platformId)) {
    // @ts-ignore
    import('aos').then(AOS => AOS.init({ duration: 1000, once: true }));
  }
}
  @HostListener('window:scroll', [])
  onWindowscroll() {
    const currectScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currectScroll > this.lastScrollTop) {
      // Scrolling down
      this.isNavBarVisible = false;
    } else {
      // Scrolling up
      this.isNavBarVisible = true;
    }
    this.lastScrollTop = currectScroll;
  }

public scrollToSections(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    const yOffset = -120; // Negative offset to adjust for fixed navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset - yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

}
