import { useEffect } from 'react';
import { SearchComponentProps } from '../../../types';
import style from './input.module.css'


const SearchComponent: React.FC<SearchComponentProps> = ({ changeSearch, searchText }) =>
    {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeSearch(event.target.value);
    };

    useEffect(()=>{console.log("changeSearch: ", changeSearch)}, [changeSearch])

    return (
        <input
        className={style.search}
            type="text"
            value={searchText.text}
            onChange={handleInputChange}
            placeholder="Название фильма"/>
    );
};

export default SearchComponent;
