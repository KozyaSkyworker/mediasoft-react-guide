import { configureStore } from '@reduxjs/toolkit'

import countersReducer from './counterSlice'
import charactersReducer from './charactersSlice'
import curCardReducer from './curCardSlice'

export const store = configureStore({
  reducer: {
    'counters': countersReducer, // счётчики перетаскиваний
    'characters': charactersReducer, // персонажи
    'curCard': curCardReducer // текущая взятая карточка
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState> 
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch