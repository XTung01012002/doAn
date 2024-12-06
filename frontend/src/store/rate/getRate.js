import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const GetRate = createAsyncThunk(
    'getRate', async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.getRate.url}`, {
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


const GetRateReducer = createSlice({
    name: 'GetRate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetRate.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetRate.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(GetRate.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default GetRateReducer.reducer