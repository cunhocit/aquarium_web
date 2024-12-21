/* eslint-disable no-unused-vars */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { lazy, Suspense, useEffect, useState } from 'react';
import { ShopingCart } from './shopping_cart';
import { useCart } from './cart_contetn';

const loadDraggable = () => import('./draggable');

export const ShoppingCartFinal = () => {
    const [shopCart, setShopCart] = useState(false);
    const handleOpenShopCart = () => setShopCart(prev => !prev);
    const {cart, updateCart} = useCart();

    useEffect(() => {
        loadDraggable().then((module) => {
            module.default();
        });
    }, []);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <div
                    id='cart-shopping'
                    className={`cart-shopping-svg ${shopCart ? 'hidden' : ''}`}
                    onClick={handleOpenShopCart}
                    style={{ position: "absolute", top: "50px", left: "50px", cursor: "grab" }}
                >
                    <FontAwesomeIcon icon={faCartShopping} /> + {cart}
                </div>
            </Suspense>

            <ShopingCart shopCart={shopCart} handleOpenShopCart={handleOpenShopCart}/>
        </>
    )
}