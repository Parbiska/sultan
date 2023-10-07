import { connect } from 'react-redux';
import s from './Cart.module.scss';
import { RootState } from '../../store/store';
import { increase, clearCart, decrease, deleteFromCart } from '../../store/cartSlice';
import CartProduct from './CartProduct/CartProduct';
import Navigation from '../Navigaiton/Navigation';
import { useState } from 'react';
import { ProductWithQuantity } from '../../types/types';

type MapStateProps = {
    products: ProductWithQuantity[];
    total: number;
};

type MapDispatchToProps = {
    increase: (barcode: number) => void;
    decrease: (barcode: number) => void;
    deleteFromCart: (barcode: number) => void;
    clearCart: () => void;
};

type Props = MapStateProps & MapDispatchToProps;

const Cart: React.FC<Props> = ({ products, total, increase, decrease, deleteFromCart, clearCart }) => {
    let [isShowFinishWindow, setShowFinishWindow] = useState(false);
    let cartProducts: React.ReactElement[] = [];

    const finishPurchase = () => {
        if (products.length !== 0) {
            setShowFinishWindow(true);
            clearCart();
        }
    };

    if (products) {
        cartProducts = products.map((el) => (
            <div key={el.id} className={s.cart__content__product}>
                <CartProduct {...el} increase={increase} decrease={decrease} deleteProduct={deleteFromCart} />
            </div>
        ));
    }

    return (
        <div className={s.cart}>
            <Navigation></Navigation>
            <h1 className={s.cart__title}>Корзина</h1>
            <div className={s.cart__content}>
                <div className={s.cart__content__products}>{cartProducts}</div>

                <div className={s.cart__purchase}>
                    <button className={s.cart__purchase__button} onClick={finishPurchase}>
                        Оформить заказ
                    </button>
                    <div className={s.cart__purchase__total}>{total} ₸</div>
                </div>
            </div>
            {isShowFinishWindow ? (
                <div className={s.finishWindow}>
                    <div className={s.finishWindow__content}>
                        <div className={s.finishWindow__button}>
                            <div
                                onClick={() => {
                                    setShowFinishWindow(false);
                                }}
                            >
                                <svg
                                    width='14'
                                    height='14'
                                    viewBox='0 0 14 14'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M8.40994 7.00019L12.7099 2.71019C12.8982 2.52188 13.004 2.26649 13.004 2.00019C13.004 1.73388 12.8982 1.47849 12.7099 1.29019C12.5216 1.10188 12.2662 0.996094 11.9999 0.996094C11.7336 0.996094 11.4782 1.10188 11.2899 1.29019L6.99994 5.59019L2.70994 1.29019C2.52164 1.10188 2.26624 0.996094 1.99994 0.996094C1.73364 0.996094 1.47824 1.10188 1.28994 1.29019C1.10164 1.47849 0.995847 1.73388 0.995847 2.00019C0.995847 2.26649 1.10164 2.52188 1.28994 2.71019L5.58994 7.00019L1.28994 11.2902C1.19621 11.3831 1.12182 11.4937 1.07105 11.6156C1.02028 11.7375 0.994141 11.8682 0.994141 12.0002C0.994141 12.1322 1.02028 12.2629 1.07105 12.3848C1.12182 12.5066 1.19621 12.6172 1.28994 12.7102C1.3829 12.8039 1.4935 12.8783 1.61536 12.9291C1.73722 12.9798 1.86793 13.006 1.99994 13.006C2.13195 13.006 2.26266 12.9798 2.38452 12.9291C2.50638 12.8783 2.61698 12.8039 2.70994 12.7102L6.99994 8.41019L11.2899 12.7102C11.3829 12.8039 11.4935 12.8783 11.6154 12.9291C11.7372 12.9798 11.8679 13.006 11.9999 13.006C12.132 13.006 12.2627 12.9798 12.3845 12.9291C12.5064 12.8783 12.617 12.8039 12.7099 12.7102C12.8037 12.6172 12.8781 12.5066 12.9288 12.3848C12.9796 12.2629 13.0057 12.1322 13.0057 12.0002C13.0057 11.8682 12.9796 11.7375 12.9288 11.6156C12.8781 11.4937 12.8037 11.3831 12.7099 11.2902L8.40994 7.00019Z'
                                        fill='#FFC85E'
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className={s.finishWindow__img}>
                            <svg
                                width='23'
                                height='13'
                                viewBox='0 0 23 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M1.5 6.5L6.75 11.5L9.375 8.5'
                                    stroke='white'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M7.5 6.5L12.75 11.5L21.5 1.5'
                                    stroke='white'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M15.5 1.5L12 5.5'
                                    stroke='white'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </div>

                        <h2 className={s.finishWindow__title}>Спасибо за заказ</h2>

                        <div className={s.finishWindow__text}>Наш менеджер свяжется с вами в ближайшее время</div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = (s: RootState): MapStateProps => ({
    products: s.cart.products,
    total: s.cart.total,
});

export default connect(mapStateToProps, {
    increase,
    decrease,
    clearCart,
    deleteFromCart,
})(Cart);
