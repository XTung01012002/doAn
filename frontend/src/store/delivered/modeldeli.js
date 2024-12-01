import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";





export const CommnetOrder = createAsyncThunk(
    'CommnetOrder', async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SummaryApi.createCommentOrder.url}/${id}`, data, {
                withCredentials: true
            })
            return res.data.data

        } catch (error) {
            return rejectWithValue(error.res.data)
        }
    }
)


const initialState = {
    sub: false,
    loading: false,
    error: null
}

const CommnetOrderReducer = createSlice({
    name: 'commentOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CommnetOrder.pending, state => {
                state.loading = true
                state.sub = false
                state.error = null
            })
            .addCase(CommnetOrder.fulfilled, (state, action) => {
                state.loading = false
                state.sub = true
                state.error = null
            })
            .addCase(CommnetOrder.rejected, (state, action) => {
                state.loading = false
                state.sub = false
                state.error = action.payload
            })
    }
})

export default CommnetOrderReducer.reducer