import { Link, useLocation } from 'react-router-dom';
import s from './Navigation.module.scss';

type Props = {
    productName?: string;
};

const Navigation: React.FC<Props> = ({ productName }) => {
    const location = useLocation();
    let linkName = 'Текущая страница';

    switch (location.pathname) {
        case '/cart':
            linkName = 'Корзина';
            break;
        case '/catalog':
            linkName = 'Косметика и гигиена';
            break;
        default:
            if (productName) linkName = productName;
    }

    return (
        <ul className={s.navigation}>
            <li className={s.navigation__element}>
                <Link to='/' className={s.navigation__link}>
                    Главная
                </Link>
            </li>
            <li className={s.navigation__element}>
                <Link to={location.pathname} className={s.navigation__link}>
                    {linkName}
                </Link>
            </li>
        </ul>
    );
};

export default Navigation;
