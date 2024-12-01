import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const GetCommentProduct = createAsyncThunk(
    'GetCommentProduct', async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.getCommentProduct.url}/${id}`, {
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


const GetCommentProductReducer = createSlice({
    name: 'GetCommentProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetCommentProduct.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(GetCommentProduct.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(GetCommentProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default GetCommentProductReducer.reducer