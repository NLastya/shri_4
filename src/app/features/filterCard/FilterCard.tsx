import { SelectOption } from '../../types';
import SelectFilter from '../../widgets/select/Select';
import style from './filtercard.module.css'

const genresOptions: SelectOption[] = [
    { value: '0', label: 'Не выбран' },
    { value: 'comedy', label: 'Комедия' },
    { value: 'drama', label: 'Драма' },
    { value: 'action', label: 'Боевик' },
    { value: 'thriller', label: 'Триллер' },
    { value: 'horror', label: 'Ужасы' },
    { value: 'family', label: 'Семейный' },
    { value: 'cartoon', label: 'Анимированный' },
    { value: 'fantasy', label: 'Фэнтези' },
    { value: 'romance', label: 'Романтика' },
    { value: 'adventure', label: 'Приключения' },
    { value: 'musical', label: 'Мьюзикл' },
    { value: 'war', label: 'Военный' },
];


const yearsOptions: SelectOption[] = [
    { value: '0', label: 'Не выбран' },
    { value: '2009', label: '2009' },
    { value: '2008', label: '2008' },
    { value: '2007', label: '2007' },
    { value: '2006', label: '2006' },
    { value: '1990-2005', label: '1990-2005' },
    { value: '1950-1989', label: '1950-1989' },
];


const FiltrCard: React.FC = () => {

    return(
    <div className={style.filterBox}> 
    <b>Фильтр</b>
    
    <SelectFilter title="Жанр" name="genre" options={genresOptions} />
    <SelectFilter title="Год выпуска" name="year" options={yearsOptions} />
    </div>
    )
}


export default FiltrCard;