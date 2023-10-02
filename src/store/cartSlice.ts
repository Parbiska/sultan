import { Product } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';

export type ProductWithQuantity = {
	quantity: number;
	id: number;
} & Product;

interface InitialState {
	products: ProductWithQuantity[];
	total: number;
}

const initialState: InitialState = {
	products: [],
	total: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.products.push({
				...action.payload,
				quantity: 1,
				id: state.products.length,
			});

			state.total += action.payload.price;
		},

		increase: (state, action) => {
			const barcode = action.payload;

			const existingItem = state.products.find(
				(item: ProductWithQuantity) => item.barcode === barcode
			);

			if (existingItem) {
				// Увеличиваем количество товара в корзине
				existingItem.quantity += 1;

				state.total += existingItem.price;
			}
		},

		decrease: (state, action) => {
			const barcode = action.payload;

			const existingItem = state.products.find(
				(item: ProductWithQuantity) => item.barcode === barcode
			);

			if (existingItem) {
				if (existingItem.quantity > 1) {
					state.total -= existingItem.price;

					// Уменьшаем количество товара в корзине
					existingItem.quantity -= 1;
				} else {
					state.total -= existingItem.price;

					// Удаляем товар из корзины, если его количество достигло 1
					state.products = state.products.filter(
						(item: ProductWithQuantity) => item.barcode !== barcode
					);
				}
			}
		},

		deleteFromCart: (state, action) => {
			const barcode = action.payload;

			const existingItem = state.products.find(
				(item: ProductWithQuantity) => item.barcode === barcode
			);

			if (existingItem) {
				state.total -= existingItem.quantity * existingItem.price;

				state.products = state.products.filter(
					(item: ProductWithQuantity) => item.barcode !== barcode
				);
			}
		},

		clearCart: (state) => {
			// Очищаем корзину полностью
			state.products = [];
			state.total = 0;
		},
	},
});

export const { addToCart, clearCart, deleteFromCart, decrease, increase } =
	cartSlice.actions;

export default cartSlice.reducer;
