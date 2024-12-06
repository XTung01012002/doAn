import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";

export const PutInfoOrder = createAsyncThunk(
    'PutInfoOrderRe', async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${SummaryApi.putInfoOrder.url}/${id}`, data, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

const initialState = {
    sub: false,
    loading: false,
    error: null
}

const PutInfoOrderReducer = createSlice({
    name: 'PutInfoOrderReducer',
    initialState,
    reducers: {
        setSubPutInfo(state) {
            state.sub = false
        },
        setErrorPutInfo(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(PutInfoOrder.pending, (state) => {
                state.loading = true
                state.sub = false
                state.error = null
            })
            .addCase(PutInfoOrder.fulfilled, (state) => {
                state.loading = false
                state.sub = true
                state.error = null
            })
            .addCase(PutInfoOrder.rejected, (state, action) => {
                state.loading = false
                state.sub = false
                state.error = action.payload
            })
    }
})

export const { setErrorPutInfo, setSubPutInfo } = PutInfoOrderReducer.actions
export default PutInfoOrderReducer.reducer