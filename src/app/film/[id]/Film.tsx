'use client'

import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../../features/filmCard/ListFilms/FilmsAPI';
import Header from '../../widgets/Header/Header';
import Loading from '../..//widgets/Loading/Loading';
import style from './filmDetail.module.css';
import StarRating from '../../widgets/raiting/AuthRating';

import { useSearchParams } from 'next/navigation'

const FilmDetail: React.FC = (id: {id: string}) => {

  console.log("id: ", id.id)

  const { data, error, isLoading } = useGetMovieByIdQuery(id.id);


  // const listRef = useRef<HTMLDivElement>(null);
  // const [showScrollButtons, setShowScrollButtons] = useState(false);
  // useEffect(() => {
  //   if (listRef.current && listRef.current.scrollWidth > listRef.current.clientWidth) {
  //     setShowScrollButtons(true);
  //   } else {
  //     setShowScrollButtons(false);
  //   }
  // }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Header />
        <div className={style.centeredError}>
          Ошибка в получении данных: {error.message || 'Unknown error'}
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header />
        <div className={style.centeredError}>
          Нет данных для отображения.
        </div>
      </>
    );
  }

  // const scroll = (direction: 'left' | 'right') => {
  //   if (listRef.current) {
  //     const scrollAmount = 200; 
  //     listRef.current.scrollBy({
  //       left: direction === 'left' ? -scrollAmount : scrollAmount,
  //       behavior: 'smooth',
  //     });
  //   }
  // };

  return (
    <>
      <Header/>
      <div className={style.detail}>
        <img className={style.filmImg} src={data.poster} alt={data.title} />
        <div>
          <div className={style.row}>
            <h2>{data.title}</h2>
            <StarRating id={id} />
          </div>
          <div className={style.inf}>
            <p><strong>Genre:</strong> {data.genre}</p>
            <p><strong>Release Year:</strong> {data.release_year}</p>
            <p><strong>Description:</strong> {data.description}</p>
          </div>
        </div>
      </div>
      <div className={style.actors}>
        <h3>Actors:</h3>
        {/* {showScrollButtons && (
          <button  className={`${style.scrollButtonL} ${style.scrollLeft}`} onClick={() => scroll('left')}>
            <img src="/icons/arrow-leftarr.svg" alt="Previous Page"/>
          </button>
        )}
        <div className={style.listActors} ref={listRef}>
          {data?.actors.length > 0 ? (
            data.actors.map((actor, index) => (
              <div key={index}>
              <img className={style.actorImg} src={actor.photo} alt={actor.name} />
              <p>{actor.name}</p>
            </div>
          ))
        ) : (
          <p>No actors information available.</p>
        )}
      </div>
      {showScrollButtons && (
        <button className={`${style.scrollButtonR} ${style.scrollRight}`} onClick={() => scroll('right')}>
          <img src="/icons/arrow-rightarr.svg" alt="Next Page"/>
        </button>
      )} */}
    </div>
  </>
);
};

export default FilmDetail;