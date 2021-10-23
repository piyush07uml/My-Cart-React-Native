import { ADD_CART, REMOVE_CART, UPDATE_SIZE, UPDATE_QUANTITY, APPLY_COUPON } from './actionTypes';



export const cartUpdateAction = (cartItem) => {
    return {
        type: ADD_CART,
        cartItem
    };
}

export const removeItemAction = (item) => {

    return {
        type: REMOVE_CART,
        item
    };
}

export const updateSizeAction = (size, id) => {

    return {
        type: UPDATE_SIZE,
        size,
        id
    };
}

export const updateQuantityAction = (quantity, id) => {

    return {
        type: UPDATE_QUANTITY,
        quantity,
        id
    };
}

export const applyCouponAction = (text) => {

    return {
        type: APPLY_COUPON,
        text
    };
}
