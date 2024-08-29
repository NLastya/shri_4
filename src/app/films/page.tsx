'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Header from '../widgets/Header/Header'
import FilterCard from '../features/filterCard/FilterCard';
import Search from '../features/search/search-input/Search';
import Pagination from '../widgets/Pagination/Pagination';
import style from '../main.module.css';
import Loading from '../widgets/Loading/Loading';
import ListFilms from '../features/filmCard/ListFilms/ListFilms';
import { useSearchFilmsQuery } from '../features/filmCard/ListFilms/FilmsAPI';
import { debounce } from 'lodash';
import { setGenre, setYear } from '../features/filterCard/filterSlice';

const Main: React.FC = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);
    const [searchParams, setSearchParams] = useState({ title: '', page: 1, genre: filters.genre, year: filters.year });

    const debouncedSetSearch = debounce((params) => {
        setSearchParams(params);
    }, 500)

    const debouncedSetSearchParams = useCallback((params) => {
        debouncedSetSearch(params)},
        []
    );

    useEffect(() => console.log(searchParams), [searchParams])

    useEffect(() => {
        const {year, genre} = filters

        setSearchParams(prev => ({ ...prev, genre, year }));
    }, [filters.genre, filters.year]);

    useEffect(() => {
        const updatedParams = { ...searchParams, genre: filters.genre, year: filters.year, page: 1 };
        setSearchParams(updatedParams);
        debouncedSetSearchParams(updatedParams);
        console.log(searchParams)
    }, [filters, debouncedSetSearchParams]);

    const { data = { search_result: [], total_pages: 1 }, error, isLoading } = useSearchFilmsQuery({

        title: searchParams.title,
        page: searchParams.page,
        genre: searchParams.genre,
        release_year: searchParams.year
    });


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