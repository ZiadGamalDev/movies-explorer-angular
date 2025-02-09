import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoviesComponent } from './movies/movies.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full',
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
    path: '**',
    component: NotFoundComponent,
    title: 'Not-Found',
  },
];
