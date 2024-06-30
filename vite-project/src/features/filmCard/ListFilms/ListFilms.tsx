import React from 'react';
import style from './listFilms.module.css';
import FilmCard from '../FilmCard';
import Loading from '../../../widgets/Loading/Loading';

type FilmType = {
    id: string;
    title: string;
    description: string;
    genre: string;
    release_year: number;
};

interface ListFilmsProps {
    isLoading: boolean;
    error: unknown;
    films: FilmType[] | null | undefined; 
}

const ListFilms: React.FC<ListFilmsProps> = (props) => {
    if (props.isLoading) return <Loading />;
    if (props.error) return <div>Произошла ошибка, попробуйте ещё раз</div>;
    if (!props.films || props.films.length === 0) return <p>Фильмы не найдены</p>;

    return (
        <>
            <div className={style.list}>
            {props.films.map((film) => (
                <FilmCard key={film.id} {...film} />
            ))}

        </div>
    </>
    );
}

export default ListFilms;
