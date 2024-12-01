import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../../common";


export const GetStatistical = createAsyncThunk(
    'GetStatistical', async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.getStatistical.url}`, data, {
                withCredentials: true
            })
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.res.data)
        }
    }
)


const initialState = {
    data: [],
    loading: false,
    error: null
}


const GetStatisticalReducer = createSlice({
    name: 'getStatistical',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetStatistical.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetStatistical.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(GetStatistical.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default GetStatisticalReducer.reducer