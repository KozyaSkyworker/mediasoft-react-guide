import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TCounters } from '@type/common'


const initialState: TCounters = {
  hate: [],
  like: [],
  idk: [],
}

export const countersSlice = createSlice({
  name: 'counters',
  initialState,
  reducers: {
    addNewHate: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. 
      // It doesn't actually mutate the state because it uses the Immer library
      state.hate.push(action.payload)
    },
    addNewLike: (state, action: PayloadAction<string>) => {
      state.like.push(action.payload)
    },
    addNewIDK: (state, action: PayloadAction<string>) => {
      state.idk.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNewHate, addNewLike, addNewIDK } = countersSlice.actions

export default countersSlice.reducer