import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { store } from '../../store/index';
import { fetchComments } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import { Comments, GuitarsComments } from '../../types/guitars';
import { getGuitarComments } from '../../store/guitars-data/selector';
import Review from '../review/review';
import ReviewModal from '../review-modal/review-modal';
import ModalSuccess from '../modal-success/modal-success';

const COMMENTS_COUNT_PER_STEP = 3;

type Props = {
  guitarId?: string,
  guitarName:string,
}

function ReviewsList({guitarId, guitarName}: Props): JSX.Element {
  let commentsSorted = [] as Comments;
  let commentsForRender = [] as Comments;

  const [commentsCount, setCommentsCount] = useState(COMMENTS_COUNT_PER_STEP);
  const [isReviewModalOpened, setIsReviewModalOpened] = useState(false);
  const [isModalSuccessOpened, setIsModalSuccessOpened] = useState(false);

  useEffect(() => {
    store.dispatch(fetchComments(Number(guitarId)));
  }, [guitarId]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  const allGuitarsReviews: GuitarsComments = useAppSelector(getGuitarComments);

  let guitarComments = [] as Comments;
  if (allGuitarsReviews !== undefined ) {
    if (Object.keys(allGuitarsReviews).length > 0)  {
      if (allGuitarsReviews[Number(guitarId as string)] !== undefined) {
        guitarComments = allGuitarsReviews[Number(guitarId as string)];
      }
    }
  }

  if (guitarComments !== undefined) {
    commentsSorted =  guitarComments.slice(0).sort((prev, next) =>
      new Date(next.createAt).getTime() - new Date(prev.createAt).getTime(),
    );

    commentsForRender = commentsSorted.slice(0, commentsCount);
  }

  function handleShowMoreButtonClick() {
    setCommentsCount(Math.min(commentsSorted.length, commentsCount + COMMENTS_COUNT_PER_STEP));
  }

  function scrollHandler() {
    if ((document.documentElement.scrollHeight -
      document.documentElement.scrollTop - window.innerHeight)<250 &&
       commentsCount<guitarComments.length) {
      setCommentsCount(Math.min(commentsSorted.length, commentsCount + COMMENTS_COUNT_PER_STEP));
    }
  }

  function onReviewBtnClick(){
    setIsReviewModalOpened(true);
  }

  function onReviewCloseClick(){
    setIsReviewModalOpened(false);
  }

  function openModalSuccessSubmit(){
    setIsModalSuccessOpened(true);
  }

  function closeModalSuccessSubmit(){
    setIsModalSuccessOpened(false);
  }

  function onUpButtonClick() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <Link className="button button--red-border button--big reviews__sumbit-button"
        to="" onClick={onReviewBtnClick}
      >Оставить отзыв
      </Link>

      {commentsForRender.map((comment) => (
        <Review commentForRender={comment} key={comment.id}/>
      ))}

      {
        commentsSorted.length>commentsCount ?
          <button className="button button--medium reviews__more-button hidden"
            onClick={() => handleShowMoreButtonClick()}
          >
        Показать еще отзывы
          </button> :
          ''
      }

      {
        commentsSorted.length === 0 ?
          <Link to=""
            className="button button--up button--red-border button--big"
            style={{bottom:'-61px', right:'0', position:'absolute'}}
            onClick={onUpButtonClick}
          >
        Наверх
          </Link> :
          <Link to=""
            className="button button--up button--red-border button--big reviews__up-button"
            onClick={onUpButtonClick}
          >
      Наверх
          </Link>
      }


      {isReviewModalOpened &&
      <ReviewModal idGuitar={guitarId}
        guitarName={guitarName}
        onReviewCloseClick={onReviewCloseClick}
        openModalSuccessSubmit={openModalSuccessSubmit}
      />}

      {isModalSuccessOpened &&
      <ModalSuccess closeModalSuccessSubmit={closeModalSuccessSubmit}/>}
    </section>
  );
}

export default ReviewsList;
