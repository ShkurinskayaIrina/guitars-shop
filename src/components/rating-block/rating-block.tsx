import { Fragment, useEffect, useState } from 'react';
import { fetchCountComments } from '../../store/api';
import { STAR_COUNT, ratingRange } from '../../consts';

type Props = {
  id: number,
  width: string,
  height: string,
  rating: number,
  isReview: boolean,
}

function RatingBlock({id, rating, width, height, isReview}: Props): JSX.Element {
  const [commentsCount, setCommentsCount] = useState(0);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isReview) {
      if (fetching) {
        fetchCountComments(id)
          .then((data: number) => {
            setCommentsCount(data);
          })
          .finally(()=>{setFetching(false);});
      }
    }
  }, [id, fetching, isReview]);

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
            <span className="visually-hidden">Всего оценок:</span> {commentsCount}
          </Fragment>
          :''}
      </p>
    </>
  );
}

export default RatingBlock;
