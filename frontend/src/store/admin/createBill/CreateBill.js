import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../../common";


export const PostInventoryreceiptCreate = createAsyncThunk(
    'postInventoryreceiptCreate', async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SummaryApi.postInventoryreceiptCreate.url}`, data, {
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
    submit: false,
    error: null
}



const PostInventoryreceiptCreateReducer = createSlice({
    name: 'PostInventoryreceiptCreateReducer',
    initialState,
    reducers: {
        setSubmit(state, action) {
            state.submit = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(PostInventoryreceiptCreate.pending, state => {
                state.loading = true
                state.submit = false
                state.error = null
            })
            .addCase(PostInventoryreceiptCreate.fulfilled, state => {
                state.loading = false
                state.submit = true
                state.error = null
            })
            .addCase(PostInventoryreceiptCreate.rejected, (state, action) => {
                state.loading = false
                state.submit = false
                state.error = action.payload
            })
    }

})

export const { setSubmit } = PostInventoryreceiptCreateReducer.actions
export default PostInventoryreceiptCreateReducer.reducer