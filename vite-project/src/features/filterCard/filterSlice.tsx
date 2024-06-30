import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    genre: string;
    year: string;
}

const initialState: FilterState = {
    genre: '0',
    year: '0'
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setGenre(state, action: PayloadAction<string>) {
            state.genre = action.payload;
        },
        setYear(state, action: PayloadAction<string>) {
            state.year = action.payload;
        }
    }
});

export const { setGenre, setYear } = filterSlice.actions;
export default filterSlice.reducer;