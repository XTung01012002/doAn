import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";



export const CreateCart = createAsyncThunk(
    'post/create-cart',
    async (data) => {
        try {
            const res = await axios.post(`${SummaryApi.postCreateCart.url}`, data, {
                withCredentials: true
            });
            return res.data.data;
        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    }
);

export const CreateOrder = createAsyncThunk(
    'post/create-order',
    async (data) => {
        try {
            const res = await axios.post(`${SummaryApi.postCreateOrder.url}`, data, {
                withCredentials: true
            })
            console.log('resdata: ', res.data.data);
            
            return res.data.data
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
)