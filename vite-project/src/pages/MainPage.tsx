import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Header from '../widgets/Header/Header';
import FilterCard from '../features/filterCard/FilterCard';
import Search from '../features/search/search-input/Search';
import Pagination from '../widgets/Pagination/Pagination';
import style from './main.module.css';
import Loading from '../widgets/Loading/Loading';
import ListFilms from '../features/filmCard/ListFilms/ListFilms';
import { useSearchFilmsQuery } from '../features/filmCard/ListFilms/FilmsAPI';
import { debounce } from 'lodash';
import { setGenre, setYear } from '../features/filterCard/filterSlice';

const Main: React.FC = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);
    const [searchParams, setSearchParams] = useState({ title: '', page: 1, genre: filters.genre, year: filters.year });
    const [debouncedSearchParams, setDebouncedSearchParams] = useState(searchParams);

    const debouncedSetSearchParams = useCallback(
        debounce((params) => {
            console.log("Debounced params: ", params);
            setDebouncedSearchParams(params);
        }, 500),
        []
    );

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const genre = params.get('genre') || '0';
        const year = params.get('year') || '0';

        dispatch(setGenre(genre));
        dispatch(setYear(year));

        setSearchParams(prev => ({ ...prev, genre, year }));
    }, [dispatch]);

    useEffect(() => {
        const updatedParams = { ...searchParams, genre: filters.genre, year: filters.year, page: 1 };
        setSearchParams(updatedParams);
        debouncedSetSearchParams(updatedParams);
    }, [filters, debouncedSetSearchParams]);

    useEffect(() => {
        debouncedSetSearchParams(searchParams);
        console.log('Updated debounced search params:', debouncedSearchParams);
    }, [searchParams, debouncedSetSearchParams]);

    const { data = { search_result: [], total_pages: 1 }, error, isLoading } = useSearchFilmsQuery({
        title: debouncedSearchParams.title,
        page: debouncedSearchParams.page,
        genre: debouncedSearchParams.genre,
        release_year: debouncedSearchParams.year
    });

    useEffect(() => {
        console.log('Fetching data with params:', debouncedSearchParams);
    }, [debouncedSearchParams]);

    const handlePageChange = (newPage: number) => {
        const updatedParams = { ...searchParams, page: newPage };
        setSearchParams(updatedParams);
        console.log('Page change params:', updatedParams);
    };

    const handleSearchChange = (updatedText: string) => {
        const updatedParams = { ...searchParams, title: updatedText, page: 1 };
        setSearchParams(updatedParams);
    };

    return (
        <>
            <Header />
            <div className={style.main}>
                <FilterCard />
                <div className={style.right}>
                    <Search changeSearch={handleSearchChange} searchText={searchParams} />
                    {isLoading && <Loading />}
                    {error && <p>Error occurred: {error.message || 'Unknown error'}</p>}
                    <ListFilms films={data.search_result} isLoading={isLoading} error={error} />
                    <Pagination
                        currentPage={searchParams.page}
                        totalPages={data.total_pages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default Main;