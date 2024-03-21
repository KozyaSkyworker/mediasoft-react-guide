import { createSlice } from '@reduxjs/toolkit'

export interface CountersState {
  hate: number,
  like: number,
  idk: number
}

const initialState: CountersState = {
  hate: 0,
  like: 0,
  idk: 0,
}

export const countersSlice = createSlice({
  name: 'counters',
  initialState,
  reducers: {
    incrementHate: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. 
      // It doesn't actually mutate the state because it uses the Immer library
      state.hate += 1 
    },
    incrementLike: (state) => {
      state.like += 1
    },
    incrementIDK: (state) => {
      state.idk += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementHate, incrementLike, incrementIDK } = countersSlice.actions

export default countersSlice.reducer