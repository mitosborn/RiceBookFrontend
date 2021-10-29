import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {riceBookReducer} from "./reducers";

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, riceBookReducer)

function configureStore() {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}


export default configureStore;