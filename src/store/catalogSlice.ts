import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsData from '../json/data.json';
import { Product } from '../types/types';
import { AppDispatch, RootState } from './store';

export type SearchSelectors = {
    minPrice: number | undefined;
    maxPrice: number | undefined;
    careType: string | undefined;
    searchWords: string | undefined;
    companies: string[];
    brands: string[];
};

type ThunkApiConfig = {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: {};
    extra: {};
};

export const requestProducts = createAsyncThunk<string, {}, ThunkApiConfig>(
    'catalog/requestProducts',
    async (arg, { dispatch, getState }) => {
        const state = getState();

        const { minPrice, careType, maxPrice, searchWords, brands, companies } = state.catalog.searchSelectors;

        // Эмитирование получения элементов с сервера
        setTimeout(() => {
            const response = productsData;
            let resultArray = [...Object.values(response)];

            if (careType !== undefined) {
                resultArray = resultArray.filter((el) => el.careType.includes(careType));
            }

            if (maxPrice !== undefined) {
                resultArray = resultArray.filter((el) => el.price < maxPrice);
            }

            if (minPrice !== undefined) {
                resultArray = resultArray.filter((el) => el.price > minPrice);
            }

            if (companies.length) {
                resultArray = resultArray.filter((el) => companies.includes(el.company));
            }

            if (brands.length) {
                resultArray = resultArray.filter((el) => brands.includes(el.brand));
            }

            if (searchWords !== undefined) {
                resultArray = resultArray.filter((el) =>
                    `${el.brand} ${el.company} ${el.description} ${el.name}`.toLocaleLowerCase().includes(searchWords),
                );
            }

            dispatch(clearProductsList());
            dispatch(loadProducts(resultArray));
        }, 100);

        return 'Products requested';
    },
);

interface InitialState {
    products: Array<Product> | null;
    companies: {
        [key: string]: number;
    };
    brands: {
        [key: string]: number;
    };
    searchSelectors: SearchSelectors;
}

const initialState: InitialState = {
    products: null as Array<Product> | null,
    companies: {},
    brands: {},
    searchSelectors: {
        searchWords: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        careType: undefined,
        companies: [],
        brands: [],
    },
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: initialState,
    reducers: {
        loadProducts(state, action) {
            state.products = action.payload;

            action.payload.forEach((el: Product) => {
                if (!state.companies[el.company]) {
                    state.companies[el.company] = 1;
                } else {
                    state.companies[el.company] += 1;
                }

                if (!state.brands[el.brand]) {
                    state.brands[el.brand] = 1;
                } else {
                    state.brands[el.brand] += 1;
                }
            });
        },
        clearProductsList(state) {
            state.products = [];

            state.companies = {};
            state.brands = {};
        },
        setSearchSelectors(state, action) {
            const selectors = action.payload;
            if (selectors.searchWords) state.searchSelectors.searchWords = selectors.searchWords;

            if (selectors.minPrice) state.searchSelectors.minPrice = selectors.minPrice;

            if (selectors.maxPrice) state.searchSelectors.maxPrice = selectors.maxPrice;

            if (selectors.careType) state.searchSelectors.careType = selectors.careType;

            if (selectors.companies) state.searchSelectors.companies = selectors.companies;

            if (selectors.brands) state.searchSelectors.brands = selectors.brands;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestProducts.fulfilled, (state, action) => {});
    },
});

export const { loadProducts, clearProductsList, setSearchSelectors } = catalogSlice.actions;
export default catalogSlice.reducer;
