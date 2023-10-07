import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import catalogSlice from './catalogSlice';
import cartSlice from './cartSlice';
import productSlice from './productSlice';

enableMapSet();

const rootReducer = combineReducers({
    catalog: catalogSlice,
    cart: cartSlice,
    product: productSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
