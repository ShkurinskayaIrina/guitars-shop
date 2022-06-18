import { Comment } from '../../types/guitars';
import RatingBlock from '../rating-block/rating-block';

type Props = {
  commentForRender: Comment,
}

function Review({commentForRender}: Props): JSX.Element {
  const { id, userName, comment, createAt,  advantage, disadvantage, rating } = commentForRender;

  const dateComment = new Date(createAt);

  const getMonthNameInGenitiveCase = (date = new Date()) =>
    [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ][date.getMonth()];

  const dateCommentRender = `${dateComment.getDate()} ${getMonthNameInGenitiveCase(dateComment)}`;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
        <span className="review__date">{dateCommentRender}</span>
      </div>
      <div className="rate review__rating-panel">
        <RatingBlock id={Number(id)} width="16" height="16" rating={rating} isReview/>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>

  );
}

export default Review;
