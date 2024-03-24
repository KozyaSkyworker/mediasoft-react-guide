import { configureStore } from '@reduxjs/toolkit'

import countersReducer from './counterSlice'
import charactersReducer from './charactersSlice'

export const store = configureStore({
  reducer: {
    'counters': countersReducer, // счётчики перетаскиваний
    'characters': charactersReducer // персонажи
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState> 
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch