export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

// Получение фильма
export interface GetMovieRequest {
    id: string;
}

export interface GetMovieResponse {
    // Здесь может быть определена структура для FullMovieInfo
    // Например:
    title: string;
    genre: string;
    releaseYear: string;
    // и т.д.
}
// 

// Поиска фильмов
export interface SearchRequest {
    title?: string;
    genre?: string;
    release_year?: string;
    sort_by?: 'release_year' | 'title' | 'rating';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export interface ShortMovieInfo {
    // Структура для ShortMovieInfo
    // Например:
    title: string;
    genre: string;
    releaseYear: string;
    // и т.д.
}

export interface SearchResponse {
    search_result: ShortMovieInfo[];
    total_pages: number;
}


// SELECT-опции
export interface SelectOption {
    value: string;
    label: string;
}


//  API login
export type LoginType = {
    username: string;
    password: string;
}

// API Search
export interface SearchComponentProps {
    changeSearch: React.Dispatch<React.SetStateAction<{ text: string; page: number; }>>;
    searchText: { text: string; page: number; };
  }