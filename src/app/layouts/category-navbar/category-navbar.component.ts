import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ElementRef, HostListener, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css'],
})
export class CategoryNavbarComponent {
  data: Array<object>;
  isMenuOpen = false;

  constructor(
    private catServices: CategoriesService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.catServices.loadCatData().subscribe((value) => {
      this.data = value;
    });
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    const menuElement = this.el.nativeElement.querySelector(
      '#navbarSupportedContent'
    );
    if (!menuElement.contains(target) && this.isMenuOpen) {
      this.renderer.removeClass(menuElement, 'show');
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }

  toggleMenu(): void {
    const menuElement = this.el.nativeElement.querySelector(
      '#navbarSupportedContent'
    );
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.renderer.addClass(menuElement, 'show'); // Show the menu
    } else {
      this.renderer.removeClass(menuElement, 'show'); // Hide the menu
    }
  }
}
