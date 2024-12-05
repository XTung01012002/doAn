


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const FetchDataAccept = createAsyncThunk(
    'FetchDataAccept', async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SummaryApi.fetchDataAccept.url}`, {
                withCredentials: true
            })
            return res.data.data
        } catch (error) {
            return rejectWithValue(error?.res?.data?.message)

        }
    }
)


const initialState = {
    data: [],
    loading: false,
    error: null
}



const FetchDataAcceptReducer = createSlice({
    name: 'FetchDataAcceptReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchDataAccept.pending, state => {

                state.loading = true
                state.error = null
            })
            .addCase(FetchDataAccept.fulfilled, (state, action) => {

                state.loading = false
                state.error = null
                state.data = action.payload
            })
            .addCase(FetchDataAccept.rejected, (state, action) => {

                state.loading = false
                state.error = action.payload
            })
    }
})

export default FetchDataAcceptReducer.reducer