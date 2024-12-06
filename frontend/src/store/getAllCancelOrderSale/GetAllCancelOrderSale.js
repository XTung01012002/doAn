import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const GetAllCancelOrderSale = createAsyncThunk(
    'GetAllCancelOrderSale', async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.getallcancelordersale.url}`, {
                withCredentials: true
            })
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)


const initialState = {
    data: [],
    loading: false,
    error: null
}


const GetAllCancelOrderSaleReducer = createSlice({
    name: 'GetAllCancelOrderSaleReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllCancelOrderSale.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetAllCancelOrderSale.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(GetAllCancelOrderSale.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default GetAllCancelOrderSaleReducer.reducer