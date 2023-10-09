import { Link, useLocation } from 'react-router-dom';
import s from './Navigation.module.scss';
import { useResize } from '../../utils/useResize';
import BackButton from './BackButton/BackButton';

type Props = {
    productName?: string;
};

const Navigation: React.FC<Props> = ({ productName }) => {
    const location = useLocation();
    const { width } = useResize();
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
    if (width < 1024) {
        return <BackButton></BackButton>;
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
