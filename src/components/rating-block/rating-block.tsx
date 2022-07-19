import { Fragment } from 'react';
import { useAppSelector } from '../../hooks';
import { STAR_COUNT, ratingRange } from '../../consts';
import { GuitarsComments } from '../../types/guitars';
import { getGuitarComments } from '../../store/guitars-data/selector';

type Props = {
  id: number,
  width: string,
  height: string,
  rating: number,
  isReview: boolean,
}

function RatingBlock({id, rating, width, height, isReview}: Props): JSX.Element {

  const allGuitarsReviews: GuitarsComments = useAppSelector(getGuitarComments);

  let guitarCurrentReviews = 0;
  if (allGuitarsReviews !== undefined ) {
    if (Object.keys(allGuitarsReviews).length > 0)  {
      if (allGuitarsReviews[id] !== undefined) {
        guitarCurrentReviews = allGuitarsReviews[id].length;
      }
    }
  }

  return (
    <>
      {[...Array(STAR_COUNT)].map((_,index) => {
        const keyValue = index;
        return (
          <Fragment key={keyValue}>
            <svg width={width} height={height} aria-hidden="true"  data-testid="star">
              <use xlinkHref={Math.floor(rating)>index ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
          </Fragment>
        );
      })}
      <p className="visually-hidden">Оценка: {ratingRange[Math.floor(rating)-1]}</p>
      <p className="rate__count">

        {isReview===false ?
          <Fragment>
            <span className="visually-hidden">Всего оценок:</span>{guitarCurrentReviews===0 ? '' : guitarCurrentReviews}
          </Fragment>
          :''}
      </p>
    </>
  );
}

export default RatingBlock;
