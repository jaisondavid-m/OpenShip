import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
    persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist"
import storageModule from "redux-persist/lib/storage"

import authReducer from "./authSlice.js"

const storage = storageModule.default

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
}

const rootReducer = combineReducers({
    auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persistor = persistStore(store)