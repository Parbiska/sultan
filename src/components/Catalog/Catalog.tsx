import { connect } from 'react-redux';
import s from './Catalog.module.scss';
import { SearchSelectors, requestProducts, setSearchSelectors } from '../../store/catalogSlice';
import Navigation from '../Navigaiton/Navigation';
import { RootState } from '../../store/store';
import ProductItem from './ProductsItem/ProductItem';
import { Product } from '../../types/types';
import { ProductWithQuantity, decrease, increase, addToCart } from '../../store/cartSlice';
import { ChangeEvent, useEffect, useState } from 'react';

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
    requestProducts: any;
    setSearchSelectors: (selectors: SearchSelectors) => void;
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

    const brandsList: React.ReactElement[] = [];
    const companiesList: React.ReactElement[] = [];

    let sortProducts: Product[] = [];
    let productsList: React.ReactElement[] = [];

    const setSortMethodClick = (sortMethod: SortMethod) => {
        setSortMethod(sortMethod);
        setSortWindow(false);
    };

    useEffect(() => {
        requestProducts();
    }, [searchSelectors, requestProducts, setSearchSelectors]);

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

    if (companies) {
        for (const company in companies) {
            companiesList.push(
                <li key={`c${company}`}>
                    <input
                        id={`company${company}`}
                        type='checkbox'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                    />
                    <label htmlFor={`company${company}`}>
                        {company + ' '}
                        <span>({companies[company]})</span>
                    </label>
                </li>,
            );
        }
    }

    if (brands) {
        for (const brand in brands) {
            brandsList.push(
                <li key={`b${brand}`}>
                    <input id={`brand${brand}`} type='checkbox' onChange={(e: ChangeEvent<HTMLInputElement>) => {}} />
                    <label htmlFor={`brand${brand}`}>
                        {brand + ' '}
                        <span>({brands[brand]})</span>
                    </label>
                </li>,
            );
        }
    }

    return (
        <section className={s.catalog + ' container'}>
            <Navigation></Navigation>
            <div className={s.catalog__content}>
                <div className={s.catalog__content__top}>
                    <h1 className={s.catalog__title}>Косметика и гигиена</h1>
                    {productsList.length ? null : 'Товаров по запросу не обнаружено'}
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
                    <div className={s.catalog__filters}>
                        <h3 className={s.catalog__filters__title}>ПОДБОР ПО ПАРАМЕТРАМ</h3>

                        <div className={s.catalog__priceFilter}>
                            Цена <span>₸</span>
                            <div className={s.catalog__priceFilter__inputs}>
                                <input type='number' placeholder='0' onChange={(e) => e} /> -{' '}
                                <input type='number' placeholder='10000' />
                            </div>
                        </div>

                        <h3 className={s.catalog__filters__title + ' ' + s.catalog__filters__title_first}>
                            Производитель
                        </h3>

                        <div className={s.catalog__filter}>
                            <form onSubmit={() => {}} className={s.catalog__filter__search}>
                                <input
                                    type='text'
                                    placeholder='Поиск...'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                                />

                                <button>
                                    <svg
                                        width='19'
                                        height='19'
                                        viewBox='0 0 19 19'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M16.5297 16.5294L13.0992 13.0928L16.5297 16.5294ZM15.0002 8.5C15.0002 10.2239 14.3154 11.8772 13.0964 13.0962C11.8775 14.3152 10.2242 15 8.50024 15C6.77634 15 5.12304 14.3152 3.90405 13.0962C2.68506 11.8772 2.00024 10.2239 2.00024 8.5C2.00024 6.77609 2.68506 5.12279 3.90405 3.90381C5.12304 2.68482 6.77634 2 8.50024 2C10.2242 2 11.8775 2.68482 13.0964 3.90381C14.3154 5.12279 15.0002 6.77609 15.0002 8.5V8.5Z'
                                            stroke='white'
                                            strokeWidth='1.3'
                                            strokeLinecap='round'
                                        />
                                    </svg>
                                </button>
                            </form>

                            <ul className={s.catalog__filter__list}>{companiesList}</ul>
                        </div>

                        <div className={s.catalog__filterDivider}></div>

                        <h3 className={s.catalog__filters__title}>Бренд</h3>

                        <div className={s.catalog__filter}>
                            <form onSubmit={() => {}} className={s.catalog__filter__search}>
                                <input
                                    type='text'
                                    placeholder='Поиск...'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                                />

                                <button>
                                    <svg
                                        width='19'
                                        height='19'
                                        viewBox='0 0 19 19'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M16.5297 16.5294L13.0992 13.0928L16.5297 16.5294ZM15.0002 8.5C15.0002 10.2239 14.3154 11.8772 13.0964 13.0962C11.8775 14.3152 10.2242 15 8.50024 15C6.77634 15 5.12304 14.3152 3.90405 13.0962C2.68506 11.8772 2.00024 10.2239 2.00024 8.5C2.00024 6.77609 2.68506 5.12279 3.90405 3.90381C5.12304 2.68482 6.77634 2 8.50024 2C10.2242 2 11.8775 2.68482 13.0964 3.90381C14.3154 5.12279 15.0002 6.77609 15.0002 8.5V8.5Z'
                                            stroke='white'
                                            strokeWidth='1.3'
                                            strokeLinecap='round'
                                        />
                                    </svg>
                                </button>
                            </form>

                            <ul className={s.catalog__filter__list}>{brandsList}</ul>
                        </div>

                        <div className={s.catalog__showSearchResult}></div>
                    </div>
                    <div className={s.catalog__products}>{productsList}</div>
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
