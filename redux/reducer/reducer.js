import { ADD_CART, REMOVE_CART, UPDATE_QUANTITY, UPDATE_SIZE, APPLY_COUPON } from '../actions/actionTypes';
import uuid from 'uuid';
const initialState = {
    products: [
        {
            id: uuid(),
            name: "NewPort",
            price: 1500,
            img: require('../../Images/1.jpg')

        },

        {
            id: uuid(),
            name: "Levi's",
            price: 1600,
            img: require('../../Images/2.jpg')
        },
        {
            id: uuid(),
            name: "Spykar",
            price: 1700,
            img: require('../../Images/3.jpg')
        },
        {
            id: uuid(),
            name: "Nostrum",
            price: 1800,
            img: require('../../Images/4.jpg')

        },
        {
            id: uuid(),
            name: "BadBoyz",
            price: 1900,
            img: require('../../Images/5.jpg')

        },
        {
            id: uuid(),
            name: "POLO",
            price: 1500,
            img: require('../../Images/6.jpg')

        },
        {
            id: uuid(),
            name: "GAS",
            price: 1400,
            img: require('../../Images/7.jpg')

        },
        {
            id: uuid(),
            name: "Killer",
            price: 2000,
            img: require('../../Images/8.jpg')

        },
        {
            id: uuid(),
            name: "Flying Machine",
            price: 2100,
            img: require('../../Images/9.jpg')

        },
        {
            id: uuid(),
            name: "Being Human",
            price: 2200,
            img: require('../../Images/10.jpg')

        }
    ],
    cartList: [],
    cartBill: {}
};


const Reducer = (state = initialState, action) => {

    let cartItem;
    let updatedCartList;
    let billAmount = 0
    let billDiscount;
    let billGST;
    let billTotal;
    let bill;
    let isCouponApplied = false;
    let updatedBill;


    //************  UPDATING CART BILL ON CHANGE  ***************//


    let updateBillFunc = (updateCartList) => {

        updateCartList.map((item) => {
            billAmount += item.totalPrice;
            return item
        });

        if (billAmount >= 5000) {
            billDiscount = 500;
            billTotal = billAmount - 500;
        } else {
            billDiscount = 0
            billTotal = billAmount
        }

        billGST = billTotal / 100 * 18;

        billTotal = billTotal + billGST;



        bill = {
            billAmount,
            billDiscount,
            billTotal,
            billGST,
            isCouponApplied
        };

        return bill


    }


    switch (action.type) {



        case ADD_CART:

            //************  ADDING ITEM IN CART  ***************//
            cartItem = {
                id: action.cartItem.item.id,
                name: action.cartItem.item.name,
                price: action.cartItem.item.price,
                totalPrice: action.cartItem.item.price * action.cartItem.quantity,
                quantity: action.cartItem.quantity,
                size: action.cartItem.size,
                img: action.cartItem.item.img
            }

            updatedCartList = [...state.cartList, cartItem]

            updatedBill = updateBillFunc(updatedCartList);


            return {
                ...state,
                cartList: updatedCartList,
                cartBill: updatedBill
            };




        case REMOVE_CART:

            //************  REMOVE ITEM FROM CART ***************//

            updatedCartList = state.cartList.filter((item) => {
                return item.id !== action.item.id
            })

            updatedBill = updateBillFunc(updatedCartList);



            return {
                ...state,
                cartList: updatedCartList,
                cartBill: updatedBill
            };




        case UPDATE_SIZE:

            //************  UPDATING SIZE FROM CART ***************//


            const updatedSize = state.cartList.map((item) => {
                item.id === action.id ? item.size = action.size : item;
                return item
            })

            return {
                ...state,
                cartList: updatedSize
            }



        case UPDATE_QUANTITY:

            //************  UPDATING QUANTITY FROM CART ***************//

            let updatedQuantity = state.cartList.map((item) => {

                if (item.id === action.id) {
                    item.quantity = action.quantity;
                    item.totalPrice = item.price * action.quantity
                    return item
                } else {
                    return item;
                }
            })

            updatedBill = updateBillFunc(updatedQuantity);


            return {
                ...state,
                cartList: updatedQuantity,
                cartBill: bill
            };




        case APPLY_COUPON:

            //************  CHECKING COUPON ***************//

            const getAmount = { ...state.cartBill }
            billAmount = getAmount.billAmount;


            if (action.text === "DISC30" && billAmount >= 7000) {
                billDiscount = billAmount / 100 * 30;
                billTotal = billAmount - billDiscount;
                isCouponApplied = true;
            } else if (billAmount >= 5000) {
                billDiscount = 500;
                billTotal = billAmount - billDiscount;
            } else {
                billDiscount = 0
                billTotal = billAmount
            }

            billGST = billTotal / 100 * 18;

            billTotal = billTotal + billGST;

            bill = {
                billAmount,
                billDiscount,
                billTotal,
                billGST,
                isCouponApplied
            }


            return {
                ...state,
                cartBill: bill
            };


        default:
            return state;
    }
}

export default Reducer;