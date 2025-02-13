import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoviesComponent } from './movies/movies.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HomeComponent } from './home/home.component';

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
    path: '**',
    component: NotFoundComponent,
    title: 'Not-Found',
  },
];
