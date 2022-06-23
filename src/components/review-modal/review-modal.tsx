import { useState, useEffect, FormEvent, Fragment, ChangeEvent } from 'react';
import FocusLock from 'react-focus-lock';

import { isEscEvent } from '../../utils/utils';

import { useAppDispatch } from '../../hooks';
import { addCommentAction } from '../../store/api-actions';

import { NewComment } from '../../types/guitars';
import { STAR_COUNT, ratingRange } from '../../consts';

type Props = {
  idGuitar?: string,
  guitarName: string,
  onReviewCloseClick: ()=> void,
  openModalSuccessSubmit: ()=> void,
};

function ReviewModal({idGuitar, guitarName, onReviewCloseClick, openModalSuccessSubmit}: Props): JSX.Element {

  const [userName, setUserName] = useState('');
  const [rate, setRate] = useState(0);
  const [adv,setAdv] = useState('');
  const [disadv, setDisadv] = useState('');
  const [comment, setComment] = useState('');

  const [invalidUserName, setInvalidUserName] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);
  const [invalidAdv, setInvalidAdv] = useState(false);
  const [invalidDisadv, setInvalidDisadv] = useState(false);
  const [invalidComment, setInvalidComment] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onBlockEscKeydown);

    return function () {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', onBlockEscKeydown);
    };
  });

  const onBlockEscKeydown = function (evt: KeyboardEvent) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      onReviewCloseClick();
    }
  };

  const onSubmit = (commentData: NewComment) => {
    dispatch(addCommentAction(commentData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (userName.length === 0) {setInvalidUserName(true);}
    if (adv.length === 0) {setInvalidAdv(true);}
    if (disadv.length === 0) {setInvalidDisadv(true);}
    if (comment.length === 0) {setInvalidComment(true);}
    if (rate === 0) {setInvalidRate(true);}

    if (userName && rate>0 && adv && disadv && comment) {
      onSubmit({
        guitarId: Number(idGuitar),
        userName: userName,
        advantage: adv,
        disadvantage: disadv,
        comment: comment,
        rating: rate,
      });
      openModalSuccessSubmit();
      onReviewCloseClick();
    }
  };

  return (
    <FocusLock>
      <div style={{position: 'relative', width: '550px', height: '610px', marginBottom: '50px'}}>
        <div className="modal is-active modal--review modal-for-ui-kit"  data-keyboard="false">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal onClick={() => onReviewCloseClick()}></div>
            <div className="modal__content">
              <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
              <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
              <form className="form-review"
                onSubmit={handleSubmit}
              >
                <div className="form-review__wrapper">
                  <div className="form-review__name-wrapper">
                    <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                    <input className="form-review__input form-review__input--name"
                      id="user-name" type="text" autoComplete="off"
                      onChange={(event) => {
                        setUserName(event.target.value);
                        setInvalidUserName(false);}}
                      data-testid="login"
                      autoFocus
                    />
                    <p className="form-review__warning" style={{height:'16px'}}>{invalidUserName ? 'Заполните поле' : ''}</p>
                  </div>

                  <div>
                    <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                    <div className="rate rate--reverse">
                      {[...Array(STAR_COUNT)].map((_,index) => {
                        const keyValue = index;

                        return (
                          <Fragment key={keyValue}>
                            <input className="visually-hidden" id={`star-${STAR_COUNT-index}`} name="rate" type="radio" value={STAR_COUNT-index}
                              data-testid={ratingRange[Math.floor(STAR_COUNT-index)-1]}
                              onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                                setRate(Number(target.value));
                                setInvalidRate(false);}}
                            />
                            <label className="rate__label" htmlFor={`star-${STAR_COUNT-index}`} title={ratingRange[Math.floor(STAR_COUNT-index)-1]}></label>
                          </Fragment>
                        );
                      })}
                      <p className="rate__message" style={{height:'16px'}}> {invalidRate ? 'Поставьте оценку<' : ' '}</p>
                    </div>
                  </div>
                </div>

                <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
                <input className="form-review__input"
                  id="adv" type="text" autoComplete="off"
                  onChange={(event) => {
                    setAdv(event.target.value);
                    setInvalidAdv(false);
                  }}
                  data-testid="adv"
                />
                <p className="form-review__warning" style={{height:'16px'}}> {invalidAdv ? 'Заполните поле' : ' '}</p>

                <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
                <input className="form-review__input"
                  id="disadv" type="text" autoComplete="off"
                  onChange={(event) => {
                    setDisadv(event.target.value);
                    setInvalidDisadv(false);
                  }}
                  data-testid="disadv"
                />
                <p className="form-review__warning" style={{height:'16px'}}> {invalidDisadv ? 'Заполните поле' : ' '}</p>

                <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
                <textarea className="form-review__input form-review__input--textarea"
                  id="comment" rows={10} autoComplete="off"
                  onChange={(event) => {
                    setComment(event.target.value);
                    setInvalidComment(false);
                  }}
                  data-testid="comment"
                >
                </textarea>
                <p className="form-review__warning" style={{height:'16px'}}> {invalidComment ? 'Заполните поле' : ' '}</p>

                <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
              </form>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
                onClick={onReviewCloseClick}
              >
                <span className="button-cross__icon"></span>
                <span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default ReviewModal;

