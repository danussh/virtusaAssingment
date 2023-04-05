import { SET_BILLING_ADDRESS, SET_SHIPPING_ADDRESS,SET_PAYING_ADDRESS } from '../../constants/actionTypes';

export const setBilling = (address) => ({
    type: SET_BILLING_ADDRESS,
    payload: address,
});

export const setShipping = (address) => ({
    type: SET_SHIPPING_ADDRESS,
    payload: address,
});

export const setPaying = (address) => ({
    type: SET_PAYING_ADDRESS,
    payload: address,
});
