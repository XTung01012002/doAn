import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../../common";



export const GetBill = createAsyncThunk(
    'getBillAdmin', async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.getInventoryreceipt.url}`, {
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


const GetBillReducer = createSlice({
    name: 'getBillReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetBill.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetBill.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(GetBill.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default GetBillReducer.reducer