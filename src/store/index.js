import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { setupListeners } from '@reduxjs/toolkit/query'

import persistStore from 'redux-persist/es/persistStore'
import { postsApi } from '@/features/posts/postsAPI'
import { commentsApi } from '@/features/comments/commentsAPI'
// import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['postsApi', 'commentsApi'],
  // whitelist
}

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
})

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    postsApi.middleware,
    commentsApi.middleware,
    // logger,
  ],
})
setupListeners(store.dispatch)

export const persistor = persistStore(store)
// persistStore sẽ:
// Đăng ký subscriber lên store: mỗi khi state thay đổi,
// nó sẽ lấy các slice được whitelist (hoặc không nằm trong blacklist), tuần tự hóa (serialize) và ghi vào storage.
export default store
