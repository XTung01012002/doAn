import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../../common";



export const GetBillListInventory = createAsyncThunk(
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
            .addCase(GetBillListInventory.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetBillListInventory.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(GetBillListInventory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default GetBillReducer.reducer