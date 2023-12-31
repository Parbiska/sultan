import { connect } from 'react-redux';
import s from './Catalog.module.scss';
import { SearchSelectors, requestProducts, setSearchSelectors } from '../../store/catalogSlice';
import Navigation from '../Navigaiton/Navigation';
import { RootState } from '../../store/store';
import ProductItem from './ProductsItem/ProductItem';
import { Product, ProductWithQuantity } from '../../types/types';
import { decrease, increase, addToCart } from '../../store/cartSlice';
import { ChangeEvent, useEffect, useState } from 'react';
import FilterList from './FIlterList/FilterList';
import Preloader from '../Preloader/Preloader';
import { useResize } from '../../utils/useResize';

type MapStateToProps = {
    products: Array<Product> | null;
    productsInCart: Array<ProductWithQuantity> | null;
    companies: {
        [key: string]: number;
    };
    brands: {
        [key: string]: number;
    };
    searchSelectors: SearchSelectors;
};

type MapDispatchToProps = {
    requestProducts: (searchSelectors: SearchSelectors) => void;
    setSearchSelectors: (selectros: {
        searchWords?: string;
        minPrice?: number;
        maxPrice?: number;
        careType?: string;
        companies?: string[];
        brands?: string[];
    }) => void;
    addToCart: (product: Product) => void;
    decrease: (barcode: number) => void;
    increase: (barcode: number) => void;
};

type Props = MapStateToProps & MapDispatchToProps;

type SortMethod = 'name' | 'price';

const Catalog: React.FC<Props> = ({
    requestProducts,
    products,
    productsInCart,
    searchSelectors,
    brands,
    companies,
    setSearchSelectors,
    addToCart,
    decrease,
    increase,
}) => {
    const [sortWindow, setSortWindow] = useState(false);
    const [sortMethod, setSortMethod] = useState<SortMethod>('name');
    const [orderSortMethod, setOrderSortMethod] = useState(true);

    const [minPrice, setMinPrice] = useState<undefined | number>(undefined);
    const [maxPrice, setMaxPrice] = useState<undefined | number>(undefined);

    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const [showFilters, setShowFitlers] = useState(false);
    const { width } = useResize();

    const setSortMethodClick = (sortMethod: SortMethod) => {
        setSortMethod(sortMethod);
        setSortWindow(false);
    };

    useEffect(() => {
        requestProducts(searchSelectors);
    }, [searchSelectors, requestProducts]);

    let productsList: React.ReactElement[] = [];
    let sortProducts: Product[] = [];
    if (products) {
        sortProducts = [...products];

        if (sortMethod !== null) {
            sortProducts.sort((a, b) => {
                switch (sortMethod) {
                    case 'name':
                        return `${a.brand} ${a.name}`.toLocaleLowerCase() > `${b.brand} ${b.name}`.toLocaleLowerCase()
                            ? 1
                            : -1;

                    case 'price':
                        return b.price - a.price;

                    default:
                        return 0;
                }
            });
            if (!orderSortMethod) {
                sortProducts = sortProducts.reverse();
            }
        }

        productsList = sortProducts.map((product) => {
            let isProductInCart = false;
            let quantity = 0;

            if (productsInCart) {
                const productInCart = productsInCart.find((el) => el.barcode === product.barcode);

                if (productInCart) {
                    quantity = productInCart.quantity;
                    isProductInCart = true;
                }
            }

            return (
                <ProductItem
                    addToCart={addToCart}
                    key={product.barcode}
                    {...product}
                    isProductInCart={isProductInCart}
                    quantity={quantity}
                    decrease={decrease}
                    increase={increase}
                />
            );
        });
    }

    return (
        <section className={s.catalog}>
            <Navigation></Navigation>
            <div className={s.catalog__content}>
                <div className={s.catalog__content__top}>
                    <h1 className={s.catalog__title}>Косметика и гигиена</h1>
                    {width < 600 && (
                        <div className={s.catalog__mobileFilters}>
                            <button
                                className={s.catalog__mobileFilters__button}
                                onClick={() => setShowFitlers(!showFilters)}
                            >
                                <h3 className={s.catalog__filters__title}>ПОДБОР ПО ПАРАМЕТРАМ</h3>
                                <div
                                    className={
                                        s.catalog__mobileFilters__arrow + ' ' + s.catalog__mobileFilters__arrow_active
                                    }
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='10'
                                        height='6'
                                        viewBox='0 0 10 6'
                                        fill='none'
                                    >
                                        <path d='M1 1L5 5L9 1' stroke='#3F4E65' />
                                    </svg>
                                </div>
                            </button>
                            {showFilters && (
                                <div className={s.catalog__mobileFilters__hidden}>
                                    <div className={s.catalog__filters}>
                                        <div className={s.catalog__priceFilter}>
                                            Цена <span>₸</span>
                                            <div className={s.catalog__priceFilter__inputs}>
                                                <input
                                                    value={minPrice}
                                                    type='number'
                                                    placeholder='0'
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                        setMinPrice(+e.currentTarget.value)
                                                    }
                                                />{' '}
                                                -{' '}
                                                <input
                                                    type='number'
                                                    placeholder='10000'
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                        console.log(+e.currentTarget.value);
                                                        setMaxPrice(
                                                            +e.currentTarget.value > 0
                                                                ? +e.currentTarget.value
                                                                : undefined,
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <h3
                                            className={
                                                s.catalog__filters__title + ' ' + s.catalog__filters__title_first
                                            }
                                        >
                                            Производитель
                                        </h3>

                                        <FilterList
                                            selectedItems={selectedCompanies}
                                            setSelectedItems={setSelectedCompanies}
                                            items={companies}
                                        ></FilterList>

                                        <div className={s.catalog__filterDivider}></div>

                                        <h3 className={s.catalog__filters__title}>Бренд</h3>

                                        <FilterList
                                            selectedItems={selectedBrands}
                                            setSelectedItems={setSelectedBrands}
                                            items={brands}
                                        ></FilterList>

                                        <div className={s.catalog__showSearchResult}>
                                            <button
                                                onClick={() =>
                                                    setSearchSelectors({
                                                        minPrice,
                                                        maxPrice,
                                                        careType: '',
                                                        companies: selectedCompanies,
                                                        brands: selectedBrands,
                                                    })
                                                }
                                                className={
                                                    s.catalog__showSearchResult__button +
                                                    ' ' +
                                                    s.catalog__showSearchResult__button_show
                                                }
                                            >
                                                Показать
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSearchSelectors({
                                                        minPrice: 0,
                                                        maxPrice: 0,
                                                        careType: '',
                                                        companies: [],
                                                        brands: [],
                                                    });
                                                    setSelectedCompanies([]);
                                                    setSelectedBrands([]);
                                                }}
                                                className={
                                                    s.catalog__showSearchResult__button +
                                                    ' ' +
                                                    s.catalog__showSearchResult__button_remove
                                                }
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='25'
                                                    height='25'
                                                    viewBox='0 0 25 25'
                                                    fill='none'
                                                >
                                                    <path
                                                        d='M15.625 6.25H20.3125C20.5197 6.25 20.7184 6.33231 20.8649 6.47882C21.0114 6.62534 21.0938 6.82405 21.0938 7.03125C21.0938 7.23845 21.0114 7.43716 20.8649 7.58368C20.7184 7.73019 20.5197 7.8125 20.3125 7.8125H19.4484L18.2734 18.4C18.1673 19.3555 17.7125 20.2384 16.9961 20.8795C16.2797 21.5207 15.352 21.8751 14.3906 21.875H10.6094C9.64797 21.8751 8.72029 21.5207 8.00389 20.8795C7.28749 20.2384 6.8327 19.3555 6.72656 18.4L5.55 7.8125H4.6875C4.4803 7.8125 4.28159 7.73019 4.13507 7.58368C3.98856 7.43716 3.90625 7.23845 3.90625 7.03125C3.90625 6.82405 3.98856 6.62534 4.13507 6.47882C4.28159 6.33231 4.4803 6.25 4.6875 6.25H9.375C9.375 5.4212 9.70424 4.62634 10.2903 4.04029C10.8763 3.45424 11.6712 3.125 12.5 3.125C13.3288 3.125 14.1237 3.45424 14.7097 4.04029C15.2958 4.62634 15.625 5.4212 15.625 6.25ZM12.5 4.6875C12.0856 4.6875 11.6882 4.85212 11.3951 5.14515C11.1021 5.43817 10.9375 5.8356 10.9375 6.25H14.0625C14.0625 5.8356 13.8979 5.43817 13.6049 5.14515C13.3118 4.85212 12.9144 4.6875 12.5 4.6875ZM10.1562 10.9375V17.1875C10.1562 17.3947 10.2386 17.5934 10.3851 17.7399C10.5316 17.8864 10.7303 17.9688 10.9375 17.9688C11.1447 17.9688 11.3434 17.8864 11.4899 17.7399C11.6364 17.5934 11.7188 17.3947 11.7188 17.1875V10.9375C11.7188 10.7303 11.6364 10.5316 11.4899 10.3851C11.3434 10.2386 11.1447 10.1562 10.9375 10.1562C10.7303 10.1562 10.5316 10.2386 10.3851 10.3851C10.2386 10.5316 10.1562 10.7303 10.1562 10.9375ZM14.0625 10.1562C13.8553 10.1562 13.6566 10.2386 13.5101 10.3851C13.3636 10.5316 13.2812 10.7303 13.2812 10.9375V17.1875C13.2812 17.3947 13.3636 17.5934 13.5101 17.7399C13.6566 17.8864 13.8553 17.9688 14.0625 17.9688C14.2697 17.9688 14.4684 17.8864 14.6149 17.7399C14.7614 17.5934 14.8438 17.3947 14.8438 17.1875V10.9375C14.8438 10.7303 14.7614 10.5316 14.6149 10.3851C14.4684 10.2386 14.2697 10.1562 14.0625 10.1562Z'
                                                        fill='white'
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className={s.catalog__sort}>
                        <b
                            onClick={() => {
                                if (sortWindow) {
                                    setSortWindow(false);
                                } else {
                                    setSortWindow(true);
                                }
                            }}
                        >
                            Сортировка:
                        </b>
                        <span
                            className={
                                s.catalog__sort__order + ' ' + (orderSortMethod ? '' : s.catalog__sort__order_min)
                            }
                            onClick={() => {
                                setOrderSortMethod(!orderSortMethod);
                            }}
                        >
                            {sortMethod === 'name' ? 'Название' : 'Цена'}
                        </span>
                        {sortWindow ? (
                            <div className={s.catalog__sortWindow}>
                                <ul className={s.catalog__sortWindow__list}>
                                    <li
                                        onClick={() => {
                                            setSortMethodClick('name');
                                        }}
                                    >
                                        Название
                                    </li>
                                    <li
                                        onClick={() => {
                                            setSortMethodClick('price');
                                        }}
                                    >
                                        Цена
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={s.catalog__categories}></div>
                <div className={s.catalog__wrapper}>
                    <div className={s.catalog__filters + ' ' + s.catalog__filters_hidden}>
                        <h3 className={s.catalog__filters__title}>ПОДБОР ПО ПАРАМЕТРАМ</h3>

                        <div className={s.catalog__priceFilter}>
                            Цена <span>₸</span>
                            <div className={s.catalog__priceFilter__inputs}>
                                <input
                                    value={minPrice}
                                    type='number'
                                    placeholder='0'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMinPrice(+e.currentTarget.value)}
                                />{' '}
                                -{' '}
                                <input
                                    type='number'
                                    placeholder='10000'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        console.log(+e.currentTarget.value);
                                        setMaxPrice(+e.currentTarget.value > 0 ? +e.currentTarget.value : undefined);
                                    }}
                                />
                            </div>
                        </div>

                        <h3 className={s.catalog__filters__title + ' ' + s.catalog__filters__title_first}>
                            Производитель
                        </h3>

                        <FilterList
                            selectedItems={selectedCompanies}
                            setSelectedItems={setSelectedCompanies}
                            items={companies}
                        ></FilterList>

                        <div className={s.catalog__filterDivider}></div>

                        <h3 className={s.catalog__filters__title}>Бренд</h3>

                        <FilterList
                            selectedItems={selectedBrands}
                            setSelectedItems={setSelectedBrands}
                            items={brands}
                        ></FilterList>

                        <div className={s.catalog__showSearchResult}>
                            <button
                                onClick={() =>
                                    setSearchSelectors({
                                        minPrice,
                                        maxPrice,
                                        careType: '',
                                        companies: selectedCompanies,
                                        brands: selectedBrands,
                                    })
                                }
                                className={
                                    s.catalog__showSearchResult__button + ' ' + s.catalog__showSearchResult__button_show
                                }
                            >
                                Показать
                            </button>
                            <button
                                onClick={() => {
                                    setSearchSelectors({
                                        minPrice: 0,
                                        maxPrice: 0,
                                        careType: '',
                                        companies: [],
                                        brands: [],
                                    });
                                    setSelectedCompanies([]);
                                    setSelectedBrands([]);
                                }}
                                className={
                                    s.catalog__showSearchResult__button +
                                    ' ' +
                                    s.catalog__showSearchResult__button_remove
                                }
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='25'
                                    height='25'
                                    viewBox='0 0 25 25'
                                    fill='none'
                                >
                                    <path
                                        d='M15.625 6.25H20.3125C20.5197 6.25 20.7184 6.33231 20.8649 6.47882C21.0114 6.62534 21.0938 6.82405 21.0938 7.03125C21.0938 7.23845 21.0114 7.43716 20.8649 7.58368C20.7184 7.73019 20.5197 7.8125 20.3125 7.8125H19.4484L18.2734 18.4C18.1673 19.3555 17.7125 20.2384 16.9961 20.8795C16.2797 21.5207 15.352 21.8751 14.3906 21.875H10.6094C9.64797 21.8751 8.72029 21.5207 8.00389 20.8795C7.28749 20.2384 6.8327 19.3555 6.72656 18.4L5.55 7.8125H4.6875C4.4803 7.8125 4.28159 7.73019 4.13507 7.58368C3.98856 7.43716 3.90625 7.23845 3.90625 7.03125C3.90625 6.82405 3.98856 6.62534 4.13507 6.47882C4.28159 6.33231 4.4803 6.25 4.6875 6.25H9.375C9.375 5.4212 9.70424 4.62634 10.2903 4.04029C10.8763 3.45424 11.6712 3.125 12.5 3.125C13.3288 3.125 14.1237 3.45424 14.7097 4.04029C15.2958 4.62634 15.625 5.4212 15.625 6.25ZM12.5 4.6875C12.0856 4.6875 11.6882 4.85212 11.3951 5.14515C11.1021 5.43817 10.9375 5.8356 10.9375 6.25H14.0625C14.0625 5.8356 13.8979 5.43817 13.6049 5.14515C13.3118 4.85212 12.9144 4.6875 12.5 4.6875ZM10.1562 10.9375V17.1875C10.1562 17.3947 10.2386 17.5934 10.3851 17.7399C10.5316 17.8864 10.7303 17.9688 10.9375 17.9688C11.1447 17.9688 11.3434 17.8864 11.4899 17.7399C11.6364 17.5934 11.7188 17.3947 11.7188 17.1875V10.9375C11.7188 10.7303 11.6364 10.5316 11.4899 10.3851C11.3434 10.2386 11.1447 10.1562 10.9375 10.1562C10.7303 10.1562 10.5316 10.2386 10.3851 10.3851C10.2386 10.5316 10.1562 10.7303 10.1562 10.9375ZM14.0625 10.1562C13.8553 10.1562 13.6566 10.2386 13.5101 10.3851C13.3636 10.5316 13.2812 10.7303 13.2812 10.9375V17.1875C13.2812 17.3947 13.3636 17.5934 13.5101 17.7399C13.6566 17.8864 13.8553 17.9688 14.0625 17.9688C14.2697 17.9688 14.4684 17.8864 14.6149 17.7399C14.7614 17.5934 14.8438 17.3947 14.8438 17.1875V10.9375C14.8438 10.7303 14.7614 10.5316 14.6149 10.3851C14.4684 10.2386 14.2697 10.1562 14.0625 10.1562Z'
                                        fill='white'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={s.catalog__products}>
                        {products === null ? (
                            <Preloader></Preloader>
                        ) : products.length === 0 ? (
                            'Товаров по запросу не обнаружено'
                        ) : (
                            productsList
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (s: RootState): MapStateToProps => ({
    products: s.catalog.products,
    productsInCart: s.cart.products,
    companies: s.catalog.companies,
    brands: s.catalog.brands,
    searchSelectors: s.catalog.searchSelectors,
});

export default connect(mapStateToProps, {
    requestProducts,
    setSearchSelectors,
    decrease,
    increase,
    addToCart,
})(Catalog);
