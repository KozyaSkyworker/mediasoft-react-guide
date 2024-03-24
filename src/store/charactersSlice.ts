import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CharactersState {
    id: number,
    name: string,
    image: string
}

const initialState: CharactersState[] = []

export const countersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    
    setCharacters: (state, action: PayloadAction<CharactersState[]>) => {
        return [...action.payload, ...state]
    },
    removeCharacter: (state, action: PayloadAction<number>) => {
        const newChars = state.filter((el) => el.id !== action.payload )
        return state = newChars
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCharacters,removeCharacter } = countersSlice.actions

export default countersSlice.reducer