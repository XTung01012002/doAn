import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const GetAllOrdered = createAsyncThunk(
    'getRate', async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.getAllOrdered.url}`, {
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


const GetAllOrderedReducer = createSlice({
    name: 'GetAllOrdered',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllOrdered.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetAllOrdered.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(GetAllOrdered.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default GetAllOrderedReducer.reducer