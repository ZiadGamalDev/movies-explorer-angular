import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideGoogleAnalytics, provideGoogleAnalyticsRouter } from '@hakimio/ngx-google-analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      tapToDismiss: true,
      closeButton: true,
      newestOnTop: true,
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
    provideGoogleAnalytics('G-TQJ37896NQ'), // استبدل بمعرف التتبع الخاص بك
    provideGoogleAnalyticsRouter() // لتتبع تغييرات المسار تلقائيًا
  ],
};
