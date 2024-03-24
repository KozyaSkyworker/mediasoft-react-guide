import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TCharacter } from '@type/common'

const initialState: TCharacter[] = []

export const countersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    
    setCharacters: (state, action: PayloadAction<TCharacter[]>) => {
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