import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../../widgets/raiting/Rainting';
import style from './filmCard.module.css';
import { URL_API } from '../../config';
import AuthenticatedStarRating from '../../widgets/raiting/AuthRating';

type FilmType = {
  id: string;
  title: string;
  description: string;
  genre: string;
  release_year: number;
};

const FilmCard: React.FC<FilmType> = (props) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/films/${props.id}`);
  };

  const imgUrl:string = `${URL_API}/static/images/${props.id}`;

  return (
    <div className={style.card} onClick={handleCardClick}>
        <img className={style.img} src={imgUrl} alt="film" />
        <div className={style.inner}>
          <h2>{props.title}</h2>
          <div className={style.grid}>
          <p className={style.grid}>Жанр</p>
          <p className={style.blc}>{props.genre}</p>

          <p className={style.grey}>Год выпуска</p>
          <p className={style.blc}>{props.release_year}</p>

          <p className={style.grey}>Описание</p>
          <p className={style.blc}>{props.description}</p>
          </div>
        </div>
      <AuthenticatedStarRating/>
    </div>
  );
};

export default FilmCard;