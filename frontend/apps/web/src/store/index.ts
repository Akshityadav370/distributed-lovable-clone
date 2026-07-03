import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@/store/auth.slice';
import { api } from '@/store/api';
import projectsUiReducer from '@/modules/projects/projects.slice';
import workspaceUiReducer from '@/modules/workspace/workspace.slice';
import chatUiReducer from '@/modules/chat/chat.slice';
import billingUiReducer from '@/modules/billing/billing.slice';

const persistedAuthReducer = persistReducer(
  { key: 'auth', storage, whitelist: ['token', 'refreshToken', 'user'] },
  authReducer
);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  [api.reducerPath]: api.reducer,
  projectsUi: projectsUiReducer,
  workspaceUi: workspaceUiReducer,
  chatUi: chatUiReducer,
  billingUi: billingUiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
