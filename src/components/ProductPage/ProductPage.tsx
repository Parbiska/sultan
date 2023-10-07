import { connect } from 'react-redux';
import s from './ProductPage.module.scss';
import { decrease, increase, addToCart } from '../../store/cartSlice';
import { Product, ProductWithQuantity } from '../../types/types';
import { RootState } from '../../store/store';
import Navigation from '../Navigaiton/Navigation';
import { useLocation } from 'react-router-dom';
import { requestProduct } from '../../store/productSlice';

type MapStateToProps = {
    product: ProductWithQuantity | undefined;
};

type MapDispatchToProps = {
    addToCart: (product: Product) => void;
    decrease: (barcode: number) => void;
    increase: (barcode: number) => void;
    requestProduct: any;
};

type Props = MapStateToProps & MapDispatchToProps;

const ProductPage: React.FC<Props> = ({ decrease, increase, addToCart, product, requestProduct }) => {
    const location = useLocation();

    const locationArr = location.pathname.split('/');
    const barcode = +locationArr[locationArr.length - 1];
    console.log(barcode);

    if (!product || product.barcode !== barcode) {
        requestProduct(barcode);
    }

    return (
        <div className={s.product}>
            <Navigation productName={product ? product.name : ''}></Navigation>
        </div>
    );
};

const mapStateToProps = (s: RootState): MapStateToProps => ({
    product: s.product.product,
});

export default connect(mapStateToProps, { decrease, increase, addToCart, requestProduct })(ProductPage);
