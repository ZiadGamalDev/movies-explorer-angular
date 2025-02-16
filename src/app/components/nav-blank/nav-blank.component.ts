import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import { WishlistService } from '../../core/service/wishlist.service';
import { LanguagesService } from '../../core/service/languages.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],  
  templateUrl: './nav-blank.component.html',  
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent {
  watchCount = 0;
  isScrolled = false;
  selectedLanguage: string = 'English (en-US)';
  isSidebarOpen: boolean = false;

  constructor(
    private wishService: WishlistService,
    private languageService: LanguagesService,
    private _router:Router
  ) {}



  ngOnInit(): void {
    console.log('navbar')
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


signOut():void{

localStorage.removeItem('etoken');
this._router.navigate(['/login'])

}

}
