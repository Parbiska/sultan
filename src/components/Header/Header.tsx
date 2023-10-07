import s from './Header.module.scss';
import mark from '../../img/icons/mark.svg';
import letter from '../../img/icons/letter.svg';
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
    setSearchSelectors: (selectors: SearchSelectors) => void;
};

type Props = MapStateToProps & MapDispatchToProps;

const Header: React.FC<Props> = ({ total, sizeOfCart, setSearchSelectors, searchSelectors }) => {
    const navigate = useNavigate();
    const [searchWords, setSearchWords] = useState('');

    const searchInCatalog = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSearchSelectors({ ...searchSelectors, searchWords });

        navigate('/catalog');
    };

    return (
        <header className={s.header}>
            <div className={s.header__info}>
                <div className={s.header__container}>
                    <div className={s.header__contact}>
                        <div className={s.header__element}>
                            <div className={s.header__element__img}>
                                <img src={mark} alt='mark' />
                            </div>
                            <div className={s.header__element__content}>
                                <span>г. Кокчетав, ул. Ж. Ташенова 129Б </span>
                                (Рынок Восточный)
                            </div>
                        </div>

                        <div className={s.header__element}>
                            <div className={s.header__element__img}>
                                <img src={letter} alt='letter' />
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
                                <a href='/' className={s.header__navigation__link}>
                                    О компании
                                </a>
                            </li>
                            <li className={s.header__navigation__element}>
                                <a href='/' className={s.header__navigation__link}>
                                    Доставка и оплата
                                </a>
                            </li>
                            <li className={s.header__navigation__element}>
                                <a href='/' className={s.header__navigation__link}>
                                    Возврат
                                </a>
                            </li>
                            <li className={s.header__navigation__element}>
                                <a href='/' className={s.header__navigation__link}>
                                    Контакты
                                </a>
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
