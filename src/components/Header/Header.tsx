import s from './Header.module.scss';
import logo from '../../img/logo.svg';
import catalog from '../../img/icons/catalog.svg';
import operator from '../../img/header/operator.png';
import download from '../../img/icons/download.svg';
import cart from '../../img/icons/cart.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SearchSelectors, setSearchSelectors } from '../../store/catalogSlice';

type MapStateToProps = {
    total: number;
    sizeOfCart: number;
    searchSelectors: SearchSelectors;
};

type MapDispatchToProps = {
    setSearchSelectors: (selectors: { searchWords: string }) => void;
};

type Props = MapStateToProps & MapDispatchToProps;

const Header: React.FC<Props> = ({ total, sizeOfCart, setSearchSelectors }) => {
    const navigate = useNavigate();
    const [searchWords, setSearchWords] = useState('');

    const searchInCatalog = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSearchSelectors({ searchWords });

        navigate('/catalog');
    };

    return (
        <header className={s.header}>
            <div className={s.header__info}>
                <div className={s.header__container}>
                    <div className={s.header__contact}>
                        <div className={s.header__element}>
                            <div className={s.header__element__img}>
                                <svg
                                    width='16'
                                    height='18'
                                    viewBox='0 0 16 18'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M8 9.8335C9.38071 9.8335 10.5 8.71421 10.5 7.3335C10.5 5.95278 9.38071 4.8335 8 4.8335C6.61929 4.8335 5.5 5.95278 5.5 7.3335C5.5 8.71421 6.61929 9.8335 8 9.8335Z'
                                        stroke='#3F4E65'
                                        strokeWidth='1.3'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M7.99992 0.666748C6.23181 0.666748 4.53612 1.36913 3.28587 2.61937C2.03563 3.86961 1.33325 5.5653 1.33325 7.33342C1.33325 8.91008 1.66825 9.94175 2.58325 11.0834L7.99992 17.3334L13.4166 11.0834C14.3316 9.94175 14.6666 8.91008 14.6666 7.33342C14.6666 5.5653 13.9642 3.86961 12.714 2.61937C11.4637 1.36913 9.76803 0.666748 7.99992 0.666748V0.666748Z'
                                        stroke='#3F4E65'
                                        strokeWidth='1.3'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                            <div className={s.header__element__content}>
                                <span>г. Кокчетав, ул. Ж. Ташенова 129Б </span>
                                (Рынок Восточный)
                            </div>
                        </div>

                        <div className={s.header__element}>
                            <div className={s.header__element__img}>
                                <svg
                                    width='18'
                                    height='14'
                                    viewBox='0 0 18 14'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M3.37508 0.333252H14.6251C15.3169 0.333207 15.9824 0.59788 16.4853 1.07298C16.9881 1.54808 17.2901 2.19758 17.3292 2.88825L17.3334 3.04159V10.9583C17.3335 11.65 17.0688 12.3156 16.5937 12.8184C16.1186 13.3213 15.4691 13.6233 14.7784 13.6624L14.6251 13.6666H3.37508C2.6833 13.6666 2.01772 13.402 1.51489 12.9269C1.01205 12.4518 0.71008 11.8023 0.670915 11.1116L0.666748 10.9583V3.04159C0.666703 2.3498 0.931376 1.68423 1.40647 1.18139C1.88157 0.678558 2.53108 0.376584 3.22175 0.337419L3.37508 0.333252H14.6251H3.37508ZM16.0834 4.81075L9.29175 8.38575C9.21506 8.42626 9.13078 8.45037 9.04427 8.45654C8.95776 8.46271 8.87091 8.4508 8.78925 8.42158L8.70925 8.38658L1.91675 4.81158V10.9583C1.91676 11.3242 2.05439 11.6768 2.30231 11.9461C2.55024 12.2153 2.89033 12.3815 3.25508 12.4116L3.37508 12.4166H14.6251C14.9912 12.4166 15.3439 12.2788 15.6132 12.0307C15.8824 11.7826 16.0485 11.4423 16.0784 11.0774L16.0834 10.9583V4.81075ZM14.6251 1.58325H3.37508C3.00909 1.58327 2.65648 1.72089 2.38726 1.96882C2.11803 2.21674 1.95186 2.55683 1.92175 2.92158L1.91675 3.04159V3.39908L9.00008 7.12658L16.0834 3.39825V3.04159C16.0834 2.67546 15.9456 2.32274 15.6975 2.0535C15.4494 1.78425 15.1091 1.61817 14.7442 1.58825L14.6251 1.58325Z'
                                        fill='#3F4E65'
                                    />
                                </svg>
                            </div>
                            <div className={s.header__element__content}>
                                <span>opt.sultan@mail.ru</span>
                                На связи в любое время
                            </div>
                        </div>
                    </div>

                    <nav className={s.header__navigation}>
                        <ul className={s.header__navigation__content}>
                            <li className={s.header__navigation__element}>
                                <Link to='/' className={s.header__navigation__link}>
                                    О компании
                                </Link>
                            </li>
                            <li className={s.header__navigation__element}>
                                <Link to='/' className={s.header__navigation__link}>
                                    Доставка и оплата
                                </Link>
                            </li>
                            <li className={s.header__navigation__element}>
                                <Link to='/' className={s.header__navigation__link}>
                                    Возврат
                                </Link>
                            </li>
                            <li className={s.header__navigation__element}>
                                <Link to='/' className={s.header__navigation__link}>
                                    Контакты
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className={s.header__connection}>
                <div className={s.header__connection__container}>
                    <div className={s.header__logo}>
                        <img src={logo} alt='logo' />
                    </div>

                    <div className={s.header__catalog}>
                        <button onClick={() => navigate('/catalog')} className={s.header__button}>
                            Каталог <img src={catalog} alt='ct' />
                        </button>
                    </div>

                    <form onSubmit={searchInCatalog} className={s.header__search}>
                        <input
                            className={s.header__search__input}
                            type='text'
                            placeholder='Поиск...'
                            value={searchWords}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchWords(e.target.value)}
                        />

                        <button className={s.header__search__button}>
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

                    <div className={s.header__call}>
                        <div className={s.header__call__text}>
                            <span>+7 (777) 490-00-91</span>
                            время работы: 9:00-20:00
                            <a href='/'>Заказать звонок</a>
                        </div>
                        <div className={s.header__call__img}>
                            <img src={operator} alt='operator' />
                            <div className={s.header__call__circle}></div>
                        </div>
                    </div>

                    <div className={s.header__price}>
                        <button className={s.header__button}>
                            Прайс-лист <img src={download} alt='ct' />
                        </button>
                    </div>

                    <Link
                        to='/cart'
                        className={s.header__cart}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/cart');
                        }}
                    >
                        <div className={s.header__cart__img}>
                            <img src={cart} alt='cart' />

                            <div className={s.header__cart__circle}>
                                <span>{sizeOfCart}</span>
                            </div>
                        </div>
                        <div className={s.header__cart__text}>
                            <div className={s.header__cart__link}>Корзина</div>
                            <span>{total} ₸</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

const mapDispatchToProps = (state: RootState): MapStateToProps => ({
    total: state.cart.total,
    sizeOfCart: state.cart.products.length,
    searchSelectors: state.catalog.searchSelectors,
});

export default connect(mapDispatchToProps, { setSearchSelectors })(Header);
