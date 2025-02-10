import { RatingStarsPipe } from '../../pipe/rating-stars.pipe';

describe('RatingStarsPipe', () => {
  it('create an instance', () => {
    const pipe = new RatingStarsPipe();
    expect(pipe).toBeTruthy();
  });
});
