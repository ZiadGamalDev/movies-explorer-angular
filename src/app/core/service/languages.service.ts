import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private languageSource = new BehaviorSubject<string>('en-US');
  currentLanguage$ = this.languageSource.asObservable();

  setLanguage(lang: string) {
    this.languageSource.next(lang);
  }
}
