import { Navigate, Route, Routes } from 'react-router-dom';
import s from './App.module.scss';
import Catalog from './components/Catalog/Catalog';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import ProductPage from './components/ProductPage/ProductPage';

const App = () => {
    return (
        <div className={s.app}>
            <Header />

            <main>
                <Routes>
                    <Route path='/' element={<Navigate to='/catalog' />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route path='/product/*' element={<ProductPage></ProductPage>}></Route>
                    <Route path='*' element={<div>Error 404: Page not found</div>}></Route>
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default App;
