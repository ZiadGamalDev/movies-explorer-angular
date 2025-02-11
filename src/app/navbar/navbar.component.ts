import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../core/service/wishlist.service';
import { LanguagesService } from '../core/service/languages.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  watchCount = 0;
  isScrolled = false;
  selectedLanguage: string = 'English (en-US)';
  isSidebarOpen: boolean = false;

  constructor(
    private wishService: WishlistService,
    private languageService: LanguagesService
  ) {}

  ngOnInit(): void {
    this.wishService.watchListCount$.subscribe(
      (count) => (this.watchCount = count)
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 100) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  changeLanguage(language: string) {
    this.selectedLanguage = this.getLanguageName(language);
    this.languageService.setLanguage(language);
  }

  getLanguageName(code: string): string {
    const languages: { [key: string]: string } = {
      'en-US': 'English (en-US)',
      'es-ES': 'Spanish; Castilian (es-ES)',
      'fr-FR': 'French (fr-FR)',
      'ar-EG': 'Arabic (ar-EG)',
      'zh-CN': 'Chinese (zh-CN)',
    };
    return languages[code] || 'English';
  }
}
