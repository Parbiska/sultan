import { Link } from 'react-router-dom';
import s from './BackButton.module.scss';

const BackButton = () => {
    return (
        <Link to='/catalog' className={s.back}>
            <button className={s.back__button}>
                <svg xmlns='http://www.w3.org/2000/svg' width='6' height='10' viewBox='0 0 6 10' fill='none'>
                    <path d='M5 1L1 5L5 9' stroke='#3F4E65' />
                </svg>
            </button>
            <span>Назад</span>
        </Link>
    );
};

export default BackButton;
