import { configureStore, combineReducers } from '@reduxjs/toolkit';
import catalogSlice from './catalogSlice';
import { enableMapSet } from 'immer';
import cartSlice from './cartSlice';

enableMapSet();

const rootReducer = combineReducers({
	catalog: catalogSlice,
	cart: cartSlice,
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
