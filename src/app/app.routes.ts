import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
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
