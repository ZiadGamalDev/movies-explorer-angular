import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingStars'
})
export class RatingStarsPipe implements PipeTransform {

  transform(rating: number, max: number = 5): string {
    let stars = '';

    for (let i = 0; i < Math.floor(rating); i++) {
      stars += '<i class="fa fa-star text-warning"></i> ';
    }

    if (rating % 1 >= 0.5) {
      stars += '<i class="fa fa-star-half-alt text-warning"></i> ';
    }

    for (let i = Math.ceil(rating); i < max; i++) {
      stars += '<i class="fa fa-star-o text-warning"></i> ';
    }

    return stars;
  }

}
