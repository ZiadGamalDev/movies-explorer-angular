import { Routes } from '@angular/router';
import { authGuard } from './core/gaurd/auth.guard';




export const routes: Routes = [
  {
    path: '',
    canActivate:[authGuard],
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
      {
        path: 'movies',
        loadComponent: () =>
          import('./components/movies/movies.component').then(
            (m) => m.MoviesComponent
          ),
      },
      {
        path: 'movie/:id',
        loadComponent: () =>
          import('./components/movie-details/movie-details.component').then(
            (m) => m.MovieDetailsComponent
          ),
      },
      
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/Auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/Auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },

  // Wildcard Route (404 Not Found)
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
      title: 'Not-Found',
  },
];
