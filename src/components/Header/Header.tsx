import s from './Header.module.scss';
import logo from '../../img/logo.svg';
import operator from '../../img/header/operator.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SearchSelectors, setSearchSelectors } from '../../store/catalogSlice';
import { useResize } from '../../utils/useResize';

type MapStateToProps = {
    total: number;
    sizeOfCart: number;
    searchSelectors: SearchSelectors;
};

type MapDispatchToProps = {
    setSearchSelectors: (selectors: { searchWords: string }) => void;
};

type OwnProps = {
    moduleMenu: boolean;
    setModuleMenu: (boolean: boolean) => void;
};

type Props = MapStateToProps & MapDispatchToProps & OwnProps;

const Header: React.FC<Props> = ({ total, sizeOfCart, setSearchSelectors, setModuleMenu, moduleMenu }) => {
    const navigate = useNavigate();
    const [searchWords, setSearchWords] = useState('');
    const { width } = useResize();
    const [moduleSearch, setModuleSearch] = useState(false);

    const searchInCatalog = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setModuleSearch(false);
        setModuleMenu(false);

        setSearchSelectors({ searchWords });

        navigate('/catalog');
    };

    if (width < 1024) {
        return (
            <header className={s.header}>
                <div className={s.header__top}>
                    {moduleMenu ? (
                        <button
                            className={s.header__burger + ' ' + s.header__burger_active}
                            onClick={() => setModuleMenu(false)}
                        >
                            <span>+</span>
                        </button>
                    ) : (
                        <button className={s.header__burger} onClick={() => setModuleMenu(true)}>
                            <svg
                                width='10'
                                height='8'
                                viewBox='0 0 10 8'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M0.799927 4.5999H9.19993V3.3999H0.799927V4.5999ZM0.799927 7.5999H9.19993V6.3999H0.799927V7.5999ZM0.799927 0.399902V1.5999H9.19993V0.399902H0.799927Z'
                                    fill='white'
                                />
                            </svg>
                        </button>
                    )}

                    <div className={s.header__logo}>
                        <img src={logo} alt='logo' />
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
                            <svg
                                width='41'
                                height='29'
                                viewBox='0 0 41 29'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M40.6514 5.78617C40.3916 5.42327 40.043 5.24182 39.6055 5.24182H11.7559L11 3.27403C10.8086 2.62887 10.5488 2.07779 10.2207 1.6208C9.89258 1.16381 9.54395 0.841232 9.1748 0.65306C8.80566 0.464888 8.48438 0.3372 8.21094 0.269996C7.9375 0.202792 7.66406 0.169189 7.39062 0.169189H1.77148C1.41602 0.169189 1.11523 0.290157 0.869141 0.532093C0.623047 0.774028 0.5 1.08317 0.5 1.45951C0.5 1.67457 0.554688 1.8829 0.664062 2.08451C0.773438 2.28612 0.930664 2.44069 1.13574 2.54822C1.34082 2.65575 1.55273 2.70951 1.77148 2.70951H7.39062C7.5 2.70951 7.60254 2.72295 7.69824 2.74983C7.79395 2.77672 7.92383 2.89096 8.08789 3.09258C8.25195 3.29419 8.38867 3.59661 8.49805 3.99983L14.3809 20.1531C14.4355 20.3144 14.5244 20.4689 14.6475 20.6168C14.7705 20.7646 14.9141 20.8789 15.0781 20.9595C15.2422 21.0402 15.4199 21.0805 15.6113 21.0805H33.3301C33.6035 21.0805 33.8564 20.9998 34.0889 20.8385C34.3213 20.6773 34.4785 20.4756 34.5605 20.2337L40.8359 6.97569C40.9727 6.54558 40.9111 6.14908 40.6514 5.78617ZM32.4277 18.4998H16.6367L12.4531 7.82246H37.7188L32.4277 18.4998ZM30.0625 22.4798C29.1602 22.4798 28.3877 22.7957 27.7451 23.4274C27.1025 24.0591 26.7812 24.8186 26.7812 25.7057C26.7812 26.5928 27.1025 27.3522 27.7451 27.9839C28.3877 28.6156 29.1602 28.9315 30.0625 28.9315C30.9648 28.9315 31.7373 28.6156 32.3799 27.9839C33.0225 27.3522 33.3438 26.5928 33.3438 25.7057C33.3438 24.8186 33.0225 24.0591 32.3799 23.4274C31.7373 22.7957 30.9648 22.4798 30.0625 22.4798ZM18.25 22.4798C17.6484 22.4798 17.0947 22.6277 16.5889 22.9234C16.083 23.2191 15.6865 23.6089 15.3994 24.0927C15.1123 24.5766 14.9688 25.1143 14.9688 25.7057C14.9688 26.5928 15.29 27.3522 15.9326 27.9839C16.5752 28.6156 17.3477 28.9315 18.25 28.9315C19.1523 28.9315 19.9248 28.6156 20.5674 27.9839C21.21 27.3522 21.5312 26.5928 21.5312 25.7057C21.5312 25.4906 21.5107 25.2755 21.4697 25.0605C21.4287 24.8454 21.3672 24.6438 21.2852 24.4557C21.2031 24.2675 21.1006 24.086 20.9775 23.9113C20.8545 23.7366 20.7178 23.5753 20.5674 23.4274C20.417 23.2796 20.2529 23.1452 20.0752 23.0242C19.8975 22.9032 19.7129 22.8024 19.5215 22.7218C19.3301 22.6411 19.125 22.5806 18.9062 22.5403C18.6875 22.5 18.4688 22.4798 18.25 22.4798Z'
                                    fill='#3F4E65'
                                />
                            </svg>

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

                <div className={s.header__bottom}>
                    {moduleSearch ? (
                        <div className={s.header__catalog}>
                            <button
                                onClick={() => navigate('/catalog')}
                                className={s.header__button + ' ' + s.header__button_hidden}
                            >
                                Каталог{' '}
                                <svg
                                    width='15'
                                    height='15'
                                    viewBox='0 0 15 15'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H6C6.27614 0.5 6.5 0.723858 6.5 1V6C6.5 6.27614 6.27614 6.5 6 6.5H1C0.723858 6.5 0.5 6.27614 0.5 6V2Z'
                                        stroke='white'
                                    />
                                    <path
                                        d='M8.5 1C8.5 0.723858 8.72386 0.5 9 0.5H13C13.8284 0.5 14.5 1.17157 14.5 2V6C14.5 6.27614 14.2761 6.5 14 6.5H9C8.72386 6.5 8.5 6.27614 8.5 6V1Z'
                                        stroke='white'
                                    />
                                    <path
                                        d='M8.5 9C8.5 8.72386 8.72386 8.5 9 8.5H14C14.2761 8.5 14.5 8.72386 14.5 9V13C14.5 13.8284 13.8284 14.5 13 14.5H9C8.72386 14.5 8.5 14.2761 8.5 14V9Z'
                                        stroke='white'
                                    />
                                    <path
                                        d='M0.5 9C0.5 8.72386 0.723858 8.5 1 8.5H6C6.27614 8.5 6.5 8.72386 6.5 9V14C6.5 14.2761 6.27614 14.5 6 14.5H2C1.17157 14.5 0.5 13.8284 0.5 13V9Z'
                                        stroke='white'
                                    />
                                </svg>
                            </button>
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
                        </div>
                    ) : (
                        <div className={s.header__catalog}>
                            <button onClick={() => navigate('/catalog')} className={s.header__button}>
                                Каталог{' '}
                                <svg
                                    width='15'
                                    height='15'
                                    viewBox='0 0 15 15'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H6C6.27614 0.5 6.5 0.723858 6.5 1V6C6.5 6.27614 6.27614 6.5 6 6.5H1C0.723858 6.5 0.5 6.27614 0.5 6V2Z'
                                        stroke='white'
                                    />
                                    <path
                                        d='M8.5 1C8.5 0.723858 8.72386 0.5 9 0.5H13C13.8284 0.5 14.5 1.17157 14.5 2V6C14.5 6.27614 14.2761 6.5 14 6.5H9C8.72386 6.5 8.5 6.27614 8.5 6V1Z'
                                        stroke='white'
                                    />
                                    <path
                                        d='M8.5 9C8.5 8.72386 8.72386 8.5 9 8.5H14C14.2761 8.5 14.5 8.72386 14.5 9V13C14.5 13.8284 13.8284 14.5 13 14.5H9C8.72386 14.5 8.5 14.2761 8.5 14V9Z'
                                        stroke='white'
                                    />
                                    <path
                                        d='M0.5 9C0.5 8.72386 0.723858 8.5 1 8.5H6C6.27614 8.5 6.5 8.72386 6.5 9V14C6.5 14.2761 6.27614 14.5 6 14.5H2C1.17157 14.5 0.5 13.8284 0.5 13V9Z'
                                        stroke='white'
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => setModuleSearch(true)}
                                className={s.header__button + ' ' + s.header__button_search}
                            >
                                Поиск{' '}
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
                        </div>
                    )}
                </div>
                {moduleMenu && (
                    <div className={s.module}>
                        <div className={s.module__content}>
                            <div className={s.module__contact}>
                                <div className={s.module__element}>
                                    <div className={s.module__element__img}>
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
                                    <div className={s.module__element__content}>
                                        <span>г. Кокчетав, ул. Ж. Ташенова 129Б </span>
                                        (Рынок Восточный)
                                    </div>
                                </div>

                                <div className={s.module__element}>
                                    <div className={s.module__element__img}>
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
                                    <div className={s.module__element__content}>
                                        <span>opt.sultan@mail.ru</span>
                                        На связи в любое время
                                    </div>
                                </div>
                                <div className={s.module__element}>
                                    <div className={s.module__element__img}>
                                        <svg
                                            width='16'
                                            height='16'
                                            viewBox='0 0 16 16'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M1.20194 2.15157L1.22602 2.13652L4.27031 0.636719L7.55612 5.01779L6.0444 7.03354C6.08963 7.79373 6.41201 8.51095 6.9505 9.04944C7.48899 9.58792 8.20622 9.91029 8.96641 9.95552L10.9821 8.4438L15.3632 11.7295L13.8758 14.7484L13.8633 14.7739L13.8482 14.7979C13.7689 14.9258 13.6581 15.0312 13.5264 15.1042C13.3948 15.1772 13.2467 15.2152 13.0961 15.2148H12.3106C10.7971 15.2148 9.29833 14.9166 7.89999 14.3374C6.50165 13.7582 5.23109 12.9092 4.16085 11.839C3.09061 10.7688 2.24165 9.49819 1.66244 8.09985C1.08324 6.70151 0.785123 5.20278 0.785128 3.68923V2.90366C0.784646 2.75315 0.822697 2.60502 0.895657 2.47337C0.968616 2.34172 1.07406 2.23094 1.20194 2.15157ZM1.91013 3.68923C1.91013 9.42409 6.57578 14.0898 12.3106 14.0898H12.9462L13.9414 12.0696L10.9819 9.84998L9.33425 11.0857H9.14676C8.02453 11.0844 6.94863 10.6381 6.1551 9.84453C5.36156 9.051 4.91521 7.9751 4.91395 6.85287V6.66538L6.14966 5.01775L3.93031 2.05847L1.91013 3.05378V3.68923Z'
                                                fill='#3F4E65'
                                            />
                                        </svg>
                                    </div>
                                    <div className={s.module__element__content}>
                                        <span>Отдел продаж</span>
                                        +7 (777) 490-00-91
                                        <div className={s.module__element__time}>время работы: 9:00-20:00</div>
                                    </div>
                                </div>
                            </div>

                            <div className={s.module__call}>
                                <button className={s.module__call__button}>
                                    <svg
                                        width='10'
                                        height='10'
                                        viewBox='0 0 10 10'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M6.35314 6.71251L7.05314 6.01251C7.14742 5.9194 7.2667 5.85566 7.39651 5.82904C7.52632 5.80241 7.66106 5.81404 7.78439 5.86251L8.63751 6.20314C8.76214 6.25372 8.869 6.34007 8.94463 6.45129C9.02027 6.56252 9.06128 6.69364 9.06251 6.82814V8.39064C9.06179 8.48213 9.04255 8.57253 9.00597 8.6564C8.96939 8.74026 8.91621 8.81585 8.84964 8.87863C8.78308 8.9414 8.70449 8.99005 8.61863 9.02165C8.53276 9.05325 8.44139 9.06715 8.35001 9.06251C2.37189 8.69064 1.16564 3.62814 0.937511 1.69064C0.926922 1.59549 0.936597 1.49918 0.965901 1.40805C0.995206 1.31691 1.04347 1.23301 1.10753 1.16187C1.17159 1.09073 1.24999 1.03395 1.33756 0.995283C1.42514 0.956614 1.51991 0.936925 1.61564 0.937513H3.12501C3.2597 0.937911 3.39119 0.978596 3.50257 1.05433C3.61395 1.13007 3.70013 1.2374 3.75001 1.36251L4.09064 2.21564C4.14072 2.33847 4.15349 2.47334 4.12737 2.60339C4.10125 2.73344 4.03739 2.85292 3.94376 2.94689L3.24376 3.64689C3.24376 3.64689 3.64689 6.37501 6.35314 6.71251Z'
                                            fill='white'
                                        />
                                    </svg>
                                </button>

                                <Link to='/'>Заказать звонок</Link>
                            </div>

                            <div className={s.module__divider}></div>

                            <h2 className={s.module__title}>Меню сайта:</h2>
                            <nav className={s.module__navigation}>
                                <ul className={s.module__navigation__content}>
                                    <li className={s.module__navigation__element}>
                                        <Link to='/' className={s.module__navigation__link}>
                                            О компании
                                        </Link>
                                    </li>
                                    <li className={s.module__navigation__element}>
                                        <Link to='/' className={s.module__navigation__link}>
                                            Доставка и оплата
                                        </Link>
                                    </li>
                                    <li className={s.module__navigation__element}>
                                        <Link to='/' className={s.module__navigation__link}>
                                            Возврат
                                        </Link>
                                    </li>
                                    <li className={s.module__navigation__element}>
                                        <Link to='/' className={s.module__navigation__link}>
                                            Контакты
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <button className={s.module__price}>
                                Прайс-лист{' '}
                                <svg
                                    width='18'
                                    height='17'
                                    viewBox='0 0 18 17'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M13.9583 6.375H11.1249V2.125H6.87492V6.375H4.04159L8.99992 12.0417L13.9583 6.375ZM3.33325 13.4583H14.6666V14.875H3.33325V13.4583Z'
                                        fill='white'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </header>
        );
    }

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
                            Каталог{' '}
                            <svg
                                width='15'
                                height='15'
                                viewBox='0 0 15 15'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H6C6.27614 0.5 6.5 0.723858 6.5 1V6C6.5 6.27614 6.27614 6.5 6 6.5H1C0.723858 6.5 0.5 6.27614 0.5 6V2Z'
                                    stroke='white'
                                />
                                <path
                                    d='M8.5 1C8.5 0.723858 8.72386 0.5 9 0.5H13C13.8284 0.5 14.5 1.17157 14.5 2V6C14.5 6.27614 14.2761 6.5 14 6.5H9C8.72386 6.5 8.5 6.27614 8.5 6V1Z'
                                    stroke='white'
                                />
                                <path
                                    d='M8.5 9C8.5 8.72386 8.72386 8.5 9 8.5H14C14.2761 8.5 14.5 8.72386 14.5 9V13C14.5 13.8284 13.8284 14.5 13 14.5H9C8.72386 14.5 8.5 14.2761 8.5 14V9Z'
                                    stroke='white'
                                />
                                <path
                                    d='M0.5 9C0.5 8.72386 0.723858 8.5 1 8.5H6C6.27614 8.5 6.5 8.72386 6.5 9V14C6.5 14.2761 6.27614 14.5 6 14.5H2C1.17157 14.5 0.5 13.8284 0.5 13V9Z'
                                    stroke='white'
                                />
                            </svg>
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
                            <img src={operator} alt='Оператор' />
                            <div className={s.header__call__circle}></div>
                        </div>
                    </div>

                    <div className={s.header__price}>
                        <button className={s.header__button}>
                            Прайс-лист{' '}
                            <svg
                                width='18'
                                height='17'
                                viewBox='0 0 18 17'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M13.9583 6.375H11.1249V2.125H6.87492V6.375H4.04159L8.99992 12.0417L13.9583 6.375ZM3.33325 13.4583H14.6666V14.875H3.33325V13.4583Z'
                                    fill='white'
                                />
                            </svg>
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
                            <svg
                                width='41'
                                height='29'
                                viewBox='0 0 41 29'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M40.6514 5.78617C40.3916 5.42327 40.043 5.24182 39.6055 5.24182H11.7559L11 3.27403C10.8086 2.62887 10.5488 2.07779 10.2207 1.6208C9.89258 1.16381 9.54395 0.841232 9.1748 0.65306C8.80566 0.464888 8.48438 0.3372 8.21094 0.269996C7.9375 0.202792 7.66406 0.169189 7.39062 0.169189H1.77148C1.41602 0.169189 1.11523 0.290157 0.869141 0.532093C0.623047 0.774028 0.5 1.08317 0.5 1.45951C0.5 1.67457 0.554688 1.8829 0.664062 2.08451C0.773438 2.28612 0.930664 2.44069 1.13574 2.54822C1.34082 2.65575 1.55273 2.70951 1.77148 2.70951H7.39062C7.5 2.70951 7.60254 2.72295 7.69824 2.74983C7.79395 2.77672 7.92383 2.89096 8.08789 3.09258C8.25195 3.29419 8.38867 3.59661 8.49805 3.99983L14.3809 20.1531C14.4355 20.3144 14.5244 20.4689 14.6475 20.6168C14.7705 20.7646 14.9141 20.8789 15.0781 20.9595C15.2422 21.0402 15.4199 21.0805 15.6113 21.0805H33.3301C33.6035 21.0805 33.8564 20.9998 34.0889 20.8385C34.3213 20.6773 34.4785 20.4756 34.5605 20.2337L40.8359 6.97569C40.9727 6.54558 40.9111 6.14908 40.6514 5.78617ZM32.4277 18.4998H16.6367L12.4531 7.82246H37.7188L32.4277 18.4998ZM30.0625 22.4798C29.1602 22.4798 28.3877 22.7957 27.7451 23.4274C27.1025 24.0591 26.7812 24.8186 26.7812 25.7057C26.7812 26.5928 27.1025 27.3522 27.7451 27.9839C28.3877 28.6156 29.1602 28.9315 30.0625 28.9315C30.9648 28.9315 31.7373 28.6156 32.3799 27.9839C33.0225 27.3522 33.3438 26.5928 33.3438 25.7057C33.3438 24.8186 33.0225 24.0591 32.3799 23.4274C31.7373 22.7957 30.9648 22.4798 30.0625 22.4798ZM18.25 22.4798C17.6484 22.4798 17.0947 22.6277 16.5889 22.9234C16.083 23.2191 15.6865 23.6089 15.3994 24.0927C15.1123 24.5766 14.9688 25.1143 14.9688 25.7057C14.9688 26.5928 15.29 27.3522 15.9326 27.9839C16.5752 28.6156 17.3477 28.9315 18.25 28.9315C19.1523 28.9315 19.9248 28.6156 20.5674 27.9839C21.21 27.3522 21.5312 26.5928 21.5312 25.7057C21.5312 25.4906 21.5107 25.2755 21.4697 25.0605C21.4287 24.8454 21.3672 24.6438 21.2852 24.4557C21.2031 24.2675 21.1006 24.086 20.9775 23.9113C20.8545 23.7366 20.7178 23.5753 20.5674 23.4274C20.417 23.2796 20.2529 23.1452 20.0752 23.0242C19.8975 22.9032 19.7129 22.8024 19.5215 22.7218C19.3301 22.6411 19.125 22.5806 18.9062 22.5403C18.6875 22.5 18.4688 22.4798 18.25 22.4798Z'
                                    fill='#3F4E65'
                                />
                            </svg>

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
