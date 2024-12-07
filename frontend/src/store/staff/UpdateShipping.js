import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "../../common";


export const UpdateShippingStatus = createAsyncThunk(
    'putUpdateShippingStatus', async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${SummaryApi.putUpdateShippingStatus.url}/${id}`, data, {
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


const UpdateShippingStatusReducer = createSlice({
    name: 'UpdateShippingStatusReducer',
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
            .addCase(UpdateShippingStatus.pending, (state) => {
                state.loading = true
                state.sub = false
                state.error = null
            })
            .addCase(UpdateShippingStatus.fulfilled, (state) => {
                state.loading = false
                state.sub = true
                state.error = null
            })
            .addCase(UpdateShippingStatus.rejected, (state, action) => {
                state.loading = false
                state.sub = false
                state.error = action.payload
            })
    }
})
export const { setError, setSub } = UpdateShippingStatusReducer.actions
export default UpdateShippingStatusReducer.reducer