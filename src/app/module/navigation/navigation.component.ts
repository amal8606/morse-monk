import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navigation.component.html',
})

export class NavigationComponent {
 constructor(private readonly route: Router) {}
@Output() sectionId =new EventEmitter<string>;
    public navigateTo(path: string) {
    this.route.navigate([path]);
  }
  public scrollToSection(id:string){
this.route.navigate(['/'], { fragment: id });

  }
  isMobileMenuOpen = false;

toggleMobileMenu() {
  this.isMobileMenuOpen = !this.isMobileMenuOpen;
}
}
