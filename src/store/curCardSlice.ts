import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TCharacter } from '@type/common'

const initialState: TCharacter | null = null

export const countersSlice = createSlice({
  name: 'curCard',
  initialState,
  reducers: {
    setCurCard: (state, action: PayloadAction<TCharacter>) => {
        return state = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setCurCard} = countersSlice.actions

export default countersSlice.reducer