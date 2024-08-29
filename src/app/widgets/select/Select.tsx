import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SelectOption } from '../../types';
import style from './select.module.css';
import { setGenre, setYear } from '../../features/filterCard/filterSlice';

interface SelectFilterProps {
    name: string;
    options: SelectOption[];
    title?: string;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ name, options, title }) => {
    const dispatch = useDispatch();
    const selectedValue = useSelector((state: RootState) => state.filters[name]);

    // Обновляем состояние при загрузке страницы на основе URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paramValue = params.get(name) || '0';
        
        if (name === 'genre') {
            dispatch(setGenre(paramValue));
        } else if (name === 'year') {
            dispatch(setYear(paramValue));
        }
    }, [name, dispatch]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (name === 'genre') {
            dispatch(setGenre(value));
        } else if (name === 'year') {
            dispatch(setYear(value));
        }

        // Обновляем строку запроса URL
        const params = new URLSearchParams(window.location.search);
        if (value === '0') {
            params.delete(name); // Удаляем параметр если выбранное значение равно '0'
        } else {
            params.set(name, value);
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newUrl);
    };

    return (
        <div>
            {title && <h3>{title}</h3>}
            <select className={style.select} value={selectedValue} onChange={handleSelectChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectFilter;