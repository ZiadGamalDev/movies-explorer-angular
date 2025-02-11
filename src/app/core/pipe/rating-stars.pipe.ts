import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'ratingStars',
})
export class RatingStarsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(rating: number, max: number = 5): SafeHtml {
    // Convert the 0-10 rating to a 0-5 scale.
    const normalizedRating = rating / 2;
    // Calculate number of full stars.
    const fullStars = Math.floor(normalizedRating);
    // Determine if we need a half star.
    const halfStar = normalizedRating - fullStars >= 0.5 ? 1 : 0;
    // Calculate empty stars to complete a total of max (5) stars.
    const emptyStars = max - fullStars - halfStar;

    let stars = '';

    // Append full stars.
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fa fa-star text-warning"></i> ';
    }

    // Append a half star if needed.
    if (halfStar) {
      stars += '<i class="fa fa-star-half-alt text-warning"></i> ';
    }

    // Append empty stars.
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="fa-regular fa-star text-warning"></i> ';
    }

    // Mark the HTML as safe so Angular renders it.
    return this.sanitizer.bypassSecurityTrustHtml(stars);
  }
}
