import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../../common";


export const PostUploadProduct = createAsyncThunk(
    'postUpProducts', async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SummaryApi.postUpProducts.url}`, data, {
                withCredentials: true
            })
            return res
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

const initialState = {
    loading: false,
    sub: false,
    error: null
}


const PostUploadProductReducer = createSlice({
    name: 'PostUploadProductReducer',
    initialState,
    reducers: {
        setSub(state) {
            state.sub = false
        },
        setError(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(PostUploadProduct.pending, (state) => {
                state.loading = true
                state.sub = false
                state.error = null
            })
            .addCase(PostUploadProduct.fulfilled, (state) => {
                state.loading = false
                state.sub = true
                state.error = null
            })
            .addCase(PostUploadProduct.rejected, (state, action) => {
                state.loading = false
                state.sub = false
                state.error = action.payload
            })
    }
})
export const { setError, setSub } = PostUploadProductReducer.actions
export default PostUploadProductReducer.reducer