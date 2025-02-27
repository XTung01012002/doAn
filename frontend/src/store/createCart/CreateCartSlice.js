import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";



export const CreateCart = createAsyncThunk(
    'post/create-cart',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SummaryApi.postCreateCart.url}`, data, {
                withCredentials: true
            });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);



export const CreateOrder = createAsyncThunk(
    'createOderBa',
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


export const DeleteOrder = createAsyncThunk(
    'delete/canceled', async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${SummaryApi.deleteProductCanceled.url}/${id}`, {
                withCredentials: true
            })
            return res
        } catch (error) {
            return rejectWithValue(error.res.data)
        }
    }
)


const initialState = {
    loadingCreateOrder: false,
    subCreateOrder: false,
    loadingDeleteOrder: false,
    subDeleteOrder: false,
    errorCreateOrder: null,
    errorDeleteOrder: null
}


const CanceledOrderReducer = createSlice({

    name: 'canceledOrder',
    initialState,
    reducers: {
        setSubCreate(state, action) {
            state.subCreateOrder = action.payload
        },
        setErrorCreate(state, action) {
            state.errorCreateOrder = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateOrder.pending, state => {

                state.loadingCreateOrder = true
                state.errorCreateOrder = null
                state.subCreateOrder = false
            })
            .addCase(CreateOrder.fulfilled, state => {

                state.loadingCreateOrder = false
                state.errorCreateOrder = null
                state.subCreateOrder = true
            })
            .addCase(CreateOrder.rejected, (state, action) => {

                state.loadingCreateOrder = false
                state.errorCreateOrder = action.payload
                state.subCreateOrder = false
            })
            .addCase(DeleteOrder.pending, state => {

                state.loadingDeleteOrder = true
                state.errorDeleteOrder = null
                state.subDeleteOrder = false
            })
            .addCase(DeleteOrder.fulfilled, state => {

                state.loadingDeleteOrder = false
                state.errorDeleteOrder = null
                state.subDeleteOrder = true
            })
            .addCase(DeleteOrder.rejected, (state, action) => {

                state.loadingDeleteOrder = false
                state.errorDeleteOrder = action.payload
                state.subDeleteOrder = false
            })
    }
})

export const { setSubCreate, setErrorCreate } = CanceledOrderReducer.actions
export default CanceledOrderReducer.reducer