import { SET_BILLING_ADDRESS, SET_SHIPPING_ADDRESS, SET_PAYING_ADDRESS } from '../../constants/actionTypes';

const initialState = {
    billingAddress: {
        firstName: "",
        lastName: "",
        address: "",
        country: "",
        state: "",
    },
    shippingAddress: {
        firstName: "",
        lastName: "",
        address: "",
        country: "",
        state: "",
    },
    payingAddress: {
        cardNumber: "",
        expirationDate: "",
        securityCode: "",
    }
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BILLING_ADDRESS:
            return { ...state, billingAddress: action.payload };
        case SET_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };
        case SET_PAYING_ADDRESS:
            return { ...state, payingAddress: action.payload };
        default:
            return state;
    }
};

export default addressReducer;
