
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguagesService } from '../../core/service/languages.service';
@Component({
  selector: 'app-nav-auth',
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.css'
})
export class NavAuthComponent {


  watchCount = 0;
  isScrolled = false;
  selectedLanguage: string = 'English (en-US)';
  isSidebarOpen: boolean = false;

  constructor(
   
    private languageService: LanguagesService
  ) {}



  ngOnInit(): void {
    console.log('navbar')
   
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
