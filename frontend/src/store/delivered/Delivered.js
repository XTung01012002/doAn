import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const GetDelivered = createAsyncThunk(
    'getDelivered', async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.getDelivered.url}`, {
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


const GetDeliveredReducer = createSlice({
    name: 'GetDelivered',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetDelivered.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetDelivered.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(GetDelivered.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default GetDeliveredReducer.reducer