"use client"

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./authSlice";

const persistConfig = {
    key: 'root',
    storage: storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducers,

    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        });

        if (process.env.NODE_ENV !== 'production') {
            middlewares.push(logger);
        }

        return middlewares;
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;