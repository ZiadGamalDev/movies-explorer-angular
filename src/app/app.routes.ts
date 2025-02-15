import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',

    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'movies',
    component: MoviesComponent,
    title: 'Movies',
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
    title: 'Movie Details',
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'Wishlist',
  },

  {
    path: 'register',
    component: RegisterComponent,
    title: 'registeration',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not-Found',
  },
];
