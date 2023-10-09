import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsData from '../json/data.json';
import { AppDispatch, RootState } from './store';
import { ProductWithQuantity } from '../types/types';

type ThunkApiConfig = {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: {};
    extra: {};
};

export const requestProduct = createAsyncThunk<string, number, ThunkApiConfig>(
    'product/requestProduct',
    async (barcode = 0, { dispatch, getState }) => {
        setTimeout(() => {
            let product;
            const productInCart = getState().cart.products.find((el) => el.barcode === barcode);
            console.log(productInCart);

            if (productInCart) {
                product = productInCart;
            } else {
                const newProduct = Object.values(productsData).find((el) => el.barcode === barcode);
                if (newProduct) {
                    product = {
                        ...newProduct,
                        quantity: 0,
                    };
                }
            }

            dispatch(setProduct(product));
        }, 100);

        return 'Product requested';
    },
);

interface InitialState {
    product: ProductWithQuantity | undefined;
}

const initialState: InitialState = {
    product: undefined,
};

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestProduct.fulfilled, (state, action) => {});
    },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
