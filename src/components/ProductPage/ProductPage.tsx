import { connect } from 'react-redux';
import s from './ProductPage.module.scss';
import { decrease, increase, addToCart } from '../../store/cartSlice';
import { Product, ProductWithQuantity } from '../../types/types';
import { RootState } from '../../store/store';
import Navigation from '../Navigaiton/Navigation';
import { useLocation } from 'react-router-dom';
import { requestProduct } from '../../store/productSlice';
import { useEffect } from 'react';
import Preloader from '../Preloader/Preloader';

type MapStateToProps = {
    product: ProductWithQuantity | undefined;
};

type MapDispatchToProps = {
    addToCart: (product: Product) => void;
    decrease: (barcode: number) => void;
    increase: (barcode: number) => void;
    requestProduct: (barcode: number) => void;
};

type Props = MapStateToProps & MapDispatchToProps;

const ProductPage: React.FC<Props> = ({ decrease, increase, addToCart, product, requestProduct }) => {
    const location = useLocation();

    const locationArr = location.pathname.split('/');
    const barcode = +locationArr[locationArr.length - 1];

    useEffect(() => {
        requestProduct(barcode);
    }, [requestProduct, barcode]);

    return (
        <div className={s.container}>
            <Navigation productName={product ? product.name : ''}></Navigation>
            {product ? (
                <div className={s.product}>
                    <div className={s.product__img}>
                        <img src={product.imgUrl} alt='Картинка с товаром' />
                    </div>
                    <div className={s.product__content}>
                        <div className={s.product__availability}>В наличии</div>

                        <h1 className={s.product__title}>
                            <span>{product.company}</span> {product.name}
                        </h1>
                        <div className={s.product__weight}>
                            {product.size.type === 'гр' ? (
                                <svg
                                    width='20'
                                    height='15'
                                    viewBox='0 0 20 15'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M13.3035 7.99994C12.7753 7.99994 12.2785 7.71869 12.0097 7.26869L10.0003 3.93743L7.9941 7.26869C7.72222 7.72181 7.22535 8.00306 6.69722 8.00306C6.5566 8.00306 6.41597 7.98431 6.2816 7.94369L2.00035 6.71868V12.2812C2.00035 12.7406 2.31285 13.1406 2.7566 13.2499L9.51285 14.9406C9.8316 15.0187 10.166 15.0187 10.4816 14.9406L17.2441 13.2499C17.6878 13.1374 18.0003 12.7374 18.0003 12.2812V6.71868L13.7191 7.94056C13.5847 7.98119 13.4441 7.99994 13.3035 7.99994ZM19.9472 4.49369L18.3378 1.28118C18.241 1.08743 18.0316 0.974934 17.816 1.00306L10.0003 1.99993L12.866 6.75306C12.9847 6.94993 13.2222 7.04368 13.4441 6.98118L19.6285 5.21556C19.9378 5.12493 20.0878 4.78118 19.9472 4.49369ZM1.66285 1.28118L0.0534711 4.49369C-0.0902789 4.78118 0.0628461 5.12493 0.369096 5.21243L6.55347 6.97806C6.77535 7.04056 7.01285 6.94681 7.1316 6.74993L10.0003 1.99993L2.1816 1.00306C1.96597 0.978059 1.75972 1.08743 1.66285 1.28118Z'
                                        fill='#3F4E65'
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width='9'
                                    height='15'
                                    viewBox='0 0 9 15'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M8.1 14.0625C8.05312 14.3164 7.95234 14.5361 7.79766 14.7217C7.64297 14.9072 7.44375 15 7.2 15H1.8C1.55625 15 1.35937 14.9097 1.20937 14.729C1.05937 14.5483 0.95625 14.3262 0.9 14.0625L0 8.4375V6.5625C0 6.2793 0.0914062 6.04492 0.274219 5.85938C0.457031 5.67383 0.726562 5.49072 1.08281 5.31006C1.43906 5.12939 1.65937 5.00977 1.74375 4.95117C2.11875 4.67773 2.45625 4.35547 2.75625 3.98438C3.05625 3.61328 3.27656 3.22266 3.41719 2.8125H3.15C3.02812 2.8125 2.92266 2.76611 2.83359 2.67334C2.74453 2.58057 2.7 2.4707 2.7 2.34375V0.46875C2.7 0.341797 2.74453 0.231934 2.83359 0.13916C2.92266 0.0463867 3.02812 0 3.15 0H5.85C5.97187 0 6.07734 0.0463867 6.16641 0.13916C6.25547 0.231934 6.3 0.341797 6.3 0.46875V2.34375C6.3 2.4707 6.25547 2.58057 6.16641 2.67334C6.07734 2.76611 5.97187 2.8125 5.85 2.8125H5.58281C5.86406 3.60352 6.38437 4.28711 7.14375 4.86328C7.24687 4.95117 7.48125 5.08789 7.84687 5.27344C8.2125 5.45898 8.49609 5.64941 8.69766 5.84473C8.89922 6.04004 9 6.2793 9 6.5625V8.4375L8.1 14.0625Z'
                                        fill='#3F4E65'
                                    />
                                </svg>
                            )}
                            {`${product.size.value} ${product.size.type}`}
                        </div>
                        <div className={s.product__purchase}>
                            <div className={s.product__purchase__price}>{product.price} ₸</div>
                            {product.quantity ? (
                                <div className={s.product__purchase__quantity}>
                                    <div className={s.product__purchase__quantity}>
                                        <button
                                            onClick={() => {
                                                decrease(barcode);
                                                requestProduct(barcode);
                                            }}
                                        >
                                            -
                                        </button>
                                        <span>{product.quantity}</span>
                                        <button
                                            onClick={() => {
                                                increase(barcode);
                                                requestProduct(barcode);
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className={s.product__purchase__button}
                                    onClick={() => {
                                        addToCart(product);
                                        requestProduct(barcode);
                                    }}
                                >
                                    В корзину{' '}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='23'
                                        viewBox='0 0 24 23'
                                        fill='none'
                                    >
                                        <path
                                            d='M21.3257 6.89296C21.1958 6.71151 21.0215 6.62079 20.8027 6.62079H6.87793L6.5 5.63689C6.4043 5.31431 6.27441 5.03877 6.11035 4.81028C5.94629 4.58178 5.77197 4.42049 5.5874 4.32641C5.40283 4.23232 5.24219 4.16848 5.10547 4.13488C4.96875 4.10127 4.83203 4.08447 4.69531 4.08447H1.88574C1.70801 4.08447 1.55762 4.14496 1.43457 4.26592C1.31152 4.38689 1.25 4.54146 1.25 4.72963C1.25 4.83716 1.27734 4.94133 1.33203 5.04213C1.38672 5.14294 1.46533 5.22023 1.56787 5.27399C1.67041 5.32775 1.77637 5.35463 1.88574 5.35463H4.69531C4.75 5.35463 4.80127 5.36135 4.84912 5.3748C4.89697 5.38824 4.96191 5.44536 5.04395 5.54617C5.12598 5.64697 5.19434 5.79818 5.24902 5.9998L8.19043 14.0764C8.21777 14.1571 8.26221 14.2343 8.32373 14.3083C8.38525 14.3822 8.45703 14.4393 8.53906 14.4796C8.62109 14.52 8.70996 14.5401 8.80566 14.5401H17.665C17.8018 14.5401 17.9282 14.4998 18.0444 14.4191C18.1606 14.3385 18.2393 14.2377 18.2803 14.1167L21.418 7.48772C21.4863 7.27267 21.4556 7.07442 21.3257 6.89296ZM17.2139 13.2498H9.31836L7.22656 7.91111H19.8594L17.2139 13.2498ZM16.0312 15.2398C15.5801 15.2398 15.1938 15.3977 14.8726 15.7136C14.5513 16.0294 14.3906 16.4092 14.3906 16.8527C14.3906 17.2963 14.5513 17.676 14.8726 17.9918C15.1938 18.3077 15.5801 18.4656 16.0312 18.4656C16.4824 18.4656 16.8687 18.3077 17.1899 17.9918C17.5112 17.676 17.6719 17.2963 17.6719 16.8527C17.6719 16.4092 17.5112 16.0294 17.1899 15.7136C16.8687 15.3977 16.4824 15.2398 16.0312 15.2398ZM10.125 15.2398C9.82422 15.2398 9.54736 15.3137 9.29443 15.4616C9.0415 15.6094 8.84326 15.8043 8.69971 16.0463C8.55615 16.2882 8.48438 16.557 8.48438 16.8527C8.48438 17.2963 8.64502 17.676 8.96631 17.9918C9.2876 18.3077 9.67383 18.4656 10.125 18.4656C10.5762 18.4656 10.9624 18.3077 11.2837 17.9918C11.605 17.676 11.7656 17.2963 11.7656 16.8527C11.7656 16.7452 11.7554 16.6377 11.7349 16.5301C11.7144 16.4226 11.6836 16.3218 11.6426 16.2277C11.6016 16.1336 11.5503 16.0429 11.4888 15.9555C11.4272 15.8682 11.3589 15.7875 11.2837 15.7136C11.2085 15.6397 11.1265 15.5725 11.0376 15.512C10.9487 15.4515 10.8564 15.4011 10.7607 15.3608C10.665 15.3204 10.5625 15.2902 10.4531 15.27C10.3438 15.2499 10.2344 15.2398 10.125 15.2398Z'
                                            fill='white'
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className={s.product__special}>
                            <div className={s.product__special__el + ' ' + s.product__special__el_share}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='25'
                                    height='25'
                                    viewBox='0 0 25 25'
                                    fill='none'
                                >
                                    <path
                                        d='M6.00004 15.5C6.87469 15.4974 7.71626 15.1653 8.35704 14.57L14.617 18.147C14.4073 18.9666 14.4998 19.8343 14.8775 20.5913C15.2552 21.3483 15.893 21.9439 16.674 22.2692C17.455 22.5944 18.327 22.6274 19.1304 22.3623C19.9338 22.0971 20.6148 21.5515 21.0488 20.8252C21.4827 20.099 21.6406 19.2408 21.4935 18.4076C21.3464 17.5745 20.9042 16.8222 20.2478 16.2885C19.5914 15.7548 18.7647 15.4753 17.919 15.5013C17.0734 15.5273 16.2655 15.857 15.643 16.43L9.38304 12.853C9.44904 12.603 9.48504 12.344 9.49104 12.085L15.641 8.56996C16.2332 9.10874 16.9927 9.42747 17.792 9.47268C18.5913 9.51789 19.3818 9.28684 20.031 8.81828C20.6802 8.34972 21.1484 7.67217 21.3572 6.89929C21.5661 6.1264 21.5027 5.30522 21.1779 4.5735C20.853 3.84178 20.2864 3.24404 19.5731 2.88056C18.8597 2.51708 18.0431 2.40998 17.2602 2.57723C16.4772 2.74447 15.7756 3.17588 15.2731 3.79909C14.7705 4.42229 14.4976 5.19937 14.5 5.99996C14.504 6.28796 14.543 6.57497 14.617 6.85296L8.93304 10.1C8.60341 9.59003 8.1468 9.17461 7.60805 8.89454C7.06931 8.61446 6.46697 8.47936 5.86021 8.50251C5.25346 8.52566 4.66316 8.70627 4.14732 9.02658C3.63148 9.34689 3.20785 9.79589 2.91804 10.3295C2.62823 10.863 2.48222 11.4628 2.49435 12.0699C2.50648 12.677 2.67634 13.2704 2.98723 13.792C3.29812 14.3136 3.73936 14.7453 4.26758 15.0447C4.7958 15.3442 5.39284 15.5011 6.00004 15.5Z'
                                        fill='#FFC85E'
                                    />
                                </svg>
                            </div>
                            <div className={s.product__special__el + ' ' + s.product__special__el_delivery}>
                                <p>
                                    При покупке от <span>10 000 ₸</span> бесплатная доставка по Кокчетаву и области
                                </p>
                            </div>
                            <div className={s.product__special__el + ' ' + s.product__special__el_priceList}>
                                Прайс-лист{' '}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='18'
                                    height='17'
                                    viewBox='0 0 18 17'
                                    fill='none'
                                >
                                    <path
                                        d='M13.958 6.375H11.1247V2.125H6.87467V6.375H4.04134L8.99967 12.0417L13.958 6.375ZM3.33301 13.4583H14.6663V14.875H3.33301V13.4583Z'
                                        fill='#3F4E65'
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className={s.product__description}>{product.description}</div>

                        <div className={s.product__divider}></div>

                        <div className={s.product__characteristics}>
                            <div className={s.product__characteristics__el}>
                                Назначение: <span>Уход за собой</span>
                            </div>
                            <div className={s.product__characteristics__el}>
                                Производитель: <span>{product.company}</span>
                            </div>
                            <div className={s.product__characteristics__el}>
                                Бренд: <span>{product.brand}</span>
                            </div>
                            <div className={s.product__characteristics__el}>
                                Артикул: <span>{product.barcode}</span>
                            </div>
                            <div className={s.product__characteristics__el}>
                                {product.size.type === 'гр' ? 'Вес: ' : 'Объём: '}
                                {product.size.type === 'гр' ? (
                                    <span>{product.size.value} гр</span>
                                ) : (
                                    <span>{product.size.value} мл</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Preloader></Preloader>
            )}
        </div>
    );
};

const mapStateToProps = (s: RootState): MapStateToProps => ({
    product: s.product.product,
});

export default connect(mapStateToProps, { decrease, increase, addToCart, requestProduct })(ProductPage);
